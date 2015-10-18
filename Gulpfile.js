'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');




gulp.task('sass', function () {
    gulp.src(['./sass/**/*.scss'])
        .pipe(sass({
            outputStyle:'compressed'
        })).on("error", cssError)
        .pipe(sass.sync().on('error', cssError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


// brady's custom sass error message
//"************************************************"
//" ___    __ _   ___   ___      ___   _ __   _ __    ___    _ __ "
//"/ __|  / _` | / __| / __|    / _ \ | '__| | '__|  / _ \  | '__|"
//"\__ \ | (_| | \__ \ \__ \   |  __/ | |    | |    | (_) | | |   "
//"|___/  \__,_| |___/ |___/    \___| |_|    |_|     \___/  |_|   "
function cssError (err) {
    console.log(util.colors.red("***************************************************************"));
    console.log(util.colors.red(" ___    __ _   ___   ___      ___   _ __   _ __    ___    _ __"));
    console.log(util.colors.red("\/ __|  \/ _` | \/ __| \/ __|    \/ _ \\ | \'__| | \'__|  \/ _ \\  | \'__|"));
    console.log(util.colors.red("\\__ \\ | (_| | \\__ \\ \\__ \\   |  __\/ | |    | |    | (_) | | |"));
    console.log(util.colors.red("|___\/  \\__,_| |___\/ |___\/    \\___| |_|    |_|     \\___\/  |_|"));
    console.log(util.colors.red("***************************************************************"));
    util.log(util.colors.red('Error'), err.message);
    console.log(util.colors.red("***************************************************************"));
    this.emit('end');
};
