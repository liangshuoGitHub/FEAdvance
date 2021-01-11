---
sidebarDepth: 2
---

# HTML #
## HTML5的新特性
- 新标签
    - HTML5中的区块和段落元素
        - header    [展示介绍性内容，通常包含标题、搜索栏、logo、作者名称等]
        - nav   [在文档中提供导航链接]
        - section   [表示页面中可复用的独立结构，如帖子、文章、评论]
        - article   [一般来说会包含一个标题]
        - aside     [表示与页面内其余内容无关的内容，如侧边栏、标注框、广告]     
        - footer    [标识一个章节内容或者根节点的页脚，包含版权数据、友情链接等]
        - hgroup    [代表文章章节所属的多级别的目录，包含多个h1-h6元素]

- 本地存储
    - localStorage
    - sessionStorage
- 通信
    - WebSocket
    
            1、HTML5提供的WebSocket，能够节省服务器资源和带宽，还能更及时的进行通讯，避免了ajax轮询不断向服务器发送http请求带来的性能问题。
            2、浏览器通过JavaScript向服务器发出建立WebSocket连接的请求，连接建立后，客户端和服务器端就可以通过TCP连接直接交换数据。
            3、WebSocket的本质是一个基于TCP的协议。
    <img src='/images/ws.png' width='70%' style='margin-left:100px'> 

    ``` js
    // 创建WebSocket链接
    const Socket = new WebScoket(url, [protocol]); // url，指定连接的URL；protocol可选，指定可接受的子协议

    // WebSocket 属性
    Socket.readyState // 只读属性，表示连接状态。0-未连接，1-已连接，2-连接正在关闭，3-连接已关闭或不能打开。
    Socket.bufferedAmount // 只读属性，指已被send()放入正在队列中但还没有被发送到网络中的数据的字节数。

    // WebSocket 事件
        //事件 -->事件处理程序-->描述
        open --->Socket.onopen --->连接建立时触发
        message->Socket.onmessage->客户端接收服务端数据时触发
        error -->Socket.onerror -->通信发生错误时触发
        close -->Socket.onclose -->连接关闭时触发

    // WebSocket 方法
        // 方法-->描述
        Socket.send()--->使用连接发送数据
        Socket.close()-->关闭连接

    ```

- 多媒体
    - audio
    - video
    - 调用照片（type-file）

- 绘图
    - Canvas [canvas标签只是图形容器，必须使用脚本来绘制图形]
    ``` js
    <canvas id='myCanvas' width='200' height='200' style="border: 1px solid red"></canvas>

    const can = document.getElementById('myCanvas'); // 找到canvas元素
    const ctx = can.getContext('2d'); // 创建context对象
    ctx.fillStyle('#f00'); // 填充
    ctx.fillRext(0, 0, 150, 75); // fillRect(x,y,width,height) 方法定义矩形的填充方式
    ```