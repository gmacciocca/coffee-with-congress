var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var mergeJson = require("gulp-merge-json");
var jsonSass = require("gulp-json-sass");
var json5 = require("gulp-json5");

var del = require("del");
var mkdirp = require("mkdirp");
var copy = require("copy");

var paths = {
    clean: ["./build", "./lib", "./public/js", "./public/css", "./public/resources", "./public/images" ],
    copyResources: [{
        from: "./src/components/CommonUi/styles/*.json", to: "./public/resources/"
    }, {
        from: "./build/*.json", to: "./public/resources/"
    }, {
        from: "./src/favicon.ico", to: "./public/*" 
    }],
    scripts: ["src/**/*.js"],
    images: "client/img/**/*",
    themeColors: "./src/components/CommonUi/styles/themeColors.json5",
    scssList: [
        "./build/themeColors.json",
        "./src/components/CommonUi/styles/media.json",
        "./src/third-party/materialize-css/sass/materialize.scss",
        "./src/components/CommonUi/styles/themeColors.scss",
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

gulp.task("createDirs", ["clean"], function() {
    paths.clean.forEach(function(dir) {
        mkdirp.sync(dir, "0777");
    });
});

gulp.task("themeColors", function() {
    return gulp.src(paths.themeColors)
    .pipe(json5({
        beautify: true // default
    }))
    .pipe(gulp.dest("./build"));
});

gulp.task("sassify", ["themeColors"], function() {
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
