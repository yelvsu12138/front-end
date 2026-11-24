//防抖 搜索框
function debounce(fn, delay = 500){
    let timer = null;
    return function(...args){
        if(timer)clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}

function debounce2(fn, delay = 500){
    let timer = null;
    return function(...args){
        if(timer)clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this,args);
                timer = null;
            }, delay);
    };
}

//节流 滚动按钮点击
function throttle(fn, delay = 500){
    let last = 0;
    return function (...args){
        const now = Date.now();
        if(now - last >= delay){
            last = now;
            fn.apply(this, args);
        }
    }
}

function throttle2(fn, delay=500){
    let last = 0;
    return function(...args){
        const now = Date.now();
        if(now - last >= delay){
            last = now;
            fn.apply(this, args);
        }
    }
}