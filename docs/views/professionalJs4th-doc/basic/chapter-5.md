# 第5章 基本引用类型 #

**本章内容**
- 理解对象
- 基本JavaScript数据类型
- 原始值和原始值包装类型

::: tip 理解对象，区分对象和对象定义
- **对象**又称为**引用值**，**对象定义**又称为**引用类型**。
- **引用类型**是把**数据和功能**组织到一起的结构，它们描述了自己的对象应有的**属性和方法**。
- **引用值**是某个特定**引用类型的实例**，新对象通过使用`new`操作符后跟一个**构造函数**(constructor)来创建，构造函数就是用来创建新对象的函数。

下面这个例子为我们介绍了通过构造函数创建新对象：
``` js
let now = new Date();
```
在上例中，引用类型是`Data`，构造函数是`Date()`。构造函数`Date()`负责创建一个只有**默认属性和方法**的简单对象。ECMAScript提供了许多像`Date`这样的**原生引用类型**。
::: tip 注意
- 引用类型虽然有点像类，但跟类并不是一个概念。
- 函数也是一种引用类型，但它的内容多到一章放不下，所以用第10章专门介绍函数。
:::

## 5.1 Date

`Date`引用类型将日期保存为自**协调世界时**(UTC Universal Time Coordinated)时间1970年1月1日零时至今所经过的**毫秒数**。

要创建日期对象，就是用`new`操作符来调用`Date`构造函数：
``` js
let now = new Date(); // Thu Mar 25 2021 14:11:52 GMT+0800 (中国标准时间)
```

在不给`Data`构造函数传参时，创建的对象保存**当前的**日期和时间。要基于**其他的日期和时间**创建日期对象，需要传入其毫秒表示。为此，ECMAScript提供了两个辅助方法，用于**将日期转换为其毫秒表示**：

- `Date.parse()`方法

    该方法接收一个表示日期的字符串参数，将其转换为毫秒数。该字符串可以为以下日期格式：

    - "月/日/年"。如"5/23/2020"。
    - "月名 日, 年"。如"May 23, 2020"。
    - "周几 月名 日 年 时:分:秒 时区"。如"Thu May 23 2020 00:00:00 GTM-0700"。
    - "YYYY-MM-DDTHH:mm:ss"。如"2020-5-23T00:00:00"。

    当传入的参数不满足以上格式时，方法返回`NaN`。

    例如，要得到`2020年1月1日`零时的毫秒表示，可以这样写：
    ```js
    let timeStamp = Date.parse("2020-01-01T00:00:00");
    console.log(timeStamp); // 1577808000000
    ```
- `Date.UTC()`方法（目前看来不准确）

    该方法也返回日期的毫秒表示。但接收的**参数不同**，它接收的**参数格式**为 年、月(零起点，0-11)、日(1-31)、时(0-23)、分、秒和毫秒。只有**年和月必传**。如果不提供日，那么默认是1日，其他参数默认值是0。如下例：
    ``` js
    // GTM时间 2020年1月1日 零时
    let timeStamp = Date.UTC(2020, 0); // 1580572800000
    // 但是将这个时间戳转换为时间时，并没有得到期望的值，而是得到了当天上午八时
    new Date(Date.UTC(2020, 0)) // Wed Jan 01 2020 08:00:00 GMT+0800 (中国标准时间)

    // GTM时间 2020年1月1日 零时 全参数
    let timeStamp = Date.UTC(2020, 0, 1, 00, 00, 00); // 1580572800000
    ```

以上两个方法都会被`Date`构造函数**隐式调用**，**区别**在于 `Date.UTC()`返回的是由系统设置决定的本地日期，不是**GMT**（**格林威治时间/世界时**）日期。

`Date`构造函数还提供了`Date.now()`方法，返回**方法执行时日期和时间的毫秒数**，可以用来做**性能检测**，获取程序运行的耗时：
```js
// 起始时间
let t1 = Date.now();

// 调用函数
doSomeThing();

// 结束时间
let t2 = Date.now();

// 得到程序运行耗时
let result = t2 - t1;
```

### 5.1.1 继承的方法

与其他类型一样，`Date`类型重写了`toString()`、`toLocaleString()`、`valueOf()`方法，但与其他类型不同，重写后这些方法**返回值不一样**。

- `toLocaleString()`方法返回与浏览器运行的**本地环境**一致的日期和时间。格式中包含AM(上午)、PM(下午)，**不含时区信息**
- `toString()`方法返回**带时区**信息的日期和时间，采用**24小时制**
``` js
// 示例代码展示了2019年2月1日的Date实例调用 toString 和 tolocaleString()方法的返回值

const d1 = new Date();  // Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)
d1.toLocaleString();   // "2019/2/1上午12:00:00"
d1.toString();   // "Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)"
```
在现代浏览器中上述两个方法的返回值趋于一致，但在比较老的浏览器上，上述两个方法的返回值在每个浏览器中都不同，所以两个方法**只对调试有用，不能用于显示**。

- `valueOf()`方法被重写后返回日期的**毫秒表示**，**操作符**可以直接使用它返回的值，如下例：
```js
// 确保日期先后的简单方式
const d1 = new Date(2020, 0, 1); // 2020年1月1日
const d2 = new Date(2020, 1, 1); // 2020年2月1日
console.log(d1 < d2); // true
```

### 5.1.2 日期格式化方法
`Date`类型由几个专门用于格式化日期的方法，它们都返回字符串。但是它们的输出也会**因浏览器而异**，所以**不能**用于在用户界面上一致的显示日期。
- `toDateString()` 返回日期中的周几、月、日、年
- `toTimeString()` 返回日期中的时、分、秒和时区
- `toLocaleDateString()` 返回日期中的周几、月、日、年
- `toLocaleTimeString()` 返回日期中的上/下午、时、分、秒
- `toUTCString()` 返回完整的UTC日期
``` js
// 格式化日期示例

const d1 = new Date(2020, 4, 20, 13, 22, 33);
console.log(d1.toDateString());  // Wed May 20 2020
console.log(d1.toTimeString());  // 13:22:33 GMT+0800 (中国标准时间)
console.log(d1.toLocaleDateeString());  // 2020/5/20
console.log(d1.toLocaleTimeString());  // 下午1:22:33
console.log(d1.toUTCString());  // Wed, 20 May 2020 05:22:33 GMT
```

### 5.1.3 日期/时间组件方法
用于取得或设置日期值的特定部分：
|方法|说明|
|:----:|:----:|
|getTime()|返回日期的毫秒表示，与valueOf()相同|
|setTime(milliseconds)|设置日期的毫秒表示，修改日期|
|getFullYear()|返回4位数年(即2019而不是19)|
|getUTCFullYear()|返回UTC日期的4位数年|
|setFullYear(year)|设置日期的年（year必须是四位数）|
|setUTCFullYear(year)|设置UTC日期的年（year必须是四位数）|
|getMonth()|返回日期的月份（0~11）|
|getUTCMonth|返回UTC日期的月(0~11)|
|setMonth(month)|设置日期的月（month为大于0的数值，大于11 加年）|
|setUTCMonth(month)|设置UTC日期的月（month为大于0的数值，大于11 加年）|
|getDate()|返回日期中的日（1~31）|
|getUTCDate()|返回UTC日期中的日（1~31）|
|setDate(date)|设置日期中的日（如果date大于该月天数，则加月）|
|setUTCDate(date)|设置UTC日期中的日（如果date大于该月天数，则加月）|
|getDay()|返回日期中表示周几的数值（0表示周日，6表示周六）|
|getUTCDay()|返回UTC日期中表示周几的数值（0表示周日，6表示周六）|
|getHours()|返回日期中的时（0~23）|
|getUTCHours()|返回UTC日期中的时（0~23）|
|setHours(hours)|设置日期中的时（如果hours大于23，则加日）|
|setUTCHours(hours)|设置UTC日期中的时（如果hours大于23，则加日）|
|getMinutes()|返回日期中的分（0~59）|
|getUTCMinutes()|返回UTC日期中的分（0~59）|
|setMinutes(minutes)|设置日期中的分（如果minutes大于59，则加时）|
|setUTCMinutes(minutes)|设置UTC日期中的分（如果minutes大于59，则加时）|
|getSeconds()|返回日期中的秒（0~59）|
|getUTCSeconds()|返回UTC日期中的秒（0~59）|
|setSeconds(seconds)|设置日期中的秒（如果seconds大于59，则加分）|
|setUTCSeconds(seconds)|设置UTC日期中的秒（如果seconds大于59，则加分）|
|getMilliseconds()|返回日期中的毫秒|
|getUTCMilliseconds()|返回UTC日期中的毫秒|
|setMilliseconds(milliseconds)|设置日期中的毫秒|
|setUTCMilliseconds(milliseconds)|设置UTC日期中的毫秒|
|getTimeZoneOffset()|返回以分钟计的UTC与本地时区的偏移量|

## 5.2 RegExp
`RegExp`构造函数创建了一个正则表达式对象，用于将文本与一个规则匹配，可以匹配字符（符合规则的字符）和匹配位置（符合规则的字符的位置）。
### 5.2.1 语法
有两种方式可以创建一个`RegExp`对象，**字面量和构造函数**。

在使用构造函数创建正则对象时，需要在转义字符前面再加一个反斜杠。
``` js
// 字面量
const reg1 = /.at/gi; // 匹配所有以"at"结尾的三字符组合，忽略大小写

// 构造函数
const reg2 = new RegExp(".at", "gi");
const reg3 = RegExp(/.at/, "gi");

// 在使用构造函数创建正则对象时，需要在转义字符前面再加一个反斜杠
const reg4 = /\w+/;
const reg5 = new RegExp("\\w+", "i");
```
#### 参数
以`/pattern/flags`为例

- `pattern`（规则）。必选

    正则表达式的文本
- `flags`（标记）。可选，如果指定，标记可以是以下值的任意组合：
    - `i` 忽略大小写
    - `s` 允许`.`匹配换行符
    - `u` 使用Unicode码的规则进行匹配
    - `g` 全局匹配；找到所有匹配，而不是在第一个匹配后停止
    - `y` 执行粘性匹配（sticky），匹配从此正则表达式的`lastIndex`属性指示的索引开始
    - `m` 多行；将开始和结束字符（`^`和`$`）视为在多行上工作（也就是分别匹配每一行的开始和结束（由`/n`或`/r`）分割），而不是只匹配整个输入字符串的最开始和最末尾处

### 5.2.2 特殊字符的含义
#### 1. 元字符
|字符|含义|
|:----:|:-----|
|`.`|匹配**除换行符外**的任意单个字符，例如`/.y/`会匹配`"yes make my day"`中的`"my"`和`"ay"`，不会匹配`"yes"`，如果设置限定符`s`，则会匹配换行符|
|`\d`|匹配阿拉伯数字，等价于`[0-9]`|
|`\D`|匹配不是阿拉伯数字的字符，等价于`[^0-9]`|
|`\w`|查找数字、字母、下划线，等价于`[0-9a-zA-Z_]`|
|`\W`|匹配不是数字、字母或下划线的字符，等价于`[^0-9a-zA-Z_]`|
|`\s`|匹配空白符，包括空格、制表符、换页符、换行符和其他Unicode空格。例如`/\s\w*/g`匹配`"B2 hhh22_ "`中的`" hhh22_"`和`" "`|
|`\S`|匹配非空白符|
|`\t`|匹配水平制表符（tab）|
|`\r`|匹配回车符|
|`\n`|匹配换行符|
|`\v`|匹配垂直制表符|
|`\f`|匹配换页符|
|`[\b]`|匹配退格符（backspace），不要与`\b`混淆|
|`\0`|匹配NUL字符，不要在此后面跟小数点|
|`\xhh`|匹配两位十六进制数字表示的字符|
|`\uhhhh`|匹配四位十六进制数字表示的Unicode字符|
|`\cX`|`X`是A-Z的一个字母，匹配字符串中的一个控制字符。例如`/\cM/`匹配字符串中的control-M|

#### 2. 字符集合
|字符|含义|
|:----:|:-----|
|`[xyz]`|字符集/字符组。匹配集合中任意一个字符。也可以使用连字符`-`指定一个范围，例如`[abcd]`等价于`[a-d]`|
|`[^xyz]`|反义字符集。匹配任意一个不在括号范围内的字符|

#### 3. 边界
|字符|含义|
|:----:|:-----|
|`^`|匹配输入开始|
|`$`|匹配输入结尾|
|`\b`|表示字母在单词的边界，例如`/\bon/`表示`"on"`位于单词的左侧边界，`/on\b/`表示`"on"`位于单词的右侧边界|
|`\B`|表示字母不在单词的边界，例如`/\Bon/`表示`"on"`的左侧不是单词的边界，`/on\B/`表示`"on"`的右侧不是单词的边界|

``` js
// \b 和 \B 的代码示例
let str = "at noon";
console.log(str.match(/\bon/));  // null
console.log(str.match(/on\b/));  // ["on", index: 5, input: "at noon", groups: undefined]
console.log(str.match(/\Bon/));  // ["on", index: 5, input: "at noon", groups: undefined]
console.log(str.match(/on\B/));  // null
```

#### 4. 分组和反向引用
|字符|含义|
|:----:|:-----|
|`(x)`|匹配`x`并且捕获匹配项，其中括号被称为捕获括号|
|`\n`|`n`是一个正整数，一个反向引用，指向正则表达式中第n个括号（从左往右数）中匹配的字符串|
|`(?:x)`|匹配`x`不会捕获匹配项，其中括号被称为非捕获括号|

#### 5. 量词
|字符|含义|
|:----:|:-----|
|`x*`|匹配`x`0次或者多次。例如，`/bo*/` 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"|
|`x+`|匹配`x`1次或者多次，等价于`{1,}`|
|`x*?`和`x+?`|像上面的 * 和 + 一样匹配前面的模式 x，然而匹配是最小可能匹配|
|`x?`|匹配`x`0次或者1次|
|`x(?=y)`|只有`x`后面紧跟着`y`时，才匹配`x`|
|`x(?!y)`|只有`x`后面不是紧跟着`y`时，才匹配`x`|
|`x|y`|匹配`x`或者`y`|
|`x{n}`|在`x`连续出现`n`次时匹配|
|`x{n,}`|`n`是一个正整数，在`x`至少出现`n`次时匹配|
|`x{n,m}`|`n`和`m`为正整数。在`x`连续出现`n`到`m`次时匹配|

### 5.2.3 属性
- `RegExp.prototype` 允许为所有正则对象添加属性
- `RegExp.length` 值为2

通过原型链继承的属性：

`arity`,`caller`,`constructor`,`length`,`name`

### 5.2.4 方法
全局对象`RegExp`自身没有方法，不过它会通过原型链继承一些方法：`apply`,`call`,`toSource`,`toString`

### 5.2.5 RegExp 实例

#### 1. 属性
- `RegExp.prototype.constructor` 创建该正则对象的构造函数
- `RegExp.prototype.global` 是否开启了全局匹配
- `RegExp.prototype.ignoreCase` 是否忽略大小写
- `RegExp.prototype.lastIndex` 下次匹配开始的字符串的索引位置
- `RegExp.prototype.multiline` 是否开启了多行匹配
- `RegExp.prototype.source` 正则对象的源模式文本
- `RegExp.prototype.sticky` 是否开始了粘滞匹配

从对象继承的属性：`__parent__`,`__proto__`

#### 2. 方法
- `RegExp.prototype.exec()` 在目标字符串中执行一次正则匹配操作
- `RegExp.prototype.test()` 测试字符串是否满足当前正则的规则
- `RegExp.prototype.toString()` 返回一个字符串，值为该正则对象的字面量形式。覆盖了`Object.prototype.toString()`方法
- `RegExp.prototype.toSource()` 返回一个字符串，值为该正则对象的字面量形式。覆盖了`Object.prototype.toSource()`方法

从对象继承的方法：`__defineGetter__`, `__defineSetter__`, `hasOwnProperty`, `isPrototypeOf`, `__lookupGetter__`, `__lookupSetter__`, `__noSuchMethod__`, `propertyIsEnumerable`, `toLocaleString`, `unwatch`, `valueOf`, `watch`

## 5.3 原始值包装类型
为了方便操作原始值，ECMAScrpit提供了三种特殊的引用类型：`Boolean`,`Number`,`String`。每当用到某个原始值的方法或属性时，后台都会创建一个相应的**原始包装类型的对象**，从而暴露出操作原始值的各种方法。如下例：
``` js
let s1 = "some text";
let s2 = s1.substring(2);
```
原始值`s1`不是对象，逻辑上不应该有方法，但是上述代码还能正常执行，是因为后台进行了处理。在第二行访问`s1`时，是以`读模式`访问的，也就是要**从内存中读取变量保存的值**。在以读模式访问字符串值的时候，后台会执行以下三步：
1. 创建一个`String`类型的实例；
2. 调用实例上的方法；
3. 销毁实例。

代码表示如下：
``` js
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```
对于布尔值和数值而言也是一样，只不过使用的是`Boolean`和`Number`包装类型。

**引用类型与原始包装类型的主要区别**在于对象的生命周期。一般引用类型的实例会在离开作用域时被销毁，而自动创建的原始值包装对象会在访问它的那行代码执行完后被销毁。所以**不能在运行时给原始值添加属性和方法**，如下例：
``` js
let str = "some text";
str.color = "red";
console.log(str.color); // undefined
```
第二行代码在运行时会创建一个临时的`String`对象，而当第三行代码执行时，这个对象已经被销毁了。实际上第三行代码创建了自己的`String`对象，但是这个对象没有color属性。

所有原始值包装对象都会转换为布尔值`true`。

另外，`Object`构造函数作为一个工厂方法，能根据传入值的类型返回相应的原始值包装类型的实例。例如：
``` js
let str = new Object("some text"); // 字符串包装对象
let boo = new Object(false);  // 布尔包装对象
let num = new Object(123);  // 数值包装对象
let sym = new Object(Symbol('sym')); // 符号包装对象
console.log(str instanceof String);  // true
console.log(boo instanceof Boolean); // true
console.log(num instanceof Number);  // true
console.log(sym instanceof Symbol);  // true
```
通过`Object`构造函数，我们可以**创建符号包装对象**。
### 5.3.1 Boolean

#### 1. Boolean 引用类型 与 Boolean 对象
`Boolean`是对应布尔值的**引用类型**。要创建一个`Boolean`对象，就调用`Boolean`构造函数并传入`true`或`false`，如不传，**默认**为`false`。
#### 2. 继承的方法
`Boolean`的实例重写了`valueOf()`方法，**返回原始值**`true`或`false`。重写了`toString()`方法，返回字符串`"true"`或`"false"`。

注意`new Boolean(false) && true` 会返回`true`，因为所有的原始值包装对象都会被转换为布尔值`true`。

### 5.3.2 Number
#### 1. Number 引用类型 与 Number 对象
`Number`是对应数值的**引用类型**。要创建一个`Number`对象，就使用`Number`构造函数并传入数值，如不传，**默认**为`0`。

#### 2. 继承的方法
`Number`类型也重写了`valueOf()`、`toString()`、`toLocaleString()`方法。其中`valueOf()`方法返回**原始数值**，另外两个方法返回**数值字符串**。`toString()`方法接收一个可选参数作为基数（进制数），返回相应基数形式的数值字符串，默认为`10`。
#### 3. 将数值格式化为字符串
除了继承的方法，`Number`类型还提供了几个用于将数值格式化为字符串的方法：
- `toFixed()`

    该方法返回包含指定小数位数的数值字符串。如果数值本身的小数位大于参数，就**用0填充**，否则就**四舍五入**。参数默认为`0`。
    ``` js
    let num1 = 10, num2 = 10.789;
    console.log(num1.toFixed(3)); // 10.000
    console.log(num2.toFixed(2)); // 10.79
    ```
    一般情况下，`toFixed()`方法可以表示0-20个小数位的数值。
- `toExponential()`

    exponential意为指数。`toExponential()`方法返回以科学计数法（指数计数法）表示的数值字符串。参数表示结果中小数的位数，默认为`0`;
    ``` js
    let num = 990;
    console.log(num.toExponential(3)); // 9.900e+2

    let num2 = 99;
    console.log(num.toExponential(1)); // 9.9e+1
    console.log(num.toExponential(0)); // 1e+2 由于没办法不用小数就能表示99，所以就舍入为100
    ```
- `toPrecision()`

    precision意为精准。`toPrecision()`方法会根据数值和精度来决定调用`toFixed()`返回固定长度形式还是调用`toExponential()`返回科学计数法形式的数值字符串。该方法接受一个参数表示结果中数字的总位数
    ``` js
    let num = 99;
    console.log(num.toPrecision(1)); // 1e+2;  99 不能只用一位数字来表示，所以将它舍入为100
    console.log(num.toPrecision(2)); // 99;
    console.log(num.toPrecision(3)); // 99.0;
    ```
#### 4. isInteger() 方法与安全整数
integer意为整数。ES6新增的`isInteger()`方法用来判断传入的参数**是否为整数**，返回布尔值。
``` js
console.log(Number.isInteger(0));   // true
console.log(Number.isInteger(1.00));  // true
console.log(Number.isInteger(99.088));  // false
console.log(Number.isInteger(NaN)); // false
console.log(Number.isInteger(-10000)); // true
console.log(Number.isInteger(true)); // false
```
IEEE754数值格式有一个数值范围是从`Number.MIN_SAFE_INTEGER （-2^53 + 1）`到`Number.MAX_SAFE_INTEGER  （2^53 - 1）`。在这个范围内，二进制值可以表示一个整数值，超出这个范围，二进制值可能无法正确表示整数值。`Number.isSafeInteger()`方法可以帮助我们鉴别整数是否在这个范围内。
``` js
console.log(Number.isSafeInteger(2 ** 53 - 1)); // true
console.log(Number.isSafeInteger(2 ** 53)); // false
```

### 5.3.3 String
`String`是对应字符串的**引用类型**。要创建一个`String`对象，使用`String`构造函数并传入一个字符串值。如不传，默认为`""`。
``` js
const stringObject = new String("hello world");
```
`String`对象有三个**继承**的方法：`valueOf()`、`toLocaleString()`、`toString()`都返回**原始字符串值**。

每个`String`对象都有一个`length`**属性**，表示字符串中字符的数量。即使字符串中包含双字节字符（而不是单字节的ASCII字符）也仍然按照单字符来计数。
``` js
let stringValue = "hello world";
console.log(stringValue.length); // 11
```
`String`类型提供了许多方法来解析和操作字符串。
#### 1. JavaScript 字符
JavaScript字符串由**16位码元**（code unit）组成。对于大多数字符来说，**每16位码元对应一个字符**，字符串的`length`属性实际上表示字符串包含多少16位码元。

JavaScript字符串使用了两种Unicode编码混合的策略：UTF-16和UCS-2。对于UTF-16而言，每个字符都是用16位表示的，它提供以下几个方法：
- `charAt()` 方法查找给定索引位置的16位码元，并返回该码元对应的字符
- `charCodeAt()` 方法返回指定索引位置的16位码元
- `fromCharCode()` 方法通过给定的UTF-16码元创建字符
``` js
let str = "hello world";
console.log(str.length); // 11
console.log(str.charAt(1)); // e
console.log(str.charCodeAt(1)); // 101
console.log(String.fromCharCode(101, 119)); // ew 
```
但是16位只能唯一表示65 536个字符，这对于大多数语言字符集足够了，在Unicode中称为**基本多语言平面**。

为了表示更多的字符，Unicode采用了一个策略，即每个字符使用另外16位去选择一个**增补平面**，这种每个字符使用两个16位码元的策略称为**代理对**。它相应的有`codePoionAt()`和`fromCodePoint()`方法。
::: tip 注意
对于UCS-2，详见高程第四版 P118
:::

#### 2. normalize() 方法
按照指定的一种 Unicode 正规形式将当前字符串正规化。（如果该值不是字符串，则首先将其转换为一个字符串）。它不影响字符串本身的值。

#### 语法
`str.normalize("from");`
#### 参数
`from` 为四种 Unicode 正规形式 "NFC", "NFD", "NFKC", 以及 "NFKD" 其中的一个, 默认值为 "NFC"。
- NFC - Normalization Form Canonical Composition.
- NFD - Normalization Form Canonical Decomposition.
- NFKC - Normalization Form Compatibility Composition.
- NFKD - Normalization Form Compatibility Decomposition.
#### 示例
``` js
const str = "\u1E9B\u0323";

str.normalize("NFC"); // "\u1E9B\u0323"
str.normalize(); // 和上面一样
```
::: tip 注意
这四种规范化形式的具体细节超出了本书范围
:::

#### 3. 字符串操作方法
- 拼接字符串

`concat()`方法用于拼接字符串，接受任意多个参数，但是更常用的方式是**加号操作符**或者**模板字符串**。
``` js
let str = 'hello';
console.log(str.concat(...["world", "!"]));  // hello world!
console.log(str + "hello" + "!");  // hello world!
console.log(`${str} world!`);  // hello world!
```
- 提取子字符串

`slice()`、`substring()`、`substr()`这三个方法用于提取子字符串。三个方法都接收**一或两个**参数。第一个参数表示**子字符串开始的位置**。省略第二个参数意味着提取到字符串末尾。

当**参数都是正数**时，`slice()`和`substring()`的第二个参数代表提取结束位置的索引（不包含），`substr()`的第二个参数代表需要提取的个数。

当**某个参数是负数**时，`slice()`会将所有的负数参数值转换为字符串长度加上该负数值；`substring()`会将所有负数参数值转换为0；`substr()`会将第一个负数参数值转换为字符串长度加上该负数值，将第二个负数参数转为为0。
::: tip 注意
`substring()`方法会将较小的参数作为起点，较大的参数作为终点，比如调用`substring(3, 0)`相当于调用`substring(0, 3)`。
:::

#### 4. 字符串位置方法
`indexOf()`和`lastIndexOf()`方法用于在字符串中搜索传入的字符串，第一个参数代表要查找位置的字符串，第二个参数可选，代表开始搜索的位置。两个方法的区别在与`indexOf()`从字符串开头开始查找，`lastIndexOf()`方法从字符串末尾开始查找。
``` js
const sentence = "Hello, my name is ls, I am 25 years old and my job is FE!";
console.log(sentence.indexOf("Hello")); // 0
console.log(sentence.lastIndexOf("Hello")); // 0
console.log(sentence.lastIndexOf("Hello") === sentence.indexOf("Hello")); // true
let arr = [];
let pos = sentence.indexOf('e');
while(pos > -1){
    arr.push(pos);
    pos = sentence.indexOf("e", pos + 1);
}
console.log(arr); // [1, 13, 31]
```
#### 5. 字符串包含方法
ES6提供了三个用来判断**字符串中是否包含另一个字符串**的方法，这三个方法都从字符串中搜索传入的字符串，返回布尔值。都接受可选的第二个参数
- `includes()` 的第二个参数代表开始检索的位置（包含）
- `startsWith()` 判断字符串是否以传入的字符串作为**开头**，第二个参数代表开始检索的位置（包含）
- `endsWith()` 判断字符串是否以传入的字符串作为**结尾**，第二个参数代表字符串的位置（不包含），默认为字符串长度，如果提供这个参数，就好像**字符串只有这么多字符一样**
``` js
const str = "abcdefg";
console.log(str.includes("c", 2)); // true
console.log(str.startsWith("ab")); // true
console.log(str.startsWith("cd", 2)); // true
console.log(str.endsWith("fg", str.length - 1)); // false
```
#### 6. trim() 方法
`trim()`方法会创建原始字符串的一个**副本**，删除前后所有空格，因为`trim()`方法返回的是原始字符串的副本，所以原始字符串**不受影响**。`trimLeft()`方法和`trimRight()`方法分别用于删除字符串**前面和后面**的空格。

#### 7. repeat() 方法
`repeat()`方法接收一个整数参数，表示要将字符串复制多少次，返回拼接所有副本后的结果。
#### 语法
`str.repeat(count)`
#### 参数
`count` 为正整数或0，当为0时，返回空字符串。
#### 返回值
包含指定字符串的指定数量副本的新字符串。
#### 示例
``` js
let str = "na ";
console.log(str.repeat(1)); // "na "
console.log(str.repeat(2)); // "na na "
```
#### 8. padStart() 和 padEnd() 方法
`padStart()`方法和`padEnd()`方法的作用是**用另一个字符串填充当前字符串**（重复，如果需要的话），使得当前字符串达到给定的长度。`padStart()`方法从字符串开头开始填充，`padEnd()`方法从字符串结尾开始填充。
#### 语法
`str.padStart(targetLength, padString)`
#### 参数
`targetLength` 当前字符串需要填充到的目标长度，如果小于当前长度，就返回当前字符串本身。

`padString` 填充字符串，可选。默认为空字符串，如果填充字符串后长度超过了目标长度，就只保留左侧部分，其余部分会被截断。
#### 返回值
在原字符串开头或结尾填充填充字符串后的新字符串。

``` js
const str = "abc";
console.log(str.padStart(2, "xxx")); // "abc"
console.log(str.padStart(5, "xyz")); // "abcxy"
console.log(str.padStart(10, "xyz")); // "abcxyzxyzx"
console.log(str.padEnd(6, "xyz")); // "abcxyz"
```
#### 9. 字符串迭代与解构
字符串的原型上暴露了一个`@@iterator`方法，通过这个方法我们可以迭代字符串。例如我们可以像下面这样手动使用迭代器：
``` js
let str = "abc";
let iterator = str[Symbol.iterator]();
console.log(iterator.next()); // {value: "a", done: false}
console.log(iterator.next()); // {value: "a", done: false}
console.log(iterator.next()); // {value: "a", done: false}
console.log(iterator.next()); // {value: undefined, done: true}
console.log(iterator.next()); // {value: undefined, done: true}
```
在`for-of`循环中可以通过这个迭代器按顺序访问每个字符：
``` js
for (const item of "abc") {
    console.log(item);
}
// a
// b
// c
```
有了这个迭代器，字符串就能够通过解构操作符来解构了：
``` js
// 把字符串分割为字符数组
const str = "abcde";
let arr = [...str];
console.log(arr); // ["a", "b", "c", "d", "e"]
```

#### 10. 字符串大小写转换
- 通用方法

`toLowerCase()`和`toUpperCase()`
- 地区特定的转换方法

`toLocaleLowerCase()`和`toLocaleUpperCase()`

如果不知道代码涉及什么语言，**最好使用地区特定的转换方法。**
#### 11. 字符串 模式匹配 方法
`String`类型为了在字符串中实现**模式匹配**设计了几个方法，分别是`match()`、`search()`、`replace()`和`split()`方法。
- **`match()`** 方法   
    `match()`方法检索返回一个**字符串匹配正则表达式的结果**，本质上和`RegExp`对象的`exec()`方法相同
    - 语法  
        `str.match(regexp)`
    - 参数  
        `regexp`代表一个正则表达式对象。如果传入非正则表达式对象，则会隐式的调用`new RegExp(obj)`将其转换为正则表达式对象。如果不传递任何参数，返回`[""]`
    - 返回值
        - 如果使用`g`标记，则返回与正则表达式匹配的所有结果，不会返回捕获组
        - 如果未使用`g`标记，则返回与正则匹配的第一个结果及其相关的捕获组（`Array`）。这种情况下，返回的项目具有如下的其他属性：
            - `input`：搜索的字符串
            - `index`：匹配结果的开始位置
            - `groups`：一个捕获组数组或`undefined`（没有定义命名捕获组的情况下）
            
        最终返回一个`Array`，内容取决于`g`标记的存在与否。如果未找到匹配，则返回`null`
    - 示例
    ``` js
    let str = "cat, fat, bat, sat";
    console.log(str.match(/.at/)); // [0:'cat', index: 0, input: 'cat, fat, bat, sat', groups: undefined]
    console.log(str.match(/(?<item>.at)/)); // [0: 'cat', index: 0, input: 'cat, fat, bat, sat', groups: {item: 'cat'}]
    console.log(str.match(/.at/g)); // ["cat", "fat", "bat", "sat"]
    console.log(str.match(/xxx/)); // null
    ```
- **`search()`** 方法  
    `search()` 方法执行正则表达式和`String`对象之间的一个搜索匹配
    - 语法  
        `str.search(regexp)`
    - 参数  
        `regexp` 是一个正则表达式对象，如果传入非正则表达式对象(`obj`)，则会使用`new RegExp(obj)`隐式转换为正则表达式对象
    - 返回值  
        如果匹配成功，返回正则在字符串中首次匹配项的索引值，否则返回`-1`
    - 描述  
        在想要知道字符串是否存在某个模式（pattern）时使用，类似于正则表达式的`test()`方法
    - 示例  
        ``` js
            let str = "hey Ls.";
            console.log(str.search(/[A-Z]/g)); // 4
            console.log(str.search(/./g));  // 0
            console.log(str.search(/\d/g)); // -1
        ```
- **`replace()`** 方法  
    `replace()` 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。pattern可以是字符串或正则表达式，替换值可以是字符串或一个每次匹配都要调用的回调函数
    - 语法  
        `str.replace(regexp|substr, newSubstr|function)`
    - 参数  
        - `regexp`(pattern)  
            一个`RegExp`对象或字面量。该正则匹配的内容会被第二个参数的返回值替换掉，如需全部替换，需要加`g`标记
        - `substr`(pattern)  
            一个即将被第二个参数替换的字符串，**仅第一个匹配项**会被替换
        - `newSubStr`(replacement)  
            替换用的字符串，可以配合一些特殊的变量名使用，参考下面的 *使用字符串作为参数*
        - `function`(replacement)  
            用来创建替换用的字符串的函数，参考下面的 *使用函数作为参数*
    - 返回  
        一个被部分或全部替换的新字符串
    - 使用字符串作为参数  
        替换字符串可以插入下面的特殊变量名：
        |变量名|代表的值|
        |:----:|:----|
        |`$$`|插入一个`"$"`|
        |`$&`|插入匹配的子串|
        |$`|插入当前匹配的子串左边的内容|
        |`$'`|插入当前匹配的子串右边的内容|
        |`$n`|如果第一个参数是`RegExp`对象，并且n是小于100的非负整数，那么插入第`n`个括号匹配的字符串，索引从1开始|
    - 使用函数作为参数  
        函数的返回值作为替换字符串。如果第一个参数是带有`g`标记的正则表达式，那么每次匹配函数都会被调用。  
        下面是该函数的参数：
        |参数名|代表的值|
        |:----:|:----|
        |`match`|匹配的子串（对应上述的`$&`）|
        |`p1,p2,...`|如果`replace()`方法的第一个参数是一个`RegExp` 对象，则代表第n个括号匹配的字符串。（对应于上述的`$1，$2`等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`|
        |`offset`|匹配到的字符串在原字符串中的偏移量（比如原字符串是`abcd`，匹配到的子串是`bc`，那么这个参数值为`1`）|
        |`string`|被匹配的原字符串|
        |NamedCaptureGroup|命名捕获组匹配的对象|
    - 示例
        - **使用正则表达式脱敏手机号**
        ``` js
        const mobile = 13122334455;
        // 因为replace()是String的方法，所以要先将手机号转换为String类型
        let newMobile = String(mobile).replace(/(\d{3})\d*(\d{4})/, "$1****$2");
        console.log(newMobile); // 131****4455
        ```
        - **在`replace()`中使用`global`和`ignore`**
        ``` js
        const str = "Apples are round, and apples are juicy.";
        const reg = /apples/gi;
        const newStr = str.replace(reg, "oranges");
        console.log(newStr); // oranges are round, and oranges are juicy.
        ```
        - **交换字符串中的两个单词**
        ``` js
        const str = "John Smith";
        const newStr = str.replace(/(\w+)\s(\w+)/, "$2 $1");
        console.log(newStr); // "Smith John"
        ```
        - **使用函数修改匹配到的字符**
        ``` js
        // 在本例中，将匹配到的大写字母转为小写，并在前面添加连字符
        const str = "borderTop, paddingLeft";
        function func(match){
            return `-${match.toLowerCase()}`;
        }
        const newStr = str.replace(/[A-Z]/g, func);
        console.log(newStr); // "border-top, padding-left";
        ```
        - **将华氏温度转换为摄氏温度**
        ``` js
        // 华氏温度通过一个数字加"F"来表示
        let fahrenheit= "212F";
        let func = (str, p1, offset, s)=>{
            console.log(str, p1, offset, s); // 212F 212 0 212F
            return (Number(p1) - 32) * 5/9 + "°C";
        }
        let centigrade = fahrenheit.replace(/(\d*\.?\d+)F\b/, func);
        console.log(centigrade); // 100°C
        ```
        - **使用行内函数和正则来避免循环**
        ``` js
        // 下例把字符串转换为对象数组（其元素为对象）
        // 输入：一个由X Y 组成的字符串
        // 输出：一个数组对象。X产生"on"状态，Y产生"off"状态
        const str = "XYX88YX";
        let arr = [];
        str.replace(/(x)|(y)/gi, (match, p1, p2)=>{
            if (p1) { arr.push({on: true}) }
            else if (p2) { arr.push({on: false}) }
        })
        console.log(arr);
        // [{on: true}, {on: false}, {on: true}, {on: false}, {on: true}];
        ```
