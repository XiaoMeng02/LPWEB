<template>
  <div class="person">
    ???
  </div>
</template>

<script lang="ts" name="Person" setup>
import {type PersonInter,type Persons} from '@/types'

// let person: PersonInter = {id:'abc01',name:'张三',age:65}

// let personList: Array<PersonInter> = [
//   {id: 'abc01',name: '张三',age: 65},
//   {id: 'abc02',name: '李四',age: 15},
//   {id: 'abc03',name: '王五',age: 30}
// ]

let personList: Persons = [
  {id: 'abc01',name: '张三',age: 65},
  {id: 'abc02',name: '李四',age: 15},
  {id: 'abc03',name: '王五',age: 30}
]




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