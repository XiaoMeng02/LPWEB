<template>
  <div class="person">
    <h2>当前求和为：{{ sum }},放大10倍为:{{ bigSum }}</h2>
    <button @click="add">点击我+1</button>
    <hr>
    <img v-for="dog in dogList" alt="" :src="dog">
    <button @click="getDog">再一只小狗</button>
  </div>
</template>

<script lang="ts" name="Person" setup>
import useDog from '@/hooks/useDog'
import useSum from '@/hooks/useSum'

const { sum, add , bigSum } = useSum()
const { dogList, getDog } = useDog()

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
img{
  height: 150px;
  margin: 10px;
}
</style>