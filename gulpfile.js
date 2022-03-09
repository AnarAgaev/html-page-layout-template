// Package connection
const {src, dest, watch, series, parallel}  = require('gulp');
const del                                   = require('del');
const plumber                               = require('gulp-plumber');
const notify                                = require('gulp-notify');
const sass                                  = require('gulp-sass');
const autoprefixer                          = require('gulp-autoprefixer');
const cssbeautify                           = require('gulp-cssbeautify');
const pug                                   = require('gulp-pug');
const rename                                = require('gulp-rename');
const imagemin                              = require('gulp-imagemin');
const browserSync                           = require('browser-sync').create();
const concat                                = require('gulp-concat');
const sourcemaps                            = require('gulp-sourcemaps');
const log                                   = require('fancy-log');

// Tasks
const clean = () => {
 return del('./build');
}

const buildVendorStyles = () => {
    return src('src/vendors/scss/vendor.scss')
        .pipe(plumber({
            errorHandler: notify.onError( function(err){
                return {
                    title: 'Sass Styles Error',
                    message: err.message
                };
            })
        }))
        .pipe(sass())
        .pipe(rename({ dirname: '', }))
        .pipe(dest('build/css'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream());
}

const buildCustomStyles = () => {
    return src('src/**/main.scss', { sourcemaps: false })
        .pipe(plumber({
            errorHandler: notify.onError( function(err){
                return {
                    title: 'Sass Styles Error',
                    message: err.message
                };
            })
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(cssbeautify({
            indent: '    ',
            openbrace: 'end-of-line',
            autosemicolon: true
        }))
        .pipe(rename({
            dirname: '',
            basename: 'style',
            extname: '.css'
        }))
        .pipe(dest('build/css', { sourcemaps: '../maps' }))
        .pipe(plumber.stop())
        .pipe(browserSync.stream());
}

const buildHtml = () => {
    return src(['src/pages/**/index.pug'])
        .pipe(plumber({
            errorHandler: notify.onError( function(err){
                return {
                    title: 'Pug Error',
                    message: err.message
                };
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(rename(fileObj => {
            fileObj.basename = fileObj.dirname;
            fileObj.dirname = '';
        }))
        .pipe(dest('build'))
        .pipe(plumber.stop())
        .pipe(browserSync.stream());
}

const buildVendorJs = () => {
    return src([ 'src/vendors/js/**/*.js' ])
        .pipe(sourcemaps.init())
        .pipe(rename({ dirname: '', }))
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('build/js'))
        .pipe(browserSync.stream());
}

const buildCustomJs = () => {
    return src([
        'src/templates/default/js/main.js',
        // 'src/templates/default/js/sliders.js',
        // 'src/templates/default/js/masks.js',
        // 'src/templates/default/modals/modals.js',
        // 'src/templates/default/nav/nav.js',
        // 'src/templates/default/header/header.js',
        // 'src/templates/default/footer/footer.js',
        'src/pages/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(rename({ dirname: '', }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('build/js'))
        .pipe(browserSync.stream());
}

const buildFonts = () => {
    return src('src/fonts/**/*')
        .pipe(dest('build/fonts'))
        .pipe(browserSync.stream());
}

const buildImages = () => {
    return src('src/img/**/*')
        .pipe(dest('build/img'))
        .pipe(browserSync.stream());
}

const buildFavicon = () => {
    return src('src/favicon/*')
        .pipe(dest('build/favicon'))
        .pipe(browserSync.stream());
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
}

// Watchers
watch('src/vendors/scss/**/*.scss', buildVendorStyles);
watch('src/**/*.scss', buildCustomStyles);
watch('src/**/*.pug', buildHtml);
watch('src/vendors/js/**/*.js', buildVendorJs);
watch('src/**/*.js', buildCustomJs);
watch('src/img/**/*', buildImages);
watch('src/favicon/*', buildFavicon);
watch('src/fonts/**/*', buildFonts);

// Build project
exports.default = series(
    clean,
    parallel(
        buildVendorStyles,
        buildCustomStyles,
        buildHtml,
        buildVendorJs,
        buildCustomJs,
        buildImages,
        buildFavicon,
        buildFonts
    ),
    server
);