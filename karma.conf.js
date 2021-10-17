var p = require('./package.json');
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

module.exports = function (config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        plugins: [
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
        ],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/sd-utils/dist/sd-utils.js',
            'node_modules/sd-model/dist/sd-model.js',
            'dist/sd-tree-designer-vendor.js',
            'src/**/*.js',
            'test/**/*.js',
            // JSON fixture
            {
                pattern: 'test/data-json-filelist.json',
                watched: true,
                served: true,
                included: false
            },
            {
                pattern: 'test/data/*.json',
                watched: true,
                served: true,
                included: false
            },
            {
                pattern: 'test/trees/*.json',
                watched: true,
                served: true,
                included: false
            }
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            configure: function(bundle) {
                bundle.on('prebundle', function() {
                    bundle.require('./index.js', {expose: p.name} )
                        .external(dependencies);
                });
            },
            "transform": [
                ["stringify", {
                    appliesTo: {includeExtensions: ['.html']}
                }],
                [
                    "babelify",
                    {
                        "global": true,
                        "ignore": [
                            "/\\/node_modules\\/(?!d3-.+\\/)/"
                        ],
                        "presets": [
                            "@babel/preset-env"
                        ],
                        "plugins": [
                            "transform-class-properties",
                            "transform-object-assign",
                            [
                                "babel-plugin-transform-builtin-extend",
                                {
                                    "globals": [
                                        "Error"
                                    ]
                                }
                            ],
                            "istanbul",
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "regenerator": true
                                }
                            ]
                        ]
                    },
                ]

            ]
        },

        // start these browsers
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],
        logLevel: config.LOG_WARN,
        singleRun: false,
        browserConsoleLogOptions: {
            terminal: true,
            level: ""
        },

        coverageReporter: {
            reporters: [
                // {'type': 'text'},
                {'type': 'html', dir: 'coverage'},
                {'type': 'lcov'}
            ]
        },
        client: {
            jasmine: {
                random: false
            }
        }
    });
};
