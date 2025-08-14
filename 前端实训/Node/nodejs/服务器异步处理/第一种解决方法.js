const fs = require('fs');

//这种方法会引发回调地狱的问题
fs.readFile('A.js', function (errorl, content1) {
    console.log(content1);
    fs.readFile("B.js", function (error2, content2) {
        console.log(content2);
        fs.readFile("C.js", function (error3, content3) {
            console.log(content3);
        })
    })
})
