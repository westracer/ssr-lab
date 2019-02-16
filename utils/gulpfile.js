const BASE_PATH = "../";
process.chdir(BASE_PATH);

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const uglifycss = require('gulp-uglifycss');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('less', () => {
    return gulp.src('./src/css/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer({
            browsers: ['cover 93%'],
            cascade: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 0,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => {
    gulp.watch('./src/css/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'watch'));