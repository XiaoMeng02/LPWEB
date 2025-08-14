<template>
  <div class="person">
    <h1>中国</h1>
    <h2 ref="title2">北京</h2>
    <h3>尚硅谷</h3>
    <button @click="showLog">点击输出h2这个元素</button>
  </div>
</template>
<!-- ref可以用在dom元素上，也可以用在组件上，用法如下： -->
<script lang="ts" name="Person" setup>
  import { ref,defineExpose } from 'vue'
  //创建一个title2,用于存储ref标记的内容
  const title2 = ref()
  let a = ref(0)
  let b = ref(1)
  let c = ref(2)

  function showLog (){
    console.log(title2.value) //输出h2这个元素
    
  }
  // 定义一个公开的接口，供父组件调用
  defineExpose({a,b})  
</script>
<!-- //scoped表示只对当前组件有效，不会影响全局 -->
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