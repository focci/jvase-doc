const config = {
    // 项目名称(用于设置输出的js与css名称)
    prj_name: 'jvase-doc',

    // 访问端口
    port: 9527,

    // 源文件目录
    target_dir: '../src',

    // 所有文件输出根目录
    dest_dir: '../docs',

    // html
    htmls: {
        target_dir: '/htmls',
        dest_dir: '/'
    },

    // css
    styles: {
        target_dir: '/styles',
        dest_dir: '/styles',

    },

    // js
    scripts: {
        target_dir: '/scripts',
        dest_dir: '/scripts',
    },

    // 静态文件
    assets: {
        target_dir: '/assets',
        dest_dir: '/assets',
    }
};

module.exports = config;
