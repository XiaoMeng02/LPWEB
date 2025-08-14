<template>
  <div class="person">
    <h1>情况1：监视【ref】定义的【基本类型】数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点击加1</button>
  </div>


</template>

<script lang="ts"  name="Person" setup>
 import { ref ,watch} from 'vue'
 //数据
 let sum = ref(0)
 //方法
 function changeSum() {
   sum.value += 1
 }
 //监视，情况1：监视【ref】定义的【基本类型】数据
 const stopWatch = watch(sum, (newVal, oldVal) => {
   console.log('newVal:', newVal, 'oldVal:', oldVal)
   if(newVal >= 10){
     console.log('满足条件，停止监听')
     stopWatch()
   }
 })


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