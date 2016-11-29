var gulp = require('gulp');
require('./gulp/deploy');
require('./gulp/build');



gulp.task('default', function() {
    console.log('hi myproject');
});