<template>
  <ul class="news-list">
    <li>编号:{{ query.id }}</li>
    <li>标题:{{ query.title }}</li>
    <li>内容:{{ query.content }}</li>
  </ul>
</template>

<script setup lang="ts" name="About">
  import { useRoute } from 'vue-router'
  import { toRefs } from 'vue'

  let route = useRoute()
  // console.log('@',route)
  let {query} = toRefs(route)//需要加上toRefs，否则query为响应式对象，无法直接使用
  
</script>

<style scoped>
  .news-list {
    list-style: none;
    padding-left: 20px;
  }

  .news-list>li {
    line-height: 30px;
  }
</style>