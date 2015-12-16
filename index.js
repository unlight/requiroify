var makeRequireTransform = require("browserify-transform-tools").makeRequireTransform;
var requiroResolve = require("requiro").resolve;
var trim = require("lodash.trim");
var dirname = require("path").dirname;
var pathrelative = require("path").relative;

module.exports = makeRequireTransform("requiroifyTransform", {
	evaluateArguments: false
}, requiroify);

function requiroify(args, opts, done) {
	var path = trim(args[0], "'\"");
	var filedir = dirname(opts.file);
	var newPath = requiroResolve(path, {
		filedir: filedir
	});
	if (path !== newPath) {
		var relativePath = pathrelative(filedir, newPath);
		newPath = "./" + relativePath;
	}
	return done(null, "require(" + JSON.stringify(newPath) + ")");
}