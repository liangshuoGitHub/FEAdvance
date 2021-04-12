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
const reg5 = new RegExp("\\w+", i);
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
|`\b`|表示字母在单词的边界，例如`/\bon/`表示`"on"`位于单词的右侧边界，`/on\b/`表示`"on"`位于字符串的左侧边界|
|`\B`|表示字母不在单词的边界，例如`/\Bon/`表示`"on"`的左侧不是字符的边界，`/on\B/`表示`"on"`的右侧不是单词的边界|

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