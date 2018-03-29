const config = {
    // 访问端口
    port: 9527,

    // 源文件目录(相对于 build 文件夹)
    target_dir: '../src',

    // 所有文件输出根目录(相对于 build 文件夹)
    dest_dir: '../docs',

    // html
    htmls: {
        target_dir: '/html',

        // 输出目录
        dest_dir: '/',

        // 输出html是否压缩
        uglify: {
            enabled: true,
            options: {
                removeComments: true,
                collapseWhitespace: true,
                minfyJS: true,
                minfyCss: true
            }
        }
    },

    // css
    styles: {
        // 入口文件
        entry: 'index.scss',

        // 入口文件目录
        target_dir: '/css',

        // 输出目录
        dest_dir: '/static',

        // 小图片是否转换成base64格式
        base64: true,

        // 自动添加前缀
        autoprefixer: {
            enabled: true,
            options: {
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
			}
        },

        // 输出css是否压缩
        uglify: true
    },

    // js
    scripts: {
        // 入口文件
        entry: 'index.js',

        // 入口文件目录
        target_dir: '/js',

        // 输出目录
        dest_dir: '/static',

        babel: {
            enabled: true,
            options: {
                exclude: ['node_modules/**'],
                presets: ['es2015-rollup']
            }
        },

        // 打包方式
        pkg_format: 'umd',

        // 
        source_map: true,

        // 输出js是否压缩
        uglify: true
    },

    // 静态文件
    assets: {
        // 文件目录
        target_dir: '/static',

        // 输出目录
        dest_dir: '/static',
    }
};

module.exports = config;
