<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>

</template>

<script lang="ts" setup name="Person">
  import { reactive,toRefs } from 'vue';
  let person = reactive({
    name: 'John',
    age: 18,
    // hobbies: ['reading', 'traveling', 'hiking'],
    // greetings: 'Hello, my name is '
  })

  let {name, age} = toRefs(person)
  // let nl =toRefs(person,'age')
  // console.log(nl)
  //toRefs方法接收一个由reactive定义的对象，并且把对象里面的每一组key.value转换成响应式的ref对象，返回一个对象，对象的key就是reactive对象里面的key，value就是ref对象。
  console.log(toRefs(person))
//方法
  function changeName() {
    name.value +='~'
    console.log(name.value,person.name) 
    
  }
  function changeAge() {
    age.value += 1
  }

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