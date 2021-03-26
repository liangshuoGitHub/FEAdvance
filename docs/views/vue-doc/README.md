---
sidebarDepth: 3
---

# Vue 部分 <img src='/images/icons/groot.png' width='50' style='margin-top:-15px'> 

## 生命周期

### 概念

`Vue`的生命周期描述了`Vue`实例**从创建到销毁**的过程：

开始创建、初始化数据、编译模板、挂载Dom、渲染、更新渲染、销毁。

每一个组件或者实例都会经历完整的生命周期：创建、运行、销毁。

### 整个过程的描述

- `Vue`实例通过`new Vue()`创建出来后会初始化事件和生命周期，然后会执行`beforeCreate`钩子函数，这时无法访问数据和真实的`dom`（`$el`），一般不作操作
- 在`created`钩子函数中，已经**可以获取和更改数据**，可以在这里**获取初始化数据**，这里也是在渲染前**倒数第二次**修改数据的机会，不会触发其他钩子函数
- 接下来开始寻找实例对应的模板，把模板编译为虚拟`dom`并放到`render`函数中准备渲染，然后执行`beforeMount`钩子函数，这时**虚拟**`dom`已经创建完成，马上就要渲染，在这里也可以修改数据，不会触发其它钩子，这里是**渲染前最后一次**修改数据的机会
- 接下来开始`render`，渲染出**真实**`dom`，然后执行`mounted`钩子函数，这时候可以访问和操作**真实**`dom`
- 在**数据更改**后，会立即执行`beforeUpdate`，然后`vue`的虚拟`dom`机制会重新构建虚拟`dom`与上一次虚拟`dom`树利用`diff`算法进行对比之后重新渲染，一般不做什么事
- 当更新完成后，执行`updated`，数据已经更新完成，`dom`也重新`render`完成，可以**操作更新后的虚拟`dom`**
- 在`beforeDestroy`和`destoryed`在我们离开当前组件或者手动调用`$destroy`方法时被触发，在这两个钩子函数中，可以做一些**善后工作**，如清除计时器等。区别在于`beforeDestroy`是在实例被销毁前调用，`destoryed`是在实例被销毁后调用，这时`Vue`实例所有的指令都已经被解绑了、事件监听器被移除、子实例被销毁

- `activated`钩子函数在被`keep-alive`缓存的组件**激活**时调用
- `deActivated`钩子函数在被`keep-alive`缓存的组件**停用**时调用

- `errorCaptured`是新增的钩子函数，当**捕获来自子孙组件的错误**时调用。这个钩子接收三个参数：错误对象、发生错误的组件实例和一个包含错误来源信息的字符串。此钩子可以返回`false`以阻止该错误继续向上传播。
## vue2.0/3.0双向数据绑定的实现原理

2.x版本使用 `Object.defineProperty()`。

3.x版本使用 `Proxy` 代理。
``` html
<body>
    姓名：<span id='spanName'></span>
    <br>
    <input type="text" id="inpName">
    <br>

    地址：<span id='spanAddress'></span>
    <br>
    <input type="text" id="inpAddress">

    <br>
    年龄：<span id='spanAge'></span>
    <br>
    <input type="text" id="inpAge">

    <script>
        // 例一 vue的双向数据绑定实现原理
        // 方法一 2.0版本  ES5 
        {
            console.log('例一 方法一');

            let obj = {
                name: ''
            }

            let newObj = JSON.parse(JSON.stringify(obj)); // 深克隆简单方法

            Object.defineProperty(obj, 'name', {
                get() {
                    // console.log(this); // this指向 obj
                    // 想在get里拿到原始对象里的数据，不能直接用this或者原始对象名，因为在这样用的时候就又会触发get，会死循环，栈溢出
                    return newObj.name;
                },
                set(val) {
                    // 值没变 不继续
                    if (val === newObj.name) return;
                    newObj.name = val;
                    observer();
                }
            })

            function observer() {
                spanName.innerHTML = obj.name;
                inpName.value = obj.name;
            }

            inpName.oninput = function () {
                console.log(111);
                obj.name = inpName.value;
            }
            // 缺点  1.需要克隆原始数据 2.需要分别给对象中的每一个属性设置监听（循环）3.在Vue data中 初始化对象时没设置属性名的时候没法监听到
        }

        // 方法二 3.0版本 ES6
        {
            console.log('例一 方法二');
            let obj = {};
            obj = new Proxy(obj, {
                get(target, value) {
                    return target[prop];
                },
                set(target, prop, value) {
                    // target代表监听的对象，prop代表监听的属性，value代表设置的新值
                    if (target[prop] === value) return;
                    target[prop] = value;
                    observer(target);
                }
            })

            function observer(target) {
                inpAddress.value = target.Address;
                spanAddress.innerHTML = target.Address;
            }

            inpAddress.oninput = () => {
                obj.Address = inpAddress.value;
            }
        }

        {
            let obj = {}
            obj = new Proxy(obj, {
                get(target, prop) {
                    return target[prop];
                },
                set(target, prop, value) {
                    if (target[prop] === value) return;
                    target[prop] = value;
                    observer(obj);
                }
            })
            function observer(obj) {
                spanAge.innerHTML = obj.age;
                inpAge.value = obj.age;
            }
            inpAge.oninput = () => {
                obj.age = inpAge.value;
            }
        }
    </script>
</body>
```

## MVC和MVVM的区别
- MVVM（Model View View-Mode）就是双向数据绑定，视图-数据 双向变化，数据驱动视图（触发set，重新赋值即可），视图修改数据（监听表单元素的onchange或者oninput事件即可），只不过vue里的v-model帮我们实现了onchange事件，在react中需要我们自己写。
- MVC（Model View Controller）称为单向数据改变，默认只实现了数据驱动视图，而MVVM是双向的，其视图修改数据是通过onchange事件实现的。

## 组件之间传值的方式
### $on $emit 发布订阅
在父组件中通过`$on`绑定事件和传递参数给子组件，在子组件通过`$emit(functionName, arg)`触发

### event bus 事件总线
- 全局挂载
``` js
// 在main.js中初始化
Vue.prototype.$Bus = new Vue();

// 发送事件
this.$Bus.$emit('user', {
    name: 'ls',
    age: 18
})

// 接收事件
this.$Bus.$on('user',({name, age})=>{
    console.log(name, age);
})
```

- 按需加载
``` js
// 新建 bus.js
import Vue form 'vue';
const Bus = new Vue();
export Bus;

// 业务代码中引入并使用
import Bus from 'bus.js';

// 发送事件
this.$Bus.$emit('user', {
    name: 'ls',
    age: 22
})

// 接收事件
this.$bus.$on('user', ({name, age})=> {
    console.log(name, age);
})
```

### 获取根/父/子组件实例

在绝大多数情况下，最好不要直接触达另一个组件实例内部或手动操作`DOM`，不过有些情况向下也可以。

#### 1. 访问根实例
可以通过`$root`属性访问组件的根实例，例如在这个根实例中：
``` js
// Vue 根实例
new Vue({
    date: {
        foo: 1
    },
    computed: {
        bar() {……};
    },
    methods: {
        baz() {……};
    }
})
```
所有的子组件都可以将这个实例作为一个全局`store`来访问或使用。
``` js
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```
#### 2. 访问父/子组件实例

- 子组件可以用`this.$parent`访问父实例
- 子实例会被推入父实例的`$children`数组中

应该节制的使用`$parent`和`$children`，它们主要是作为访问组件的应急方案。更推荐使用`props`和`events`实现父子组件通信。

#### 3. 访问子组件实例或子元素

- 如果在普通`dom`元素上使用，引用就指向`dom`元素；如果用在子组件上，引用就指向组件实例
- 使用`this.$refs.ref值`就能访问或修改数据与方法
- `$refs`只会在组件渲染完成后生效，并且不是响应式的。这也是操作子组件的一中备用方案，应该避免在模板和计算属性中访问`$refs`

### 路由传参
路由传参分为**声明式和编程式**，声明式会在模板中乱入比较多的逻辑，所以一般使用编程式路由传参，分为以下两种：
- `query`
`query`类似于`get`请求，参数会显示在地址栏上，刷新**不会**丢失
``` js
// 传递
this.$router.push({
    path: '/list',
    query: {
        name: 'ls'
    }
})

// 接收
this.$route.query.name; // ls
```

- `params`
`params`传参，参数不会暴露在地址栏中，刷新的话参数**会**丢失，并且需要在路由文件中配置组件的`name`属性。当`path`存在时，`params`会被忽略
``` js
// 传递
this.$router.push({
    name: 'orderList',
    params: {
        name: 'ls'
    }
})

// 接收
this.$route.parmas.name; // ls
```

## 指令
### v-text
``` js
<span v-text='msg'></span>
// 和下面写法一样
<span> {{ msg }} </span>
```

### v-html
- `v-html`指令更新元素的`innerHTML`
- 需要注意内容按普通`HTML`插入，不会作为`Vue`模板进行编译
- 在单文件组件里，`scoped`的样式不会应用在`v-html`内部，因为那部分`html`没被编译器处理，可以用`css modules`或用全局的`<style>`元素设置其样式
- 动态渲染`html`非常危险，容易导致`XSS攻击`，不能在用户提交的内容上使用`v-html`，只在可信的内容上应用
### v-if 和 v-show
#### 相同点
两个指令都可以动态控制元素的显示与隐藏

#### 不同点
`v-if`是将元素删除，而`v-show`是给元素添加`display:none`，元素还在
::: tip 注意
当在`css`中给一个元素添加了`display:none`后，通过给元素添加指令`v-show=true`无法让元素显示出来。
:::

### v-else v-else-if
前一兄弟元素必须有`v-if`或`v-else-if`，用于条件渲染

### v-for
用于元素渲染，语法为`alias in expression`。当和`v-if`一起使用时，比`v-if`优先级更高。

### v-on
- 用于绑定事件监听器，缩写是`@`，表达式可以是方法名或内联语句
- 当监听原生`DOM`事件时，语句可以访问一个`$event`属性：`@click="handle($event)"`
- 修饰符：
    - `.self` 只有触发事件的元素是当前元素本身才触发
    - `.once` 只触发一次
    - `.left` 只在点击鼠标左键时触发
    - `.right` 只在点击鼠标右键时触发
    - `.middle` 只在点击鼠标中键时触发
    - `.{keyCode | keyAlias}` 只在事件是特定键触发时才触发
    - `.stop` 调用`event.stopPropagation()`阻止事件冒泡
    - `.prevent` 调用`event.preventDefault()`防止默认事件
    - `.capture` 添加事件监听器时使用`capture`模式
    - `.passive` 以`{ passive: true }` 模式添加侦听器

### v-bind
动态绑定属性，缩写是`:`

### v-model
- 在表单控件或者组件上**创建双向数据绑定**
- 限制
    - `<input>`
    - `<textarea>`
    - `<select>`
    - components
- 修饰符
    - `.number` 输入字符串转为有效的数字
    - `.trim` 过滤首尾空格
    - `.lazy` 取代`input`监听`change`事件。默认情况下，`v-model`在每次`input`事件触发后将输入框的值与数据进行同步，使用`.lazy`修饰符后，转为在`change`事件之后同步
    ``` js
    // 在change时而非input时更新
    <input v-model.lazy='num'>
    ```
### v-slot
- 用法提供具名插槽或需要接收`prop`的插槽，缩写是`#`，参数是插槽名（可选，默认的default）
- 限制
    - `<template>`
    - 组件（对于一个单独的带prop的默认插槽）

### v-once
不需要表达式，只渲染元素和组件一次，后续数据更改，视图不会更新，可以用于**性能优化**

### v-pre
不需要表达式，跳过**当前元素及其子元素**的编译过程，可以用来**显示原始模板标签**。跳过大量没有指令的节点可以**加快编译**
``` html
<span v-pre> {{ this will not compiled }} <span>
```

### v-cloak
不需要表达式，它和`css`规则如`[cloak] { display: none }`一起使用，可以**隐藏未编译的模板标签直到实例准备完毕**，避免弱网情况下，未编译完全的模板出现在页面中（如`{{ str }}`）
``` css
[v-cloak] {
    display: none;
}
```
``` html
<div class="root" v-cloak> {{ str }} </div>
```
不会显示，直到编译结束

## key的作用

主要是为了更高效的更新向虚拟DOM
## vue路由懒加载(按需加载)
`import`的方式引入组件，不利于性能优化。我们可以使用`webpack`提供的`require`进行路由懒加载
```js
component: resolve => require(['@/views/order/orderEdit/NewOrder.vue'], resolve);
```

## 导航守卫
- 全局守卫
    - 全局前置守卫

        你可以使用router.beforeEach 注册一个全局前置守卫：
    ``` js
    const router = new VueRouter({ ... });
    router.beforeEach = ((to, from, next)=>{
        // to: Route: 即将要进入的目标 路由对象
        // from: Route: 当前导航正要离开的路由
        // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。确保要调用 next 方法，否则钩子就不会被 resolved。
    })
    ```
    - 全局解析守卫
    ``` js
    router.beforeResolve = ((to, from, next)=>{ });
    ``` 
    - 全局后置守卫
    ``` js
    router.afterEach = ((to, from)=>{ });
    ```
        
- 路由独享的守卫 beforeEnter
    ``` js
    const router = new VueRouter({
    routes: [
            {
                path: '/foo',
                component: Foo,
                beforeEnter: (to, from, next) => {
                    // ...
                }
            }
        ]
    })
    ```
- 组件内的守卫
    ``` js
    const Foo = {
        template: `...`,
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被确认前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
        }
    }
    ```