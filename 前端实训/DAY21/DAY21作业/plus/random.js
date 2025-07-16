// 为了防止命名冲突
let RD = {
	getRandom(MAX, MIN) { // 封装的随机数代码
		return Math.floor(Math.random() * (MAX - MIN)) + MIN;
	},
	getRandomStr(num) { // 通过随机数组下标，随机一个字符
		// 随机生成四个字符
		// 1.AI生成随机字库  2.通过UTF-8生成随机中文字符 3.通过随机ascll码生成 
		let arrStr = ["A", "B", "C", "D", "E", "F", "G", "￥", "$", "%"]
		// 保存随机出随机字符的
		let RandomStr = [];
		for (let i = 0; i < num; i++) {
			RandomStr.push(arrStr[getRandom(arrStr.length, 0)]);
		}
		return RandomStr;
	},
	getRandomColor() { // 随机生成颜色和透明度的方法
		return `rgba(${getRandom(255,0)},${getRandom(255,0)},${getRandom(255,0)},${getRandom(9,6) / 10})`;
	}
}