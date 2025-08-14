<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>车型：{{ person.car.c1 }} {{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeCar1">修改第一台车</button>
    <button @click="changeCar2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" name="Person" setup>
  import {reactive,watch}  from 'vue'

//数据
let person = reactive({
  name: '张三',
  age: 18,
  car:{
    c1: '宝马',
    c2: '奔驰'
  }
})

//方法
function changeName() {
  person.name += '~'
}

function changeAge() {
  person.age += 1
}

function changeCar1() {
  person.car.c1 = '大众'
}

function changeCar2() {
  person.car.c2 = '小鹏'
}

function changeCar() {
  person.car = { c1: '雅迪',c2: '爱玛'}
}
//监视，情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
// watch(() => person.name,(newVal, oldVal) => {
//   console.log('person.name变化了', newVal, oldVal)
// })
//监视，情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写成函数式，更推荐写函数
watch(() =>person.car,(newVal, oldVal) => {
  console.log('person.car变化了', newVal, oldVal)
},{deep:true})
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