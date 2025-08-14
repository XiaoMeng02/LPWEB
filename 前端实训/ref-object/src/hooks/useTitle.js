// 没有别的作用,就是复用设置标题的代码
// function useTitle(titleValue) {
// 	document.title = titleValue;
// }

// 改进代码
import {
	ref,
	watch
} from 'vue';


//通过返回值,设置标题的方法
function useTitle(titleValue) {

	// 1、将传递过来的数据变为响应式数据
	let title = ref(titleValue);

	// 2、侦听 title响应值的改变
	watch(title, (newValue) => {
		// 一旦这个值发生变化,那么修改标题值
		console.log("值发生了变化");
		document.title = newValue;
	}, {
		immediate: true
	})

	// 3、返回ref的值,由于这个title值已经是一个被监听的值
	// 对这个值进行修改,就会影响到标题的显示
	return {
		title
	}
}

export default useTitle;