import { defineStore } from 'pinia'

export const useTalkStore = defineStore('talk', {
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