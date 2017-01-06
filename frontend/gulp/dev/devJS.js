var source = require("vinyl-source-stream");
var watchify = require("watchify");
var browserify = require("browserify");
var babelify = require("babelify");
var envify = require("envify/custom");

module.exports = function(gulp) {
    function onError(e) {
        console.error(e.message);  // eslint-disable-line no-console
    }

    gulp.task("devJS", function() {
        function bundle() {
            return b.bundle()
                .on("error", onError)
                .pipe(source("bundle.js"))
                .pipe(gulp.dest("./public/js"));
        }
        var options = watchify.args;
        options.debug = true; // adds source maps for us!
        var b = watchify(browserify(["./lib/index.js"], options))
            .transform(babelify())
            .transform(envify({
                NODE_ENV: "development"
            }))
            .on("update", bundle);
        return bundle();
    });
};
