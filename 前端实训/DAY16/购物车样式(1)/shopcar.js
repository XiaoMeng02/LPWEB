// 能够新增减少商品数量  完成
// 能够新增商品种类  完成
// 能够计算商品总价，总价随着商品数量变化而变化 完成
// 购物车中实现删除效果

// 把难的少的问题，变成简单的多的问题
// 先完成增加，减少

// 获取所有增加按钮
let addList = document.querySelectorAll(".add");
// 获取所有减少按钮
let subList = document.querySelectorAll(".sub");


// 商品的个数保存在哪里？以什么形式保存？
// 先使用自定义属性保存商品个数
// 绑定增加的事件
for (let i = 0; i < addList.length; i++) {
	addList[i].addEventListener("click", function(event) {
		// console.log("增加商品");
		// 当点击以后，如何修改这个值
		// 通过事件对象的target属性，获取到当前被点击的元素，加号按钮
		//通过这个获取到的按钮，找到其兄弟元素 记录个数的元素
		// console.log(event.target.nextElementSibling);
		// 通过H5的自定义属性，获取保存到元素中的值
		let geshuElement = event.target.nextElementSibling;
		let geshu = geshuElement.dataset["geshu"];
		// console.log("商品当前的个数", geshu);
		// 修改并保存商品的个数
		geshuElement.innerText = Number(geshu) + 1;
		// 保存在元素中的自定义属性的商品个数也需要修改
		geshuElement.dataset["geshu"] = Number(geshu) + 1;

		getSum();
	});
}



// 实现减少效果
// 1增加代码健壮性 商品的数量不能小于0
// 2将匿名函数变成命名函数
for (let i = 0; i < subList.length; i++) {
	subList[i].addEventListener("click", function(event) {
		// 如果一直使用event.target.previousElementSibling获取值
		// 代码会显得很臃肿，所以一般会先将获取到的元素保存一下
		let geshuElement = event.target.previousElementSibling;
		let geshu = geshuElement.dataset["geshu"];

		// 如果当前的数量减一后，不等于-1，那么允许减少
		if (Number(geshu) - 1 != -1) {
			geshuElement.innerText = Number(geshu) - 1;
			geshuElement.dataset["geshu"] = Number(geshu) - 1;
		}

		getSum();
	});
}




// 新增商品的种类
// 通过节点的方式新增元素
let list = document.getElementById("list");



// 通过创建的方法新建元素
// 创建一个全新的元素
// let unit = document.createElement("div");
// unit.className = "unit";

// 创建父元素中的图片
// let img = document.createElement("img");
// img.src = "./img/img1.jpg";
// unit.appendChild(img);

// 这个方法在页面结构复杂的情况下，非常不好用


// 使用克隆的方法，创建并添加元素
// （1） 获取模板的元素
let muban = document.getElementById("muban");
// 获取添加按钮
let addBtn = document.getElementById("tijiao");

// 增加商品种类的函数
function addUnit() {
	// （2） 将元素克隆，加入父元素中
	// 1 克隆的元素，不会克隆事件
	// 2 克隆元素的内容，不是新增元素的内容

	// 保存克隆出来的模板
	let cloneMuban = muban.cloneNode(true);

	// 将克隆出来的元素,显示模式设置为可见
	cloneMuban.style.display = "block";


	// document.querySelector(".add");
	// 我们之前的写法，都是document. 获取元素
	// 翻译成人话，就是从文档中，获取指定的元素
	// 同样的，我们也可也在指定的元素中，找到想要获取的元素
	// 下面例子中，就是从克隆的模板中，找到类名叫add的元素
	// 并且给按钮添加事件
	cloneMuban.querySelector(".add").addEventListener("click", function(event) {
		let geshuElement = event.target.nextElementSibling;
		let geshu = geshuElement.dataset["geshu"];
		geshuElement.innerText = Number(geshu) + 1;
		geshuElement.dataset["geshu"] = Number(geshu) + 1;

		// 当商品的个数发生变化的时候,更新总价
		getSum();
	})
	cloneMuban.querySelector(".sub").addEventListener("click", function(event) {
		let geshuElement = event.target.previousElementSibling;
		let geshu = geshuElement.dataset["geshu"];
		if (Number(geshu) - 1 != -1) {
			geshuElement.innerText = Number(geshu) - 1;
			geshuElement.dataset["geshu"] = Number(geshu) - 1;
		}
		// 当商品的个数发生变化的时候,更新总价
		getSum();
	})


	//修改商品的描述
	// 获取所有输入
	let messageList = document.querySelectorAll(".message");
	// 将克隆的元素中的文本,进行替换
	// 获取所有的商品描述的b标签
	let bList = cloneMuban.children[1].querySelectorAll("b");
	// 替换标签内容
	for (let i = 0; i < bList.length; i++) {
		bList[i].innerText = messageList[i].value;
	}


	list.appendChild(cloneMuban);
}


// 当增加按钮被点击的时候，我们增加商品
addBtn.addEventListener("click", addUnit)



// 能够计算商品总价，总价随着商品数量变化而变化
// 每个商品的数量 乘以 单价 全部相加


// 封装这个更新总价的方法
// 什么时候需要更新总价?
function getSum() {
	// 获取每个商品的数量的元素,从其中拿到每个商品的数量
	let geshuList = document.querySelectorAll(".geshu");
	// 获取所有商品的单价
	let danjiaList = document.querySelectorAll(".jiage");
	let sum = 0;

	// 循环列表,将单价和数量相乘,得到总价
	for (let i = 0; i < danjiaList.length; i++) {
		// 得到单个商品的总价,累增到总价中
		sum += Number(geshuList[i].dataset["geshu"]) * Number(danjiaList[i].innerText);
	}

	// 将更新后的总价放到页面中
	let sumElement = document.getElementById("sum");
	sumElement.innerText = sum;
}