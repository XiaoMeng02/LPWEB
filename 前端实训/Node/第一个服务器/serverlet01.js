// 系统模块 
// 1导入系统模块
const http = require("http");
const RouterUrl = require("url");
const qs = require("querystring");
const fs = require("fs");
const path = require("path");

// 2创建服务器
const server = http.createServer();

// 3监听事件
server.on("request", (request, response) => {

	let {
		url,
		method,
		headers
	} = request;
	response.writeHead(200, {
		'content-type': "text/html;charset=utf-8"
	})
	let {
		query,
		pathname
	} = RouterUrl.parse(url, true);
	let routes = method.toLocaleUpperCase() + pathname;



	switch (routes) {
		case "GET/home":
		case "GET/login":
		case "GET/index":
			// 完成发送页面给前端的操作
			let filePath = path.join(__dirname, "public", "page", pathname+".html")

			// 这就是静态文件的传输方法
			fs.readFile(filePath,(error,data)=>{
				if(error == null){
					response.end(data);
				}else{
					console.error("文件读取错误");
					response.writeHead(500, {
						'content-type': "text/html;charset=utf-8"
					})
					response.end("服务器错误！");
				}
			})
			break;
		case "POST/index":
			response.end("保存商品列表");
			break;
		case "POST/login":
			let postData = "";
			request.on("data", (paramsData) => {
				postData += paramsData;
			});
			request.on("end", () => {
				console.log("post类型的数据:");
				console.log(JSON.parse(postData));
			});
			response.end("用户进行登陆");
			
			break;
		case "GET/book":
			console.log("获取到的书籍参数为", query)
			response.end(`<h1>书籍页面</h1>`);
			break;
		default:
			response.end("404页面");
			break;
	}
})


// 4启动服务,监听指定的端口
server.listen(3000);

// 提示服务器启动成功
console.info("服务器启动成功....");