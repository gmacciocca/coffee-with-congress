var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var mergeJson = require("gulp-merge-json");
var jsonSass = require("gulp-json-sass");

var del = require("del");
var mkdirp = require("mkdirp");
var copy = require("copy");

var paths = {
    clean: ["./build", "./lib", "./public/js", "./public/css", "./public/resources", "./public/images" ],
    copyResources: [{ from: "./src/components/CommonUi/styles/*.json", to: "./public/resources/" }],
    scripts: ["src/**/*.js"],
    images: "client/img/**/*",
    scssList: [
        "./src/components/CommonUi/styles/colors.json",
        "./src/components/CommonUi/styles/media.json",
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

gulp.task("sassify", function() {
    return gulp.src(paths.scssList)
        .pipe(jsonSass({ sass: false }))
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

gulp.task("copyResources", ["buildStringResources"], function() {
    paths.copyResources.forEach(function(pair) {
        copy(pair.from, pair.to, fsCallback);
    });
});

gulp.task("buildStringResources", function() {
    return gulp.src("./src/components/*/resources/en-us.{json,json5}")
        .pipe(mergeJson({ fileName: "en-us.json" }))
        .pipe(gulp.dest("./public/resources"));
});
