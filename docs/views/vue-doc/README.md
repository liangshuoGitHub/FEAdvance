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
- Vue 
    - 路由传递
    - $on/$emit 发布订阅
    - Provide / inject
    - slot
    - $parent / $children
    - vuex

## v-if 和 v-show
### 相同点
两个指令都可以动态控制元素的显示与隐藏

### 不同点
`v-if`是将元素删除，而`v-show`是给元素添加`display:none`，元素还在
::: tip 注意
当在`css`中给一个元素添加了`display:none`后，通过给元素添加指令`v-show=true`无法让元素显示出来。
:::

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