//实现登陆注册效果
// 1.收集表单  通过Ajax向后端请求
//2.请求完成后，通过对比，得到登陆结果
// 3.登陆失败，弹窗提示
//4.登陆成功，调整页面

//触发登陆事件
loginBtn.addEventListener("click",()=>{
})
//获取登陆表单
let loginInput = document.querySelectorAll(".loginFrom");
//将获取到的键值加入到对象中
for(let i;i < loginInput.length;i++){
    console.log("name",loginInput[i].name)
    console.log("value",loginInput[i].value)
    
}