<template>

        <div class="mui-numbox" data-numbox-min='0' style="height:25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="init" @change="countChange" ref="numbox" readonly/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    data(){
        return{

        }
    },
    methods:{
        countChange(){
            //数量改变了
            //console.log(this.$refs.numbox.value);
            //每当数值发生改变，则立即把最新的数据同步到 购物车的 store 中，覆盖之前的数据值
            this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value})
        }
    },
    props:['init','goodsid']
}
</script>

<style lang="scss" scoped>

</style>