import {
	ref
} from "vue";

// 封装需要复用的代码
let useNumber = () => {
	// 1、定义计数器
	let number = ref(0);

	// 2、递增
	let increment = () => {
		number.value++;
	}

	// 3、递减
	let decrement = () => {
		number.value--;
	}

	return {
		number,
		increment,
		decrement
	}
}

// 导出需要复用的函数
export default useNumber;