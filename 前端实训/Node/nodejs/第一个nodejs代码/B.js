// 这里不是定义了一个num吗？
var num = 10;

// 算总和的方法
function add(num1, num2){
    let result = num1 + num2;
    return result;
}

console.log("内部的num",num);

// 外部需要使用这个值，那么就导出这个值
// 这里的导出num是赋值的方法 这两种导出方法其实是等价的
// 当直接赋值对象了以后,两个导出对象,只有一个能生效,module版本的会被导出
exports.add = add;
// module.exports.num = num;

// 由于这两个对象事实上指向的都是同一个对象
module.exports = {
    add,
    num
}

