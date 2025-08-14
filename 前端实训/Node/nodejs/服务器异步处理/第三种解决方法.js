const fs = require('fs');

async function fn1() {

}

//异步函数是给函数声明的，所以命名函数声明的位置是function声明的最前端
//匿名函数，括号的前面
let fn2 = async () => {

    // 抛出错误
    // throw "失败的结果";
    
    //异步函数内部使用了return作为resolve函数的替代品
    //也就是如果函数内部，成功return返回了值，就说明异步执行成功了
    // return "成功的结果";
}


//当一个函数，被声明为异步函数的时候，它的内容就变成了promise容器
console.log(fn2());

//使用异步方法完成调用
async function p1(){
    return "p1";
}

async function p2(){
    return "p2";
}

async function p3(){
    return "p3";
}

async function run(){
    // 这样也能够保证执行的顺序是之前一样的顺序
    let result1 = await p1();
    let result2 = await p2();
    let result3 = await p3();
    console.info(result1);
    console.info(result2);
    console.info(result3);
}

run(); // 调用函数