module.exports = {
    title: 'FEAdvance',
    description: 'Just Play Around',
    title: '前端进阶之路',
    head: [['link', { rel: 'icon', href: '/images/icons/groot.png' }]],
    // head: [['link', { rel: 'stylesheet', href: '/styles/common.less' }]],
    port: 9999,
    themeConfig: {
        logo: '/images/icons/ironMan.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Test', link: '/test/', target: '_self' },
            { text: 'Baidu', link: 'https://www.baidu.com', target: '_blank' },
            // {
            //     text: 'Languages',
            //     ariaLabel: 'Language Menu',
            //     items: [
            //         { text: 'Chinese', link: '/language/chinese/' },
            //         { text: 'Japanese', link: '/language/japanese/' }
            //     ]
            // }
        ],
        // navbar: false,
        sidebar: [
            // ['/', 'Index'],
            // '/test1/',
            // ['/test/', 'Explicit link text'],
            {
                title: 'CSS',   // 必要的
                path: '/views/css-doc/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                //   children: [
                //     ['/views/css-doc/test', '尝试']
                //   ]
            },
            {
                title: 'JavaScript',
                path: '/views/js-doc/',
                collapsable: false,
                sidebarDepth: 1,
            },
            {
                title: 'Vue',
                path: '/views/vue-doc/',
                collapsable: false,
                sidebarDepth: 1,
            },
            {
                title: 'Algorithm',
                path: '/views/algorithm-doc/',
                collapsable: false,
                sidebarDepth: 1,
            },
        ],
        //sidebar: 'auto',
        lastUpdated: 'Last Updated', // string | boolean
        smoothScroll: true,
        base: '/', // 如果你的网站会被部署到一个非根路径，你将需要在 .vuepress/config.js 中设置 base
    },
    markdown: {
        lineNumbers: true // 为每个代码块显示行号
    },
    // 浏览器兼容性：如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 true，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
    evergreen: true
}