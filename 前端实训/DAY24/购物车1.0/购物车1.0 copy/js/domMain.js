// 实现登陆， 注册逻辑，实现购物车页面，实现购物车逻辑
// 购物车基本逻辑 
// 1 如何实现商品的数量的增加减少
// 2 如何实现新增，删除商品
// 3 如何实现计算总价

// 完成新增的前后交互的需求
// 1实现商品列表修改的保存
// 2实现订单的生成
// 3获取数据库中的订单，放到购物车页面上

// 和AI提需求
// 错误示范
// 我需要一个购物车功能的页面
// 正确示范
// 实现购物车基本逻辑 
// 1 如何实现商品的数量的增加减少
// 2 如何实现新增，删除商品
// 3 如何实现计算总价
// 完成前后交互的需求
// 实现商品列表修改的保存，实现订单信息的生成


// 完成第一个功能，商品的增加减少的功能
function productMinus(event) {
	// 获取到保存单个商品数量的元素
	// this. 是触发点击事件的元素
	// nextElementSibling 获取该元素的下一个兄弟元素
	let numElement = this.nextElementSibling;
	// 商品的数量信息
	let num = Number(numElement.innerHTML);
	// 将其中的值减一并保存回元素
	numElement.innerHTML = num - 1;

	setPriceSum(this, num - 1);
}

function productPush(event) {
	let numElement = this.previousElementSibling;
	let num = Number(numElement.innerHTML);
	numElement.innerHTML = num + 1;

	// 调用方法,实现小计的计算
	setPriceSum(this, num + 1);
}

// 既然小计的代码会被复用,那么就有封装的必要
function setPriceSum(dom, num) {
	// 当增加完成后,重新计算该商品的小计价格
	// 获取商品的单价
	let productPrice = dom.parentElement.previousElementSibling.lastElementChild.innerHTML;

	// 有了商品的单价,有了商品的数量,得到商品的小计价格
	let productSum = productPrice * num;

	// 同样通过结构找到指定的记录小计的元素，修改其值
	let sumDom = dom.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild;
	sumDom.innerHTML = productSum;

	// 小计值改变的时候
	setSum();
}

// 获取并设置商品总价
function setSum() {
	// 获取商品小计价格的列表
	let productSumList = document.querySelectorAll(".productSum");

	// 累加值
	let sum = 0;
	for (let i = 0; i < productSumList.length; i++) {
		sum += Number(productSumList[i].innerHTML);
	}

	// 加入总计值
	let domSum = document.querySelector("#sum");
	// 修改总计值
	domSum.innerHTML = sum;
}


// 将事件和按钮进行绑定
let addItemBtn = document.querySelector("#addItem");

addItemBtn.addEventListener("click", () => {
	// 获取输入的商品名称和商品价格
	let productName = document.getElementById("product-name");
	let productPrice = document.getElementById("product-price");

	// 通过克隆的方式,实现新增元素
	// 1 获取模板元素和商品列表
	let cartItems = document.querySelector("#cart-items");
	let muban = document.querySelector("#muban");
	// 2 深度克隆这个节点
	let newNode = muban.cloneNode(true);

	// 修改克隆出来的元素id
	newNode.id = "";
	// 修改克隆出来的节点
	let nodes = newNode.firstElementChild.childNodes;
	let nodeI = 0;
	for (let i = 0; i < nodes.length; i++) {
		// 找到这一组元素中,元素节点的第二个元素
		if (nodes[i].nodeType == 1) {
			nodeI++;
			if (nodeI == 1) {
				// 重新设置图片路径
				nodes[i].querySelector("img").src =
					`https://picsum.photos/200/200?random=${RD.getRandom(100,0)}`;
			}
			if (nodeI == 2) {
				console.log(nodes[i]);
				// 对节点中的值进行修改
				nodes[i].querySelector("h3").innerHTML = productName.value;
				nodes[i].querySelector("P").innerHTML = productPrice.value;
				break;
			}
		}
	}

	// 给修改好的元素添加事件
	// 增加减少事件
	newNode.querySelector(".minusBtn").addEventListener("click", productMinus);
	newNode.querySelector(".plusBtn").addEventListener("click", productPush);
	// 删除事件
	newNode.querySelector(".deletBtn").addEventListener("click", function(event) {
		// 在删除节点的时候，通过父元素删除子元素
		console.log(this.parentElement.parentElement);
		cartItems.removeChild(this.parentElement.parentElement);

		// 删除节点的时候,价格也需要重新计算
		setSum();
	});

	// 3 将新的节点,添加到商品列表中
	cartItems.appendChild(newNode);
})

// 完成总价计算的操作
// 实现单个商品的小计
// 将所有的商品的小计价格累加,能得到总价


// 到这一步为止,购物车页面的基本的功能完成了
// 我们这里实现这些操作的思路叫做dom驱动 , 一切的变化以页面上的元素为准,这是一种实现方法
// jquery这类框架,就是标准的以dom为驱动的框架
// 当使用这种思维进行开发，会发现想增加一个新的功能非常的麻烦，也很容易出错
// 因为我们需要进行大量的dom操作才能完成
// 比如这些代码中，想要实现将购物车的订单信息，发生给后端，工作量非常大，数据都存储在页面上，而非某个数据结构中



// 改进思路，将dom驱动的思维改为数据驱动
// 这也是vue或者recat这样的较新的框架的实现思路