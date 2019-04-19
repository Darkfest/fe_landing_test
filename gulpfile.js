/* Used plugins */
const 	gulp = require("gulp"),
		sass = require("gulp-sass"),
		babel = require("gulp-babel"),
		browsersync = require("browser-sync").create();

/* Error handler-function*/
function errorHandler(error) {
	console.log(error.toString());
}

/* JavaScript handler-function:
** one-source-file >
** ES6-to-ES5 + log-errors >
** one-output-file > 
** reload browser only after compiling.
*/
function jsHandler() {
	return gulp.src("./app/js/mainscript.js")
	.pipe(
		babel({
			presets: ['@babel/env']
		}).on("error", errorHandler)
	)
	.pipe(gulp.dest("./dist/js"))
	.pipe(browsersync.stream());
}

/* CSS handler-function:
** one-source-file(scss) > 
** SASS-to-CSS + log-errors > 
** one-output-file >
** inject changes into browser only after compiling without reloading.
*/
function cssHandler() {
	return gulp.src("./app/scss/mainstyle.scss")
	.pipe(
		sass().on("error", errorHandler)
	)
	.pipe(gulp.dest("./dist/css"))
	.pipe(browsersync.stream());
}

/* Start Server function */
function serverInit() {
	browsersync.init({
		server: {
			baseDir: "./dist"
		}
	});
}

/* watch function:
** serverInit +
** Watch files + 
** index.html live-reload.
*/
function watch() {
	serverInit();
	gulp.watch("./app/js/*.js", jsHandler);
	gulp.watch("./app/scss/*.scss", cssHandler);
	gulp.watch("./dist/*.html").on("change", browsersync.reload);
}

/* Watching task */
gulp.task("watch", watch);

/* Default task is: "watch" */
gulp.task("default", watch);