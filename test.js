var transformTools = require("browserify-transform-tools");
var path = require("path");

var myTransform = require("./index");
var dummyJsFile = path.resolve(__dirname, "dummy.js");
var content = "require('~/dummy')";
transformTools.runTransform(myTransform, dummyJsFile, {content: content},
    function(err, transformed) {
    	console.log(transformed);
    }
);