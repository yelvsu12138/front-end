// ctrl+/  
/* shift+alt+a */ 
// 111 ctrl+k ctrl+c/ctrl+u
// git init; git remote add origin 仓库.git; 
// call,apply,bind
// this本身不固定，call/apply/bind用来手动指定函数内部的this是谁，
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


