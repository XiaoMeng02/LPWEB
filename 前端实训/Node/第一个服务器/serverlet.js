// 系统模块 
// 1导入系统模块
const http = require("http");
const RouterUrl = require("url");
const qs = require("querystring");

// 2创建服务器
const server = http.createServer();

// 3监听事件
// 由于不知道什么时候，客户端会向服务器请求
// 所以这里使用的也是回调函数的形式
server.on("request", (request, response) => {
	// response.end("Hello ");
	// 为了实现获取不同类型的数据的效果，我们需要先判断，判断请求的类型
	// 因为post类型和get类型或者delet，put这样的类型，类型不同，数据的传输方式也不同
	// let url = request.url;
	// let method = request.method;
	// 后面获取值，都会使用解构的写法完成
	let {
		url,
		method,
		headers
	} = request;
	console.log("用户请求的路径为:", url);
	console.log("用户请求的类型为:", method);
	console.log("用户请求的请求头:", headers['accept']);
	// 这个路径以及这个请求类型，用来实现后端路由
	// 请求头，用来确定前端传入的稀奇古怪的值，是用来干嘛的

	// 设置响应头的状态码并且设置响应类型
	response.writeHead(200, {
		'content-type': "text/html;charset=utf-8"
	})

	// response.setHeader('Content-Type', 'text/plain;charset=utf-8');

	// 原始路由的写法，使用url判断用户访问的是什么功能
	// 除此之外，同学们还需要注意一点
	// url 为 login 类型为 get 和 url 为 login 类型为 post的请求
	// 是同一种东西吗？不是的，get是获取页面，post一般是行为
	// 所以 login get 应该是获取登陆页面 login post 是进行登陆功能

	// 为了将get类型请求，和post请求区分
	// 将请求的路径和类型拼接起来，作为判断的方法
	console.log("当前访问的路由为:", method + url);

	// 获取post类型的参数
	// 由于前端传入的值，不确定有多大，那么就需要有一个过程
	let postData = "";
	request.on("data", (paramsData) => {
		// 将传入的值，进行拼接，直到传输结束
		postData += paramsData;
	});
	request.on("end", () => {
		// 数据接收完毕	
		console.log("post类型的数据:");
		console.log(postData);
		console.log(JSON.parse(postData));
		
		// 前后端交互的重点，其实就是保证数据的准确无误
	});


	// 在拼接之前，我们需要对参数进行处理
	// 包括获取url其中的参数，和将请求类型统一小写格式
	console.log("解析后的参数:", RouterUrl.parse(url, true))
	// 从中拿到query 请求参数，和单纯的路径 pathname
	let {
		query,
		pathname
	} = RouterUrl.parse(url, true);
	let routes = method.toLocaleUpperCase() + pathname;
	console.log("后端路由:", routes);
	// 使用完成的后端路由进行访问
	switch (routes) {
		case "GET/index":
			response.end("<h1>功能页面</h1>");
			break;
		case "POST/index":
			response.end("保存商品列表");
			break;
		case "GET/home":
			response.end("<h1>首页页面</h1>");
			break;
		case "GET/login":
			response.end("<h1>登陆页面</h1>");
			break;
		case "POST/login":
			// 用户登陆的行为明显的是需要获取参数的
			// 如何去获取？
			// 请求，响应的模型中，每一次传输值，都是需要设置编码的
			response.end("用户进行登陆");
			break;
		case "GET/book":
			// 书籍页面有很多书籍，需要使用一个参数来知道获取的是
			console.log("获取到的书籍参数为", query)
			response.end(`<h1>书籍页面</h1>`);
			break;
		default:
			// 这个回调函数会包含请求和响应两个对象
			// 我们可以使用提供的响应对象，去发送数据
			// BS架构的交互模型，是前端请求request，后端响应response
			response.end("404页面");
			break;
	}
})


// 4启动服务,监听指定的端口
server.listen(3000);

// 提示服务器启动成功
console.info("服务器启动成功....");