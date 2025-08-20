"use strict";
// function identity(value: number): number {
//   return value;
// }
// const z1: number = identity(100)
// 期望上面的函数，能够支持传递 number 或 string 的类型的参数
// function identity(value: number | string): number | string {
//   return value;
// }
// const z1: number = identity(100)
// 期望，该函数能够根据我传递的类型是什么，从而控制返回值类型一样。
//    传入 number, 返回 number
//    传入 string, 返回 string
//    这是就需要使用 泛型了。
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 函数泛型：
 *    定义函数时，可以声明该函数可以接受的泛型参数，然后该泛型参数，可以用在该函数上。
 *    使用函数时，明确传递泛型实参过去
 *
 *    function fun<T>(a: T): T {
 *
 *    }
 *
 *    fun<string>()
 */
function identity(value) {
    return value;
}
const z1 = identity(100);
const z2 = identity('100');
// 明确T为string,那么传递的value也是string
const z3 = identity(100);
// 类型参数可以不用传递，会自行反推出来。
const z4 = identity(100);
