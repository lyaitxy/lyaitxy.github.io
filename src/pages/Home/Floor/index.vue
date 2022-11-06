<template>
    <div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{list.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li class="active" v-for="(nav, index) in list.navList" :key="index">
                                <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li v-for="(keyword, index) in list.keywords" :key="index">{{keyword}}</li>
                                    
                                </ul>
                                <img :src="list.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <!-- 轮播图的地方 -->
                                <Carousel :list="list.carouselList"></Carousel>
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="list.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="list.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

export default {
    props: ['list'],
    // mounted() {
    //     //第一次书写Swiper的时候，在mounted中写，但是后面发现，如果在mounted中写，会导致Swiper初始化的时候，获取不到dom元素，所以，我们需要在nextTick中写
    //     //当时时在组件中发送请求、动态渲染解构【前台至少服务器的数据需要回来】，因此当年的写法在这里不行
    //     //这次是在home组件中发送请求，数据回来之后，再渲染组件，所以，这次的写法是可以的
    //     var swiper = new Swiper(this.$refs.cur, {
    //         loop: true, // 循环模式选项
    //                 autoplay: true,
    //                 // 如果需要分页器
    //                 pagination: {
    //                     el: '.swiper-pagination',
    //                 },
    //                 // 如果需要前进后退按钮
    //                 navigation: {
    //                     nextEl: '.swiper-button-next',
    //                     prevEl: '.swiper-button-prev',
    //                 },
    //     });
    // },
    // watch: {
    //     //为了共用轮播图组件，将floor组件的轮播图写成数据监听的形式
    //     list: {
    //         //立即监听：不管你数据有没有变化。我一上来立即监听一次
    //         immediate: true,
    //         handler() {
    //             //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
    //             this.$nextTick(() => {
    //                 //这里的代码，就是在数据有了之后，再去初始化Swiper
    //                 var swiper = new Swiper(this.$refs.cur, {
    //                     loop: true, // 循环模式选项
    //                     autoplay: true,
    //                     // 如果需要分页器
    //                     pagination: {
    //                         el: '.swiper-pagination',
    //                     },
    //                     // 如果需要前进后退按钮
    //                     navigation: {
    //                         nextEl: '.swiper-button-next',
    //                         prevEl: '.swiper-button-prev',
    //                     },
    //                 });
    //             })
    //         }
    //     }
    // }
}
</script>

<style scoped lang="less">
.floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>