// 用来读取文件的js函数
// 保存对象类型,使用常量,让这个对象不能被修改地址
const fs = require("fs");
// 用来处理路径的模块
const path = require("path");


// 使用该对象中读取文件的方法
// 这是一个异步的方法
// 第一个参数,读取文件的相对路径
// 第二个参数,是读取的编码格式
// 第三个参数，读取的回调函数
fs.readFile("./message.txt", "utf8", (error, data) => {
    if (error == null) {
        console.log("读取的文本为:", data);

        // 使用写的方法并不总是按照顺序执行的
        // 异步的执行的顺序，并不总是
        let content = "这是最新写入的文本";

        // 默认的写入方式，是覆盖，去掉原有的内容，写入新的内容
        // 假如我们不想要覆盖而是追加，也是可以的
        fs.writeFile("./message.txt", content, (error) => {
            if (error == null) {
                console.log("文件写入成功!");

                // 这样的写法，可以保证执行的顺序，但是会引发回调地狱的情况
                // 尽量使用promise或者await这样的异步处理方法

            } else {
                console.log("文件写入失败!", error);
            }
        })
    } else {
        console.log("文件读取失败:", error);
    }
})


// 读取文件的路径比较方便，因为是同级目录下
// 比如后面要实现的用户头像的功能，需要将用户的头像路径，拼接起来
// 比如我们从数据库中，拿到了用户头像的名称，然后需要拼接路径，使得前端可以访问这张图片
let filePath = path.join('public' , 'images' , '001.png');
console.log("用户的头像路径为:",filePath);


// 获取绝对路径的方法 通过当前模块的属性完成绝对路径
console.log("当前文件夹",__dirname);
console.log("当前文件",__filename);

// 使用这个路径和文件名称拼接，就可以得到完整的路径
console.log(path.join(__dirname,"public","images","002.png"));