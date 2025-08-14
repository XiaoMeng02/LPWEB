<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>测试：{{ obj.a.b.c }}</h2>
    <button @click="test">修改obj.a.b.c</button>

  </div>
</template>

<script lang="ts" name="Person" setup>
import { reactive, watch } from 'vue'

let person = reactive({
  name: '张三',
  age: 18
})
let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

//方法
function changeName() {
  person.name += '~'  //修改姓名
}
function changeAge() {
  person.age += 1  //修改年龄  
}
function changePerson() {
  Object.assign(person, { name: '李四', age: 90 }) //修改整个人me :'李四',age: 90}
}
function test() {
  obj.a.b.c = 999  //修改obj.a.b.c
}
/* 监视,情况三：监视【reactive】定义的【对象类型】数据,且默认开启深度监听
 
 */
watch(person, (newVal, oldVal) => {
  console.log('监视到person变化：', newVal, oldVal)
})
watch(obj, (newVal, oldVal) => {
  console.log('监视到obj变化：', newVal, oldVal)
}, { deep: false })
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

li {
  font-size: 20px;
}
</style>