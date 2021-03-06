# 第2章 HTML中的JavaScript #
**本章内容：**
- 使用<\script>元素
- 行内脚本与外部脚本的比较
- 文档模式对JavaScript的影响
- 确保JavaScript不可用时的用户体验

## 2.1 script元素

### 2.1.1 script元素的8个属性
- async：可选。表示脚本立即下载，但是不会阻塞文档渲染，即异步加载，只对外部脚本文件有效。异步脚本不应该在加载期间修改DOM。
- defer：可选。把脚本推迟到文档渲染完毕后再执行，只对外部脚本文件有效。
- charset：可选。指定代码字符集，很少用，因为大多数浏览器don't care。
- corssorigin：可选。配置相关请求的CORS（跨域资源共享）设置。默认不适用CORS。
- integrity：可选。用于确保内容分发网络（CDN）不会提供恶意内容。
- src：可选。表示包含要执行的代码的外部脚本文件。使用了src属性后，script标签中不应该再有行内代码，否则行内代码会被忽略。
- language：废弃。
- type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。通常值始终为"text/javascript"，如果值为"module",那么代码会被当成ES6模块，也只有这时代码中才能出现import和export关键字。

::: tip
包含在script标签内的代码会被从上到下解释，此时页面的其他内容不会被加载和显示。

在没有使用defer或者async属性时，浏览器会按照script标签在页面中出现的顺序依次解释它们。

在使用行内js代码时，注意代码块中不能出现字符串 "</ script>"，会被浏览器解析为结束的</ script>标签。可以用转义字符解决此问题，即<\ /script>。
:::

### 2.1.2 标签位置
- 应该放在<\/body>之前

### 2.1.3 动态加载脚本
- 创建一个script元素并将其添加到DOM。
- 明确的将其设置为同步加载。因为script元素在被添加到DOM且执行到这段代码前不会发送请求，所以默认情况下这个创建的script元素的异步加载的，相当于为其添加了async属性，但是并不是所有浏览器都支持async。
- 在文档头部显示的声明它们。以这种方式获取的资源对浏览器预加载器是不可见的，可能会影响性能。
``` js
// 头部声明
<head>
    <link rel='preload' href='test.js'></link>
</head>
// 动态创建
let script = document.createElement('script');
script.src = 'test.js';
script.async = false;
document.head.appendChild(script);
```

## 2.2 行内代码与外部文件
- 最佳实践是尽可能将js代码放到外部文件中。优势如下：
    - 可维护性。js代码分布在多个HTML文件中不好维护，而用一个目录保存所有的js文件易于维护。
    - 缓存。浏览器会根据特定的设置缓存所有外部链接的js文件。这能够提升性能。
    - 适应未来。无需考虑XHTML中的![CDATA[代码块]]和注释黑科技。


## 2.3 文档模式
- IE5.5发明了文档模式的概念，使用doctype切换文档模式，文档模式分为标准模式、混杂模式和准标准模式。其中标准和准标准非常接近，很少需要区分。
    - 标准模式让IE具有兼容标准的行为。
    - 混杂模式让IE支持一些非标准的特性。
    - 两者区别主要体现在css渲染方面，但对js也有一些关联影响。

## 2.4 noscript 元素

- noscript元素是针对早起浏览器不支持script元素而出现的页面优雅降级的处理方案。现在浏览器已经100%支持script元素，但是对于禁用js的浏览器来说，noscript元素扔有用处。
- noscript元素可以包含除script元素外任何可以出现在body元素中的元素，以下情况下，页面中会展示noscript元素中的内容：
    - 浏览器不支持脚本。
    - 浏览器对脚本的支持被关闭。
