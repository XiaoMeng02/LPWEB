<template>
  <Person />
</template>

<script lang="ts">
  import Person from './components/Person.vue'
  export default {
    name: 'App',//组件的名称
    components: { Person }//注册组件
  }
</script>

<style>

</style>