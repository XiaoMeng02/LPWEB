<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Person',
  setup() {
    // console.log(this)//setup函数中的this是undefined,Vue3已经弱化this
    //数据 注意：此时的name,age,tel都不是响应式的
    let name = '张三' 
    let age = 19      
    let tel = '13812345678'
    //方法
    function changeName() {
      console.log(1)
      name = 'zhang-san'//注意：这样修改name,页面是没有变化的
      console.log(name)
      
    }
    function changeAge() {
      age += 1
    }
    function showTel() {
      alert(tel)
    }
    //返回数据
    return { name, age, changeName, changeAge, showTel };

  }
}
</script>
<style scoped>
.person {
  background-color: bisque;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 30px;
}

button {
  margin: 0 10px;
}
</style>