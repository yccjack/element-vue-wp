<template>
  <el-space :size="20"
            fill
            wrap
            :fill-ratio="fillRatio"
            :direction="direction"
            style="width: 100%" >
    <listOfCircleTips/>
    <circleTags/>

  </el-space>


</template>

<script >
import { ref } from 'vue'

import listOfCircleTips from "./listOfCircleTips"
import circleTags from "./circleTags"
export default {
  setup: () => {
    const tabPosition = ref('left');
    const direction = ref('horizontal')
    const fillRatio = ref(30)
    return { tabPosition,direction,fillRatio };
  },
  name: "leftList",
  components:{
    listOfCircleTips,
    circleTags
  }
}
</script>

<style>


.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.circle-tips-div {
  font-size: 14px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}
ul, li {
  border: 0;
  font-family: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  box-sizing: border-box;
}
</style>