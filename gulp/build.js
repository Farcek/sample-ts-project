var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('build', shell.task("tsc -p tsconfig.json"));