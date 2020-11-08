# 这是一个很牛逼的软件

## 因为是自己找的项目，用来获取官方数据接口已失效，只能自己手动添加数据

## 制作首页app组件
    1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
    2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
        + 在制作 购物车 小图标的时候，操作会相对多一些
        + 先把 拓展图标的 css 的样式，拷贝到项目中
        + 拷贝 拓展字体库 ttf 文件到项目中
        + 为购物车小图标添加样式：'mui-icon mui-icon-extra mui-icon-extra-cart'
    3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 Tabbar 为 router-link


## 设置路由高亮


## 点击 Tabbar中的路由链接，展示对应的路由组件


## 加载轮播提数据
    1. 获取数据：使用vue-resource
    2. 使用 vue-resource 的 this.$http.get() 获取数据
    3. 获取到的数据，要保存到 data 身上
    4. 使用 v-for 循环渲染 每个 item 项

##  改造 9 宫格样式

##  改造新闻咨询链接

##  新闻咨询页面制作

    1. 绘制界面，使用 MUI 中的 media-list.html
    2. 使用 vue-resource 获取数据
    3. 渲染真实数据

##  实现 新闻咨询列表 点击 跳转 新闻咨询详细

    1. 把列表中的每一项 改造为 router-link，同时，在跳转的时候 提供唯一的id标识符
    2. 创建新闻详细的组件 NewsInfo.vue
    3. 在 路由模块 中，将新闻详细的 路由地址 和 组件页面 对应起来

##  单独封装一个 comment.vue 评论子组件
    1. 先创建一个单独的 comment.vue 组件模块
    2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
        + `import comment from './comment.vue'`
    3. 在父组件中，使用 components 属性，将刚才导入的 comment 组件，注册为自己的 子组件
    4. 将注册子组件时候的 组件名称，以标签的形式在页面中引用即可

##  获取所有的评论数据加载到页面中

##  实现点击加载更多功能
    1. 为加载更多按钮，绑定点击事件，在事件中请求下一页数据
    2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取新一页的数据
    3. 为了防止新数据覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让老数据调用数据的 concat 方法，拼接新数据

##  发表评论
    1. 把文本框做双向数据绑定
    2. 为发表按钮绑定一个事件
    3. 校验评论内容是否为空，如果为空，则 Toast 提示用户，评论内容不能为空
    4. 通过 vue-resource 发送一个请求，把评论内容交给服务器，
    5. 发表评论ok后，重新刷新列表，以查看最新的评论
        + 如果调用 getComment 重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
        + 换一种思路，当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论追加到 data 中 comments 的开头，这样，就能实现刷新评论列表的需求

##  改造图片分享 按钮为路由得到链接并显示对应的页面组件

##  绘制图片列表，组件页面结构并美化样式
    1. 制作顶部的滑动条
    2. 制作底部的图片列表

###  制作顶部滑动条的坑
    1. 我们借助于 MUI 中的tab-top-webview-main.html
    2. 需要把 slider 区域的 mui-fullscreen 类去掉
    3. 滑动条无法正常触动滑动，通过检验官方文档，发现这是 js 组件，需要被初始化：
        + 导入 mui.js
        + 调用官方提供的方式去 初始化：
        ```
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005 //filck 减速系数，系数过大，滚动速度越慢，滚动距离越小，默认值：0.0006
        })
        ```
    4. 我们初始化 滑动条的时候，导入的 mui.js ，但是。控制台报错： 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode 
       + 经过我们合理的推测，，觉得，可能是 mui 中用到了'caller', 'callee', and 'arguments' 东西，但是，webpack打包好的 bundle.js 中，默认是启用 严格模式的，所以，这俩者冲突了
       + 解决方案：
            1. 把 mui 中的代码，改掉，但是不现实
            2.  把webpack 打包时候的严格模式禁用`cnpm i babel-plugin-transform-remove-strict-mode`
            3.  安装好包后，在去 .babelrc 文件下配置一下，添加：`transform-remove-strict-mode`
    5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析，发现，如果要初始化 滑动条。必须要等DOM元素加载完毕，所以，我们把滑动条初始化的代码，搬到了 mounted 函数生命周期中
    6. 当滑动条调试ok后，发现 Tabber 无法正常工作了，这时候我们需要把每个 Tabber 按钮的样式中 `mui-tab-item` 重新改一下名字
    7. 获取所有分类并渲染列表

### 制作图片列表区域
    1. 图片列表需要使用懒加载技术，我们可以使用 mint-ui 现成的组件 `lazy-load`
    2. 根据 `lazy-load` 的官方文档，尝试使用
    3. 渲染图片列表数据

### 实现了图片的 懒加载 改造和样式美化

##  实现了点击图片跳转到图片详情
    1. 改造 li 为 router-link 的时候，需要使用 tag 属性指定要渲染为那种元素

##  缩略图插件
    `<img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)">`
    + 注意：img中的 class 属性不能去掉  ， 每个图片数据对象中必须要有 w 和 h 这俩个属性
    1. 安装插件： cnpm i vue-preview -S
    2. 导入插件： import VuePreview from 'vue-preview'    Vue.use(VuePreview) 

##  绘制 商品列表页面 并 美化


##  尝试在手机上 去进行项目的预览和调试
    1. 要保证自己的手机可以运行
    2. 要保证 手机 和开发项目的电脑 处于同一个 WIFI 环境中，也就是说 手机 可以访问到 电脑的 Ip
    3. 打开自己项目中的 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前 电脑的 WIFI Ip地址，设置为 --host 的指令值
        + 如何查看自己电脑所处 WIFI 的Ip，在 cmd 终端运行 `ipconfig` ，查看无线网的ip地址


## 小球动画优化思路：
    1. 先分析导致 动画 不准确的本质原因：我们把小球最终 位移到的位置，已经局限到了某一分辨率下，滚动条未滚动的情况下
    2. 只要分辨率和测试的时候不一样，或者，滚动条有一定的滚动距离之后，问题就出现了
    3. 因此，我们经过分析，得到结论，不能把位置的 横纵坐标 直接写死了，根据不同的情况，动态计算这个坐标值
    4. 经过分析，得出解题思路，先得到徽标的横纵坐标，再得到小球的横纵坐标，然后，让 y 值求差，x 值也求差，得到的结果，就是横纵坐标邀位移的距离
    5. 如何获取徽标和小球的位置。 domObject.getBoundingClientRect()
        ```
        获取小球在页面中的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect();
        获取徽标位置
            const badgePosition=document.getElementById('badge').getBoundingClientRect();

            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top

            el.style.transform= `translate(${xDist}px,${yDist}px)`;
        ```