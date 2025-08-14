<template>
    <div>
        <div class="talk">
            <button @click="getTalk()">获取一句土味情话</button>
            <ul>
                <li v-for="talk in talkStore.talkList" :key="talk.id">{{talk.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="LoveTalk">
    import { useTalkStore } from "@/store/loveTalk"
    import {storeToRefs} from "pinia"

    const talkStore = useTalkStore()
     const {talkList } = storeToRefs(talkStore) //将talkStore的talkList转为响应式数据
    //方法
    function getTalk() {
       talkStore.getAtalk()
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