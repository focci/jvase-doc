var fs = require('fs');
var path = require('path');
var tempos = require('gulp-tempos');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var uglify = require('uglify-js');
var concat = require('gulp-concat');
var base64 = require('gulp-base64');
var rollup = require('rollup');
var json = require('rollup-plugin-json');
var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var replace = require('rollup-plugin-replace');
var commonjs = require('rollup-plugin-commonjs');
var browserSync = require('browser-sync');
var extend = require('extend');
var cfg = require('./config');

// html
gulp.task('htmls', function() {
    gulp.src([get_target_dir('htmls') + 'post/**/*.temp'])
        .pipe(tempos(null, {
            extname: '.html'
        }))
        .pipe(gulp.dest(get_dest_dir('htmls')));
});


// assets
gulp.task('assets', function() {
    gulp.src(get_target_dir('assets')+'**/*').pipe(
        gulp.dest(get_dest_dir('assets'))
    );
});


// styles
gulp.task('styles', function() {
    return sass(get_target_dir('styles') + 'index.scss')
        .pipe(concat(cfg.prj_name + '.css'))
		.pipe(postcss([
			autoprefixer({
				browsers: [
					'last 2 versions',
					'last 2 Chrome versions',
					'> 5%',
					'> 5% in US',
					'ie >= 9',
					'Firefox >= 20',
					'Firefox <= 20',
					'iOS 7'
				]
			})
		]))
		.pipe(base64())
		.pipe(nano())
        .pipe(gulp.dest(get_dest_dir('styles')));
});


// scripts
gulp.task('scripts', function() {
    var rollup_cfg = {
        entry: get_target_dir('scripts') + 'index.js',
        dest: get_dest_dir('scripts') + cfg.prj_name +'.js',
        format: 'umd',
        moduleName: cfg.prj_name,
        sourceMap: true,
        plugins: [
            json(),
            resolve({
                jsnext: true,
                main: true
            }),
            commonjs({
                ignoreGlobal: true
            }),
            babel({
                exclude: ['node_modules/**'],
                presets: ['es2015-rollup']
            }),
            replace({
                exclude: 'node_modules/**',
                ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            })
        ]
    };

    createDir(get_dest_dir('scripts'));
    rollup.rollup(rollup_cfg).then( (bundle) => {
        var code = bundle.generate(rollup_cfg).code;
        var res = process.env.NODE_ENV === 'production' ? uglify.minify(code, {
            output: {
                ascii_only: true
            },
            compress: {
                pure_funcs: ['makeMap']
            }
        }).code : code;

        fs.writeFileSync(rollup_cfg.dest, res, 'utf8');
    });
});

var gulpItems = ['htmls', 'assets', 'styles', 'scripts'];

// default task
gulp.task('default', function() {
    gulp.start(gulpItems);
});


// watch
gulp.task('watch', function() {
    browserSync.init({
        port: cfg.port,
        server: {
            baseDir: cfg.dest_dir,
            directory: true
        },
        reloadDebounce: 0
    });
    
    gulp.watch([
        get_target_dir('htmls') + 'post/**/*.temp',
        get_target_dir('assets') + '**/*',
        get_target_dir('styles') + '**/*.scss',
        get_target_dir('scripts') + '**/*.js'
    ], gulpItems, browserSync.reload);
});


// create dir
function createDir(paths) {
    if( typeof paths !== 'string' ) {
        throw 'createDir: The parameter "paths" must be a string.';
    }
    var pa = paths.split(/\\/g);
    var len = pa.length;
    var index = 0;
    while( ++index <= len ) {
        var curp = pa.slice(0, index).join('\\');
        if( !fs.existsSync(curp) ) {
            fs.mkdirSync(curp);
        }
    }
}

function get_dest_dir (name) {
    return cfg.dest_dir + cfg[name].dest_dir + '/';
}

function get_target_dir (name) {
    return cfg.target_dir + cfg[name].target_dir + '/';
}
