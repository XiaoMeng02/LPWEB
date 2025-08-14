// 将代码改成数据驱动的格式
// 什么是数据驱动？就是变化都依据数据的改变进行
// 我们不需要再去花费时间注意dom的变化，只需要关注数据如何进行变化即可

// 数据驱动实现购物车基本逻辑 
// 1 如何实现商品的数量的增加减少
// 2 如何实现新增，删除商品
// 3 如何实现计算总价

// 完成新增的前后交互的需求
// 1获取数据库中的购物车信息，放到购物车页面上
// 2实现订单的生成和保存

// 作业 在购物车代码基础上 实现商品列表修改的保存

// 保存空提示的常量文本
const emptyHint = document.getElementById("empty-cart").cloneNode(true);
emptyHint.style.display = "block"


// 获取用户信息
function getQueryParam(name) {
	// 通过解析url得到传过的值
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// 获取用户名参数
const username = getQueryParam('username');
// 如果每一次测试，都需要登陆，这种情况下，我们会使用测试参数
// 使用固定的测试参数，去替换一些需要比较麻烦获取的值，来进行测试
// 根据不同的用户，保存不同的购物车信息
// 根据登陆的不同的账户，我们获取不同的购物车信息
// const username = "xiaoli";

// 实现一条业务线以后，需要完整测试一次或者多次



function delUnit() {
	// 如果这样去写，那么依然是靠dom的行为去操控显示
	// console.log("删除事件", this.parentElement.parentElement);
	// cartItems.removeChild(this.parentElement.parentElement)

	// 这里操作的应该是数据本身，而非dom
	// 也就是说，这里应该删除掉数组中指定的值
	// 由于i的值是使用let定义的，所以不会出现闭包，能够使用i的值
	console.log(`删除第${this.delNum}个值`);

	// 删除指定的值
	this.productList.splice(this.delNum, 1);

	// 查看数据上的变化有没有问题
	console.log("UnitList", this.productList);
	// 自己调用自己
	mapData(this.productList);
}


// 实现映射数据的方法
// 将数据的变化同步到页面中，当数据发生变化的时候，调用这个方法
// 函数中最好不要使用全局的固定值，比如这个例子中的UnitList
// 这样函数会失去原本的意义，也就是复用的功能
function mapData(productList) {
	// 商品列表
	let cartItems = document.getElementById("cart-items");
	// 商品模板
	let muban = document.getElementById("muban");
	// 购物车总价格的元素
	let sumShow = document.getElementById("sum");

	// 同步之前，需要将原本的内容删除（原本购物车中商品）
	cartItems.innerHTML = "";

	// 删除以后，根据数据重新生成商品列表
	// 如果商品列表的数量等于0,那么显示空提示
	if (productList.length == 0) {
		// 加入空提示
		cartItems.appendChild(emptyHint);
	} else {
		// 同步页面结构和js的数据
		let sum = 0;
		for (let i = 0; i < productList.length; i++) {
			// 使用结构获取元素的效率比较高，使用类名或者其他的查询方法，比较慢
			let newUnit = muban.cloneNode(true);
			newUnit.id = "";
			// 使用类名获取需要修改值的元素,将对象中的值同步到页面上
			newUnit.querySelector(".name").innerHTML = productList[i].productName;
			newUnit.querySelector(".price").innerHTML = productList[i].productPrice;
			newUnit.querySelector(".productNumber").innerHTML = productList[i].productNumber;

			// 单个商品的价格
			let productSum = productList[i].getProductSum();
			// 重新设置单个商品总价
			newUnit.querySelector(".productSum").innerHTML = productSum;
			// 累加所有商品的总计
			sum += productSum;



			// 加入删除按钮的绑定事件 
			newUnit.querySelector(".deletBtn").addEventListener("click", delUnit.bind({
				delNum: i,
				productList
			}))

			// 增加减少商品数量的事件
			newUnit.querySelector(".minusBtn").addEventListener("click", function() {
				productList[i].setProductNumber(-1);
				mapData(productList);
			})
			newUnit.querySelector(".plusBtn").addEventListener("click", function() {
				productList[i].setProductNumber(1);
				// 只要数据发生了变化，调用重新映射的函数
				mapData(productList);
			})

			cartItems.appendChild(newUnit);
		}
		// 更新所有商品的总价
		sumShow.innerHTML = sum;
	}
}


// 声明一个购物车单元类
class CartUnit {
	// productName 商品名称 string类型
	// productPrice 商品价格 number类型
	constructor(productName, productPrice, productNumber = 0) {
		this.productName = productName;
		this.productPrice = Number(productPrice);

		// 商品的数量 初始化为0
		this.productNumber = productNumber;
	}

	//根据传入的值，减少或者增加商品数量
	setProductNumber(num) {
		if ((this.productNumber + num) < 0) {
			this.productNumber = 0;
		} else {
			this.productNumber += num;
		}
	}


	// 获取单个商品总价的方法
	// 单个商品的总价,不是人为设置的,而是通过计算得到的,这种值一般通过函数获得
	getProductSum() {
		// 当前商品数量乘以商品价格
		return this.productNumber * this.productPrice;
	}
}

// 请求后端对应账户信息的方法
function queryGetMessage() {
	axios.get(`http://localhost:3000/carts?username=${username}`).then((rls) => {
		// 这里返回的是一个对象数组的类型
		console.log("结果集", rls.data);
		if (rls.data.length == 0) {
			// 如果没有则为空
			UnitList = [];
		} else {
			console.log("保存数据");
			// 如果有购物车信息，则保存信息，需要将获取到的值封装成本地的对象的类型

			for (let i = 0; i < rls.data[0].products.length; i++) {
				// 以解构的方式取值
				let {
					productName,
					productPrice,
					productNumber
				} = rls.data[0].products[i];
				UnitList.push(new CartUnit(productName, productPrice, productNumber));
			}
			// 获取到后端数据后，渲染页面
			mapData(UnitList);
		}
	}).catch((error) => {
		console.log("请求失败，请检查网络");
	})
}

// 使用对象数组的类型，保存数据
let UnitList = [];

// 页面初始化的时候，从后端获取商品的信息
queryGetMessage();



// 当触发新增事件的时候,往数组中添加元素
let addItem = document.querySelector("#addItem");


// 这里尽管完成了数据的添加，但是变化并没有映射到dom中
addItem.addEventListener("click", function() {
	// 获取到的新增商品信息
	let productName = document.getElementById("product-name");
	let productPrice = document.getElementById("product-price");

	// 使用获取到的商品信息，添加新的商品单元
	UnitList.push(new CartUnit(productName.value, productPrice.value));

	// 调用数据和页面同步的方法
	mapData(UnitList);
});


// 当点击结算按钮的时候，将购物车中的数据发送到后端保存
let sendRls = document.getElementById("sendRls");

// 绑定结算事件
// 如果使用的是之前的dom结构，那么需要从页面中获取所有的数据，生成对象
sendRls.addEventListener("click", function() {
	// 如果没有购买任何物品，需要检查一下
	if (UnitList.length == 0) {
		alert("请添加商品后结算。");
		return false;
	}

	// 将数据对象发送给后端
	axios.post("http://localhost:3000/order", {
		username, //订单的用户
		startTime: new Date(), //订单的时间
		message: UnitList, //订单信息
	}).then((rls) => {
		alert("购物车结算成功!");
		console.log("返回的结果", rls);
	}).catch((error) => {
		console.log("保存商品信息失败，请检查网络");
	})
})