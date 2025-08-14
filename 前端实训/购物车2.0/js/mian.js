// 数据驱动实现购物车基本逻辑 
// 1 如何实现新增，删除商品
// 2 如何实现商品的数量的增加减少
// 3 如何实现计算总价

// 完成新增的前后端交互的需求
// 1获取数据库中的购物车信息，放到购物车页面上
// 2实现订单的生成和保存

// 获取用户信息
function getQueryParam(name) {
	// 通过解析url得到传过的值
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// 获取用户名参数
const username = getQueryParam('username');

Vue.createApp({
	data() {
		return {
			// 账户信息
			username,
			// 商品列表的数据从数据库中获取
			productList: [{
					"id": 1,
					"productName": "iPhone 15",
					"productPrice": 7999,
					"productNumber": 0
				},
				{
					"id": 2,
					"productName": "MacBook Air",
					"productPrice": 9999,
					"productNumber": 0
				},
				{
					"id": 3,
					"productName": "Apple Watch Series 9",
					"productPrice": 3999,
					"productNumber": 0
				}
			],
			// 单个添加商品的名称和价格
			product: {
				"productName": "商品模板",
				"productPrice": 10,
				"productNumber": 0
			}
		}
	},
	methods: {
		// 增加商品的方法
		addDroduct() {
			// 数据驱动的逻辑中，增删改查的一般是数据，不用关心dom
			this.productList.push(this.product);
		},
		//删除商品的方法
		delDroduct(index) {
			// 删除事件，同样也是对数据进行修改，只不过从增加值，变成了删除值
			this.productList.splice(index, 1);
		},
		// 增加商品数量和减少商品数量的效果
		// index是修改的商品下标，num是修改的数量
		setProductNumber(index, num) {
			// 累加传入的值
			this.productList[index].productNumber += num;
		},
	},
	// 使用计算属性，完成总价的计算
	computed: {
		// 计算属性，计算商品的总价
		productSum() {
			// 同样的，这里的总价计算，是通过保存的数据进行累加
			// 将累加得到的数据进行返回
			return this.productList.reduce((sum, product) => {
				return sum += (product.productPrice * product.productNumber);
			}, 0);
		}
	},
	// 钩子函数 当条件成熟的时候,触发的函数
	// 如果不使用钩子函数,完成后端请求,和之前的写法就没区别了
}).mount("#app");