/**
 * {x:number;y:number} 对象字面量类型
 *      与js中的对象字面量类型类似，\
 *      1.key-value之间使用分号；分隔，也可以使用，
 *      2.value 描述的是一个类型，而不是具体的值，
 */
function printCoord(pt:{x:number;y:number}){
    console.log("x:"+pt.x+",y:"+pt.y);
}
// printCoord();//error:,应有1个参数，但获得0个参数
printCoord({x:3,y:4});//ok
// printCoord({x:"3",y:"8"});//error:不能将类型“string”分配给类型“number”

/**
 * 对象的可选属性
 *   添加 ？ 号来描述该属性可选
 */
function fn21(obj:{x:number,y?:number}){
    obj.y?.toFixed();
    if(typeof obj.y === "number"){
        //这里obj.y类型已经被收载为number，所以可以直接调用toFixed()方法
        obj.y.toFixed();
    }
    if(obj.y!== undefined){
        //这里obj.y类型已经被收载为number，
        obj.y.toFixed();
    }
}
fn21({x:10});//ok
fn21({x:10,y:20});//ok
// fn21({x:10,y:"20"});//error:不能将类型“string”分配给类型“number”

/**
 * 只读属性
 *    属性前面添加 readonly 关键字，表示该属性只能在对象构造函数中初始化，不能在运行时修改
 */

const obj21:{ name:string; age:number;}={
    name:"张三",
    age:20
}
obj21.age=22;

const obj22:{ name:string; readonly age:number;}={
    name:"张三",
    age:20
}
// obj22.age=22;//error:不能将类型“22”分配给类型“readonly number”

/**
 * 抽取对象类型
 *    1.interface 声明一个接口，描述对象的属性和方法
 *    2.type 声明一个类型别名，使用 interface 声明的接口来定义类型
 */
// function fn22(person:{name:string;age:number;sex:string}){}
// function fn23(person:{name:string;age:number}){}

interface Person{
    name:string;
    age:number;
    sex:number;
    info:{
        address:string;
    }
}

// function fn22(p:Person){
//     p.info.address="北京市";
// }
// function fn23(p:Person){
//     p.info.address="北京市";
// }
//定义一个PersonType类型别名
type PersonType = {
    name:string;
    age:number;
    sex:number;
    info:{
        address:string;
    }
}
function fn22(p:Person){
    p.info.address="北京市";
}
function fn23(p:Person){
    p.info.address="北京市";
}