import { defineStore } from 'pinia'
import axios from "axios"
import { nanoid } from 'nanoid'

export const useTalkStore = defineStore('talk', {
  actions: {
    async getAtalk() {
      //发请求，下面这行的写法是连续解构赋值加重命名
      let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
      let obj ={id:nanoid(),title}
      // //放到数组中
      this.talkList.unshift(obj)
      // console.log(obj)
    }
  },
    //真正存储数据的地方
  state() {
    return{
        talkList:[
          {id: 'zxcvb01',title: '今天你有点怪，哪里怪？怪好看的！'},
          {id: 'zxcvb02',title: '草莓、蓝莓、蔓越莓，今天你吃哪个？'},
          {id: 'zxcvb03',title: '给你listen，一首歌，一首'}
        ]
    }
  }
})