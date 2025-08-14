const mongoose = require("mongoose");


// 连接数据库
// 第一个参数是连接的路径
// 第二个参数是连接配置
mongoose.connect("mongodb://localhost:27017/cart", {
	// 此处添加数据库连接配置
}).then(() => {
	console.info("数据库连接成功");
}).catch((error) => {
	console.error("数据库连接失败");
});

// 定义集合结构
const userSchema = new mongoose.Schema({
	// 这里的键值对,键是存放到数据库中的键,
	// 值是数据类型或者其他约束,数据类型一定要大写
	nickname: {
		type: String,
		minlength: [2, "长度不能小于2"],
		maxlength: [6, "长度不能大于5"],
		trim: true
	},
	username: {
		type: String,
		require: [true, "账户不能为空"],
		minlength: [4, "长度不能小于4"],
		maxlength: [12, "长度不能大于12"],
		trim: true
	},
	password: {
		type: String,
		require: [true, "密码不能为空"],
		minlength: [8, "长度不能小于8"],
		maxlength: [16, "长度不能大于16"],
		trim: true
	},
	,
	points: {
		type: Number,
		require: [true, "积分不能为空"],
		min: 0,
		default: 100,
		// 自定义验证规则
		validate: {
			validator: function(value) {
				return value > 10000;
			},
			message: '一次添加太多，不允许'
		}
	},
	bio: {
		type: String,
		maxlength: [200, "长度不能大于200"],
	},
});


// 2、创建集合并应用集合
// 最后创建出来的表,会大写变小写,末尾加一个s,users
const User = mongoose.model("User", userSchema);


// 保存第一个用户的信息
// 使用save的方法,保存数据
// const user = new User({
// 	nickname: "小张",
// 	username: "xiaozhang",
// 	password: 123456,
// 	points: 100,
// 	bio: "这是小张的账户",
// });
// user.save().then(()=>{
// 	console.log("用户保存成功");
// });


//这里所有的增删改查的代码都是异步
// 也就是说,数据库相关的方法都是异步的

// 查询所有的文档内容
// 我们查询到了数据,并且数据实现了持久化
// 后面我们会学习如何限制查询条件
// User.find().then(docs => console.info(docs));

// 删除指定的文档
// 没有删除到内容不算是失败，数据库很忠实的执行了命令，只是没有找到
// 删除失败，是没有这个表，或者数据库失效等数据库的原因
// User.findByIdAndDelete({
// 	_id: '689be6b474712c86215fc305'
// }).then(doc => console.info("删除对象", doc)).catch(error => console.info("删除错误", error));


// 3、删除文档[返回删除了文档的个数]
// User.deleteMany().then(result => console.info(result));


// 更新文档的方法
User.updateOne({
	// 根据某个值，查找要修改的对象
	username: 'xiaozhang'
}, {
	// 修改这个值
	username: 'xiaowang',
	points: 1000
}).then(result => console.info(result));

// 修改这样的数据库行为，返回的是一个结果对象
// {
//   acknowledged: true,修改是否成功
//   modifiedCount: 1,修改的行数
//   upsertedId: null,
//   upsertedCount: 0,
//   matchedCount: 1
// }