var gulp = require("gulp"),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css"),
	concat = require("gulp-concat"),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify'),
	base = './wp-content/themes/heavy-metal-queen/lib/',
	pathSCSS = base + 'src/scss/',
	pathJS = base + 'src/js/',
	destCSS = base + 'build',
	destJS = base + 'build';

gulp.task("sass", function(){
  return gulp.src(pathSCSS + "style.scss", {style: "compressed"})
	  .pipe(sass())
	  .pipe(gulp.dest(destCSS))
	  .pipe(cleanCSS({keepSpecialComments: 0}))
		.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
	  .pipe(gulp.dest(destCSS));
});

gulp.task("js", function() {
  return gulp.src([
		pathJS + 'modules/*.js',
		pathJS + 'app.js'
  ])
  .pipe(concat('app.js', {newLine: ";"}))
	.pipe(minify({
		ignoreFiles: ['-min.js']
	}))
  .pipe(gulp.dest(destJS));
});

gulp.task('watch', function(){
	gulp.watch( [pathSCSS + "**/*.scss"], ["sass"]);
  gulp.watch( [pathJS + "**/*.js"], ["js"]);
});
