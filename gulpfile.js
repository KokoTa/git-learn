var gulp = require('gulp');

// 各插件示例

// js
// var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');

// gulp.task('script', () => {
// 	gulp.src('js/*.js')
// 			.pipe(babel({presets: ['env']}))
// 			.pipe(uglify())
// 			.pipe(gulp.dest('dist/js'))
// })

// gulp.task('auto', () => {
// 	gulp.watch('js/*.js', ['script'])
// })

// gulp.task('default', ['script', 'auto'])





// css
// var cleanCss = require('gulp-clean-css');

// gulp.task('css', () => {
// 	gulp.src('css/*.css')
// 			.pipe(cleanCss())
// 			.pipe(gulp.dest('dist/css'))
// })

// gulp.task('auto', () => {
// 	gulp.watch('css/*.css', ['css'])
// })

// gulp.task('default', ['css', 'auto'])





// img
// var imagemin = require('gulp-imagemin');

// gulp.task('img', function () {
//     gulp.src('img/*.*')
//         .pipe(imagemin([
// 					imagemin.jpegtran({progressive: true})
// 				]))
//         .pipe(gulp.dest('dist/img'))
// });

// gulp.task('auto', function () {
//     gulp.watch('img/*.*)', ['img'])
// });

// gulp.task('default', ['img', 'auto'])





// less
// var less = require('gulp-less');

// gulp.task('less', () => {
// 	gulp.src('less/*.less')
// 			.pipe(less())
// 			.pipe(gulp.dest('dist/css'))
// });

// gulp.task('auto', () => {
// 	gulp.watch('less/*.less', ['less'])
// });

// gulp.task('default', ['less', 'auto']);





// scss
// var sass = require('gulp-sass');

// gulp.task('sass', () => {
// 	return gulp.src('sass/*.scss')
// 			.pipe(sass().on('error', sass.logError))
// 			.pipe(gulp.dest('dist/css'))
// })

// gulp.task('auto', () => {
// 	gulp.watch('sass/*.scss', ['sass'])
// })

// gulp.task('default', ['sass', 'auto'])





// gulp-util
// var gutil = require('gulp-util')

// gulp.task('default', function () {
//     gutil.log('message')
//     gutil.log(gutil.colors.red('error'))
//     gutil.log(gutil.colors.green('message:') + "some")
// })





// 项目演示

//js
var uglify = require('gulp-uglify')
var watchPath = require('gulp-watch-path')
var gutil = require('gulp-util')
var combiner = require('stream-combiner2')
var sourcemaps = require('gulp-sourcemaps')

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('errorLine: ' + colors.red(err.cause.line))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('watchjs', () => {
	gulp.watch('src/js/**/*.js', (event) => {
		var paths = watchPath(event, 'src/', 'dist/')
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
		gutil.log('Dist ' + paths.distPath)
		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			sourcemaps.init(),
			uglify(),
			sourcemaps.write('./'),
			gulp.dest(paths.distDir)
		])
		combined.on('error', handleError)
	})
})

// css
var minifycss = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('watchcss', function () {
    gulp.watch('src/css/**/*.css', function (event) {
      var paths = watchPath(event, 'src/', 'dist/')
			gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
	    gutil.log('Dist ' + paths.distPath)
      gulp.src(paths.srcPath)
          .pipe(sourcemaps.init())
          .pipe(autoprefixer({
          	browsers: 'last 2 versions'
          }))
          .pipe(minifycss())
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('default', ['watchjs','watchcss'])