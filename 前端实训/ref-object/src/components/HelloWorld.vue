<template>
    <div>
        <h1>这个是User组件</h1>
    </div>
</template>

<script>
export default {
    setup () {
        // 定义数据
        let username = 'HelloWorld';
        // 定义方法
        let run = () => {
            console.log('...run...');
        }
        return {
            username,
            run
        }
    }
}
</script>

<style>

</style>