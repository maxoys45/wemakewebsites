var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify');

// SETTINGS

var cfg = {
    scripts: {
        src: './frontend/js/**/*',
        dist: './build/assets/js/',
        filename: 'bundle.js',
        entrypoint: './frontend/js/main.js'
    },
    styles: {
        src: './frontend/scss/**/*',
        dist: './build/assets/css/'
    },
    img: {
        src: './frontend/img/**/*',
        dist: './build/assets/img/'
    },
    fonts: {
        src: './frontend/fonts/**/*',
        dist: './build/assets/fonts/'
    },
    html: {
        base: './frontend/html/*.html',
        src: './frontend/html/**/*',
        dist: './build'
    }
};

// SCRIPTS

gulp.task('scripts', function () {
    return browserify({entries: cfg.scripts.entrypoint, debug: true})
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source(cfg.scripts.filename))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cfg.scripts.dist));
});

// IMAGES

gulp.task('img', function () {
    return gulp.src(cfg.img.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant({
                quality: 10
            })]
        }))
        .pipe(gulp.dest(cfg.img.dist));
});

// STYLES

gulp.task('styles', function () {
    gulp.src(cfg.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cfg.styles.dist))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(cfg.styles.dist));
});

// FONTS

gulp.task('fonts', function () {
    gulp.src(cfg.fonts.src)
        .pipe(gulp.dest(cfg.fonts.dist));
});

// HTML

gulp.task('html', function () {
    gulp.src(cfg.html.base)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(cfg.html.dist));
});

gulp.task('watch', [
    'html',
    'styles',
    'img',
    'scripts',
    'fonts'
], function () {

    gulp.watch(cfg.html.src, ['html']);
    gulp.watch(cfg.img.src, ['img']);
    gulp.watch(cfg.styles.src, ['styles']);
    gulp.watch(cfg.scripts.src, ['scripts']);
    gulp.watch(cfg.fonts.src, ['fonts']);

});