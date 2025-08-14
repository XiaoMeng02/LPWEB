import {defineStore} from "pinia";

// 保存用户购物车相关数据的仓库
const useCart = defineStore("cart", {
	state: () => {
		return {
			cartItems: []
		}
	},
	getters: {

	},
	actions: {

	}
})

export default useCart;