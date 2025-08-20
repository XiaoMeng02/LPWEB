import { ref,reactive } from 'vue'

const count = ref(10)
const count1 = ref<string>("100")
const obj11 = reactive({
    name:"a",
    age:10
})

const obj2 = reactive<{
    a:string,
    b:number
}>({
    a:"a",
    b:10
})
