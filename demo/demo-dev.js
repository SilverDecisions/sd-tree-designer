var lng = getParameterByName('lang') || 'en';
var app;

var DataModel = require('sd-model').DataModel;
var ComputationsManager = require('sd-computations').ComputationsManager;
var cm = new ComputationsManager();
cm.setCurrentRuleByName("max-min")
let module = require('sd-tree-designer');
var TreeDesigner = module.TreeDesigner;
var AppUtils = module.AppUtils;


var data = AppUtils.getJSON("./data/sample-tree.json", function(data, err){

    console.log(data);
    let dataModel = new DataModel(data.data);
    cm.setData(dataModel);
    cm.recompute();
    cm.updateDisplayValues();

    var

    app = new TreeDesigner('#app-container', dataModel,{
        "fontSize": "12px"
    });
});


function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


