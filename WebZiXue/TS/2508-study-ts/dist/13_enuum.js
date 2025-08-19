"use strict";
/**
 * 枚举
 *  语法：
 *    enum xxx {
 *      key = value
 *    }
 *    key   - 枚举成员
 *    value - 枚举值
 *
 *    enum xxx {
 *      key1,
 *      key2,
 *      key3
 *    }
 *    数字枚举，每个枚举成员对应的值将是从0递增
 *      key1 = 0
 *      key2 = 1
 *      key3 = 2
 *
 *    enum xxx {
 *       key1,
 *       key2 = 2,
 *       key3
 *    }
 *       key1 = 0
 *       key2 = 2
 *       key3 = 3
 *
 *    字符串枚举，每个枚举成员对应的值是一个字符串
 *    enum xxx {
 *      key1 = 'value1',
 *      key2 = 'value2',
 *      key3 = 'value3'
 *    }
 *
 *    混合枚举
 *    enum xxx {
 *      key1 = 'value1'
 *      key2 = 0
 *      key3 = 'value2'
 *    }
 *
 *    常量枚举: enum 前通过 const 来定义，与普通枚举之间的区别是:
 *      1. 不会生成自运行函数的相关代码，而是在编译过程中直接编译出具体的值写入到JS
 *      2. 没有反向映射
 *    const enum xxx {
 *
 *    }
 */

var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["EDIT"] = 1] = "EDIT";
    Role[Role["SUPERADMIN"] = 2] = "SUPERADMIN";
})(Role || (Role = {}));
// 数字枚举，有反向映射，
console.log("===Role", Role);
console.log(Role.ADMIN); // 0
console.log(Role[0]); // 'ADMIN'
var Color;
(function (Color) {
    Color["RED"] = "red";
    Color["GREEN"] = "green";
})(Color || (Color = {}));
console.log("===Color", Color);
var Hello;
(function (Hello) {
    Hello[Hello["a"] = 1] = "a";
    Hello["b"] = "msg";
})(Hello || (Hello = {}));
console.log("===Hello", Hello);
var World;
(function (World) {
    World[World["a"] = 0] = "a";
    World[World["b"] = 2] = "b";
    World[World["c"] = 3] = "c";
})(World || (World = {}));
console.log("===World", World);
var HelloWorld;
(function (HelloWorld) {
    HelloWorld[HelloWorld["a"] = 0] = "a";
    HelloWorld[HelloWorld["b"] = 1] = "b";
    HelloWorld[HelloWorld["c"] = 2] = "c";
})(HelloWorld || (HelloWorld = {}));
console.log("===HelloWorld", HelloWorld.a);
