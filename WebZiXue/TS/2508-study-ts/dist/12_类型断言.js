"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Swiper = require("swiper").default;
new Swiper(document.getElementById('app'));
const el = document.getElementById("app");
el.innerHTML;
// <> 语法
let someValue1 = "this is a string";
let strLength1 = someValue1.length;
// as 语法
let someValue2 = "this is a string";
let strLength2 = someValue2.length;
// 非空断言
//      !
function myFunc(maybeString) {
    const str = maybeString; // 不能将类型“string | null | undefined”分配给类型“string”。不能将类型“undefined”分配给类型“string”
    const str1 = maybeString; // OK
    console.log(str);
    console.log(str1);
}
function myFunc1(callback) {
    const num1 = callback(); // Error 不能调用可能是“未定义”的对象。
    const num2 = callback(); // Ok
}
myFunc1(undefined);
myFunc1(() => {
    return 100;
});
