/**
 * @fileOverview Application gulp tasks.
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const gulp = require('gulp');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');

gulp.task('pre-commit', ['lint']);
/* eslint-disable arrow-body-style */
gulp.task('lint', () => {
  // ESLint ignores files with 'node_modules' paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the 'eslint' property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});
/* eslint-enable arrow-body-style */
gulp.task('deploy', ['lint'], shell.task([
  'git push',
]));
