<template>
  <div class="person">
    <h2>一辆{{ car.brand }}，价格{{ car.price }}万</h2>
    <button @click="changePrice">修改汽车的价格</button>
    <br>
    <h2>游戏列表：</h2>
    <ul>
      <!-- v-for games是数据源，g是里面每一个数据项，:key = v-bind:  key是给每一个数据项一个唯一标识，方便vue做一些优化 -->
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeNameFirstGame">修改第一个游戏名称</button>
  </div>
  <hr>
  <h2>测试对象：{{ obj.a.b.c }}</h2>
  <button @click="changeObj">测试</button>
</template>

<script lang="ts" setup name = "Person">
import { reactive } from 'vue'
//数据
let car = reactive({brand:'奔驰',price:100})//源对象
let games = reactive([
  {id:'aysdy01',name:'王者荣耀'},
  {id:'aysdy02',name:'绝地求生'},
  {id:'aysdy03',name:'刺激战场'},
])

let obj = reactive({
  a:{
    b:{
      c:666
    }
  }
})

//方法
function changePrice() {
  car.price += 10
  console.log(car)
  // console.log(Proxy)
}

function changeNameFirstGame() {   
    games[0].name = '贪吃蛇'
    console.log(games)
    }
    
function changeObj() {
  obj.a.b.c = 888
  console.log(obj)
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
li{
  font-size: 20px;
}
</style>