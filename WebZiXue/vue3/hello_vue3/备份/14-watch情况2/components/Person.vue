<template>
  <div class="person">
    <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>

  </div>
</template>

<script lang="ts"  name="Person" setup>
  import { ref,watch } from 'vue'

  let person = ref({
    name: '张三',
    age: 20
  })

//方法
  function changeName() {
    person.value.name += '~'
  }
  function changeAge() {  
    person.value.age += 1
  }
  function changePerson() {
    person.value = {name :'李四',age: 90}
  }
 /* 监视,情况二：监视【ref】定义的【对象类型】数据，监视的是地址值，若想监视对象内部属性变化，要手动开启深度监视
  watch的第一个参数是:被监视的数据
  watch的第二个参数是:回调函数，接收两个参数：新值和旧值
  watch的第三个参数是:配置对象（deep，immediate等等。。。）
  注意：若修改的是整个ref定义的对象中属性,newValue和oldValue都是新值，因为他们是同一个对象
  若修改整改ref定义的对象,newValue是新对象，oldValue是旧对象，因为他们是不同的对象
  */
  watch(person, (newVal, oldVal) => {
    console.log('监视到数据变化：', newVal, oldVal)
  }, {deep:true})
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