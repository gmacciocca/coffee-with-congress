var browserify = require("browserify");
var env = require("gulp-env");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var babelify = require("babelify");


module.exports = function(gulp) {

    function onError(e) {
        console.error(e.message);  // eslint-disable-line no-console
    }

    gulp.task("devJS", function() {
        const envs = env.set({
            NODE_ENV: "development"
        });
        var options = {};
        options.debug = true; // adds source maps for us!
        return browserify("./src/index.js", options)
            .transform(babelify.configure({ presets: ["es2015", "react"] }))
            .bundle()
            .on("error", onError)
            .pipe(source("bundle.js"))
            .pipe(envs)
            .pipe(buffer())

            .pipe(gulp.dest("./public/js"));
    });
};
