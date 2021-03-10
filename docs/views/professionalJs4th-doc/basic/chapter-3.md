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

- const声明的限制只适用于它指向的变量的引用，也就是当const声明的变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制。

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

### 3.4.2 Undefined类型
- Undefined类型只有一个值，就是特殊值undefined,它是一个假值。
- 增加这个特殊值就是为了明确空对象指针（null）和未初始化变量的区别。
- 对于未声明的变量和包含undefined值的变量，typeof都返回字符串"undefined"。
- 包含undefined值的变量跟未定义变量是有区别的：
``` js
let message; // 这个变量被声明了，只是值为undefined
console.log(message); // undefined

console.log(age); // ReferenceError: age is not defined. 
```
### 3.4.3 Null类型
- Null类型同样只有一个值,即特殊值null,它是一个假值,null值表示一个空对象指针。
- 在定义将来要保存对象值的变量时，可以把它初始化为null，这样只要检查这个变量的值是不是null，就可以知道这个变量在后来是否被赋予了其他对象的引用。
``` js
if(car !== null) {
    // car是一个对象的引用
}
```
- undefined是由null派生来的，null 和 undefined表面相等：
```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```

### 3.4.4 Boolean类型
- Boolead有两个字面值：true和false。但其他所有ECMAScript类型的值都有相应布尔值的等价形式。
- 将其他类型的值转换为布尔值，可以调用Boolean()转型函数。

下表总结了不同类型值与布尔值之间的转换规则：

<img src='/images/Boolean.png'> 

### 3.4.5 Number类型

   **Number类型使用IEEE 754格式表示整数和浮点数（某些语言中也叫双精度值）。**

- 整数
    - 十进制整数
    ``` js
        // 直接写出来即可
        const num = 55;
    ```
    - 八进制整数（严格模式下无效）。八进制字面量，第一个数字必须是零（0），然后是相应的八进制数字（数值0~7）。如果字面量中包含的数字超出了应有的范围，就会忽略前缀零，后面的数字会被当做十进制数。
    ``` js
    const num1 = 07; // 无效的八进制，被当成7处理。
    const num2 = 070; // 7*8+0=56。
    const num3 = 078; // 无效的八进制，被当成78处理。
    const num4 = 027; // 2*8+7 = 23。
    const num5 = 007; // 0*8+7 = 7。
    ```
    - 十六进制整数。前缀是0x，然后是十六进制数字（0-9以及A-F）
    ```js
    // 计算方法：第一位（从右向左）乘以16的0次方 加上 第二位乘以16的1次方……
    // tip: 任何非零数的0次幂都等于 1
    const num1 = 0xA; // 10*16^0 = 10。
    const num2 = 0x1F; // 15*16^0 + 1*16^1 = 31;
    ```
- 浮点值
    - 要定义浮点值，数值中必须包含小数点，且小数点后至少有一个非零数字。
    - 因为存储浮点值的内存空间的存储整数值的2倍，所以ECMAScript总会设法把值转换为整数。（如小数点后没有数字或者数字本身就是整数时（1.0），就会被转换为整数）。
    :::tip 科学计数法
        ECMAScript中科学计数法的格式要求是一个数值（整数或者浮点数）后跟一个字母e（大写或小写），再跟一个要乘的10的多少次幂（例如const num = 31.25E6; // 等于31250000）。
        
        默认情况下，ECMAScript会将小数点后至少包含6个零的浮点数转换为科学计数法表示（例如0.0000003会被转换为3e-7）。
    :::

    - 浮点值的精确度最高达17位，但是远不如整数精确。因此永远不要测试某个特定的浮点值（例如0.2+0.1=0.30000000000000004，而不是0.3）。
    :::tip IEEE 754
        这是因为使用了IEEE 754数值格式，不仅ECMAScript，其他使用此格式的语言也有这个问题。
    :::

- 值的范围 

    **由于内存限制，ECMAScript能表示的数值是有范围的：**
    - 最大：`Number.MAX_VALUE`，具体值通常为5e-324。
    - 最小：`Number.MIN_VALUE`，具体值通常为1.797 693 134 862 315 7e+308。

    **如果计算得到的某个值超出了js能够表示的范围，就会被自动转换为Infinity（无穷）值：**
    - 正无穷大：`Infinity`。
    - 负无穷大：`-Infinity`。

    **想要确定一个值能否被js正确表示，使用`isFinite(arg)`函数，函数返回布尔值。**
    :::tip 获取正负Infinity
        Number.NEGATIVE_INFINITY  -- 获取-Infinity。
        Number.POSITIVE_INFINITY  -- 获取Infinity。
    :::

- NaN

    **NaN意思是”不是数值“（Not a Number），从来表示本来要返回数值的操作失败了。**
    - 在ECMAScript中，0、+0、-0互相相除会返回`NaN`：
    ```js
        console.log(0 / 0); // NaN
        console.log(-0 / +0) // NaN
    ```
    - 分子是非零值，分母是有符号零或无符号零，会返回无穷值：
    ``` js
        console.log(5/0); // Infinity
        console.log(-5/0); // -Infinity
        console.log(5/-0); // -Infinity
    ```
    - 任何涉及NaN的操作始终会返回NaN（例如10/NaN）。
    - NaN不等于包含NaN在内的任何值。
    - `isNaN(arg)`函数，函数会尝试将参数转换为数值，转换失败会返回`false`。
    ``` js
    console.log(isNaN(NaN)); // true 
    console.log(isNaN(10)); // false
    console.log(isNaN('10')); // false 转换为10
    console.log(isNaN('blue')); // true
    console.log(isNaN('false')); // fasle 转换为0
    console.log(isNaN('true')); // false 转换为1
    ```
- 数值转换

    **有三个函数可以将非数值转换为数值：Number()是转型函数，适用于任何数据类型。parseInt()和parseFloat()主要用于将字符串转为数值。**
    - `Number()`函数转换规则
        - 布尔值。`true`转换为1，`false`为0。
        - 数值。直接返回。
        - `null`。返回0。
        - `undefined`。返回`NaN`。
        - 字符串。应用以下规则：
            - 字符串中包含数值字符，包括数值字符前带加减号的情况，转换为十进制数值（`Number('01')->1; Number('-0.3')->-0.3;`）。
            - 字符串包含有效的浮点数格式，返回浮点数（`Number('01.1')->0.1;`）。
            - 字符串包含有效的十六进制格式如"0xf"，返回对应的十进制整数值。
            - 空字符串返回0。
            - 字符串包含上述情况外的其他字符，返回NaN。
        - 对象，先调用`valueOf()`方法返回原始值，并按照上述规则转换返回的值，如果转换结果为NaN，再调用toString()方法，再按照字符串的规则转换。
    - `parseInt()`函数

    在需要得到整数时优先考虑`parseInt()`函数，`parseInt()`函数从字符串的第一个非空格字符开始转换，如果第一个字符不是数值、加减号，`parseInt()`立即返回`NaN`，空字符串也是如此。如果第一个字符通过，则继续检测到字符串末尾或碰到非数值字符。`parseInt()`也能识别八进制和十六进制。
    ``` js
    console.log('1234blue'); // 1234
    console.log('22.5'); // 22 
    console.log(""); // NaN
    console.log('0xf'); // 15
    ```
    `parseInt()`函数接收第二个参数，指定进制数，如果提供了进制数，那么字符串前的`"0x"`可以省略。建议始终提供第二个参数。
    ``` js
    console.log(parseInt('AF', 16)); // 175
    console.log(parseInt('AF')); // NaN
    ```
    - `parseFloat()`函数
        - 与`parseInt()`函数类似，`parseFloat()`是检测到字符串末尾，或无效的浮点字符为止。
        - `parseFloat()`只解析十进制数值，不能指定进制数，它始终忽略字符串开头的0，因此16进制数始终返回0。
        - 如果字符串表示整数，那么`parseFloat()`函数返回整数：
    ``` js
        console.log(parseFloat('234bule')); // 234 
        console.log(parseFloat('0xa')); // 0 
        console.log(parseFloat('22.5.7')); // 22.5 
        console.log(parseFloat('0908.5')); // 908.5 
        console.log(parseFloat('3.125e7')); //  31250000
    ```




### 3.4.6 String类型

    String（字符串）数据类型表示零或多个16位Unicode字符序列。可以用双引号、单引号或者反引号标示。
#### 1.字符字面量
字符串数据类型包含一些字符字面量，用于表示非打印字符（不能显示或打印出来的字符，如回车符）或有其他用途的字符，如下表所示：

| 字面量 | 含义 |
| :----:|:----:|
|  \n   | 换行   |
|  \t    |制表     |
|  \b     |退格     |
|   \r    |  回车   |
| \f      | 换页    |
|  \ \     |  反斜杠（\）   |
|   \ '    |   单引号，例如'Hey, \ 'ls.\ ' '  |
|   \ "    |   双引号  |
|    \ `   |   反引号  |
|  \xnn     |  以十六进制编码表示的字符（n是十六进制0~F），例如\x41等于"A"   |
|  \unnnn     | 以十六进制编码nnnn表示的Unicode字符（n是十六进制0~F），例如\u03a3等于希腊字符 "Σ"|
::: tip 字符字面量的长度
因为字符字面量（转义序列）表示一个字符，所以只算一个字符，在计算字符串长度时按1计算。
:::
#### 2.字符串的特点
ECMAScript中的字符串是不可变的（immutable），一旦创建，值不可变。如果想修改一个变量中的字符串值，必须先销毁原始字符串，再将包含新值的字符串保存到该变量。
``` js
    let lang = "Jave";
    lang = lang + "Script";
    // lang从字符串"Java"被重新定义为"JavaScript"。整个过程会先分支一个足够容纳10个字符的空间，然后填充上"Java"和"Script"，最后销毁原始字符串"Java"和"Script"，因为这两个字符串都没用了。
```
#### 3.转换为字符串
- `toString()`方法
    - `toString()`方法可用于数值、布尔值、对象和字符串值。null和undefined没有`toString()`方法。
    - 在对数值调用`toString()`方法时可以接收一个进制数参数，默认为10。
- `String()`转型函数

    在不确定一个值是否是`null`或`undefined`时，可以用String()转型函数，其规则如下：
    - 如果值有toString()方法，则调用并返回。
    - 值是null返回"null"，值是undefined返回"undefined"。

#### 4.模板字面量
- ES6 新增了使用模板字面量定义字符串的能力，与单双引号不同的地方是模板字面量**保留换行符**，可以跨行定义字符串。
- 模板字面量**不是字符串**，是一种JavaScript表达式，只不过求值后得到的是字符串。
- 模板字面量会保留反引号内的空格，空格计算长度。
- 模板字面量最常用的特性是**字符串插值**。所有插入的值都会使用String()转型函数强制转换为字符串。
- 嵌套的模板字符串**无须转义**。
``` js
    const name = 'ls';
    // 以前的字符串插值
    const sentence = "My name is" + name + ".";
    // 模板字面量实现字符串插值
    const sentence2 = `My name is ${name}.`;
```

#### 5.模板字面量标签函数
模板字面量也支持定义标签函数（tag function），通过标签函数可以**自定义插值行为**。标签函数**接收**被插值记号（${}）分隔后的模板和对每个表达式求值的结果。**返回值**是对模板字面量求值的结果。例：
``` js
    function sampleTag(temp, ...arg) {
        console.log(temp); // ["My name is ", "."]
        for(const val of arg) {
            console.log(val); // 'ls'
        }
        return temp[0] + arg.map((item, index)=> item+temp[index+1]).join("");
    }
    const name = 'ls';
    const sentence = sampleTag`My name is ${name}.`;
    console.log(sentence); // 'My name is ls.'
```

#### 6.原始字符串
使用模板字符串也可以直接获取原始的模板字面量内容，而不是被转换后的字符。两种方法：
- 使用默认的`String.raw`标签函数
```js
    // Unicode示例
    // \u00A9是版权符号
    console.log(`\u00A9`);  // ©
    console.log(String.raw`\u00A9`); // \u00A9
```
- 通过标签函数的第一个参数（即字符串数组）的.raw属性取得每个字符串的原始内容：
``` js
function printRaw(temp){
    console.log(temp, temp.raw);  // ["©","↵"]， ["\u00A9", "\n"]
    for(const val of temp){
        console.log(val)//       // "©","↵"(换行符)
    }
    for(const val of temp.raw){
        console.log(val);    // "\u00A9", "\n"
    }
}
printRaw`\u00A9${'and'}\n`;
```

### 3.4.7 Symbol 类型
符号是**原始值**，符号实例是**唯一且不可变**的，它的**作用是**通过创建唯一记号，进而用做非字符串形式的对象属性，来确保对象属性使用唯一标识符，防止出现属性冲突。

#### 1. 符号的基本用法
- 符号需要使用`Symbol()`函数初始化，`typeof`操作符对其返回`"symbol"`。
- 调用`Symbol()`函数时，可以传入一个字符串参数作为符号的描述，这个参数可用来调试代码。
- 符号没有字面量语法。
- `Symbol()`函数不能与`new`关键字一起作为构造函数使用，这是为了避免创建符号包装对象。如确实想用符号包装对象，可以借用`Object()`函数：
``` js
const mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
// 借用Object()函数
const mySymbol = Symbol();
const myWrappedSymbol = Object(mySumbol);
console.log(typeof myWrappedSymbol); // 'object'
```
::: tip 字面量语法
字面量就是指这个量本身，也即描述自己的量，一眼就能看到值的量。比如字面量3，字面量"ABC"。

字面量对应的是变量，比如string x，我们不能确定它的值。
:::
::: tip JavaScript 包装对象
**定义**

对象是JavaScript语言最主要的数据类型，三种原始类型的值--数值、字符串、布尔值在一定条件下，也能转换为对象，也就是原始类型值的"包装对象"(`wrapper`)。

所谓包装对象，指的是数值、字符串、布尔值分别对应的`Number`、`String`、`Boolean`三个原生对象，这三个对象可以把原始值"包装"成对象。


``` js
const v1 = new Number(123);
const v2 = new String('abc');
const v3 = new Boolean(true);

typeof v1; // 'object'
typeof v2; // 'object'
typeof v3; // 'object'
```

包装对象的设计目的有两个：
- 使得“对象”这种类型可以覆盖JavaScript所有的值，整门语言有一个通用的数据模型。
- 使得原始类型的值也有办法调用自己的方法。

总结一下，`Number`、`String`、`Boolean`三个原生对象作为构造函数使用时可以将原始类型值转换为对象；作为普通函数时，可以将任意类型值转换为原始类型。

**实例方法**

三种包装对象各自提供了许多实例方法。这里介绍两种它们共有的、从`Object`对象继承的方法：`valueOf()`和`toString()`。

valueOf()

`valueOf()`方法返回包装对象实例对应的原始类型的值。
```js
new String('xxx').valueOf();  // 'xxx'
new Number(12345).valueOf();  // 12345
new Boolean(false).valueOf(); // false
```
`toString()`方法返回包装对象实例对应的原始类型的值的字符串形式。
```js
new String('xxx').toString();  // 'xxx'
new Number(12345).toString();  // '12345'
new Boolean(false).toString(); // 'false'
```

**原始类型与实例对象的自动转换**

原始类型的值有时会当做包装对象调用，即调用包装对象的属性和方法。这时，JavaScript引擎会自动将原始类型值砖混为包装对象实例，并在使用后立刻销毁该实例。比如字符串可以调用length属性返回其长度：
```js
const str = 'abc'
str.length; // 3
// 等同于
const strObj = new String(str);
/* 
String {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3.
    [[PrimitiveValue]]: "acb"   // 原始值
}
*/
strObj.length; // 3
```
上面代码中，`abc`是一个字符串，本身不是对象，不能调用`length`属性。JavaScript引擎自动把它转成包装对象，在这个对象上调用`length`属性。调用结束后，销毁此临时对象,下次再调用字符串的属性时，实际上是调用一个新生成的对象，而不是上次调用时生成的对象。这就是原始类型与实例对象的自动转换。 

自动转换生成的包装对象是只读的，无法修改，也就无法为其添加新属性，要为字符串添加属性，只有在它的原型对象`String.prototype`上定义：
``` js
// 定义一个double方法，使得字符串和数字翻倍
// 注意操作原型不能使用箭头函数，因为箭头函数没有自己的this，在箭头函数中调用this，this指向箭头函数定义位置中的this
String.prototype.double = function(){
    return this.valueOf() + this.valueOf();  // 使用原始值
}

'abc'.double(); // 'abcabc'

Number.prototype.double = function() {
    return this.valueOf() + this.valueOf();  // 使用原始值
}

(123).double(); // 246。注意这里数值直接调用方法时要加小括号，否则点运算符(.)会被解释为小数点。

```
:::

#### 2. 使用全局符号注册表
如果运行时的不同部分需要**共享和重用**符号实例，可以用一个**字符串作为键**，在全局符号注册表中创建并重用符号，该键会被用作**符号描述**。
- 需要使用`Symbol.for()`方法。
- 使用某个字符串调用时，会检查全局运行时注册表，如果不存在对应符号，就会生成一个新符号实例并添加到注册表中，如果存在与该字符串对应的符号，就返回该符号实例。
``` js
const v1 = Symbol.for('abc'); // 创建新符号
const v2 = Symbol.for('abc'); // 重用已有符号
```
- 即便采用相同的符号描述，在全局注册表中定义的符号与使用`Symbol()`定义的符号也不等同：
``` js
Symbol('aa') === Symbol.for('aa');    // false
```
- 可以使用`Symbol.keyFor()`来查询全局注册表，该方法接收符号，返回全局符号对应的字符串键（符号描述）：
``` js
// 创建全局符号
const v1 = Symbol.for('aa');
console.log(Symmbol.keyFor(v1)); // 'aa';

// 创建普通符号，使用Symbol.keyFor()查询普通符号会返回undefined
const v2 = Symbol('bb');
console.log(Symbol.keyFor(v2));  // undefined

// 如果传给Symbol.keyFor()的不是符号，会报错
console.log(Symbol.keyFor(123));  // TypeError: 123 is not a symbol

```

#### 3. 使用符号作为属性
- 可以使用字符串或者数值作为属性的地方都可以用符号，包括对象字面量属性和`Object.defineProperty()`/`Object.defineProperties()`定义的属性。对象字面量只能在计算属性语法（ES6）中使用符号作为属性：
```js
const s1 = Symbol('aa'),
s2 = Symbol('bb'),
s3 = Symbol('cc'),
s4 = Symbol('dd');

const obj = {
    [s1]: 123,
    x:123456
}
// 或者 obj[s1] = 123
console.log(obj); // { Symbol(aa): 123 }

Object.defineProperty( obj , s2, { value: '2222' } );
console.log(obj); // { Symbol(aa): 123, Symbol(bb): '2222' }

Object.defineProperties( obj, {
    [s3]: {value: '333'},
    [s4]: {value: '444'}
})
console.log(obj); // { Symbol(aa): 123, Symbol(bb): '2222', Symbol(cc): '333', Symbol('dd': '4444') }

```
- `Object.getOwnPropertyNames()` 返回对象实例的**常规属性数组**。
- `Object.getOwnPropertySymbols()` 返回对象实例的**符号属性数组**。
- `Reflect.ownKeys()` 返回对象实例的**常规属性数组和符号属性数组**。
- `Object.getOwnPropertyDescriptors()` 返回同时包含**常规属性和符号属性的对象**。
```js
const obj = {
    name: 'ls',
    age: 20,
    [Symbol('say')]: 'mine'
}
console.log(Object.getOwnPropertyNames(obj));  //  ["name", "age"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(say)]
console.log(Reflect.ownKeys(obj)); // ['name', 'age', Symbol(say)]
console.log(Object.getOwnPropertyDescriptors(obj));
/*
{
    name: {value: 'ls', writtable: true, enumerable: true, configurable: true},
    age: {...},
    Symbol(say): {...}
}
*/
```

- 因为符号属性是对内存中符号的一个引用，所以直接创建并用作属性的符号不会消失。但是如果没有**显式**的保存对这些属性的引用，就必须遍历对象的所有符号属性才能找到相应的属性键：
``` js
const o = {
    [Symbol('name')]: 'ls',
    [Symbol('age')]: 18
}

const barSymbol = Object.getOwnPropertySymbols(o).find((val)=>String(val).match(/nam/));
console.log(barSymbol); // Symbol(name)
```
4. 常用内置符号
- 内置符号用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。
- 内置符号最重要的用途是重新定义它们，来改变原生结构的行为。如`for-of`循环会在相关对象上使用`Symbol.iterator`属性，我们可以通过在自定义对象上重新定义`Symbol.iterator`的值，来改变`for-of`在迭代该对象时的行为。
- 内置符号以`Symbol`工厂函数**字符串属性**的形式存在，指向一个符号的实例。
- 所有**内置符号属性**都是不可写、不可枚举、不可配置的。

5. Symbol.asyncIterator

6. Symbol.hasInstance

7. Symbol.isConcatSpreadable

8. Symbol.inerator

9. Symbol.match

10. Symbol.replace

11. Symbol.search

12. Symbol.species

13. Symbol.split

14. Symbol.toPrimitive

15. Symbol.toStringTag

16. Symbol.upscopables

### 3.4.8 Object 类型

ECMAScript中的对象其实就是一组数据和功能的集合，对象通过`new`操作符后跟对象类型的名称创建。
``` js
    const o = new Object();
```
ECMAScript中的Object也是派生其他对象的基类，Object类型的书友属性和方法在派生对象上同样存在。

每个Object实例都有如下属性和方法：
- constructor：用于创建当前对象的函数。在前面例子中，这个属性的值是Object()函数。

- hasOwnProperty(propertyName)：判断当前对象实例（不是原型）上是否存在给定的属性，要检查的属性名必须是字符串。

- propertyIsEnumerable(propertyName)：判断给定的属性是否可用for-of语句枚举，属性名必须是字符串。

- isPropertyOf(对象实例)：判断当前对象是否是另一个对象的原型。

- toLocalaString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

- toString()：返回对象的字符串表示。

- valueOf()：返回对象对应的字符串、数值、布尔值表示。

``` js
    let o = new Object();
    const sym = Symbol('test');
    o = {
      10: '数值',
      name: '字符串值',
      [sym]: '符号1',
      [Symbol('sym2')]: '符号2'
    }
    // isPrototypeOf
    console.log(Object.prototype.isPrototypeOf(o)); // true

    // hasOwnProperty
    for(const key in o){
      if(o.hasOwnProperty(key)){
        console.log(key);  // 10   name, 这里检测不出来符号键，但是下面代码中，单独检测可以检测到
      }
      console.log(o.propertyIsEnumerable(key)); // 属性名必须是字符串
      console.log(o[key]);  // 数值。 字符串值
    }
    console.log(o.hasOwnProperty(sym));  // true ， 单独检测可以
    console.log(o.hasOwnProperty(Symbol('sym2')));  // false, 相同描述的符号也是不相等的

    console.log(o.toString(), o.toLocaleString());  // [object Object] [object Object]

    console.log(o.valueOf());
    /*
        {
            10: '数值',
            name: '字符串',
            Symbol(test): '符号1',
            Symbol(sym2): '符号2',
            __proto__: {
                constructor: f Object(),
                hasOwnProperty: f hasOwnProperty(),
                isPropertyOf: f isPropertyOf(),
                propertyEnumerable: f propertyEnumerable(),
                toLocalaString: f toLocalaString(),
                toString: f toString(),
                valueOf: f valueOf(),
                …
            }
        }
    */
```

## 3.5 操作符
**操作符**用于**操作数据值**，包括数学操作符（如加、减）、位操作符、关系操作符和相等操作符等。ECMAScript中的操作符**可以用于各种值**，包括字符串、数值、布尔值甚至对象。在**应用于对象**时，操作符通常会调用`valueOf()`和/或`toString()`方法来取得可以计算的值。

### 3.5.1 一元操作符
只操作一个值的操作符叫做**一元操作符**(unary operator)。
#### 1. 递增/递减操作符
递增和递减操作符照搬自C语言。但有两个版本：前缀版和后缀版。区别是前缀版会先进行自增/自减操作，再进行语句求值。后缀版先进行语句求值，再自增/自减。当递增/递减是唯一的操作时，这种差异没有影响，但是和其他操作混合时，差异明显：
```js
// 唯一操作
// 前置递增
    let num1 = 10;
    ++num1; // 相当于num1 = num1 + 1;
    console.log(num1); 11
// 后置自增
    let num1 = 10;
    num1++;
    console.log(num1); 11

// 和其他操作混合
// 前置
    let num1 = 10;
    let num2 = 20;
    let num = ++num1 + 20;
    console.log(num); // 31
// 后置
    let num1 = 10;
    let num2 = 20;
    let num = num1++ + 20;
    console.log(num); // 30

```
递增和递减操作符遵循如下规则：
- 对于字符串，如果是有效数值形式，则转换为数值后再应用改变；如果不是，则将变量的值设置为`NaN`。变量类型从字符串变为数值。
- 对于布尔值，`true`则转换为1、`false`则转换为0后再应用改变。变量类型由布尔转换为数值。
- 对于浮点值，加1或者减1。
- 对于对象，则调用`valueOf()`取得可以操作的值，对得到的值应用上述规则。如果是`NaN`，则调用`toString()`并再次应用其他规则。变量类型从对象变为数值。
例：
``` js
    const v1 = '2';
    const v2 = 'aa';
    const v3 = 1.222;
    const v4 = false;
    const v5 = {
        valueOf() {
            return -1;
        }
    }
    console.log(++v1); // 3
    console.log(++v2); // NaN
    console.log(++v3); // 2.222
    console.log(++v4); // 1
    console.log(++v5); // 0
```
#### 2. 一元加和减
**一元加和减操作符**主要用于基本的算数（一元加由一个加号表示，一元减减号表示，放在变量前面），也可以用于数据类型转换。规则如下：
- 应用于数值时，一元加对数值无影响；一元减把数值变为相反数。
- 应用于非数值，会执行与`Number()`转型函数一样的类型转换：布尔值转换为0和1，字符串根据特殊规则解析，对象会调用它们的valueOf()和/或toString()方法以得到可以转换的值。
``` js
let v1 = '01';
let v2 = '1.1';
let v3 = 'z';
let v4 = true;
let v5 = {
    valueOf() {
        return -200;
    }
}
v1 = -v1; // -1
v2 = -v2; // -1.1
v3 = -v3; // NaN
v4 = -v4; // -1
v5 = -v5; // 200
```

### 3.5.2 位操作符
**位操作符**用于数值的底层操作，就是操作内存中表示数据的比特（位）。ECMAScript中所有数值都已IEEE 754  64位格式存储，但位操作并不直接应用到64位表示，而是先把数值转换为32位整数，再进行位操作，之后再把结果转换为64位（这个转换导致特殊值`NaN`和`Infinity`在位操作中会当成0处理）。因为64位整数存储格式是不可见的，所以只需要考虑32位整数即可。

**整数**分为有符号整数和无符号整数：  
**有符号整数**的前31位表示整数值，第32位称为**符号位**，表示数值的符号，0为正、1为负。在处理有符号整数时，我们**无法访问符号位**。
- **正值**以真正的二进制格式存储，即31位中每一位都代表2的幂。从右向左第一位（称为第0位）表示2^0，第二位（称为第1位）表示2^1，依此类推。如果一个位是空的，就用0填充，相当于忽略不计：
```js
// 18 的 二进制格式为 0000 0000 0000 0000 0000 0000 0001 0010， 更精简的写法为 10010，用五个有效位决定了实际的值。
二进制格式：———1——————0—————— 0————————1——————0———
进行幂运算：1*2^4 + 0*2^3 + 0*2^2 + 1*2^1 + 0*2^0;
数值运算 ：16 + 0 + 0 + 2 + 0
十进制格式：18
```
- **负数**以补码（或二补数，一种二进制的编码）存储。一个数值的补码通过以下三个步骤计算得到：
    1. 确定绝对值的二进制表示（如-18，先确定18的二进制表示）；
    2. 找到数值的反码（或一补数），即0都变成1，1都变成0；
    3. 给结果加1。
``` js
基于上述步骤，确定 -18 的二进制表示，首先取得18的二进制表示：
0000 0000 0000 0000 0000 0000 0001 0010
计算反码：
1111 1111 1111 1111 1111 1111 1110 1101
加1：
1111 1111 1111 1111 1111 1111 1111 1110
```
所以，-18的二进制表示就是1111 1111 1111 1111 1111 1111 1111 1110。ECMAScript会帮我们记录这些信息。在我们把负值输出为一个二进制字符串时，会得到一个前面加了减号的绝对值。如下所示：
``` js
    let num = -18;
    console.log(num.toString(2)); // "-10010"
```
**在将-18转换为二进制时，结果得到-10010，转换过程会求得补码，然后再以更符合逻辑的形式表现出来。**
::: tip 注意（无符号整数）
    默认情况下，ECMAScript中所有整数都是有符号的，不过也有无符号整数，对其而言，第32位不表示符号，因为只有正值，因为符号位表示数值，所以无符号整数比有符号整数范围更大。
:::
::: tip 反码加1是怎么加的？
1111 1111 1111 1111 1111 1111 1110 1101  
加1得到：  
1111 1111 1111 1111 1111 1111 1111 1110  
1+1=0，进一位，所以倒数第二位由0变成1了。
二进制只有0和1，所以1再加的话就会进位，就好像十进制9再加的话就会进位。
用竖式加法更易懂：  
    1101  
     +  
    0001  
    ----  
    1110  
:::
如果将位操作符应用到非数值，首先会使用`Number()`函数将该值转换为数值（此过程是自动的），然后再应用位操作。最终结果是数值。

1. 按位非

按位非操作符用**波浪符（~）**表示，作用是返回数值的**补数**。属于二进制数学操作符。最终效果是**对数值取反，再减1。**
```js
const num1 = 25;    // 二进制 00000000000000000000000000011001
const num2 = ~num1; // 二进制 11111111111111111111111111100110
conssole.log(num2); // -26

// 相当于
const num2 = -num1 - 1;
// 但是位操作会快得多，因为位操作是在数值的底层完成的。
```

2. 按位与

按位与操作符用**和号**（&）表示，有两个操作数。本质是将两个数的每一个位对齐，按真值表，对每一位执行与操作：

|第一个数值的位|第二个数值的位|结 果|
|:----:|:----:|:----:|
|1|1|1|
|1|0|0|
|0|1|0|
|0|0|0|
只有在两个位都是1时返回1，任何一位是0都返回0。
``` js
let result = 25 & 3;
console.log(result);
// 二进制计算过程：
25= 0000 0000 0000 0000 0000 0000 0001 1001
 3 =0000 0000 0000 0000 0000 0000 0000 0011 
-------------------------------------------
AND=0000 0000 0000 0000 0000 0000 0000 0001
// 结果只有第0位是1，因此值为1
```