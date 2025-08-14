const { promises } = require("dns");
const fs = require("fs");
//使用promise的语法完成修改
//封装一个promise容器
// resolve当成功执行的时候，执行的回调函数
// reject当执行失败的时候，执行的回调函数
let p1 = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('A.js', function (error, content) {
            if (error == null) {
                resolve(content);
            } else {
                reject(error);
            }
        });
    });
}
let p2 = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('B.js', function (error, content) {
            if (error == null) {
                resolve(content);
            } else {
                reject(error);
            }
        });
    });
}
let p3 = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('C.js', function (error, content) {
            if (error == null) {
                resolve(content);
            } else {
                reject(error);
            }
        });
    });
}
//这种相似的对象，其实可以使用工厂模式，完成声明
//使用这样的方法，还可以让promise用上参数
function createPromise(fileName) {
    //工厂模式，可以根据传入的值，生成对应的容器
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, "utf-8", function (error, content) {
            resolve(content);
        })
    })
}

//使用封装好的promise容器，读取文件
//如果按照之前思维我们去是便omise容器，那么还不如使用promise的then方法来处理异步操作
// p1.then(content => {
//     console.log("你获取到的数据1", content);
//     p2.then(content => {
//         console.log("你获取到的数据2", content);
//         p3.then(content => {
//             console.log("你获取到的数据3", content);
//         }).catch(error => {
//             console.log("读取文件失败", error);
//         })
//     }).catch(error => {
//         console.log("读取文件失败", error);
//     })
// }).catch(error => {
//     console.log("读取文件失败", error);
// })
//使用promise的alL方法，把多个容器按顺屏
Promise.all([p1(), p2(), p3()]).then(values => {
    console.log("你获取到的数据", values);
}).catch(error => {
    console.log("读取文件失败", error);
})
// 这个方法是有缺陷的，比如无法传参
// 有时候有这样的需要，要根据A的文件内容去如何获取B文件

//第二种使用方式
//这里使用的方式，类似于链式调用的使用方式

// p1().then(function (result1) {
//     console.log("第二种方式");
//     console.log(result1);
//     return p2();
// }).then(function (result2) {
//     console.log(result2);
//     return p3(O);
// }).then(function (result3) {
//     console.log(result3);
// })

//使用工厂模式的内容,创建代码
createPromise("./A.js").then(function (result1) {
    console.info(result1);
    //这里返回的不是某一个容器，而是工厂模式生成的容器
    return createPromise("./B.js");
}).then(function (result2) {
    console.info(result2);
    return createPromise("./C.js");
}).then(function (result3) {
    console.info(result3);
})