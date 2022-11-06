<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="$emit('getPageNo', pageNo - 1)" >上一页</button>
    <button v-if="startNumAndEndNum.startNum > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.startNum > 2">···</button>

    <!-- 1. 通过v-for循环生成按钮 -->
    <button v-for="page in startNumAndEndNum.endNum" :key="page" 
        v-show="page >= startNumAndEndNum.startNum" 
        @click="$emit('getPageNo', page)"
        :class="{active:pageNo==page}"
        >{{page}}</button>

    <button v-if="startNumAndEndNum.endNum < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.endNum < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled='pageNo == totalPage' @click="$emit('getPageNo', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "continues", "pageNo"],
  // 计算属性
  computed: {
    // 总页数
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码
    startNumAndEndNum() {
        //解构赋值，得到数据
        const { totalPage, continues, pageNo } = this
      //先定义两个变量，分别存储开始页码和结束页码
      let startNum = 0;
      let endNum = 0;
      //连续的页码数字5【就是至少是五页】
      //不正常的现象【总页数没有连续的页码多】
      if (continues > totalPage) {
        startNum = 1;
        endNum = totalPage;
      } else {
        //正常的现象【总页数大于连续的页码数】
        startNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        
        //不正常的现象【开始页码小于1】
        if (startNum < 1) {
            startNum = 1;
            endNum = continues;
        }
        //不正常的现象【结束页码大于总页数】
        if (endNum > totalPage) {
            endNum = totalPage;
            startNum = totalPage - continues + 1;
        }
      }
      return {startNum,endNum};
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>