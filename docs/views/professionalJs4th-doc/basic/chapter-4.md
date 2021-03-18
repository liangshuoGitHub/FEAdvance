# 第4章 变量、作用域与内存 #

**本章内容**
- 通过变量使用原始值和引用值
- 理解执行上下文
- 理解垃圾回收
## 4.1 原始值和引用值
ECMAScript中的变量可以包含两种类型的数据：原始值和引用值。**原始值**（primitive value）就是最简单的数据。**引用值**（reference value）则是由多个值构成的对象。  

在把一个值赋给变量时，JavaScript引擎必须确定这个值是原始值还是引用值。  

保存原始值的变量是**按值访问**（by value）的，因为我们操作的就是存储在变量中的**实际值**。  

引用值是**保存在内存**中的**对象**。与其他语言不同，JavaScript不允许我们**直接访问内存位置**，因此也就不能直接操作对象所在的内存空间。在操作对象时，实际操作的是对该对象的**引用（reference）**而非实际的对象本身。为此，保存引用值的变量是**按引用（by reference）访问**的。

### 4.1.1 动态属性
原始值和引用值的**定义方式**类似，都是创建一个变量，然后给其赋值。但是在变量保存了这个值之后，可以**对值做什么**，则大有不同。对于引用值而言，可以随时**添加、删除、修改**其属性和方法。如下例：
``` js
const obj = new Object();
obj.name = 'ls';
console.log(obj.name); // ls
// 我们可以访问这个新属性，直到对象被销毁或者属性被显式的删除。
```
因此，只有引用值可以**动态的添加**后面可以访问的属性。

原始值**不能**有属性（虽然给原始值添加属性不会报错）：
``` js
const person = 'ls';
person.age = 22;
console.log(person.age); // undefined
```

原始值的初始化只能使用**原始字面量**形式。如果使用`new`关键字，则JavaScript会创建一个`Object`类型的实例：
``` js
const person = new String('ls');
person.age = 22;
console.log(typeof person, person.age); // object  22
```
### 4.1.2 复制值
除了存储方式不同，原始值和引用至在通过**变量复制**时也不同。如下：
#### 1. 原始值复制
``` js
const num1 = 1;
const num2 = num1;
```
这里，num1包含数值5，当把num2初始化为num1时，num2也会得到数值5。但是这个值是存储在num1中值的**副本**，它们两个是完全独立的，所以这两个变量是可以**独立使用、互不干扰**的。如下图：

<img src='/images/copy_primitive.jpg' style='width:50%'>

#### 2. 引用值复制
在**通过变量**把引用值赋值给另一个变量时，复制的值实际上是一个**指针**，**指向存储在堆内存中的对象**。操作完成后，两个变量实际上**指向一个对象**，因此一个对象的变化会在另一个对象上体现出来。如下例：
``` js
const o1 = new Object();
const o2 = o1;
o1.name = 'reference';
console.log(o2.name); // reference
```
上例中，o1保存了一个新对象的实例。然后，这个值被赋值给o2，此时这两个变量都指向同一个对象，给o1创建name属性并赋值后，o2也可以访问。下图展示变量与堆内存的关系：

<img src='/images/copy_reference.png' style='width:50%'> 

### 4.1.3 传递参数
ECMAScript中所有函数的参数都是**按值传递**的。这意味着**函数外的值**会被复制到函数**内部的参数**中，就像从一个变量复制到另一个变量一样。原始值，就跟原始值变量的复制一样；引用值，就跟引用值的复制一样。不过，虽然**变量有按值访问和按引用访问**，但是**传参只有按值传递**。

在按**值**传递参数时，**值**会被**复制**到一个**局部变量**（即一个**命名参数**，用ECMAscript的话说，就是arguments对象的一个**插槽**）。

在按**引用**传递参数时，值在**内存中的位置**（而不是“值”）会被保存到一个局部变量，这意味着**对本地变量（函数命名参数）的修改会反映到函数外部**（这在ECMAScript中是**不可能**的）。看下面这个例子：
``` js
function addTen(num){
    num+=10;
    return num;
}
let count = 20;
let result = addTen(count);
console.log(count); // 20  没有变化
console.log(result); // 30
```
在上例中，函数`addTen()`有一个参数`num`，它就是一个局部变量。在调用时，变量`count`被作为参数传入。`count`的**值**是20，这个**值**被复制到参数`num`以便在函数内部使用。在函数内部，参数`num`的值被加上了10，但是这**不会**影响外部的原始变量`count`。参数`num`和变量`count`的值互不影响，它们只是碰巧存储了一样的值而已。**如果**num是按引用传递的，那么count的值也会被修改为30。这个事实在原始值上体现的很明显，但是如果**变量中传递的是对象**，就没那么清楚了。比如下例：
``` js
function setName(obj){
    obj.name = 'bob';
}
const person = new Object();
setName(person);
console.log(person.name); // bob
```
这一次，我们创建了一个对象并保存在变量`person`中，然后这个对象被复制到参数`obj`中。在函数内部，`person`和`obj`都**指向同一个对象**。结果就是，**即使对象是按值传入函数的，`obj`也会通过引用访问对象**，由于`obj`指向的对象保存在全局作用域的**堆内存**中，所以在函数内部给`obj`添加`name`属性时，函数外部的对象也会反映这个变化。我们可能会**错误**的认为，当在局部作用域中修改对象而反映到全局时，就意味着参数是按引用传递的。为了**证明对象是按值传递的**，我们可以看下例：
``` js
function setName(obj){
    obj.name = 'AAA';
    obj = new Object();
    obj.name = 'BBB';
}
const person = new Object();
setName(person);
console.log(person.name); // AAA
```
如果`person`是按引用传递的，那么`person`应该自动将指针指向`name`为BBB的新对象，然而并没有，`person`的name还是AAA。这表明，函数中的参数的**值**改变后，**原始的引用**仍然没变。当obj在函数内部被**重写**时，它变成了一个**指向本地对象的指针**，这个本地对象在函数执行结束后被销毁。
::: tip 注意
ECMAScript中函数的**参数**就是**局部变量**。
:::

### 4.1.4 确定类型
`typeof`操作符在判断一个变量是否是字符串、数值、布尔值、符号、`undefined`时，是**最佳实践**。如果值是`null`或对象，`typeof`返回`object`。所以`typeof`对于引用值的用处不大，我们不关系一个值是不是对象，而是想知道它是什么类型的对象。

为此，ECMAScript提供了`instanceof`操作符，语法如下：
``` js
variable instanceof constructor;
```
如果变量是给定引用类型（由其原型链决定，将在第8章详解）的实例，则返回`true`：
``` js
console.log(person instanceof Object); // 变量person是Object吗？
console.log(test instanceof Function); // 变量test是Function吗？
console.log(reg instanceof RegExp); // 变量reg是RegExp吗？
```
按照定义，所有引用值都是`Object`的实例，因此通过`isntanceof`操作符检测任何引用值和`Object`构造函数都会返回`true`。类似的，如果用`isntanceof`操作符检查原始值，则始终返回`false`，因为原始值不是对象。

## 4.2 执行上下文和作用域
**上下文有与之关联的变量对象，嵌套的变量对象构成了作用域链。**(目前可以把变量对象理解为作用域这个抽象概念的实体，以后有更准确的理解再更新)

- **上下文**：变量或函数的**上下文**决定了它们可以**访问**哪些数据，以及它们的**行为**。

- **全局上下文**：**全局上下文**是最外层的上下文。根据ECMAScript实现是宿主环境，表示全局上下文的对象可能不同。比如在浏览器中，全局上下文就是`window`对象（第12章详解）。使用`var`定义的全局变量和函数都会成为`window`对象的属性和方法。使用`let`和`const`的顶级声明不会在全局上下文中，但在**作用域链的解析**上效果相同。

- **变量对象**：每个上下文都有与之关联的**变量对象**（variable object），上下文中定义的所有函数和变量都存在于这个对象上。

- **销毁**：函数上下文在其所有代码执行完毕后被**销毁**，全局上下文在应用程序退出前被销毁（比如关闭网页或退出浏览器），包括定义在它上面的所有变量和函数。

- **上下文栈(执行栈/调用栈)**：每个**函数调用**都有自己的上下文，当**代码执行流**进入函数时，函数的上下文被推到一个**上下文栈**上。在函数执行完后，上下文栈会弹出该上下文，将控制权返还给之前的执行上下文。ECMAScript**程序的执行流就是通过这个上下文栈进行控制的**。

- **作用域链**：上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**（scope chain）。作用域链决定了各级上下文中的代码在访问变量和函数时的**顺序**。代码正在执行的上下文的变量对象始终位于作用域链的**最前端**。作用域链中下一个变量对象来自于**包含上下文**，以此类推至全局上下文，全局上下文的变量对象始终位于作用域链的**末端**。

- **标识符解析**：代码执行时的标识符解析是通过严着作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链最前端开始，逐级完后，直到找到标识符。
举例如下：
``` js
var color = 'bule';
function changeColor(){
    let anotherColor = 'red';
    function swapColor(){
        let tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        // 这里可以访问 color，anotherColor，tempColor
    }
    // 这里可以访问 color，anotherColor，但是访问不到tempColor
}
// 这里只能访问到 color
```
下图展示了上例的作用域链：

<img src="/images/scopechain.jpeg" style="width:50%">

由图可知，内部上下文可以通过作用域链访问外部上下文中的一切，但是外部上下文无法访问内部上下文中的任何东西。上下文直接的连接是**线性的、有序的**。例如，`changeColor()`上下文的作用域链中只有两个变量对象：它自己的和全局变量对象，因此，它不能访问`swapColor()`的上下文。
::: tip 注意
**函数参数**被认为是**当前**上下文中的变量，因此也跟上下文中的其他变量遵循相同的访问规则。
:::
::: tip 理解：执行上下文栈
执行上下文栈（又称调用栈/执行栈），用于存储代码执行期间创建的所有上下文。具有LIFO（last in first out后进先出）的特性。

js代码首次允许，都会先创建一个全局上下文并压入执行栈中，之后每次函数调用，都会创建一个新的函数上下文并压入栈内；由于执行栈后进先出的特性，可以理解为，js代码执行完毕之前，在执行栈底部永远有一个全局执行上下文。
```js
function f1(){
    f2();
    console.log(1);
}
function f2(){
    f3();
    console.log(2);
}
function f3(){
    console.log(3);
}
f1(); //  3  2  1
```
我们可以通过执行栈与上下文的关系来解释上述代码，为了方便理解，可以假定执行栈是一个数组，大致过程如下：
```js
// 代码执行前先创建全局执行上下文
ECStack = [globalContext];
// f1调用
ECStack.push('f1 functionContext');
// f1又调用了f2，在f2执行完毕之前无法console 1
ECStack.push('f2 functionContext');
// f2又调用了f3，在f3执行完毕之前无法console 2
ECStack.push('f3 functionContext');
// f3 执行完毕，输出3并出栈
ECStack.pop();
// f2 执行完毕，输出2并出栈
ECStack.pop();
// f1 执行完毕，输出1并出栈
ECStack.pop();
// 此时执行栈中只剩下一个全局执行上下文
```
:::
::: tip 理解：执行上下文的创建
执行上下文分为**创建和执行**两个阶段。

**创建阶段**

创建阶段主要负责**三件事**：确定this --- 创建词法环境组件（LexicalEnvironment）--- 创建变量环境组件（VariableEnvironment），用伪代码来表示：
``` js
ExecutionContext = {  
    // 确定this的值
    ThisBinding = <this value>,
    // 创建词法环境组件
    LexicalEnvironment = {},
    // 创建变量环境组件
    VariableEnvironment = {},
};
```
1. 确定this

    官方称为This Binding。  
    在**全局**执行性上下文中，this总是指向全局对象，如浏览器环境下指向window。  
    而在**函数**执行上下文中，this的值取决于函数的调用方式。

2. 词法环境组件

    词法环境是一个包含标识符变量映射的结构，标识符代表函数/变量的名称，变量是对原始值或实际对象的引用。  
    词法环境由**环境记录**和**对外部环境引用记录**组成。  
    其中环境记录用于存储当前环境中的变量和函数声明的实际位置。对外部环境引入记录用于保存自身环境可以访问的其他外部环境，有点作用域链的意思~  
    上下文包含全局上下文和函数上下文两种，所以词法环境也分为**全局词法环境**和**函数词法环境**两种。  
    - 全局词法环境组件

        对外部环境的引入记录为`null`，因为它本身就是最外层环境。此外，还记录了当前环境下的所有属性、方法位置。
    - 函数词法环境组件

        包含函数中定义的所有属性方法和`arguments`对象。函数词法环境的外部环境可以是全局环境，也可以是其他函数环境。
    
    环境记录在全局和函数中也不同，全局中的环境记录叫**对象环境记录**，函数中环境记录叫**声明性环境记录**，伪代码展示如下：
    ``` js
        // 全局环境
        GlobalExectionContext = {
            // 全局词法环境
            LexicalEnvironment: {
                // 环境记录
                EnvironmentRecord: {
                    Type: "Object", //类型为对象环境记录
                    // 标识符绑定在这里 
                },
                outer: < null >
            }
        };
        // 函数环境
        FunctionExectionContext = {
            // 函数词法环境
            LexicalEnvironment: {
                // 环境纪录
                EnvironmentRecord: {
                    Type: "Declarative", //类型为声明性环境记录
                    // 标识符绑定在这里 
                },
                outer: < Global or outerfunction environment reference >
            }
        };
    ```
3. 变量环境组件

    变量环境也可以说是词法环境，它具备词法环境所有属性，一样有环境记录和对外部环境引入记录。在ES6中唯一的区别的**词法环境用于存储函数声明和let、const声明的变量**，而**变量环境仅仅存储var声明的变量**。  
    示例如下：
    ``` js
        let a = 20;  
        const b = 30;  
        var c;

        function multiply(e, f) {  
        var g = 20;  
        return e * f * g;  
        }

        c = multiply(20, 30);
    ```
    可以用伪代码描述上述代码中执行上下文的创建过程：
    ``` js
        //全局执行上下文
        GlobalExectionContext = {
            // this绑定为全局对象
            ThisBinding: <Global Object>,
            // 词法环境
            LexicalEnvironment: {  
                //环境记录
            EnvironmentRecord: {  
                Type: "Object",  // 对象环境记录
                // 标识符绑定在这里 let const创建的变量a b在这
                a: < uninitialized >,  
                b: < uninitialized >,  
                multiply: < func >  
            }
            // 全局环境外部环境引入为null
            outer: <null>  
            },
        
            VariableEnvironment: {  
            EnvironmentRecord: {  
                Type: "Object",  // 对象环境记录
                // 标识符绑定在这里  var创建的c在这
                c: undefined,  
            }
            // 全局环境外部环境引入为null
            outer: <null>  
            }  
        }

        // 函数执行上下文
        FunctionExectionContext = {
            //由于函数是默认调用 this绑定同样是全局对象
            ThisBinding: <Global Object>,
            // 词法环境
            LexicalEnvironment: {  
            EnvironmentRecord: {  
                Type: "Declarative",  // 声明性环境记录
                // 标识符绑定在这里  arguments对象在这
                Arguments: {0: 20, 1: 30, length: 2},  
            },  
            // 外部环境引入记录为</Global>
            outer: <GlobalEnvironment>  
            },
        
            VariableEnvironment: {  
            EnvironmentRecord: {  
                Type: "Declarative",  // 声明性环境记录
                // 标识符绑定在这里  var创建的g在这
                g: undefined  
            },  
            // 外部环境引入记录为</Global>
            outer: <GlobalEnvironment>  
            }  
        }
    ```
    由此可见，在执行上下文的创建阶段，函数声明和`var`声明的变量在创建阶段已经被赋予了一个值，`var`声明的变量被设置为`undefined`，函数被设置为了自身函数。而`let`、`const`声明的变量被设置为未初始化。

    这也就解释了变量提升和函数声明提升的原理，以及`let`、`const`为什么有暂时性死区，这是因为**作用域创建阶段js引擎对双方的初始化赋值不同**。

**执行阶段**

代码执行时根据之前的环境记录对应赋值，比如早起`var`在创建阶段为`undefined`，如果有值就对应赋值。像`let`、`const`的值未被初始化，有值就赋值，无值就赋值为`undefined`。
:::

### 4.2.1 作用域链增强

虽然执行上下文有**全局**上下文和**函数**上下文两种，但有其他方式来**增强作用域链**，增强作用域链是指在作用域链**前端临时**添加一个上下文，这个上下文在代码执行完之后会被**删除**。通常有两种情况会出现这个现象：
- `try/catch`语句的`catch`块
- `with`语句