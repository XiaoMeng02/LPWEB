"use strict";
/**
 * interface 与 type 的区别：
 *    1. 两者都是可以对现有类型做抽象的一个工具。
 *    2. interface 不能描述 联合类型，而 type 可以。
 *    3. interface 可以重名，而 type 不可以。
 *    4. interface 通过 extends 来继承另一个 interface
 *       type 通过 & 来做继承的操作
 *    5. 一般都推荐使用 type , 如果需要有继承或重名的话就推荐使用 interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
const pp1 = {
    name: "张三",
    age: 100,
};
const d1 = {
    name: "小d1",
    age: 10,
    fun: () => {
        console.log("d1 在狂吠");
    },
};
const d2 = {
    name: "小d2",
    age: 20,
    fun: () => {
        console.log("讲话");
    },
    lks: () => {
        console.log("流口水");
    },
};
const d3 = {
    name: "张三",
    age: 18,
    fun: () => { },
};
