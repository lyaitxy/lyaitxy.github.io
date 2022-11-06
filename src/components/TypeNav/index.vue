<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show" >
            <!-- 利用事件委派+编程式导航实现路由的跳转与转递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.catagoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                
                </h3>
                <!-- 二级，三级分类 -->
                <div class="item-list clearfix" :style="{display:currentIndex==index? 'block':'none'}">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                        
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                    
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import Header from '../Header'
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户选择的分类
      currentIndex: -1,
      show:true,
      searchKeyWord: ''
    };
  },
  //组件挂载完成，获取数据
  mounted() {
    // 通知Vuex发送请求，获取数据，保存到state中
    // this.$store.dispatch("getCategoryList");
    //如果不是Home组件，就不显示三级联动
    if(this.$route.path !== '/home'){
      this.show = false
    }
   
  },
  computed: {
    ...mapState({
      //右侧需要一个函数，当使用这个计算属性的时候，会自动调用这个函数，返回值就是这个计算属性的值
      //state就是Vuex中的state，大仓库中的state

      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //切换分类，节流操作
    changeIndex:throttle(function(index){
      //切换分类，修改currentIndex
      //正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发这个方法，修改currentIndex
      //异常情况（用户快速的操作）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3会触发，这就是异常情况
      //就是由于用户行为太快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能会导致浏览器卡顿，用户体验不好
      this.currentIndex = index;
    },50),
    //鼠标离开
    leaveShow() {
      this.currentIndex = -1;
      // 判断是否是Home组件，如果是，就显示三级联动
      if(this.$route.path !== '/home'){
        
        this.show = false
      }
    
    },
    //跳转到搜索页面,最好的办法是使用路由编程式导航+事件委派
    goSearch(event) {

      //如果利用事件委派，存在一些问题：1.点击不一定是a标签，2.如何获取参数【一、二、三级分类的产品的名字、id】
      //第一个问题：把字节点当中的a标签，我加上自定义属性data-categoryName，然后在事件委派的时候，使用target.dataset.categoryName
      let Element = event.target;
      //获取到当前触发这个事件的节点，有data-categoryName属性，就是a标签
      //节点有一个属性叫dataset，可以获取到所有的自定义属性
      let { categoryname, category1id, category2id, category3id} = Element.dataset;
      if (categoryname) {
        let location = {name:"search"};
        let query = {categoryName: categoryname};
        if(category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带一脚传过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          
          this.$router.push(location);
        } else {
          this.$router.push({name:"search",query});
        }
      }
    },
    //当鼠标移入的时候，让商品分类列表进行显示
    enterShow(){
      this.show = true;
    }
    }
  };

</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.2px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0px 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 3.5px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    .sort-enter-to {
      // transform: rotate(360deg);
      height: 461px;
    }
    .sort-enter-active {
      
      transition: all 0.3s linear;
    }
    //过渡动画结束状态（离开）
    .sort-leave {
      height: 461px;
      // transform: rotate(360deg);
    }
    .sort-leave-to {
      // transform: rotate(0deg);
      height: 0px;
    }
    .sort-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>