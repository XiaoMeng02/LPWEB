<template>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">{{ p.name }} -- {{ p.age }}</li>
    </ul>
  </div>
</template>

<script lang="ts" name="Person" setup>
  import { withDefaults } from 'vue'
  import { type Persons } from '@/types'
  //接收a
  // defineProps(['a'])

  //只接收list
  // defineProps(['list'])

  //接收list,+限制类型
  // defineProps<{ list: Persons}>()

  //接受list,+限制类型+限制必要性 + 指定默认值
  withDefaults(defineProps<{ list?: Persons}>(), { 
    list: () =>[{ id: 'abc01', name: '康师傅·特仑苏', age: 20 }] // 默认值是一个函数，返回一个默认的list
  })

  //接受list,同时将props保存起来
  // defineProps<{ list?: Persons}>()
  

  //接受list,同时将props保存起来
  // let x = defineProps(['list'])
  // console.log(x.list);

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