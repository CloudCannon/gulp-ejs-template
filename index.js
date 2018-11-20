'use strict'

var through = require('through2');
var PluginError = require('plugin-error');
var _ = require("underscore");

module.exports = function processEJS(options) {
	options = options || {};
	options.base = options.base || "";

	return through2.obj(function (file, encoding, callback) {
		var content, template, key;
		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			return callback(new PluginError("@cloudcannon/gulp-ejs-template", "Streaming not supported"));
		}

		try {
			key = file.path.substring(options.base.length, file.path.length - ".jst.ejs".length);

			content = file.contents.toString("utf8");
			template = _.template(content.trim()).source;
			template = "window.JST[\"" + key + "\"]=" + template + ";";
			file.contents = Buffer.from(template);
			this.push(file);
		} catch (err) {
			if (!options.silent) {
				err.message = err.message ? `${err.message} in ${file.path}` : "Unknown error";
				this.emit("error", new PluginError("@cloudcannon/gulp-ejs-template", err, {
					fileName: file.path,
					showProperties: false
				}));
			}
		}

		callback();
	});
};
