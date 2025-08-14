<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>地址：{{ address }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<!-- <script lang="ts">
export default {
  name: 'Person',
} -->
<!-- </script> -->

<script lang="ts" setup name = "Person">
import { ref } from 'vue'
//数据 注意：此时的name,age,tel都不是响应式的
let name = ref('张三')
let age = ref(19)
let tel = '13812345678'
let address = '北京市海淀区'


//1.vue2选项式语法可以和Vue3新语法setup共存
//2.旧语法可以读出新语法setup的东西，旧语法不能读出新语法setup的东西
//方法
function changeName() {
  name.value = 'zhang-san'
  console.log(name.value)
}
function changeAge() {
  age.value += 1
  console.log(age.value)
  
}
function showTel() {
  alert(tel)
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