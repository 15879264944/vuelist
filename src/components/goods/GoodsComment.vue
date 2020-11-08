<template>
    <div>
        <cmtbox :id="this.id"></cmtbox>
    </div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,//获取路由地址中的id
        }
    },
    components:{
        cmtbox
    }
}
</script>

<style lang="scss" scoped>

</style>