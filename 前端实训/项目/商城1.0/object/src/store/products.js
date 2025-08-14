import {
	defineStore
} from "pinia";

const useProducts = defineStore("products", {
	state: () => {
		return {
			// 商品的列表 数据格式如下 这种写法对于ai也有帮助
			// 如果不提供数据给ai，那么ai只能靠自己猜测数据格式
			// 基于猜测数据，所得到的答案，大部分情况下，都是错误的
			// {"id":"2","priceTag":"热销商品","priceType":"电子产品","name":"无线蓝牙耳机 主动降噪长续航入耳式","price":299,"originalPrice":499,"discount":6,"rating":4.7,"imgUrl":"https://picsum.photos/300/300?random=1"}
			products: [],
			// 分类数据
			categories: [],
		}
	},
	getters: {
		// 返回一个函数，接收参数 tag
		showProductsByTag(state) {
			// 通过返回函数实现参数传递，如果步使用这样的方法，计算属性无法接受参数
			return (tag) => {
				return state.products.filter((product) => {
					// 使用传入的参数 tag 进行筛选
					return product.priceTag === tag;
				});
			};
		},
		// 根据类型完成商品筛选的方法
		showProductsByType(state) {
			return (Type) => {
				return state.products.filter((product) => {
					return product.priceType === Type;
				});
			};
		},
		// 查看当前商品列表的长度
		// 以后我们要实现分页查询，所以使用一个计算属性，方便实现分页查询的效果
		getProductLength(state) {
			return state.products.length;
		}
	},
	actions: {
		// 根据id，查找商品
		queryProductsById(ProductId) {
			// 使用for循环查找值
			for (let i = 0; i < this.products.length; i++) {
				if (this.products[i].id == ProductId) {
					return this.products[i];
				}
			}
		},
	}
})

export default useProducts;