<template>
  <el-row class="circle-tips-div text item ">
    <el-col :span="24">
      <circleContentTop
          :user-title="userTitle"
          :user-avatar="userAvatar"
          :username="username"
      />
    </el-col>
    <el-col :span="24" style="margin-top: 2%">
      <circleContentMid/>
    </el-col>
    <el-col :span="24">
      <circleContent/>
    </el-col>
  </el-row>


</template>

<script>
import circleContentTop from "@/components/circleContentTop";
import circleContentMid from "@/components/circleContentMid";
import circleContent from "@/components/circleContent";
import axios from "axios";

export default {

  props:['userTitle','userAvatar','username'],
  name: "midList",

  components: {
    circleContentTop,
    circleContentMid,
    circleContent
  },

}
</script>

<style scoped>

</style>