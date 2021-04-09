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