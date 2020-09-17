---
# 显示两个层级
sidebarDepth: 2  
---

# CSS <img src='/images/icons/hulk.png' width='50' style='margin-top:-15px'> 


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

  
