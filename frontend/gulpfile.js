var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var mergeJson = require("gulp-merge-json");

// var concat = require("gulp-concat");
// var sourcemaps = require("gulp-sourcemaps");
// var source = require("vinyl-source-stream");
// var watchify = require("watchify");
// var babelify = require("babelify");
// var browserify = require("browserify");
var del = require("del");
var mkdirp = require("mkdirp");
var copy = require("copy");

var paths = {
    clean: ["./build", "./lib", "./public/js", "./public/css", "./public/resources", "./public/images" ],
    copyResources: [{ from: "./src/resources/*", to: "./public/resources/" }],
    scripts: ["src/**/*.js"],
    images: "client/img/**/*",
    scssList: [
        "./src/third-party/materialize-css/sass/materialize.scss",
        "./src/components/CommonUi/styles/colors.scss",
        "./src/components/CommonUi/styles/global.scss",
        "./src/components/CommonUi/styles/media-queries.scss",
        "./src/components/CommonUi/styles/*.scss",
        "./src/components/*/styles/*.scss"
    ],
};

function fsCallback() {
}

gulp.task("clean", function() {
    del.sync(paths.clean);
});

gulp.task("createDirs", function() {
    paths.clean.forEach(function(dir) {
        mkdirp.sync(dir, "0777");
    });
});

gulp.task("copyResources", ["clean"], function() {
    paths.copyResources.forEach(function(pair) {
        copy(pair.from, pair.to, fsCallback);
    });
});

gulp.task("sassify", function() {
    return gulp.src(paths.scssList)
        .pipe(concat("styles.scss"))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                "./src/third-party/materialize-css/sass/"
            ]
        }))
        .pipe(concat("styles.css"))
        //.pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("buildStringResources", function() {
    return gulp.src("./src/components/*/resources/en-us.{json,json5}")
        .pipe(mergeJson({ fileName: "en-us.json" }))
        .pipe(gulp.dest("./public/resources"));
});



//
// function onError(e) {
//     console.error(e.message);
// }
//
// var config = {
//     buildPath: "public"
// };
//
// gulp.task("build", ["clean"], function() {
//
//     // "build": "npm run babelify && npm run sassify && npm run browserify && npm run localize",
//
//
//     function bundle() {
//         return b.bundle()
//             .on("error", onError)
//             .pipe(source("bundle.js"))
//             .pipe(gulp.dest("./" + config.buildPath + "/js"));
//     }
//
//     var options = {};
//     options.debug = true; // adds source maps for us!
//     var b = browserify(["./src/main.js"], options)
//         //.transform(decoratify)
//         .transform(babelify)
//         // .transform(envify({
//         //     NODE_ENV: 'development'
//         // }))
//         .on("update", bundle);
//
//     return bundle();
//
//
//
//     // function bundle() {
//     //     return b.bundle()
//     //         .on("error", onError)
//     //         .pipe(source("bundle.js"))
//     //         .pipe(gulp.dest("./" + config.buildPath + "/js"));
//     // }
//     //
//     // var options = watchify.args;
//     // options.debug = true; // adds source maps for us!
//     // var b = watchify(browserify(["./src/main.js"], options))
//     //     //.transform(decoratify)
//     //     .transform(babelify)
//     //     // .transform(envify({
//     //     //     NODE_ENV: 'development'
//     //     // }))
//     //     .on("update", bundle);
//     //
//     // return bundle();
// });
//
//
// gulp.task("scripts", ["clean"], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//     return gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
// //      .pipe(coffee())
// //      .pipe(uglify())
//     .pipe(concat("all.min.js"))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest("build/js"));
// });
//
// // Copy all static images
// gulp.task("images", ["clean"], function() {
//   // return gulp.src(paths.images)
//   //   // Pass in options to the task
//   //   .pipe(imagemin({optimizationLevel: 5}))
//   //   .pipe(gulp.dest("build/img"));
// });
//
// // Rerun the task when a file changes
// gulp.task("watch", function() {
//     gulp.watch(paths.scripts, ["scripts"]);
//     gulp.watch(paths.images, ["images"]);
// });
//
// // The default task (called when you run `gulp` from cli)
// gulp.task("default", ["watch", "scripts", "images"]);