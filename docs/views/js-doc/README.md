---
sidebarDepth: 2
---

# Javascript 部分 <img src='/images/icons/nickFury.png' width='50' style='margin-top:-15px'> 

## js中的7种数据类型
::: tip
nunsb so fun
:::
1、基本类型
``` js 
number, null, undefined, string, boolean, symbol(es6新增)
```
2、引用类型
``` js
 object
```

3、数据类型检测
- typeof 

    对于基本数据类型来说，除了null都可以检测出正确的类型（typeof null === 'object'）
    
    对于引用类型来说，可以正常检测
``` js
typeof new Function() === 'function';    // true
typeof Symbol() === 'symbol';   // true
typeof new Object() === 'object'  // true
补充：
typeof new Array() === 'object'   //true  不过数组并不属于七种数据类型之一
```
- instanceof 

    是通过原型链来检测数据类型的
- Object.prototype.toString.call()

    比较完美的方案
``` js
Object.prototype.toString(); 检测数据类型
// 可以通过 toString() 来获取每个对象的类型。为了每个对象都能通过 Object.prototype.toString() 来检测，需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来调用，传递要检查的对象作为第一个参数，称为 thisArg。

var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

4、数据类型的转换(==)

- 对象 == 字符串， 对象.toString() 转化为字符串。
- null == undefined,但是和其他值比较就不相等了。
- NaN != NaN。
- 剩下的都是转化为数字再做比较： '1' == true ，相当于 1 == 1；(当把一个对象转化为数字时，是先将它toString(),再number(对象.toString()))。
- 对于对象来说，属性名不能重复，且一般都为字符串（也可以为Boolean，null，undefined，symbol，number），数字0和字符串0相等，都为字符串0。数组是特殊的对象，它的属性名是索引，索引为数字。

::: details 查看代码
``` js
// 例一
let a = {},
    b = '0',
    c = 0;
a[b] = 'Hello';
a[c] = 'World';
d1.innerHTML = a[b]; // World
// 数字0 会被转化为 字符串0

// 例二
let a2 = {},
    b2 = Symbol(1),
    c2 = Symbol(1);
a2[b2] = 'hello2';
a2[c2] = 'world2';
d2.innerHTML = a2[b2];  // hello2
// Symbol 创建的是唯一值

//例三
let a3 = {},
    b3 = {
        name: 'ls'
    },
    c3 = {
        age: 25
    };
a3[b3] = 'Hello3';
a3[c3] = 'World3';
d3.innerHTML = a3[b3]; // Hello3
// 对象键名会被转化为字符串值 [object Object]
```
:::

## 堆、栈内存和队列

**JavaScript内存空间分为堆、栈、池、队列**。堆内存存储引用类型**值**。栈内存存储**变量**、基本类型**值**（因为原始值有固定大小）和引用类型的**指针**。池又称为常量池，用于存放常量。队列放在下面说。
### 1. 栈数据结构

栈数据结构具有**先进后出**（FILO）的特性，可以用乒乓球盒来理解它，最先放进去的球最后才能取出来。

<img src='/images/FILO.png'>

例如以下代码在栈内存中的体现：
``` js
let a = 1;
let b = a;
a = 2;
```
<img src='/images/stackExample.png'>

可以看到基本类型的变量名和值都存放在栈内存中，当把变量a赋值给变量b时，栈会开辟新内存来存储b，并且修改a不会对b造成影响。

### 2. 堆数据结构
堆数据结构是一种**无序的树状结构**。它满足`key-value`键值对的存储方式，我们能够通过`key`名查找到对应的`value`。比如在书架上，我们通过书名就可以找到对应的书籍。

<img src='/images/heap.png'>

在js中堆内存一般用于存储**引用类型的数据**，这是因为引用类型的数据具有拓展性。但是对于引用类型数据的**引用地址是固定**的，它是一个十六进制的内存地址（如a = AAAFFF000）。所以**引用还是存在于栈内存中**。

我们可以用内存图模拟如下代码：
```js
let a = [1, 2, 3];
let b = a;
a.push(4);
```

<img src='/images/heapExample.png'>

当我们创建数组`a`时，栈内存中只保存了**变量**`a`和指向堆内存中数组的**引用地址**。当我们把`a`复制给`b`时，其实只是**复制了一个指针**，两者指向堆内存中的同一个数组，所以无论谁修改，都会影响彼此。这也就是浅拷贝。关于深浅拷贝，可以点击<a href="#深浅克隆">深浅克隆</a>查看。

### 3. 队列

队列具有**先进先出**（FIFO）的特性，与栈内存不同的是，**栈内存只有一个口**，出栈入栈都在这个口进行。而**队列有一个出口一个入口**，可以用排队取餐来理解，先排队的先取到餐也就先出去。

<img src='/images/queue.png'>

## 深浅克隆
- 对象（数组）的深拷贝与浅拷贝
- 浅拷贝是只拷贝第一层(涉及到堆的引用)
::: tip 浅拷贝的方法
- for in 循环
- ES6展开运算符
::: details 查看代码
``` js
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 100
    },
    d: /^\d+$/,
    e: new Date(),
    f: function(){
        console.log('xx');
    }
}
// 浅拷贝
// ES6 展开运算符
{
    let obj2 = { ...obj };
}
// ES5
let obj2 = {};
for (let key in obj) {
    // 只遍历obj的私有属性
    if (!obj.hasOwnProperty(key))
        break;
    obj2[key] = obj[key];
}
console.log(obj, obj2, obj === obj2);  // false
```
:::
::: tip 深拷贝的方法
- json.stringify=>json.parse；(要注意函数、正则、new Date（）在stringify的过程中会有问题)
- 递归

<img src='/images/shallowClone.png' width='75%' style='margin-left:100px'>

::: details 查看代码
``` js
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 100
    },
    d: /^\d+$/,
    e: new Date(),
    f: function(){
        console.log('xx');
    }
}
// 深拷贝
// 将对象转化为json字符串，项目中可以这么用
let obj3 = JSON.stringify(obj);
obj3 = JSON.parse(obj3);
obj3.c.x = 1000;
console.log(obj, obj3);
// 封装递归函数
function deepClone(obj) {
    if (obj == null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Function) return new Function(obj);
    // 不直接创建空对象的目的：克隆的结果和之前保持相同的隐藏类，可以提高性能
    let newObj = new obj.constructor;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 递归
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}
let obj4 = deepClone(obj);
obj4.c.x = 2000;
console.log(obj4,obj);
```
:::

## 作用域 作用域链
- 函数的嵌套形成作用域的层级关系，当函数执行时，从当前作用域开始查找变量，没查到的会向上层作用域查找，直至全局，这就是作用域链。
- 在js中，作用域为function(){}内的区域，称为函数作用域。
- 全局函数无法查看局部函数的内部细节，但是局部函数可以查看其上层函数的内部细节，直到全局。
    
## 闭包
- 闭包的**原理**就是作用域链，比如函数a内部有个函数b，b可以访问到a里的变量，那么函数b就是闭包
- 闭包的**关键**在于外部函数调用完成后，它的**变量对象应该被销毁**，但是闭包的存在使我们依然可以访问外部函数的变量对象。所以`js`垃圾回收机制检测到外部函数的变量对象中还有变量被引用，这个变量对象不会被释放，所以我们要及时解除对闭包的引用，以顺利的进行垃圾回收
```js
function a(){
    let x = 0;
    return function b(){
        console.log(x);
    }
}
let closure = a();
closure();  // 0
closure = null; // 释放对闭包的引用

```
::: details 查看代码
``` js
// 闭包、执行上下文、堆、垃圾回收
let test = (function (i) {
    console.log(i);
    return function () {
        console.log(i * 2);  // number 4
        // alert(i * 2);    // string 4
    }
})(2);
test(5);

// 闭包
function A(a) {
    A = function (b) {
        console.log(`${a + b++}`);
    }
    console.log(`${a++}`);
}
A(1);  //1
A(2);  //4
A(3);  //5

// ++a 是先自身累加，再进行其他运算， a++ 是先进行其他运算，再自身累加，第二次调用（A（2））里使用的a是在上级执行环境中找到的，由于经过了第一次函数调用，a已经为2了。 GO（global object）中的a、b始终未用到。
```
:::

## 变量赋值的过程
- 先创建一个变量，第二步准备值（本例中值指的是立即执行的函数），第三步把值和变量关联起来

## 面向对象

- new 一个函数执行，也把它当做普通函数执行。
- new 创建实例，实例.方法执行 会找原型上的方法。
- 变量提升：在当前执行环境中，所有代码执行前，把所有带var和function关键字的提前声明（var）和定义（function）。
- 普通函数执行，return this 相当于 return window。
- 普通函数执行，先进行形参赋值，然后进行代码赋值。
- 当遇到连续多个new 或 连续多个typeof 时，从右向左计算。
::: tip 运算符优先级
<a href = 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence' target='b lank'>MDN</a>
:::
::: details 查看代码

``` js
// 例一
function Foo() {
    getName = function () {
        console.log(1);
    }
    return this;
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}
function getName() {
    console.log(5);
}
Foo.getName(); // 2
getName();  // 4   变量提升阶段，未进行赋值，代码执行到的时候，赋值，log4替换log5
Foo().getName();    // 1
getName();      // 1
new Foo.getName();   // 2
new Foo().getName();  // 3
new new Foo().getName();  // 3

// 例二
function A() {
    console.log(1);
}

function Func() {
    A = function () {
        console.log(2);
    }
    return this;
}

Func.A = A;

Func.prototype = {
    // 这里注意，箭头函数没有原型链，也就是说没有constructor这个构造函数，所以不能被new
    // A: () => {
    //     console.log(3);
    // }
    A: function () {
        console.log(3);
    }
}

A(); //1
Func.A(); //1
Func().A();  //2
new Func.A();  //1
new Func().A();  //3
new new Func().A();  // 报错 箭头函数没有new         

// 例三
var x = 2;
var y = {
    x: 3,
    // z 里的自执行函数在变量赋值阶段就会执行，且只执行这一次
    z: (function (x) {
        this.x *= x; // 这里的this指的是window,this.x指的是最外层var的x
        x += 2;  // 这里的x指的是自调函数的参数
        return function (n) {
            this.x *= n; // 这里的this在m(4)调用的时候指的是window,this.x指的是最外层var的x，在y.z(5)调用的时候this指的是 y, this.x 是 y.x，也就是3
            x += 3;
            console.log(x);
        }
    })(x)  //2
}
var m = y.z;
m(4); // 7
y.z(5);  // 10
console.log(x, y.z);  // 16
```
:::



<img src='/images/oo.png' width='65%' style='margin-left:100px'>

## EventLoop

- 浏览器是多线程的，同时做很多事（加载css、js，发送请求、渲染图片等），JS是单线程的（浏览器只给了其一个线程来渲染）。
- 同步代码：自上而下执行。
- 异步：为了处理异步，浏览器提供了event queue事件队列，分为微任务队列和宏任务队列。主线程代码执行完了再执行event queue里的代码，在事件队列中，先执行微任务，再执行宏任务，直到宏任务执行完，浏览器空闲下来。
    - 宏任务：延迟器、事件绑定、ajax
    - 微任务：async、await、promise
- new promise会把里面的函数立即执行， new的时候属于同步，当执行resolve/reject时为异步的微任务，执行then/catch中的方法。

::: details 查看代码
``` js
async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 6
}

async function async2() {
    console.log('async2'); // 3
}

console.log('script start'); // 1

setTimeout(function () {
    console.log('setTimeout'); // 8
}, 0)
// 延迟为0 不代表0毫秒，代表浏览器的最小反应时间，一般为5ms

async1();

// new promise会把里面的函数立即执行
new Promise(function (resolve) {
    console.log('promise1'); // 4
    resolve();
}).then(function () {
    console.log('promise2'); // 7
})

console.log('script end'); // 5

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```
:::


## 数据劫持
- ES5: Object.defineProperty()
- ES6: proxy

::: details 实现a==1 && a==2 && a==3

``` js
// 方法一  数据类型转换
// 1-1
let a = {
    i: 0,
    // 重写 toString()
    // ES6 的写法
    toString() {
        return ++this.i;
    },
    //所有数据类型转换的第一步都是先调它的valueOf取得原始值，所以重写对象的toString()方法时，也可以用重写valueOf()方法来代替
    valueOf() {
        return ++this.i;
    },
};

// 1-2
let d = [1, 2, 3];
d.toString = d.shift;

if (d == 1 && d == 2 && d == 3) {
    console.log('条件成立：数据类型转换');
}
// 等号两边有一边为number，则都转化为number，而对象转化为number之前要先执行object.toString()，a本身没有toString()方法，那么它会调用原型上的toString(),此时转化结果为[object Object],不成立，所以我们还要给a添加自己的toString()方法。

// 方法二  数据劫持
let i = 0;

Object.defineProperty(window, 'a', {
    get() {
        return ++i;
        // 这里为什么不使用++a，而使用++i ?
        // 因为 ++a的意思为 a=a+1; 而在执行 'a+1'时，我们需要取得a，这时候就会触发a的get方法，就会死循环下去，超出最大调用栈，即栈溢出
        //报错：Uncaught RangeError: Maximum call stack size exceeded
    }
})

if (a == 1 && a == 2 && a == 3) {
    console.log('条件成立：数据劫持ES5');
}

// 数据劫持 ES6

let obj = {};

obj = new Proxy(obj, {
    get(target, prop) {
        return ++target[prop];
    }
})
obj.num = 0;

if (obj.num == 1 && obj.num == 2 && obj.num == 3) {
    console.log('条件成立：数据劫持ES6');
}
```
::: 



## 从输入网址到页面显示的过程

- 输入网址；
- 发送到DNS（Domain Name System）服务器，并获取域名对应的web服务器对应的ip地址；
- 与web服务器建立TCP连接；
- 浏览器向web服务器发送http请求；
- web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）；
- 浏览器下载web服务器返回的数据及解析html源文件；
- 生成DOM树，解析css和js，渲染页面，直至显示完成。

##  JS 如何实现一个类
- 构造函数法（缺点是用到了this和prototype，编写复杂，可读性差）
```js
function P(name,age){
    this.name = name;
    this.age = age;
};
P.prototype.getName = function(){
    console.log(this.name + this.age)
}
var person = new P('ls', 24);
person.getName();
```
- ES6 class 关键字
``` js
class P{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getName(){
        console.log(this.age + this.name)
    }
}
let person = new P('ls', 25);
person.getName();
```

## JS 实现继承
- 寄生组合式继承（通过借用构造函数继承属性，通过原型链的混成形式继承方法，用寄生式继承继承超类型的原型，再将结果指定给子类型的原型）
```js
function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}
function inheritPrototype(subType,superType){
    let prototype = object(superType.prototype);    // 创建对象
    prototype.constructor = subType;    // 增强对象
    subTyoe.prototype = prototype;      // 指定对象
}
function SuperType(name){
    this.name = name;
    this.colors = ['red', 'white'];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
}
function Subtype(name,age){
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(Subtype,SuperType);
SubType.prototype.sayAge = function(){
    console.log(this.age);
}
```
- ES6 extends 关键字
```js
class ColorPoint extends Color {
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }
    getResult(){
        return this.color + super.getResult();
    }
}
```

## 原型链
::: tip 描述原型链
- 遍历一个实例时，先遍历它本身的属性，再遍历它原型上的属性，一直遍历到Object。
- 任何一个类（函数）都有原型对象，原型对象上至少有两个属性（constructor，proto），constructor指向类（函数）本身，proto指向父类原型对象。
类（函数）通过prototype属性可以访问原型对象。
- 类（函数）的实例可以直接访问原型对象（因为实例上有proto属性指向构造函数的原型对象）。
:::
```js
P.prototype === person.__proto__;  // true
```
<img src='/images/prototypeChain.png' width='70%'>

::: tip 作用域链与原型链的区别
- 当访问一个变量时，解释器会先在当前作用域查找标识符，如果没有找到就去父作用域找，作用域链顶端是全局对象window，如果window都没有这个变量则报错。
- 当在对象上访问某属性时，首先会查找当前对象，如果没有就顺着原型链往上找，原型链顶端是null，如果全程都没找到则返一个undefined，而不是报错。
:::

## this对象的理解
- 普通函数中
    - this总是指向函数的直接调用者，没有就是window。
    - 如果有new关键字，this指向new出来的实例对象。
    - 在事件中，this指向触发这个事件的对象。
- 箭头函数中
    - 箭头函数其实是没有this的，箭头函数中的this只取决于包裹箭头函数的第一个普通函数的this，另外对于箭头函数使用bind这类函数无效。
    - 函数体内的this对象，指的是定义时所在作用域的对象，而不是调用时所在的作用域的对象。
```js
// 普通函数
function foo(){
    console.log(this.a);
}
var a = 1;
foo(); // 1
const obj = {
    a: 2,
    foo: foo
}
obj.foo(); // 2
const c = new foo(); //undefined

// 箭头函数
function a() {
    return () => {
        return () => {
            console.log(this)
        }
    }
}
a()()();        //Window
```

- this绑定
    - 默认绑定
        - 函数调用时无任何调用前缀的情景。
    - 隐式绑定
        - 如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上。
        - 如果函数调用前存在多个对象，this指向距离调用自己最近的对象。
        - 在特定情况下会存在隐式绑定丢失的问题，最常见的就是作为参数传递以及变量赋值。
    - 显示绑定 apply、call、bind
        - 这三个方法都是为了改变普通函数函数体内部的this指向。
        - 其中apply和call会立即调用，而bind会返回一个函数，需要手动调用。
        - 三者第一个参数都是this要指向的对象，利用后续参数传参，call和bind传入参数列表，而apply传入数组。
    ```js
    function fruit(arg){
        arg = arg || '';
        console.log(this.name + arg);
    };
    fruit();  // ls

    let obj = {
        name : 's'
    }
    fruit.call(obj,'aaa');  // saaa
    fruit.apply(obj,['bbb']); // sbbb
    fruit.bind(obj,'ccc')();  // sccc
    ```
    - new 绑定
        - new 的过程（这个过程称为构造调用）
            - 创建一个空对象，将它的引用赋给 this，继承函数的原型。
            - 通过 this 将属性和方法添加至这个对象
            - 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）
    ``` js
    function Fn(){
    this.name = 'new 绑定~';
    };
    let echo = new Fn();
    echo.name//new 绑定~
    // 在上方代码中，构造调用创建了一个新对象echo，而在函数体内，this将指向新对象echo上（可以抽象理解为新对象就是this）。
    ```


- this绑定的优先级
    - 显式绑定 > 隐式绑定 > 默认绑定
    - new绑定 > 隐式绑定 > 默认绑定
    - 显示绑定与new绑定同时使用会报错（call/bind/apply is not a function）

## 跨域问题的解决方案和实现原理
- 默认端口号：http20，https443，ftp21。
- 跨域问题的产生：协议域名端口号有一个不一致都为跨域，浏览器禁止跨域访问。
- 阶段：
    - jsonp
        - script、link、image标签不受跨域限制。如jQuery的cnd引入。
        - 问题：只有get请求（不安全、有缓存、传递信息有长度限制）

    - 基于iframe的跨域解决方案
        -  window.name
        - document.domain
        - location.hash
        - post messgae
    - CORS跨域资源共享
        - 前端axios
        - 后端设置允许跨域    
    - 基于http proxy实现跨域请求
        - 开发环境：基于webpack提供的devserver
        - 生产环境：Nginx反向代理


<img src='/images/ajax.png' width='65%' style='margin-left:100px'>
<img src='/images/jsonp.png' width='65%' style='margin-left:100px'>
<img src='/images/jsonp1.png' width='65%' style='margin-left:100px'>

## get和post的区别
- `get`通过`url`传递参数，用户可以看到和修改参数，`post`不可以，相对`get`更安全
- `get`传递参数有长度限制，一般不可超过2000个字符，大小不能超过2kb，而`post`传递的数据量较大，默认不受限制
- `get`用于从服务端获取信息，`post`用于向服务端传递信息

## JSONP的实现方式

### JSONP原理

`JSONP`全称为`json with padding`，是解决跨域问题的一种方案。

由于同源策略的限制，浏览器只允许请求同域（协议名、域名和端口号都相同）内的资源。而`script`、`link`、`image`元素不受此限制，所以我们可以利用`script`标签的开放策略从其他域获取数据。

### JSONP实现思路
1. 参数需要重组为`get`传参的形式
2. 服务端返回的数据格式不是`json`而是`JavaScript`，所以`contentType`为`application/javascript`，内容格式为`callbackFunction(json)`
3. 因为`script`加载完成后，它的执行上下文是`window`对象，所以`callback`回调函数要挂载到`window`上
4. 我们可能同时发起多个`jsonp`请求，所以回调函数的命名要具有唯一性
5. 请求结束后要移除本次请求产生的`script`标签和挂载在`window`上的回调函数，防止内存泄漏

### 代码实现
``` js
// json参数转query
function getQuery(data) {
    let params = "";
    for (const i in data) {
        params += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`
    }
    // 如果参数是空对象就直接返回 ? 用于拼接callback
    params = params.length ? `?${params}` : '?';
    return params;
}

// 主体方法
function jsonp({ url, data, callback }) {
    const con = document.getElementsByTagName('head')[0];
    let callbackFnName = Symbol(); // 保持回调函数命名唯一性
    const src = `${url}${getQuery(data)}callback=${callbackFnName}`; // script标签的src
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    con.appendChild(script);

    return new Promise((resolve, reject) => {
        window[callbackFnName] = res => {
            console.log(res);
            con.removeChild(script);
            delete window[callbackFnName];
            resolve(res);
        }

        // 异常处理
        script.onerror = err => {
            con.removeChild(script);
            delete window[callbackFnName];
            console.log('some error appeared!', err);
            reject(err);
        }
    })

}

// 调用
jsonp({
    url: 'www.baidu.com',
    data: {
        name: 'ls',
        age: 22
    },
    callback(res) {
        console.log(res);  // res是服务端返回的数据
    }
})
```

## 前端的本地存储策略

### cookie
`cookie`是h5之前本地存储的主要方式，用法如下：
- 设置值：`document.cookie = "username=ls"`
- 读取值：`document.cookie`
`cookie`只能存储4kb以内的数据，并且在读取`cookie`时，我们获得的数据格式是`username=ls; age=12`这样的，无法通过`json.parse`拿到`json`数据，还需要单独处理，比较麻烦。除此之外，`cookie`中的数据还会在浏览器发起请求时被携带在请求头上，污染请求。

### sessionStorage
`sessionStorage`是一个全局对象，数据以键值对的方式存储，用法如下：
- 设置值：`sessionStorage.setItem(key, value)`
- 读取值：`sessionStorage.getItem(key)`
- 删除值：`sessionStorage.removeItem(key)`

`sessionStorage`中只能保存字符串类型的值，所以需要先将对象转换为`json`字符串再进行存储，另外存储的数据大小相较`cookie`大了很多。`sessionStorage`和`cookie`的生命周期相同，都处在一个会话周期内，浏览器关闭或标签页关闭，数据会被清空。此外，同一个网站在不同标签页打开，`sessionStorage`的数据不能共享。

### localStorage
`localStorage`的用法与`sessionStorage`相同，它有如下特点：
- 数据存储量大
- 不会被携带至请求头
- 所有标签页可以共享数据
- 除非手动删除，否则数据一直存在

## 性能调优
- 优先使用`const`、`let`，尽量避免使用`var`

- 减少使用闭包和全局变量，如果用了要及时置为`null`来解除引用，垃圾回收

- 在创建对象时，尽量在构造函数中声明好它们的公共属性与方法，这样它们的实例会共享相同的**隐藏类**，但是动态增删对象实例的属性，会使得它们不再拥有相同的隐藏类，所以在不需要某个属性时，可以置为`null`

- 尽量降低页面重绘和回流的次数

- 在较简单的页面，减少`css`的选择器嵌套层级，因为`CSS`的浏览器渲染机制是从右向左的，如下例：
``` css
/* A */
a {...}
/* B */
div a {...}
/* A 的性能会比 B 更好。 */
```
- DNS预解析。DNS解析需要时间，所以可以通过预解析来预先获得域名对应的ip，可以加快首屏加载速度
``` html
<link rel="dns-prefetch" href="www.baidu.com">
```
- vue 路由懒加载
``` js
component: resolve => require(["@/views/index.vue"], resolve);
```
- vue 打包开启`gzip`压缩，忽略`vender`文件，减小`app.js`的体积，加快首屏渲染

- 图片懒加载，把所有`img`元素通过`data-src`属性设置为一张`1px`的图片地址，这样只会请求一次。等到元素出现在可视区域时，才设置真正的图片路径。可以根据元素相对顶点的距离`<=`窗口高度+滚动的距离判断元素在视野内
``` js
const imgs = document.querySelectorAll('img')
// 获取可视区域高度
const viewHeight = window.innerHeight || window.documentElement.clientHeight
console.log(viewHeight,imgs)
function loadImg(){
    for(let i=0; i<imgs.length;i++){
    console.log(imgs[i].getBoundingClientRect().top)
    let dis = viewHeight - imgs[i].getBoundingClientRect().top
    if(dis>0){
        imgs[i].src = imgs[i].getAttribute('data-src')
    }
    }
}
loadImg()
window.addEventListener('scroll',loadImg)
```


- 有良好的编码习惯，做好组件封装和公共样式等，遵循模块化开发