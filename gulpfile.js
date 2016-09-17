var gulp = require('gulp'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', ['build'], () => {
    gulp.watch('source/sass/**/*.scss', ['css']);
    gulp.watch('source/js/**/*.js', ['js']);
    gulp.watch('source/images/**/*', ['images']);
});

gulp.task('build',['css','js','fonts']);

gulp.task('css', () => {
    var processors = [
        autoprefixer({
            browsers: ['> 5%',
                'last 2 versions',
                'ie > 10']
        })
    ];
    gulp.src(['source/sass/**/*.scss', '!source/sass/**/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .on('error', console.log);
});


gulp.task('js', () => {
    gulp.src('source/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'))
        .on('error', console.log);
});

gulp.task('images', () => {
    gulp.src('source/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
        .on('error', console.log);
});

gulp.task('fonts', () => {
    gulp.src('source/fonts/**/*')
        .pipe(gulp.dest('app/fonts'))
        .on('error', console.log);
});
