import { ref, onMounted,computed } from 'vue'

export default function useSum() {
    let sum = ref(0)
    let bigSum = computed(() => {
        return sum.value * 10
    })

    function add() {
        sum.value += 1
    }
    //钩子
    onMounted(() => {
        add()
    })
    //向外部提供东西
    return { sum, add, bigSum }
  
}
