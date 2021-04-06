module.exports = {
  title: "FEAdvance",
  description: "Just Play Around",
  title: "前端进阶之路",
  base: "./feadvance/", // 如果你的网站会被部署到一个非根路径，你将需要在 .vuepress/config.js 中设置 base
  head: [["link", { rel: "icon", href: "/images/icons/groot.png" }]],
  // head: [['link', { rel: 'stylesheet', href: '/styles/common.less' }]],
  port: 9999,
  host: '0.0.0.0',
  themeConfig: {
    // displayAllHeaders: true,
    logo: "/images/icons/ironMan.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test/", target: "_self" },
      { text: "Baidu", link: "https://www.baidu.com", target: "_blank" },
    ],
    sidebar: [
      {
        title: "HTML", // 必要的
        path: "/views/html-doc/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 1, // 可选的, 默认值是 1
        collapsable: false,
      },
      {
        title: "CSS",
        path: "/views/css-doc/",
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: "JavaScript",
        path: "/views/js-doc/",
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: "Vue",
        path: "/views/vue-doc/",
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: "Algorithm",
        path: "/views/algorithm-doc/",
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: "ProfessionalJavaScript4th",
        path: "/views/professionalJs4th-doc/",
        collapsable: false,
        sidebarDepth: 1,
        children: [
            {
              title: "基本知识",
              path: "/views/professionalJs4th-doc/basic/",
              collapsable: false,
              sidebarDepth: 2,
              children: [
                  {
                    title: "第1章 什么是JavaScript",
                    path: "/views/professionalJs4th-doc/basic/chapter-1",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第2章 HTML中的JavaScript",
                    path: "/views/professionalJs4th-doc/basic/chapter-2",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第3章 语言基础",
                    path: "/views/professionalJs4th-doc/basic/chapter-3",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第4章 变量、作用域与内存",
                    path: "/views/professionalJs4th-doc/basic/chapter-4",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第5章 基本引用类型",
                    path: "/views/professionalJs4th-doc/basic/chapter-5",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第6章 集合引用类型",
                    path: "/views/professionalJs4th-doc/basic/chapter-6",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
              ],
            },
            {
              title: "BOM和DOM",
              path: "/views/professionalJs4th-doc/BOMAndDOM/",
              collapsable: false,
              sidebarDepth: 2,
              children: [
                  {
                    title: "第12章 BOM",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-12",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第13章 客户端检测",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-13",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第14章 DOM",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-14",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第15章 DOM扩展",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-15",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第16章 DOM2和DOM3",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-16",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第17章 事件",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-17",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第18章 动画与canvas图形",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-18",
                    collapsable: false,
                    sidebarDepth: 2,
                  },
                  {
                    title: "第19章 表单脚本",
                    path: "/views/professionalJs4th-doc/BOMAndDOM/chapter-19",
                    collapsable: false,
                    sidebarDepth: 2,
                  }
              ],
            },
            {
              title: "进阶内容",
              path: "/views/professionalJs4th-doc/advance/",
              collapsable: false,
              sidebarDepth: 2,
            },
            {
              title: "JavaScriptAPI",
              path: "/views/professionalJs4th-doc/API/",
              collapsable: false,
              sidebarDepth: 2,
            },
        ],
      },
    ],
    //sidebar: 'auto',
    lastUpdated: "Last Updated", // string | boolean
    smoothScroll: true
  },
  markdown: {
    lineNumbers: true, // 为每个代码块显示行号
  },
  // 浏览器兼容性：如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 true，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
  evergreen: true,
};
