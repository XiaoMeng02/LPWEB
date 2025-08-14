<template>
  <div class="person">
    <h2>一辆{{ car.brand }}，价格{{ car.price }}万</h2>
    <button @click="changePrice">修改汽车的价格</button>
    <button @click="changeBrand">修改汽车的品牌</button>
    <button @click="changeCar">修改汽车的品牌</button>
    <hr>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changSum">点击sum + 1</button>
  </div>

</template>
<!-- 1.若需要一个基本类型的响应式数据，使用ref
    2.若需要一个响应式对象类型，层级不深，使用ref,reactive 都可以
    3.若需要一个响应式对象，层级较深，使用reactive-->
<script lang="ts" setup name="Person">
//ref ====> 可以定义：基本类型、对象类型的响应式数据
//reactive ====> 只能定义：对象类型响应式数据
import { ref,reactive } from 'vue'
//数据
let car = reactive({ brand: '奔驰', price: 100 })//源对象
let sum = ref(0)


//方法
function changePrice() {
  car.price += 10
  console.log(car)  //输出：{ brand: '奔驰', price: 110 }
}
function changeBrand() {
  car.brand = '宝马'
}
function changeCar() {
  // car = { brand: '大众', price: 1 }  //页面不更新
  // car = reactive({ brand: '大众', price: 1 })//页面不更新
  // 下面这个写法会页面更新
  Object.assign(car, { brand: '大众', price: 1 })
  // car.value = { brand: '大众', price: 1 } //用ref有value属性，页面更新
  console.log(car)
}
function changSum() {
  // sum.value += 1
  sum = ref(9)//页面不更新
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

li {
  font-size: 20px;
}
</style>