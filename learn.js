//01 js核心
//1.变量类型
//2.null和undefined
//3.var let const TDZ
//4.闭包
//5.this指向
//6.call,apply,bind，this本身不固定，call/apply/bind用来手动指定函数内部的this是谁，
// 防止this乱跑、拿不到想要对象里的数据。
function introduce(age,city){
    console.log(`我的名字是${this.name},今年${age}岁,在${city}`);//反引号是`
}
const xiaoming = {name: '小明'};
const xiaohong = {name: '小红'};
const args = [18,'重庆'];

introduce.call(xiaoming, 18, '重庆');
introduce.apply(xiaohong,args);

Function.prototype.myBind = function (ctx, ...preset){
    const fn = this;
    function Bound(...args){
        return fn.apply(this instanceof Bound ? this :  ctx, [...preset, ...args]);
        // this instanceof Bound ? this :  ctx, 是否有Bound的实例 有则this绑定实例，否则绑定ctx，即将来函数里this指向对象
    }
    Bound.prototype = Object.create(fn.prototype);
    return Bound;
};

const boundFn1 = introduce.myBind(xiaoming)
const boundFn2 = introduce.myBind(xiaoming,18)
const boundFn3 = introduce.myBind(xiaoming)
boundFn1(args) //传入的是[[18,'重庆']]
boundFn2("重庆")
boundFn3(...args)//拆开传入 这样传的才是[18,'重庆']

function sum(a,b,c){
    return this.prefix + (a + b + c);
}
const ctx = {prefix:`结果：`};
sum.call(ctx,1,2,3);
sum.apply(ctx,[1,2,3]);

const bound = sum.bind(ctx,1);
bound(2,3);

//7.原型链
function Animal(type){ this.type = type; }
Animal.prototype.speak = function(){
    return `${this.type}叫了一声`;
} ;
function Dog(type) {Animal.call(this,type);}//ES5构造函数继承
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const d = new Dog('狗');
console.log(d.speak());
console.log(d instanceof Dog);
console.log(d instanceof Animal);
// 查找顺序：d → Dog.prototype → Animal.prototype → Object.prototype → null

//8.promise与事件循环
console.log('1');
setTimeout(()=>console.log('2'),0);
Promise.resolve().then(()=>console.log('3'));
console.log('4');// 1432
//async/await 本质是 Promise

//9.深浅拷贝
const origin = {
    a : 1,
    nested: { b : 2 },
    fn : () => {},
    date: new Date(),
};
//浅拷贝 只拷贝第一层 深层的引用类型和原对象共用一个内存地址
const shallow = { ...origin };
shallow.nested.b = 99;
console.log(origin.nested.b);//shallow里面的nested改了origin也跟着改
//深拷贝 深层的也开辟新内存 但是深层的东西会丢失 递归深拷贝
const jsonCopy = JSON.parse(JSON.stringify({a:1,nested:{b:2}}));

//10.防抖（搜索）节流（滚动）
function debounce(fn,delay) {
    let timer = null;
    return function(...args){
        if(timer)clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
            timer = null;
        },delay);
    };
};
function throttle(fn,delay){
    let last = 0;
    return function(...args){
        const now = Date.now();
        if(now - last >=delay){
            last = now;
            fn.apply(this,args);
        }
    } 
}

//02 ES6+
//1.解构赋值 按照模式匹配 快速取值；数组解构 对象解构 字符串解构 函数参数解构
//2.模板字符串 ` `
function tag(strs, ...values) {
  console.log(strs) // 固定字符串数组
  console.log(values) // ${}插值的结果数组
}
const a = 10
const b = 20
tag`数字${a} 和 ${b}`//标签模板字符串
//3.Set去重 Map 键可以是对象 普通对象键变成'[object Object]'
//4.class与继承 static属于类本身 不属于实例 get/set访问器 extends 子类构造constructor必须先调用super（）才能用this
//5.模块化
//6.可选链和空值合并
//.flat flatMap

//04 HTTP与网络
//1.HTTP版本对比
/* 1.0 一次请求一次tcp
1.1 Keep-Alive长连接 缓存头完善
2.0 多路复用 一个连接并行多个请求
3.0 QUIC/UOP 弱网更快 */
//2.状态码
/* 200 正常
301/302 短链跳转 未登录跳登录页
304 静态资源没变 用本地缓存
400 参数校验失败
401 未登录或token过期
403 登录了但无权限
404 路径或资源不存在
500 服务端崩了 */
//3.get和post
/* get 参数在url 可被缓存收藏 不适合敏感大数据
post 体里带json 表单提交 创建资源 */
//4.HTTPS简化流程
/* 1.客户端 支持的加密套件
2.服务端 证书即公钥
3.客户端验证证书是否可信
4.双方协商出会话密钥 对称加密 速度快
5.之后数据用会话密钥加密传输
HTTPS=HTTP+TLS防窃听防篡改 */

//05 css
//1.盒子模型
//2.BFC 解决margin塌陷 清除浮动 
/* 清除浮动：父级 overflow: hidden 
或伪元素 .clearfix::after { content:''; display:block; clear:both; } */
//3.垂直水平居中
//4.css权重

//03 浏览器原理
//1.输入url到页面展示
//DNS解析-> TCP三次握手-> TLS -> HTTP -> 解析HTML CSS -> 渲染树 -> 布局 -> 绘制 -> 合成
//2.回流和重绘
//回流：几何布局变化 宽高尺寸位置变化 display：none
//重绘：颜色背景 visibility
//合成（都不触发）：transform opacity
//3.强缓存与协商缓存
//强缓存 读磁盘文件 不发请求 用户读不到新文件
//协商缓存 304或200 发请求 不发传输字节
//4.跨域
//同源策略 协议域名端口都相同
//跨域发请求 操作执行 返回没授权报错 服务器加响应头解决；服务器不处理options会报跨域
//5.本地存储选型 
/* cookie 登录带token
localStorage 主题语言偏好
sessionStorage 草稿 关标签就没
indexedDB 离线大量结构化数据 */

//06 vue2
//1.响应式原理
//vue2如何劫持数据
function defineReactive(obj, key, val){//定义一个函数 用来给对象的某个属性装上get set 变成响应式
    //obj要处理的对象 key属性名 val属性原本的值
    const dep = [];//依赖收集器 数组里面存Watcher 谁在用这个属性谁就放进来
    Object.defineProperty(obj, key, {//js自带的api 专门给对象的某个属性设置自定义的读取，修改逻辑 从这里开始给obj[key]装上监控
        get(){//读取函数 当你去读取这个属性 自动执行get
            if(Watcher.active) dep.push(Watcher.active);//如果有一个Watcher在读取数据 这个Watcher加到dep数组 记录数组被谁用了
            return val;//返回值给模板或代码
        },
        set(newVal){//修改函数 修改属性值自动执行set
            if(newVal === val)return;//如果值不变 啥也不干
            val = newVal;//替换新值
            dep.forEach((w)=>w.update());//更新视图
        },
    })

}
//局限 vue2默认监听不了 要用Vue.set
const vm = { user: { name: 'a'} };
vm.user.age = 18;//对象新增属性
vm.items[0] = 'new';//新增数组下标
//2.组件通信
//3.v-for和v-if不要写在一起
/* v-for比v-if优先级高 会全部循环再渲染 性能浪费
解决方法：1.先过滤数组 再循环 2.外层套一层标签如template v-if放外面 */
//4.key为什么不能用index
/* 列表 [A, B, C]，在头插入 X → [X, A, B, C]
index 全变：0→A 变成 0→X，Vue 可能复用错 DOM，输入框内容串行
用唯一 id：Vue 知道只是「移动/新增」节点 */
//5.compute和watch
//6.nextTick
//7.vuex数据流
//8.路由守卫
//全局守卫 beforeEach

//09.性能优化
//1.首屏优化 checklist
//2.虚拟列表
//3.减少回流
//4.打包瘦身
//5.ssr服务端渲染 vue是Nuxt3 react是Next.js 这两个默认是csr客户端渲染
/* 解决spa首屏白屏 搜索引擎抓不到内容 思路是服务器渲染完整html 客户端激活
fcp会优化
ssr ssg csr对比
hydration ：
服务端把组件树渲染成html字符串返回给浏览器 
浏览器解析html快速显示内容 
浏览器下载执行JS Bundle 
js执行时接管已有dom进行事件绑定和响应式处理 */
//6.preload和prefetch
/* preload预下载 首屏大图 关键css文件 首屏依赖的js 字体文件
立即下载 高优先级 同普通资源缓存 用在首屏关键资源
prefetch预获取
空闲下载 低优先级 磁盘缓存 用在下个页面资源 */