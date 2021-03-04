# 第1章 什么是JavaScript #

## JavaScript的组成
- JavaScript是一门用来与网页交互的脚本语言，包含以下三部分
    - ECMAScript：由ECMA-262定义并提供核心功能。
    - 文档对象模型（DOM）：提供与网页内容交互的方法和接口。
    - 浏览器对象模型（BOM）：提供与浏览器交互的方法和接口。

## 文档对象模型（DOM）
- 文档对象模型是一个应用编程接口（API），DOM将整个页面抽象成一组分层节点，页面的每个组成部分都是一种节点， 包含不同的数据，比如下面的HTML页面：

``` html
 <html>
     <head>
         <title> Sample Page </title>
     </head>
     <body>
        <p>Hello World!</p>
     </body>
 </html> 
```
这些代码通过DOM可以表示为一组分层节点,如图所示:

<img src='/images/domTree.png' style='margin-left:100px'> 

- DOM 通过创建表示文档的树，让开发者可以控制网页的内容和结构，通过DOM API,可以删除、添加、替换和修改节点。

## 浏览器对象模型（BOM）
- 浏览器对象模型用于支持访问和操作浏览器的窗口，操控浏览器显示页面之外的部分。
- 人们通常会把任何特定于浏览器的扩展都归在BOM的范畴内，比如如下扩展
    - 弹出新浏览器窗口的能力。
    - 移动、缩放和关闭浏览器窗口的能力。
    - navigator对象，提供关于浏览器的详细信息。
    - location对象，提供浏览器加载页面的详细信息。
    - screen对象，提供关于用户屏幕分辨率的详细信息。
    - performance对象，提供浏览器内存占用、导航行为和时间统计的详细信息。
    - 对cookie的支持。
    - 其他自定义对象，如XMLHttpRequest和IE的ActiveXObject。