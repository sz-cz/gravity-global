var gulp = require('gulp');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync').create();
var log = require('fancy-log');

var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var replace = require('gulp-replace');

// Make sure that v10.16.0 is used
if (process.version !== 'v10.16.0') {
    log.error('Wrong version of node! v10.16.0 is needed, current version: ' + process.version);
    process.exit();
}

// Start PHP local server (TWIG)
gulp.task('php', function () {
    php.server({ base: './', port: 1337, keepalive: true });
});

// browserSync - this is our helper, improving development
gulp.task('browserSync', ['php'], function () {
    browserSync.init({
        port: 2137,
        proxy: "localhost:1337",
        baseDir: "./",
        open: true,
        notify: true
    });
});

gulp.task('scss', [], function () {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass({
            includePaths: [
                'node_modules/bootstrap/scss'
            ]
        })) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(gulp.dest('assets/dist'));
});

gulp.task('js', [], function () {
    return gulp.src([
            'assets/js/**/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist')
    );
});

gulp.task('cacheBust', [], function () {
    var cbString = new Date().getTime();
    return gulp.src(['views/base.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(gulp.dest('./views'));
});

// Main task
gulp.task('serve', ['scss', 'js', 'cacheBust', 'browserSync'], function () {
    gulp.watch(['./assets/scss/*.scss', './assets/variables/*.scss'], ['scss']);
    gulp.watch('./assets/js/*.js', ['js']);

    gulp.watch(
        ['./*.php', 
        './views/**/*.html', 
        'assets/dist/*', 
        'assets/scss/**/*.scss', 
        './variables/*.scss', 
        'assets/js/**/*.js'], browserSync.reload);
});