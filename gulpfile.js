var css_our = new Array(
    'css/style.css'
);

var scss_our = new Array(
    'css/style.scss'
);
var css_libs = new Array(
    'libs/bootstrap/bootstrap-grid-3.3.1.min.css',
    'libs/fancybox/jquery.fancybox.css',
    'libs/owl.carousel/assets/owl.carousel.css',
    'libs/select/selectric.css',
    'libs/rangeslider/ion.rangeSlider.css',
    'libs/rangeslider/ion.rangeSlider.skinFlat.css',
    'libs/select/selectric.css'

);

var css_all = css_libs.concat(css_our);

//Название общего фала для всех стилей
var css_style_name = 'style.min.css';

//файлы js-скриптов
var js_our = new Array(
    'js/common.js'
);
var js_libs = new Array(
    'libs/jquery/jquery-1.11.1.min.js',
    'libs/owl.carousel/owl.carousel.js',
    'libs/fancybox/jquery.fancybox.pack.js',
    'libs/select/jquery.selectric.min.js',
    'js/jquery.maskedinput.min.js',
    'libs/rangeslider/ion.rangeSlider.js',
    'libs/select/jquery.selectric.min.js'
);
var js_all = js_libs.concat(js_our);

//Название общего файла для всех js-скриптов
var js_scripts_name = 'scripts.min.js';

//Загрузка библиотек
var gulp = require('gulp'),
    pug = require('pug'),
    del = require('del'),
    gutil = require('gulp-util');
ftp = require('gulp-ftp'),
    zip = require('gulp-zip'),
    fs = require("fs"),
    gulpSequence = require('gulp-sequence'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    minifyJS = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-html-prettify'),
    svgSprite = require("gulp-svg-sprites"),
    //chmod = require('gulp-chmod'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//Компиляция SCSS в CSS
gulp.task('sass_dev', function() {
    return gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) // Создаем префиксы
        .pipe(gulp.dest('css'))
});

// gulp.task('sprites', function () {
//     return gulp.src('img/svg/*.svg')
//         .pipe(svgSprite({
//             svg: {
//                 sprite:  'sprite-inline.svg'
//             }


//         }))
//         .pipe(gulp.dest("img"));
// });

gulp.task('sprites', function() {
    return gulp.src('img/svg/*.svg')
        .pipe(svgSprite({
            'mode': {
                'symbol': {
                    'dimentions': true,
                    'dest': 'img',
                    'sprite': '../img/sprite-inline.svg',
                    'bust': false,
                    example: true
                }
            }
        }))
        .pipe(gulp.dest('img'));
});



gulp.task('sass', function() {
    return gulp.src('product/temp/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) // Создаем префиксы
        .pipe(gulp.dest('product/temp'))
});

//Удаление всех файлов в папке /product
gulp.task('cleanfolder', function() {
    return del([
        'product/**/*'
    ]);
});
//Удаление всех файлов в папке /temp
gulp.task('del_temp', function() {
    return del([
        'product/temp'
    ]);
});

gulp.task('tabIdent', function() {
    gulp.src('*.html')
        .pipe(prettify({
            indent_char: '\t',
            indent_size: 1
        }))
        .pipe(gulp.dest('product/'))
});

gulp.task('concatAllSCSS', function() {
    return gulp.src(scss_our)
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('product/temp/'))
});



//Объединение и минификация всех стилей подключаемых библиотек и общих стилей
gulp.task('concatAllCSS', function() {
    return gulp.src(css_all)
        .pipe(concat(css_style_name))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('product/temp/'))
});

gulp.task('concatOurSS', function() {
    return gulp.src(css_our)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('product/temp/'))
});
gulp.task('concatLibCSS', function() {
    return gulp.src(css_libs)
        .pipe(concat('libs.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('product/temp/'))
});



//Объединение и сжатие всех js-скриптов
gulp.task('compressJSAll', function() {
    return gulp.src(js_all)
        .pipe(concat(js_scripts_name))
        .pipe(uglify())
        .pipe(gulp.dest('product/js/'));
});
gulp.task('compressJSLibs', function() {
    return gulp.src(js_libs)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('product/js/'));
});
gulp.task('compressJSOur', function() {
    return gulp.src(js_our)
        .pipe(concat('common.js'))
        .pipe(gulp.dest('product/js/'));
});


//Оптимизаця картинок
gulp.task('imagemin', function() {
    return gulp.src('img/**.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('product/img/'))
});

gulp.task('imageMenu', function() {
    return gulp.src('img/menu/**.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('product/img/menu/'))
});

//Перенос всех файлов папки include, если это нужно
gulp.task('includeFiles', function() {
    return gulp.src('includes/**.*')

        .pipe(gulp.dest('product/includes'));
});

//Перенос всех шрифтов
gulp.task('fonts', function() {
    return gulp.src('fonts/*/**')

        .pipe(gulp.dest('product/fonts'));
});
gulp.task('js', function() {
    return gulp.src('js/*.*')

        .pipe(gulp.dest('product/js'));
});
gulp.task('libs', function() {
    return gulp.src('libs/*/**')

        .pipe(gulp.dest('product/libs'));
});

//Перенос папки /temp в css
gulp.task('temp_to_css', function() {
    return gulp.src('product/temp/*.*')
        .pipe(gulp.dest('product/css'));
});

//Перенос .htaccess
gulp.task('htaccessFiles', function() {
    return gulp.src('.htaccess')

        .pipe(gulp.dest('product/'));
});

gulp.task('phpRoots', function() {
    return gulp.src('*.php')

        .pipe(gulp.dest('product/'));
});


//Перенос всех файлов scss в папку /product для дальнейшей обработки
gulp.task('scss_to_templ', function() {
    return gulp.src(scss_our)

        .pipe(gulp.dest('product/temp'));
});

gulp.task('fileinclude', function() {
    gulp.src('*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(''));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Замена скриптов на минифицированный из файла

gulp.task('scripts_to_minify', function() {
    var fileContent = fs.readFileSync("product/js/scripts.min.js", "utf8");

    gulp.src(['product/includes/footer.php', 'product/includes/footer-main.php'])

        .pipe(replace(new RegExp('<!-- scripts start -->(.|[\r|\n])*?<!-- scripts end -->', 'gm'), function() {
            return '<script>\r\n' + fileContent + '\r\n</script>'
        }))
        .pipe(gulp.dest('product/includes/'));
});

gulp.task('styles_to_minify', function() {
    var fileContent = fs.readFileSync("product/css/style.min.css", "utf8");

    gulp.src('product/includes/header.php')

        .pipe(replace(new RegExp('<!-- styles start -->(.|[\r|\n])*?<!-- styles end -->', 'gm'), function() {
            return '<style>\r\n' + fileContent + '\r\n</style>'
        }))
        .pipe(gulp.dest('product/includes/'));
});

// gulp.task('watch', ['browser-sync','sass_dev'], function() {
// 	gulp.watch('css/*.scss', ['sass_dev']); // Наблюдение за sass файлами в папке sass
//   gulp.watch('css/*.css', browserSync.reload),
// 	gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
// 	gulp.watch('js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
// });


gulp.task('zip', () =>
    gulp.src(['product/**/**.*', 'product/*'])
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('product/'))
);

gulp.task('ftp', function() {
    return gulp.src('product/archive.zip')
        .pipe(ftp({
            host: '77.222.61.5',
            user: 'kvsemen184',
            pass: 'Ap5K4ox0s',
            remotePath: '/public_html/'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
});

gulp.task('concatAllSCSS', function() {
    return gulp.src(scss_our)
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('product/temp/'))
});


gulp.task('watch', function() {

    // Serve files from the root of this project
    // browserSync.init({
    //     server: {
    //         baseDir: "./"
    //     }
    // });

    //gulp.watch("*.html").on("change", reload);
    //gulp.watch("css/*.css").on("change", reload);
    //gulp.watch("*.html").on("change", reload);

     gulp.watch('css/*.scss',  gulp.series('sass_dev')).on('change', function(file) {
        

    });

    

});

//gulp.task('default', gulpSequence('cleanfolder', 'concatAllSCSS', 'sass',  'concatOurSS', 'concatLibCSS', 'temp_to_css', 'del_temp', 'compressJSAll', 'compressJSLibs', 'compressJSOur', 'imagemin', 'imageMenu', 'includeFiles', 'fonts',  'htaccessFiles', 'rootFiles', 'styles_to_minify','scripts_to_minify', 'zip', 'ftp'));
gulp.task('default', gulp.series('cleanfolder', 'concatAllSCSS', 'sass', 'temp_to_css', 'del_temp', 'imagemin', 'fonts', 'js', 'libs', 'htaccessFiles', 'tabIdent'));
//Объединяем все наши scss в один и переносим в папку /temp для обработки
