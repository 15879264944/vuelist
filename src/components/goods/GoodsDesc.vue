<template>
    <div class="container">
        <h4>{{ info[id-1].title }}</h4>
        <hr>
        <div class="comment" v-html="info[id-1].comment">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
             id:this.$route.params.id,//获取路由地址中的id
            info:[
                {title:'华为荣耀 8x  4g旗舰，拍照手机',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://image.it168.com/n/640x480/8/8540/8540865.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'华为mate 30 Pro 5G 性能怪兽',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://image.it168.com/n/0x0/8/8545/8545641.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'MeiZu 游戏手机',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://image.it168.com/n/640x480/8/8540/8540865.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'红米note7 pp小可爱游戏',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://img.yinhang123.net/161017/dahjyyeqglc.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'vivo x27 pp小可爱拍照用',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://img.178hui.com/upload/2015/0413/13461518064.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'oppo r17  pp买菜用',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://images.51bi.com/opt/siteimg/pb/20140518/8030cb9fb3dc2535c0ba56957216bfa2.jpeg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'1加6 pp学习用',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://image.it168.com/n/280x210/6/6273/6273991.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'},
                {title:'诺基亚 x100  pp炫耀用',comment:'<p>轻轻地掠过晨光熹微的四月天里，摇动着城畔那一树的嫩绿。拂晓的阳光欢欢喜喜地落下，</p><img src="http://image.it168.com/n/640x480/2/2122/2122904.jpg" alt=""><p>碰到了一片片睡意朦胧的绿叶，叮叮咚咚地撒了一地。斑斑驳驳的缝隙间，霎时热闹了起来。</p>'}
            ]
        }
    },
    // created(){
    //     this.getGoodsDesc()
    // },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(rsult=>{
                if(result.body.status === 0){
                    this.info=result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    h4{
        font-size: 16px;
        text-align: center;
        color: #226aff;
        margin: 15px 0;
    }
}
</style>