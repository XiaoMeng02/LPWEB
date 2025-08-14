const qs = require("querystring");

let obj = {
    name: 'xiaoli',
    age: 22
}

let queryString = qs.stringify(obj);
// 将对象类型，变成字符串类型
console.info("转换成字符串",queryString);		

// 第三方模块也分两种，比如webpack和nodemon都是命令行工具，只需要全局安装一次
// 第二种，项目功能性的模块，当前项目需要，但其他项目不一定需要
// 有的项目使用mongdb作为数据库，有的项目使用mysql作为数据库，他们需要不同的模块进行数据库连接
// 其实除了这这种划分方式以外，还分为生产环境和开发环境

// 将参数的字符串，变成键值对的对象类型
let url = "https://www.q123.com?name=guoguo&age=19";
let obj1 = qs.parse(url);
console.info("转换成对象",obj1);