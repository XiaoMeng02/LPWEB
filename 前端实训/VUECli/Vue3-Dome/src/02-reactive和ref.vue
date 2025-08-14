<script setup>
//reactive:接收一个对象型数据，返回一个响应式对象，对象中的属性发生变化时，响应式对象也会跟着变化
//问题：如果是简单类型怎么办？
// import { reactive } from 'vue'
// const state = reactive({
//     count: 100
// })
// const setCount = () => {
//     state.count++
// }

// 2.ref:接收一个简单类型数据，返回一个响应式对象，数据发生变化时，响应式对象也会跟着变化
//本质：是在原有传入的基础上，外层包了一层对象，包成了复杂类型
// 底层：包成复杂类型之后，再借助reactive包装成响应式对象
// 注意点：
// 1.访问数据，需要通过.value来获取，不能直接访问
// 2.在template中，.value不需要添加（帮我们扒了一层）

//推荐：以后声明数据，统一用ref => 统一编码规范
import { ref } from 'vue'
const count = ref(0)
console.log(count.value)
const setCount = () => {
    count.value++
}

</script>
<template>
    <div>{{count }}</div>
    <button @click="setCount">+1</button>
</template>