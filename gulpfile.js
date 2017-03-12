const gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean');

gulp.task('clean', () => {
    return gulp.src('build', {read: false})
        .pipe(clean({force: true}));
});

//copy
gulp.task('copy:html', () => {
    return gulp.src('public/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copy', gulpsync.sync(['copy:html']));

//lint
const eslint = require('gulp-eslint');

gulp.task('lint:js', () => {
    return gulp.src(['public/js/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint:js']);

//compile
const babel = require('gulp-babel');

gulp.task('compile:js', () => {
    return gulp.src('public/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('compile', gulpsync.sync(['compile:js']));

//final
gulp.task('build', gulpsync.sync([
    // 'lint', 
    'clean', 'compile', 'copy']));