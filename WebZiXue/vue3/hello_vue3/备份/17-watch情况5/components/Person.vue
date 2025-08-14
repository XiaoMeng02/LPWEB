<template>
  <div class="person">
    <h1>情况五：监视上述多个数据</h1>
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
//监视：情况五：监视上述多个数据
watch([() => person.name,() => person.car.c1],(newVal, oldVal) => {
  console.log('person.name和person.car.c1变化了', newVal, oldVal)
}, {deep: true})

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