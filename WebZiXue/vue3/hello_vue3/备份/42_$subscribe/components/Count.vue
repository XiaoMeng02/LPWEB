<template>
    <div class="count">
       <h2>当前求和为: {{ sum }},放大10倍后:{{ bigSum }},大写学校名:{{ upperSchool }}</h2>
       <h3>欢迎来到：{{ school }},坐落于：{{ address }}</h3>
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
  import { ref,reactive, toRefs } from 'vue'
  import {storeToRefs} from "pinia"

  //引入userCountStore
  import { useCountStore } from "@/store/count";
  //使用userCountStore,得到一个专门保存count相关的store
  const countStore = useCountStore() //获取count模块的状态
  //storeToRefs只会关注store中的数据，不会关注方法
  const { sum, school, address,bigSum,upperSchool } = storeToRefs(countStore) //将countStore的状态转为响应式数据
  // console.log(storeToRefs(countStore))
  

  //数据
  let n = ref(1) //用户选择的数字
  //方法
  function add() {
    countStore.increment(n.value)
  }

  function minus() {
    countStore.sum -= n.value 
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