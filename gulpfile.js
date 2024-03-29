var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var plugins = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var p = require('./package.json'),
stringify = require('stringify');

var Server = require('karma').Server;

/* nicer browserify errors */
var gutil = require('gulp-util');
var chalk = require('chalk');

var dependencies = [];
var vendorDependencies = [];
var sdDependencies = [];
for(var k in p.dependencies){
    if(p.dependencies.hasOwnProperty(k)){
        dependencies.push(k);
        if(k.trim().startsWith("sd-")){
            sdDependencies.push(k)
        }else{
            vendorDependencies.push(k)
        }
    }
}

const browserifyTransforms = p.browserify.transform.reduce((acc, curr) => (acc[curr[0]] = curr[1], acc), {});

var projectName= "sd-tree-designer";
var standaloneName= "SilverDecisions.TreeDesigner";

gulp.task('prepare-test', function(){
    return gulp
        .src('test/data/*.json')
        .pipe(require('gulp-filelist')('data-json-filelist.json', { flatten: true }))
        .pipe(gulp.dest('test'))
});

gulp.task('test', gulp.series('prepare-test', function (done) {
    return runTest(true, done)
}));

gulp.task('test-watch', gulp.series('prepare-test', function (done) {
    return runTest(false, done)
}));


gulp.task('clean', function (cb) {
    return del(['tmp', 'dist'], cb);
});


gulp.task('build-css', function () {
    return buildCss(projectName, './src/styles/*', './dist');
});

function buildCss(fileName, src, dest, failOnError) {
    var pipe = gulp.src(src);

    if(!failOnError){
        pipe = pipe.pipe(plugins.plumber({ errorHandler: onError }))
    }

    return pipe.pipe(plugins.plumber({errorHandler: (err)=>onError(err,failOnError)}))
        .pipe(sass())
        .pipe(plugins.concat(fileName + '.css'))
        .pipe(gulp.dest(dest))
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({extname: '.min.css'}))
        .pipe(gulp.dest(dest));
}

gulp.task('build-templates', function () {
    return gulp.src('src/templates/*.html')
        .pipe(plugins.html2js('templates.js', {
            adapter: 'javascript',
            base: 'templates',
            name: 'templates'
        }))
        .pipe(gulp.dest('dist'));
});



gulp.task('build-standalone', function () {
    var jsFileName =  projectName;
    return buildJs('./standalone.index.js', standaloneName, jsFileName, "dist/standalone", false, true)
});

gulp.task('build-module', function () {
    var jsFileName =  projectName;
    var b = browserify({
        debug: true,
    }).transform(stringify, browserifyTransforms['stringify'])
        .require('./index.js', {expose: projectName} )
        .external(dependencies);
    return finishBrowserifyBuild(b, jsFileName, "dist")
});

gulp.task('build-vendor', function () {
    return buildJsDependencies(projectName+"-vendor", vendorDependencies, "dist")
});


gulp.task('build', gulp.parallel('build-css', 'build-standalone', 'build-module' ,'build-vendor'));

gulp.task('build-clean', gulp.series('clean', 'build'));

gulp.task('default', gulp.series('build-clean', 'test'));


gulp.task('watch', function() {
    gulp.watch(['./src/**/*.js','./src/**/*.html', './src/i18n/*.*json'], ['build-module']);
    gulp.watch(['./src/styles/*.*css'], ['build-css']);
});

function runTest(singleRun, done){
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: singleRun
    }, function (err) {
        done(err);
    }).start();
}


function buildJs(src, standaloneName,  jsFileName, dest, external, failOnError) {
    if(!external){
        external = []
    }

    var b = browserify({
        basedir: '.',
        debug: true,
        entries: [src],
        cache: {},
        packageCache: {},
        standalone: standaloneName
    }).transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] }
    })
    // .plugin(resolutions, '*')
        .external(external)

    return finishBrowserifyBuild(b,jsFileName, dest, failOnError)
}

function buildJsDependencies(jsFileName, moduleNames, dest, failOnError){
    var b = browserify({
        debug: true,
        require: [moduleNames]
    })

    return finishBrowserifyBuild(b, jsFileName, dest, failOnError)
}

function finishBrowserifyBuild(b, jsFileName, dest, failOnError){
    var pipe = b
        .transform("babelify", browserifyTransforms['babelify'])
        .bundle();
    if(!failOnError){
        pipe = pipe.on('error', map_error )
            .pipe(plugins.plumber({ errorHandler: onError }))
    }


    pipe = pipe.pipe(source(jsFileName+'.js'))
        .pipe(gulp.dest(dest))
        .pipe(buffer());

    var development = (argv.dev !== undefined);
    if(!development){
        pipe.pipe(sourcemaps.init({loadMaps: true}))
        // .pipe(plugins.stripDebug())
            .pipe(plugins.uglify({
                compress: {
                    // drop_console: true
                }
            }))
            .pipe(plugins.rename({ extname: '.min.js' }))

            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(dest));
    }
    return pipe;
}



var onError = function (err) {
    console.log('onError', err);
    this.emit('end');
};


function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }
    console.log(err)

    this.emit('end');
}
