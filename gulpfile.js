const gulp = require('gulp')
const gulpsync = require('gulp-sync')(gulp)
const gulpif = require('gulp-if')
const argv = require('yargs').argv

const htmlmin = require('gulp-htmlmin')
const postcss = require('gulp-postcss')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')
const del = require('del')
const browserSync = require('browser-sync').create()

// HTML
gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulpif(argv.prod, htmlmin({
      'removeComments': true,
      'collapseWhitespace': true
    })))
    .pipe(gulp.dest('dist/'))
})

gulp.task('html:watch', function () {
  gulp.watch('src/*.html', ['html'])
})

// CSS
const AUTOPREFIXER_BROWSERS = [
  'last 2 Chrome versions',
  'last 2 Firefox versions',
  'last 2 Opera versions',
  'Safari >= 8',
  'ie >= 10',
  'Edge >= 12',
  'last 2 ChromeAndroid versions',
  'last 2 FirefoxAndroid versions',
  'last 2 Android versions',
  'last 2 OperaMobile versions',
  'iOS >= 8',
  'ie_mob >= 10'
]

gulp.task('css', function () {
  const processors = [
    autoprefixer({'browsers': AUTOPREFIXER_BROWSERS}),
    postcssFlexbugsFixes
  ]

  return gulp.src('src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulpif(argv.prod, cssnano()))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('css:watch', function () {
  gulp.watch('src/sass/*.{sass, scss}', ['css'])
})

// JS
gulp.task('js', function () {
  var b = browserify({
    entries: 'src/js/main.js'
  })

  return b.bundle()
    .on('error', function (err) {
      console.log(err + ' in JS task')
      this.emit('end')
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(argv.prod, uglify({'mangle': false})))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('js:watch', function () {
  gulp.watch('src/js/**/*.js', ['js'])
})

// IMG
gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('img:watch', function () {
  gulp.watch('src/img/**/*', ['img'])
})

// PICT
gulp.task('pict', function () {
  return gulp.src('src/pict/**/*')
    .pipe(gulp.dest('dist/pict'))
})

gulp.task('pict:watch', function () {
  gulp.watch('src/pict/**/*', ['pict'])
})

// FONTS
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('fonts:watch', function () {
  gulp.watch('src/fonts/**/*', ['fonts'])
})

// STATIC
gulp.task('static', function () {
  return gulp.src('src/static/**/*')
    .pipe(gulp.dest('dist/static'))
})

gulp.task('static:watch', function () {
  gulp.watch('src/static/**/*', ['static'])
})

// FAVICON
gulp.task('favicon', function () {
  return gulp.src('src/favicon/**/*')
    .pipe(gulp.dest('dist/favicon'))
})

gulp.task('favicon:watch', function () {
  gulp.watch('src/favicon/**/*', ['favicon'])
})

// BROWSER-SYNC
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    files: 'dist/**/*'
  })
})

// CLEAN
gulp.task('clean', function () {
  return del('dist/**')
})

// BUILD
gulp.task('build', [
  'html',
  'css',
  'js',
  'img',
  'pict',
  'fonts',
  'static',
  'favicon'
])

// WATCH
gulp.task('watch', [
  'html:watch',
  'css:watch',
  'js:watch',
  'img:watch',
  'pict:watch',
  'fonts:watch',
  'static:watch',
  'favicon:watch'
])

// DEFAULT
const defaultTasks = [
  'clean',
  ['build']
]
if (!argv.prod) {
  if (!argv.noBrowserSync) { defaultTasks[1].push('browser-sync') }
  if (!argv.noWatch) { defaultTasks[1].push('watch') }
}

gulp.task('default', gulpsync.sync(defaultTasks))

gulp.start('css')
