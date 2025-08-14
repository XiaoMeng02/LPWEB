import { customRef } from "vue"

export default function(initValue:string,delay:number) {
    //使用Vue提供的customRef定义的响应式数据
  
    let timer:number
    //track函数：监视数据变化，返回值是新值
    //trigger函数：触发数据变化，返回值是旧值
    let msg = customRef((track, trigger) => {
        return {
            //get何时调用？——msg被读取时
            get() {
                track()//告诉Vue数据msg很重要，你要对msg进行持续关注，一旦msg变化就去更新
                return initValue
            },
            //set何时调用？——msg被修改时
            set(value) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    console.log('修改了msg的值', value)
                    initValue = value
                    trigger()//告诉Vue数据msg变化了，你要去更新
                }, delay)

            }
        }
    })
    return {msg}
}

