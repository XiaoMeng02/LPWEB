<template>
  <Person />
</template>

<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import { ref } from 'vue'

  let title2 = ref()
  let ren = ref()

  function showLog() {
    // console.log(title2.value)
    console.log(ren.value)//输出实例对象
  } 
</script>

<style>

</style>