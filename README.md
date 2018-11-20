# @cloudcannon/gulp-ejs-template

🔧 create a compiled ejs file with window.JST exposed

> ejs plugin for [gulp](https://github.com/CloudCannon/gulp-ejs-template)

## Usage

Install `@cloudcannon/gulp-ejs-template` as a development dependency:

```shell
npm install --save-dev @cloudcannon/gulp-ejs-template
```

Then, add it to your `gulpfile.js`:

```javascript
var ejs = require("@cloudcannon/gulp-ejs-template")
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var gap = require("gulp-append-prepend");

gulp.task("ejs", function () {
	return gulp.src("templates/**/*.jst.ejs")
		.pipe(ejs())
    .pipe(rename(function (path) {
      path.extname = ".js";
    }))
    .pipe(concat(".jst-cache.js"))
		.pipe(gap.prependText("window.JST = window.JST || {};"))
		.pipe(gulp.dest("app/assets/javascripts/"));
});

```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
