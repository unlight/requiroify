var makeRequireTransform = require("browserify-transform-tools").makeRequireTransform;
var requiroResolve = require("requiro").resolve;
var phpfn = require("phpfn");
var trim = phpfn("trim");

module.exports = makeRequireTransform("requirifyTransform", {
	evaluateArguments: false
}, requirify);

function requirify(args, opts, done) {
	var path = trim(args[0], "'\"");
	path = requiroResolve(path);
	return done(null, "require('" + path + "')");
}