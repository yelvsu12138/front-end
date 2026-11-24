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