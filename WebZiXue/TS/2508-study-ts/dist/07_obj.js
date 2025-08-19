"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * {x:number;y:number} 对象字面量类型
 *      与js中的对象字面量类型类似，\
 *      1.key-value之间使用分号；分隔，也可以使用，
 *      2.value 描述的是一个类型，而不是具体的值，
 */
function printCoord(pt) {
    console.log("x:" + pt.x + ",y:" + pt.y);
}
// printCoord();//error:,应有1个参数，但获得0个参数
printCoord({ x: 3, y: 4 }); //ok
// printCoord({x:"3",y:"8"});//error:不能将类型“string”分配给类型“number”
/**
 * 对象的可选属性
 *   添加 ？ 号来描述该属性可选
 */
function fn21(obj) {
    obj.y?.toFixed();
    if (typeof obj.y === "number") {
        //这里obj.y类型已经被收载为number，所以可以直接调用toFixed()方法
        obj.y.toFixed();
    }
    if (obj.y !== undefined) {
        //这里obj.y类型已经被收载为number，
        obj.y.toFixed();
    }
}
fn21({ x: 10 }); //ok
fn21({ x: 10, y: 20 }); //ok
// fn21({x:10,y:"20"});//error:不能将类型“string”分配给类型“number”
/**
 * 只读属性
 *    属性前面添加 readonly 关键字，表示该属性只能在对象构造函数中初始化，不能在运行时修改
 */
const obj21 = {
    name: "张三",
    age: 20
};
obj21.age = 22;
const obj22 = {
    name: "张三",
    age: 20
};
function fn22(p) {
    p.info.address = "北京市";
}
function fn23(p) {
    p.info.address = "北京市";
}
