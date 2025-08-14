<template>
  <div class="person">
    <h2>需求：当温度达到60度，或水位达到80cm时，给服务器发请求</h2>
    <h2>当前水温：{{ temp }}℃</h2>
    <h2>当前水位：{{ height }}cm</h2>
    <button @click="changeTemp">点击水温+10</button>
    <button @click="changHeight">点击水位+10</button>
  </div>
</template>

<script lang="ts" name="Person" setup>
  import { ref,watch,watchEffect} from 'vue'

  //数据
  let temp = ref(10)
  let height = ref(0)

  //方法
  function changeTemp() {
    temp.value += 10
  }
  function changHeight() {
    height.value += 10
  }
  //监视 -->watch实现
  // watch([temp, height], (value) => {
  //   let [newTemp, newHeight] = value
  //   //逻辑
  //   if(newTemp >= 60 || newHeight >= 80){
  //     console.log('给服务器发请求')
  //   }
  // })

  //监视 -->watchEffect实现
  watchEffect(() => {
    if(temp.value >= 60 || height.value >= 80){
      console.log('给服务器发请求')
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