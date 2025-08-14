<template>
    <div>
        <div class="talk">
            <button @click="getTalk()">获取一句土味情话</button>
            <ul>
                <li v-for="talk in talkList" :key="talk.id">{{talk.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="LoveTalk">
    import { reactive } from 'vue'
    import axios from "axios"
    import { nanoid } from "nanoid"
    
    //数据
    let talkList = reactive([
        {id: 'zxcvb01',title: '今天你有点怪，哪里怪？怪好看的！'},
        {id: 'zxcvb02',title: '草莓、蓝莓、蔓越莓，今天你吃哪个？'},
        {id: 'zxcvb03',title: '给你listen，一首歌，一首'}
])
    //方法
    async function getTalk() {
        //发请求，下面这行的写法是连续解构赋值加重命名
        let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
        let obj ={id:nanoid(),title}
        //放到数组中
        talkList.unshift(obj)
        // console.log(obj)
    }

</script>

<style scoped>
    .talk {
        background-color: rgb(255, 140, 78);
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px;
    }
    select,button{
        margin: 0 5px;
        height: 25px;
    }
</style>