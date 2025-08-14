<template>
  <!-- <Person a="哈哈" :list="personList" b="1+1" :c="1+1" /> -->
  <Person a="哈哈" :list="personList" />
</template>

<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import { reactive } from 'vue'
  import {type Persons } from '@/types'

  let personList = reactive<Persons>([
    {id:'abcd01',name:'John',age:25},
    {id:'abcd02',name:'zhangsan',age:20},
    {id:'abcd02',name:'王五',age:18}
  ])
</script>

<style>

</style>