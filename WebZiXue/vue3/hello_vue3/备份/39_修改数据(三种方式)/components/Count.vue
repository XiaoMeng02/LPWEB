<template>
    <div class="count">
       <h2>当前求和为: {{ countStore.sum }}</h2>
       <h3>欢迎来到：{{ countStore.school }},坐落于：{{ countStore.address }}</h3>
       <select v-model.number="n">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
       </select>
       <button @click="add">加</button>
       <button @click="minus">减</button>
    </div>
</template>

<script setup lang="ts" name="Count">
  import { ref,reactive } from 'vue'
  //引入userCountStore
  import { useCountStore } from "@/store/count";
  //使用userCountStore,得到一个专门保存count相关的store
  const countStore = useCountStore() //获取count模块的状态

  //数据
  let n = ref(1) //用户选择的数字
  //方法
  function add() {
    //第一种修改
    // countStore.sum += 1
    // countStore.school = '尚硅谷'
    // countStore.address = '北京洪福科技园'

    //第二种
    // countStore.$patch({ sum: 888, school: '尚硅谷', address: '科技园' }) //使用$patch方法修改状态

    //第三种
    countStore.increment(n.value)
    //  if(countStore.sum < 10){
    //   countStore.sum += 1
    // }
  }

  function minus() {
    countStore.sum -= n.value //countStore.sum 代表当前的求和
  }
</script>

<style scoped>
    .count {
        background-color: skyblue;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px;
    }
    select,button{
        margin: 0 5px;
        height: 25px;
    }
</style>