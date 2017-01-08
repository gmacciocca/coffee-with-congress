var browserify = require("browserify");
var env = require("gulp-env");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var babelify = require("babelify");

module.exports = function(gulp) {

    function onError(e) {
        console.error(e.message);  // eslint-disable-line no-console
    }

    gulp.task("prodJS", function() {
        const envs = env.set({
            NODE_ENV: "production"
        });


        return browserify("./src/index.js")
            .transform(babelify.configure({ presets: ["es2015", "react"] }))
            .bundle()
            .on("error", onError)
            .pipe(source("bundle.js"))
            .pipe(envs)
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("./public/js"));
    });
};
