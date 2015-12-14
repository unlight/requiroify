var makeRequireTransform = require("browserify-transform-tools").makeRequireTransform;
var requiroResolve = require("requiro").resolve;
var phpfn = require("phpfn");
var trim = phpfn("trim");
var dirname = require("path").dirname;

module.exports = makeRequireTransform("requiroifyTransform", {
	evaluateArguments: false
}, requiroify);

function requiroify(args, opts, done) {
	var path = trim(args[0], "'\"");
	var filedir = dirname(opts.file);
	var newPath = requiroResolve(path, {
		filedir: filedir
	});
	if (newPath.slice(0, filedir.length) === filedir) {
		newPath = "./" + newPath.slice(filedir.length + 1);
	}
	return done(null, "require(" + JSON.stringify(newPath) + ")");
}