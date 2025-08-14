import {defineStore} from 'pinia'

export const useCountStore = defineStore('count',{
  // actions里面放置的是一个一个的方法，用于响应组件中的“动作”
  actions:{
    increment(value:number){
      console.log('increment被调用了',value)
      if( this.sum < 10){
        // 修改数据（this是当前的store）
        this.sum += value
      }
    }
  },
  // 真正存储数据的地方
  state(){
    return {
      sum:2,
      school:'atguigu',
      address:'宏福科技园'
    }
  },
  getters:{
    // 用于获取数据的方法
    // bigSum(state){
    //   return state.sum * 10
    // },
    //箭头函数
    bigSum: (state) => state.sum * 10,
    //用this不能用箭头函数
    // upperSchool(stat){
    //   console.log('@@@@!!!!!!!!!!!!!!!',this)
    //   return this.school.toUpperCase()
    // }
     upperSchool():string{
      console.log('@@@@!!!!!!!!!!!!!!!',this)
      return this.school.toUpperCase()
    }
  }
})