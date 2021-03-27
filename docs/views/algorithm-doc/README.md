# 算法入门 <img src='/images/icons/DocterStrange.png' width='50' style='margin-top:-15px'> 

## 数组去重
- Set => [... ]  /  Array.from() ES6
``` js
let arr = [1, 2, 3, 1, 2, 4, 5, 3, 4];
// Array.from()方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
console.log(Array.from(new Set(arr)));
// new Set() 返回的是Set的实例，而非数组，需要转化为数组。
console.log([...new Set(arr)]);
```
- Array.forEach => Array.includes()
``` js
let emptyArr = [];
arr.forEach(item=>{
    if(!emptyArr.includes(item)){
        emptyArr.push(item);
    }
})
console.log(emptyArr);
```

## 数组排序
- 快速排序（二分法，性能最优）
``` js
let arr_init = [12, 8, 24, 16, 1];
function middle(arr) {
    // 4. 结束递归(当arr为空或者只有一项时 不用再二分法处理处理)
    if (arr.length <= 1) {
        return arr;
    }
    let newArr = [];
    // 1. 在原始数组中删除中间项，并取到中间项的值。
    // splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
    let middleItemIndex = Math.floor(arr.length / 2);
    let middleItem = arr.splice(middleItemIndex, 1)[0];
    newArr.push(middleItem);

    // 2. 准备左右两个数组，循环原始数组中剩下的项，小于中间项的放左边，大于的放右边
    let leftArr = [];
    let rightArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < middleItem) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }
    // 3. 递归，让左右两边的数组也采用二分法处理，最后把左中右三个数组拼接到一起
    return middle(leftArr).concat(newArr, middle(rightArr));
}
console.log(middle(arr_init));
```
- 冒泡排序
::: tip 为什么称为冒泡排序？
在水中，空气的密度比水低，所以水中的气泡会不断上浮，这是我们生活中所理解的冒泡。而冒泡排序的概念也是如此。
对于一个数组，我们会比较相邻的两个元素，如果前者比后者大，则需要交换两者的位置，也就是较大的后沉，较小的往前浮。
<img src='/images/bubble.gif'> 
<img src='/images/bubble.png'> 
:::

``` js
let arr_init = [12, 8, 24, 16, 1];
// 思路：一轮一轮比较，每一轮都从第一项开始，用当前项A和它的后一项B相比，如果A>B，则让两者交换顺序，每一轮都会把当前数组中的最大值放到最后。
function bubble(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // ES6交换变量， 也可以用第三个参数实现
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
console.log(bubble(arr_init));
```

- 插入排序
``` js
// break 语句“跳出”循环。
// continue 语句“跳过”循环中的一个迭代。
let arr_init = [12, 8, 24, 16, 1];
function insert(arr) {
    // 1 准备一个新数组，存储手中的牌，先抓一张进来
    let handle = [];
    handle.push(arr[0]);
    // 2 从第二项开始依次抓牌，直到抓完
    for (let i = 1; i < arr.length; i++) {
        // A是新抓的牌
        let A = arr[i];
        // 3 和手里的牌handle 依次比较，从后向前比
        for (let j = handle.length - 1; j >= 0; j--) {
            // B是每一次要比较的手里的牌
            let B = handle[j];
            // 如果新抓的牌比手里的牌大了，就把新抓的牌放在这张牌后面
            if (A > B) {
                handle.splice(j + 1, 0, A);
                break; // 跳出当前循环，重新抓牌
            }
            // 当和手里所有的牌都比完，A比手里的牌都小，就直接把它放在第一张
            if (j === 0) {
                handle.unshift(A);
            }
        }
    }
    return handle;
}
console.log(insert(arr_init));
```

## 数组扁平化（多维数组转化为一维数组）
- Array.prototype.flat(n)
``` js
// n 代表要扁平化的层级数，Infinity代表所有层级
let arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]]
]
const arr1 = arr.flat(Infinity);
console.log(arr1);
```
- 基于数组的some方法，验证数组的每一项有没有符合函数中提供的规则的
``` js
// 基于数组的some方法，验证数组的每一项是否为数组
// while 循环为符合某个条件就一直执行下去, 也可以用递归函数+循环
while(arr.some(item=> Array.isArray(item))){
    arr = [].concat(...arr);
}
console.log(arr);
```
- 转化为字符串
``` js
const arr1 = arr.toString().split(',').map(item=>number(item));
```

## 判断字符串是否回文
``` js
// 思路：将字符串转化为数组，再reverse，再拼接成字符串
function huiwen(str){
    return str === str.split('').reverse().join('');
}
console.log(huiwen('abccba'));
```

## 斐波那契数列(fibonacci)
- 创建数组
```js
//想取得斐波那契数列的第n项(n从0开始，代表索引)，那么就自己循环创建一个斐波那契数组，给这个数组创建n项，再取得第n项的值。
function getResult(n) {
    if (n <= 1) return 1; // 第一项第二项都是1 
    let arr = [1, 1];
    // 数组里已经有两项了，所以只需要再创建n-1项
    for (let i = 0; i < n - 1; i++) {
        arr.push(arr[i] + arr[i + 1]);
    }
    return arr[n];
}
console.log(getResult(2)); // 获取第三项 -> 2
```
- 递归
    - 递归一
    ``` js
    function fn(count, curr = 1, next = 1) {
        // count 第几项 curr 当前项 next 下一项
        if (count === 0) {
            return curr;
        } else {
            return fn(count - 1, next, curr + next);
        }
    }
    console.log(fn(4)); // 获取第五项
    ```
    - 递归二(会比第一种多调用一倍数量的函数)
    ``` js
    function fb(n) {
        // n>=2 那么就返回n前面的两项的和，否则就说明获得的是第一或者第二项，返回1
        return n >= 2 ? fb(n - 1) + fb(n - 2) : 1;
    }
    console.log(fb(4));
    ```

##  输入一个整数N，输出所有和为N的连续数列
``` js
// 例如输入15
// 结果： [[1,2,3,4,5],[4,5,6],[7,8]]
// 15 -> 15/2 -> 8 向上取整，8+8以后的数一定大于15，所以这部分值不用考虑 -> 只取中间值以下的

// 从N开始计算连续M个的正数序列和
// N + 到 N+M-1  =>  N+ (N+1) + … + (N + M-1)
// 计算公式是  首项加末项乘以项数除以二

function fn(count) {
    let result = [],
        middle = Math.ceil(count / 2);
    // 从1开始加
    for (let N = 1; N <= middle; N++) {
        // M控制加多少次
        for (let M = 2; ; M++) {
            // 求出累加的和
            let num = (N + (N + M - 1)) * M / 2;
            let arr = [];
            arr.push(N)
            if (num > count) {
                break;
            } else if (num === count) {
                result.push(createArr(N, M));
                arr = [];
                break;
            }
        }
    }
    return result;
}

function createArr(beginNum, times) {
    let arr = [];
    for (let i = 0; i < times; i++) {
        arr.push(beginNum + i);
    }
    return arr;
}

console.log(fn(15));
```

## 计算一个数组元素相加的总和
- Array.prototype.reduce();
    - reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
``` js
const arr = [1,2,3,4,5];
const sum = arr.reduce((a,b)=>a+b);
console.log(sum); // 15
```

## 输出一个数组中出现次数对多的项和出现的次数
``` js
const arr = [1,1,1,2,2,2,2,2,2,4,3,4];
let obj = {};
arr.forEach(item=>{
    obj[item] = obj[item] ? obj[item]+=1 : 1;
})
console.log(obj);
let maxNum = 0;
let maxItem = "";
for(const key in obj){
    if(obj[key] > maxNum){
        maxNum = obj[key];
        maxItem = key;
    }
}
console.log(maxItem, maxNum); // 2 6
```