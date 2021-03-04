# 第3章 语言基础 #

## 3.1 语法

### 3.1.1 区分大小写
ECMAScript中的一切都区分大小写，包括变量、函数名、操作符等。

### 3.1.2 标识符
    标识符就是变量、函数、属性或者函数参数的名称。
- 标识符第一个字符必须是字母、下划线或者$。
- 剩下的字符可以是字母、下划线、$或者数字。
- ECMAScript标识符使用驼峰大小写形式，这种写法并非强制，但是它与ECMAScript内置函数和对象的命名一致，所以算是最佳实践。

### 3.1.3 注释
ECMASCript采用C语言风格的注释，分为单行和多行注释。
``` js
// 单行注释
/*
多行注释
*/
```

### 3.1.4 严格模式
ECMASCript5增加了严格模式，一些不规范写法在这种模式下会被处理。
``` js
// 对整个脚本启用严格模式，在脚本开头加
"use strict";
// 在指定函数内启用严格模式，在函数体开头加
function test() {
    "use strict";
}
```

### 3.1.5 语句
- ECMAScript中的语句以分号结尾，省略分号则由解析器确定语句在哪里结尾，加分号可以提高性能。
- 多条语句可以合并到一个C语言风格的代码块内，代码块由 { 标识开始，由 } 标识结束。
- if之类的控制语句要求在执行多条语句时必须有代码块，但最佳实践是始终在控制语句中使用代码块，可以让内容更清晰，减少出错。

## 3.2 关键字和保留字
关键字和保留字不能作为标识符或属性名。

## 3.3 变量
    ECMAScript中的变量是松散型的，可以用于保存任何类型的数据。
### 3.3.1 var关键字
``` js
    // 要定义变量，可以使用var操作符，后跟变量名：
        var message;
```
以上代码定义了一个名为message的变量，在不初始化的情况下，变量会保存一个特殊值undefined。另外，不推荐改变变量保存值的类型。
- var声明作用域
    - 使用var操作符定义的变量会成为包含它的函数的局部变量，该变量会在函数退出时被销毁。
    ``` js
    function test（）{
        var message = '123'; // 局部变量。
    }
    test();
    console.log(message); // 会报错。
    ```
    这里，message变量是在test函数内部使用var定义的，调用它会创建变量并赋值，调用之后变量随即被销毁，所以最后一行代码会出错。不过，在函数内部定义变量时省略var操作符，可以创建一个全局变量：
    ``` js
    function test(){
        message = 'hi'; // 全局变量
    }
    test();
    console.log(message); // "hi"
    ```
    ::: tip 注意
    虽然可以通过省略var操作符定义全局变量，但是不推荐这么做，首先是难以维护，其次在严格模式下，给未声明的变量赋值，会导致抛出ReferenceError（引用错误）。
    ::: tip ReferenceError和TypeError的区别
    ReferenceError是引用错误，是在作用域内查找变量失败导致。
    TypeError是找到了变量，但是对其进行了非法操作导致。
    :::
    
    - 如果需要定义多个变量，可在一条语句中用逗号分隔
    ```js
    var a=1,
    b,
    c="hello";
    ```
- var变量提升

使用var关键字声明的变量会自动提升至函数作用域顶部。
```js
function test(){
    console.log(a);
    var a = 10;
}
test(); // undefined
```
之所以不会报错，是因为ECMAScript运行时把它看成等价于如下代码：
``` js
function test(){
    var a;
    console.log(a);
    a= 10;
}
test(); // undefined
```
此外，反复多次使用var声明同一个变量也没问题（最后一个有效），由于变量声明会被提升，js引擎会自动将多余的声明在作用域顶部合并为一个声明。
``` js
funcition test(){
    var a = 1;
    var a = 2;
    var a = 3;
}
test(); // 3
```

### 3.3.2 let声明
::: tip let声明与var声明的区别
1、let声明的范围是块作用域，var声明的范围的函数作用域（块作用域是函数作用域的子集，所以适用于var的作用域限制也适用于let）。

2、let不允许同一个块作用域内出现冗余声明（嵌套使用相同的标识符不会出错，因为没有在同一个块内重复声明）。
``` js
// 重复声明
let a = 1;
let a = 2; // SyntaxError 语法错误
// 嵌套声明
let x = 'hello';
if(true){
    let x = 'world'; // 'world'
}
console.log(x); // 'hello'
```
3、let声明的变量不会在作用域中被提升。

4、let在全局作用域中声明的变量不会成为window对象的属性。

5、使用let声明迭代变量时，js引擎会在后台为每个迭代循环声明一个新的迭代变量。
:::

- 暂时性死区

        let声明的变量不会被提升到作用域的顶部。在let声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此阶段引用任何后面才声明的变量都会抛出ReferenceError。
``` js
// name 会被提升
console.log(name); // undefined
var name = "hello";
// age不会被提升
console.log(age); // ReferenceError , age is not defined.
let age = 18;
```
- 全局声明

    使用let在全局作用域中声明的变量不会成为window对象的属性（var声明的变量会）。
``` js
var name = "ls";
console.log(window.name); // 'ls'

let age = 12;
console.log(window.age); // undefined
```

- for 循环中的let 声明

    在let声明出现之前，用var声明的迭代变量会渗透到循环体外部：
    ```js
    for(var i=0;i<5;i++){};
    console.log(i); // 5
    ```
    改成使用let之后，这个问题就消失了，因为let声明的迭代变量的作用域仅限于for循环块内部：
    ``` js
    for(let i=0;i<5;i++){};
    console.log(i); // ReferenceError, i is not defined.
    ```
    在使用var时，最常见的问题就是对迭代变量的奇特声明和修改：
    ``` js
    for(var i=0;i<5;i++){
        setTimeout(()=>{console.log(i)}, 0);
    }
    // 你以为可能会输出0、1、2、3、4
    // 实际会输出5、5、5、5、5
    ```
    这是因为在退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时逻辑时，所有的i都是同一个变量，因为输出都是同一个最终值。

    而在使用let声明迭代变量时，js引擎会在后台为每一个迭代循环声明一个新的迭代变量，每个setTimeout引用的是不同的变量实例，输出的就是循环执行过程中每个迭代变量的值：
    ``` js
    for(let i=0;i<5;i++){
        setTimeout(()=>{console.log(i)}, 0);
    }
    // 输出0、1、2、3、4
    ```
    这种每次迭代声明一个独立变量的实例的行为适用于所有风格的for循环，包括for-in和for-of循环。

### 3.3.3 const声明

- const声明与let声明的区别
    - const声明变量时必须同时初始化变量。
    - const声明的变量不可修改。
    - 不能用const声明迭代变量（会自增）；
``` js
// 给常量赋值
const num = 1;
num = 2; // TypeError: assignment to constant variable.

// 声明迭代变量
for(const i=0;i<5;i++){}; // TypeError: assignment to constant avriable.
```
不过，如果想用const声明一个不会被修改的for循环变量，也可以，也就是说每次迭代只是创建一个新变量。这对for-in和for-of循环特别有意义：
``` js
let i = 0;
for(const j = 7; i<5; i++){
    console.log(j); // 7、7、7、7、7
}

for(const key in {a:1, b:2}){
    console.log(key); // a, b
}

for(const val in [1, 2, 3, 4, 5]){
    console.log(val); // 1, 2, 3, 4, 5
}
```

### 3.3.4 声明风格及最佳实践
- 不使用var
- const优先，let次之

## 3.4 数据类型
    ECMAScript有6种简单数据类型（也称为原始类型）：Undefined, Null, Boolean, String, Number, Symbol(符号)。还有一种复杂数据类型叫Object。Object是一种无序键值对的集合。
### 3.4.1 typeof操作符
    因为ECMAScript的类型系统是松散的，所以需要一种手段来确定变量的数据类型，所以就有了typeof操作符，对任意变量使用typeof操作符会返回下列字符串之一：
- "undefined" 表示值未定义；
- "boolean" 表示值为布尔值；
- "string" 表示值为字符串；
- "number" 表示值为数值；
- "object" 表示值对象或者null（而不是function）；
- "function" 表示值为函数；
- "symbol" 表示值为符号。

::: tip 注意
1、typeof null 返回的是"object"，这是因为特殊值null被认为是一个空对象的引用。

2、严格说，函数在ECMAScript中被认为是对象，它并不代表一种数据类型。但是函数也有自己特殊的属性，为此，有必要通过typeof操作符区分函数和其他对象。
:::

3.4.2 Undefined类型
- Undefined类型只有一个值，就是特殊值undefined。
- 增加这个特殊值就是为了明确空对象指针（null）和未初始化变量的区别。
- 对于未声明的变量和包含undefined值的变量，typeof都返回字符串"undefined"。
- 包含undefined值的变量跟未定义变量是有区别的：
``` js
let message; // 这个变量被声明了，只是值为undefined
console.log(message); // undefined

console.log(age); // ReferenceError: age is not defined. 
```