---
# 显示两个层级
sidebarDepth: 3
---

# CSS <img src='/images/icons/hulk.png' width='50' style='margin-top:-15px'> 

## css选择器优先级

`important!` > ID选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

## 伪类和伪元素的区别

伪类和伪元素都是用来添加选择器的一些特殊效果。
### 伪类
伪类分为**状态伪类和结构性伪类**两种。
#### 状态伪类
状态伪类指的是在与用户交互的过程中，元素的**状态是动态变化**的。常见的状态伪类有：
- `:link` 应用于**未被访问**过的链接
- `:hover` 应用于鼠标**悬停**到的元素
- `:active` 应用于**被激活**的元素
- `:visited` 应用于**被访问过**的链接，与`:link`互斥
- `:focus` 应用于**获得焦点**的元素

#### 结构性伪类
结构性伪类是CSS3新增的选择器，利用dom树进行元素过滤，能减少`class`和`id`的定义，使文挡结构更简洁。常见的结构性伪类有：
- `p:first-child` 匹配第一个p元素
- `p:last-child`  匹配最后一个p元素
- `p:nth-child(n)` 匹配第几个或者多个p元素（p:nth-child(2n+0)匹配下标是2的倍数的所有p元素）
- `p:nth-last-child-(n)` 与上一个一致，只不过是从最后一个元素开始查找
- `p:nth-of-type(n)` 选择指定的元素 (nth-of-type(2)匹配属于其父元素的第二个 p 元素的每个 p)
- `p:nth-last-of-type(n)` 与上一个一致，只不过是从最后一个元素开始查找
- `p:first-of-type` 等同于`p:nth-of-type(1)`
- `p:last-of-type` 等同于`p:nth-last-of-type(1)`
- `p:only-child` 匹配属于其父元素的唯一子元素的每个p元素
- `p:empty` 匹配空的p元素 

### 伪元素
伪元素控制的内容和元素相同，但是它本身是**基于元素的抽象**，**并不存在于文档结构中**。常用的伪元素有：
- `::before` 在元素内容的最前面添加内容
- `::after`  在元素内容的最后添加内容
- `::first-letter`  选择元素文本的第一个字/字母
- `::first-line`    选择元素文本的第一行

## less和sass的用法
### less
#### 1. 变量
``` css
@baseColor: #fff;
.box {
    color: @baseColor;
}
```
#### 2. 参数 动态数据
``` js
testRaduis(@bl: 5px) {
    border-radius: @bl;
    -webkit-border-radius: @bl;
}
.borderR5 {
    .testRadius;
}
.borderR10 {
    .testRadius(10px);
    // 结果 border-radius: 10px;
}
```
#### 3. 嵌套
```css
div {
    span {

    }
}
```

#### 4. 函数运算符
``` js
@baseColor: #111;
span {
    color: (@baseColor * 3); // #333
}
```

### sass
在`sass`中，变量用`$`左前缀，声明或者其他关键字、语句用`@`做前缀。

#### 1. 变量 $开头
``` css
$baseColor: #333;
div {
    color: $baseColor;
}
```

#### 2. 嵌套
```css
div {
    span {

    }
}
```

#### 3. 计算
``` css
div {
    width: 10px + 20px;
}
```

#### 4. 继承
``` css
.class1 {
    color: res;
}
.class2 {
    @extend .class1;
}
```
#### 5. 混入
``` css
@mixin left {
    color: #fff;
}

@mixin right($bl: 5px) {
    margin-right: $bl;
}

.con{
    @include left;
    @include right(20px);
}
```

#### 6. 导入css文件
``` js
@import '../css/index.css'
```

#### 7. if...else
下例结合使用`@mixin`和`@if...@else`演示不同方向的三角形的创建：
``` js
@mixin sjx($fx: left, $size: 100px, $color: red) {
    @if($fx == top) {
        border-color: transparent transparent $color transparent;
        border-style: dashed dashed solid dashed;
    }
    @else if($fx == bottom) {
        border-color: $color transparent transparent transparent;
        border-style: solid dashed dashed dashed;
    }
    @else if($fx == left) {
        border-color: transparent $color transparent transparent;
        border-style: dashed solid dashed dashed;
    }
    #else {
        border-color: transparent transparent transparent $color;
        border-style: dashed dashed dashed solid;
    }
}
// 调用mixin 创建一个箭头朝下的三角形
.demo {
    @include sjx(bottom);
}
```

#### 8. 字符串拼接
``` js
$aside: left;
div{
    border-#{$aside}: 1px solid red;
    // 结果是border-left
}
```

### 9. 循环
``` js
// for 循环
@for $i from 1 to 10 {
    .div#{$i} {
        width: #{$i}px;
    }
}

// while 循环
$i: 10;
@while $i < 8 {
    .div#{$i} {
        width: 10px * $i;
    }
    $i: $i-2;
}
```

#### 10. 自定义函数
``` js
@function dubble($n){
    @return $n * 2;
}
#sidebar {
    width: double(5px);
}
```
## CSS3的新特性
- 结构性伪类选择器
    - `p:first-child {}` 匹配父元素中第一个p元素
    - `p:last-child {}` 匹配父元素中最后一个p元素
    - `p:nth-child(n) {}` 匹配父元素中的第n个子元素p
    - `p:empty {}` 匹配没有任何子元素（包括text节点）的元素p

- 弹性盒子
    - `display: flex`

    [flex布局教程-阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- 盒子模型（盒子大小）
    - box-sizing [标准：content-box；怪异：border-box]

- 边框
    - 图片：border-image: url("");
    - 圆角：border-radius: 5px;
    - 阴影：box-shadow;
- 背景
    - 图片：background-image
    - 尺寸：background-size: ~px / ~% / cover / contain
    - 定位背景图像：background-position：top left / x% y% / xpx ypx
    - 设置background-position 计算的参考位置：background-origin：
        - border-box：从border区域开始显示背景。
        - padding-box：从padding区域开始显示背景。
        - content-box：从content区域开  始显示背景。
        
        <img src='/images/background-origin.gif' style='margin-top:10px'>
    - 裁切背景：background-clip
        - no-clip：从border区域向外裁剪背景。
        - border-box：从border区域向外裁剪背景。
        - padding-box：从padding区域向外裁剪背景。
        - content-box：从content区域向外裁剪背景。
    - 渐变背景
        - 线性渐变：background-image: linear gradient( to bottom right, black, white );
        - 径向渐变：background-image：radial gradient( circle, red, yellow, green );circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse
    - 可以设置多重背景，多个属性值之间用逗号隔开
``` css
    background-image: url(https://static.runoob.com/images/mix/54cf2365000140e600740095.jpg),
                url(https://static.runoob.com/images/mix/54cf238a0001728d00740095.jpg),
                url(https://static.runoob.com/images/mix/54cf23b60001fd9700740096.jpg);
    background-position: left top, 100px 0, 200px 0;
    background-repeat: no-repeat, no-repeat, no-repeat;
```

- 文本效果
    - 阴影
        - box-shadow
        - text-shadow
        - 顺序：水平阴影->垂直阴影->模糊->阴影尺寸->颜色->外阴影转到内阴影
        - ::after & ::before伪元素也可以添加阴影
    - 显示溢出内容 text-overflow
        - clip 裁剪
        - ellipsis 显示省略号
    - 当前行超过指定容器的边界时是否断开换行 word-wrap
        - normal
        - break-word：内容将在边界内换行。如果需要，词内换行（word-break）也会发生。
    - 单词拆分换行规则 word-break
        - break-all
        - keep-all

- 动画
    - 属性
        - animation
        - @keyframes
    - 例：把 "myfirst" 动画捆绑到 div 元素，时长：5 秒
``` css
    div{
        animation: myfirst 5s;
    }
    @keyframes myfirst{
        from { background: red; }
        to { background: black }
    }
    @keyframes myfirst{
        0% { background: red; }
        25% { background: black; }
        100% { background: white; }
    }
```

- 媒体查询 @media
    - 媒体类型
        - all 所有
        - print 打印机
        - screen 电脑手机平板 
        - speech 屏幕阅读器
    - 参数
        - width:浏览器可视宽度。
        - height:浏览器可视高度。
        - device-width:设备屏幕的宽度。
        - device-height:设备屏幕的高度。
        - orientation:检测设备目前处于横向还是纵向状态。
        - aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)
        - device-aspect-ratio:检测设备的宽度和高度的比例。
    - CSS2已经用link标签的形式支持了media，只不过会增加http请求
``` css
    /* css2 */
    <link rel="stylesheet" type="text/css" media="screen and (max-width:960px)" href="style.css">
    /* css3 */
    @media screen and (min-width:960px) and (max-width:1200px){
        body{background:yellow;}
    }
```
## 盒子水平垂直居中的五大方案


1、position + margin

2、position + transform: translate(50%, 50%)

3、display: flex

4、js + position 动态获取box和其父元素的宽高

5、display: table-cell

::: details 查看代码

``` css {50-55}

html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
@width: 100px;
.box_common(){
    width: @width;
    height: @width;
    border: 1px solid #333;
}
.box,.box1{
    .box_common();
    // box-sizing: ;
}

/* --- 方法一 基于定位 --- */

/* css3 兼容性不好  不设置宽高也可以，会根据内容撑开 */
body{
    position: relative;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
/* 需要知道宽高 */
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
}

/* 不需要知道宽高，但是需要有，否则宽高会变为100% */
.box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

/* --- 方法二 css3盒子模型 --- */
// body{
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

/* --- 方法三 table-cell --- */
// display:table-cell 是适用于文本的，所以要把box转化为inline或者inline-block，弊端为父元素必须有固定宽高
.box3{
    background: tan;
    width: 200px;
    height: 200px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    >div{
        display: inline-block;
        .box_common();
    }
}
```
```js
// 方法 四： js + position
// id值box2可以直接拿来用
// clientWidth 计算公式 width+左右padding-水平滚动条宽度
// clientHeight 计算公式 height+上下padding-垂直滚动条宽度
// offsetWidth 计算公式 width+左右padding+border
// offsetHeight 计算公式 height+上下padding+border
box2.style.position = 'absolute';
box2.style.width = '100px';
box2.style.height = '100px';

let HTML = document.documentElement,
    winW = HTML.clientWidth,
    winH = HTML.clientHeight,
    box2W = box2.offsetWidth,
    box2H = box2.offsetHeight;

box2.style.border = '1px solid #333';
box2.style.left = (winW - box2W) / 2 + 'px';
box2.style.top = (winH - box2H) / 2 + 'px';
```
:::
::: tip 回答技巧
我在之前的项目中是用的__，后来__技术出来了，我就开始用~~（但是新技术都有兼容性问题，不过可以通过__来解决），后来在逛博客论坛的时候，看到了__方法也挺好玩，我就记了下来。
:::

## 盒子模型
1、标准盒子模型(box-sizing: content-box)

    标准盒子模型中width和height代表的是内容区域的宽高，并不代表盒子的大小，盒子大小要通过 width/height + padding + border 取得。

2、怪异盒子模型(box-sizing: border-box)

    width和height代表的是盒子的宽高，而不是内容的宽高
3、弹性盒子(display:flex)

4、多列布局(基本不用)
    
<!-- ![盒子模型](/images/box-model.png) -->
<img src='/images/box-model.png' width='50%' style='margin-left:100px'> 

::: tip 回答技巧
分析痛点+看源码

盒子模型分为标准盒子模型和怪异盒子模型（IE盒子模型），还有就是flex弹性盒子模型以及column多列盒子模型。在标准盒子模型中，宽高代表内容所占尺寸，并不包括padding和border，所以当我们设置了width和height之后再加border、padding盒子会变大，所以每改一次padding、border就要手动去改width、height，很麻烦。

后来css3给我们提供了box-sizing: border-box，也就是怪异盒子模型，能让我们控制使用IE盒子模型了。它的好处就是宽高指的是盒子的宽高，而不是内容大小，在我们调整padding和border，它会通过缩放内容来保证盒子的大小不变，所以现在在写项目时常用border-box，在我看elementUI组件源码时，它们也在使用border-box，所以我觉得这种写法还是不错的。

在做移动端响应式开发时，我发现布局也可以用css3为我们提供的flex弹性盒子模型实现布局，
:::

<!-- [实例链接](./html/box-model.html) -->

## 掌握几大经典布局方案

1、圣杯布局：浮动和负margin

2、双飞翼布局

3、左右固定，中间自适应(flex 布局； position)

::: details 查看代码
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>布局</title>
    <style>
        html,
        body {
            padding: 0;
            margin: 0;
        }

        /* 圣杯布局 */
        .container {
            /* padding: 0 200px; */
            height: 100%;
        }

        .container .left,
        .right {
            width: 200px;
            min-height: 200px;
            background: lightcoral;
        }

        .container .center {
            /* width: 100%; */
            /* 表达式性能不好 */
            width: calc(100% - 400px);
            height: 300px;
            background: lightcyan;
        }

        .container .left,
        .container .right,
        .container .center {
            float: left;
        }

        .container .left {
            /* margin-left: -200px; */
        }

        .container .right {
            /* margin-right: -200px; */
        }

        /* 双飞翼布局 */
        .c2 {
            box-sizing: border-box;
            width: 100%;
            height: 300px;
            padding: 0 200px;
        }

        .c2 .center {
            width: 100%;
            height: 100%;
            background: lightpink;
        }

        .left,
        .right {
            width: 200px;
            height: 200px;
            background: lightslategray;
        }

        .left,
        .right,
        .c2 {
            float: left;
        }
        .left{
            margin-left: -100%;
        }
        .right{
            margin-left: -200px;
        }

        /* flex 布局 */
        .c3{
            display: flex;
            justify-content: space-between;
        }
        .c3 .left,.right{
            flex: 0 0 200px;
            background: lightsteelblue;
            margin: 0;
        }
        .c3 .center{
            flex: 1;
            background: lightyellow;
        }

        /* position */
        .c4{
            position: relative;
        }
        .c4 .left,.right{
            width: 200px;
            height: 200px;
            background: lightyellow;
            position: absolute;
            margin: 0;
        }
        .c4 .center{
            margin: 0 200px;
            height: 300px;
            background: mediumaquamarine;
        }
        .c4 .right{
            top: 0;
            right: 0;
        }
    </style>
</head>

<body>
    <!-- 圣杯布局 -->
    <!-- <div class="container">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div> -->

    <!-- 双飞翼布局 -->
    <!-- <div class="c2">
        <div class="center"></div>
    </div>
    <div class="left"></div>
    <div class="right">right</div> -->

    <!-- flex 布局 -->
    <!-- <div class="c3">
        <div class="left">left</div>
        <div class="center"></div>
        <div class="right">right</div>
    </div> -->

    <!-- position -->
    <div class="c4">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class="right">right</div>
    </div>
</body>

</html>
```
:::

## 移动端响应式布局的方案
1、media (pc&h5用一套页面的情况，主流)

2、rem （，即百分比，适用于纯移动端页面，主流）

3、flex 

4、vw vh (把视口的宽高分为100份，1vh/vw为一份，即 1%)

## 性能比较
A. a { ... }

B. .con a { ... }

::: tip 解析
A 的性能会更好，因为CSS的浏览器渲染机制是从右向左查询，B会先找所有a，再找con下的所有a。
:::

  
