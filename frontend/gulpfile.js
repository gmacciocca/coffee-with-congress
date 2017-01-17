var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var mergeJson = require("gulp-merge-json");
var jsonSass = require("gulp-json-sass");
var json5 = require("gulp-json5");
var del = require("del");
var mkdirp = require("mkdirp");
var flatten = require("gulp-flatten");
var merge = require("merge-stream");

var paths = {
    clean: ["./build", "./public/js", "./public/css", "./public/resources", "./public/images" ],
    resources: [{
        from: "./src/components/*/images/*.*", to: "./public/images",
    }],
    devConfig: {
        from: "./gulp/dev/config.json", to: "./build"
    },
    qaConfig: {
        from: "./gulp/qa/config.json", to: "./build"
    },
    prodConfig: {
        from: "./gulp/prod/config.json", to: "./build"
    },
    scripts: ["src/**/*.js"],
    images: "client/img/**/*",
    themeColors: "./src/components/CommonUi/styles/themeColors.json5",
    scssList: [
        "./build/themeColors.json",
        "./src/third-party/materialize-css/sass/materialize.scss",
        "./src/components/CommonUi/styles/themeColors.scss",
        "./src/components/CommonUi/styles/global.scss",
        "./src/components/CommonUi/styles/media-queries.scss",
        "./src/components/CommonUi/styles/*.scss",
        "./src/components/*/styles/*.scss"
    ],
};

function onError(err) {
    console.error(err);  // eslint-disable-line no-console1
}

function copyPair(pair) {
    return gulp.src(pair.from)
        .on("error", onError)
        .pipe(flatten())
        .on("error", onError)
        .pipe(gulp.dest(pair.to));
}

gulp.task("copyResources", ["buildStringResources"], function() {
    var streams = paths.resources.map(function(pair) {
        return copyPair(pair);
    });
    return merge(streams);
});

gulp.task("copyDevConfig", function() {
    return copyPair(paths.devConfig);
});

gulp.task("copyProdConfig", function() {
    return copyPair(paths.prodConfig);
});

gulp.task("copyQaConfig", function() {
    return copyPair(paths.qaConfig);
});

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
            includePaths: ["./src/third-party/materialize-css/sass/"]
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

var devJS = require("./gulp/dev/devJS.js")(gulp);
gulp.task("browserify-babelify-sassify-dev", [ "copyDevConfig", "copyResources", "sassify", "devJS" ]);

var prodJS = require("./gulp/prod/prodJS.js")(gulp);
gulp.task("browserify-babelify-uglify-sassify-prod", [ "createDirs", "copyProdConfig", "copyResources", "sassify", "prodJS" ]);

var prodJS = require("./gulp/prod/prodJS.js")(gulp);
gulp.task("browserify-babelify-uglify-sassify-qa", [ "createDirs", "copyQaConfig", "copyResources", "sassify", "prodJS" ]);
