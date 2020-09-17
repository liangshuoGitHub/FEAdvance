---
sidebarDepth: 2
---

# Vue 部分 <img src='/images/icons/groot.png' width='50' style='margin-top:-15px'> 

## vue2.0/3.0双向数据绑定的实现原理
::: tip 回答技巧
3.0是在技术论坛看的，2.0是在项目中积累的。通过研究它的原理，知道它在2.0中的实现原理是……，后来尤雨溪在Github上放出3.0版本，我去clone下来，又通过简书掘金进行了解。
2.0版本使用 Object.defineProperty()。
3.0版本使用 Proxy 代理。
::: details 查看代码
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
:::

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
<!-- - React
    - 属性
    - 发布订阅
    - React createContext
    - redux / react-redux / mobix / dva -->

## 请详细说下你对 vue 生命周期的理解？
- 总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
    - 创建前/后： 在 beforeCreate 和 created 阶段，vue 实例的挂载元素 el 还没有，为undefined。
    - 载入前/后：在 beforeMount 阶段，vue 实例的$el，但还是挂载之前为虚拟的 dom 节点，仍然为undefined。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染。
    - 更新前/后：当 data 变化时，会触发 beforeUpdate 和 updated 方法。
    - 销毁前/后：在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在。

## vue路由懒加载(按需加载)
::: tip 回答技巧
之前做开发的时候一直是使用import的方式引入组件，这种方法不利于性能优化。后来使用webpack提供的require进行路由懒加载。
```js
component: resolve => require(['@/views/order/orderEdit/NewOrder.vue'], resolve);   
```
::: 

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