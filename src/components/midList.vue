<template>
  <el-row class="circle-mid-outer text item ">
    <el-col :span=24>
      <circleContentTop
          :user-title="userTitle"
          :user-avatar="userAvatar"
          :username="username"
      />
    </el-col>
    <el-col :span=24 style="margin-top: 2%">
      <circleContentTypeStrip :strips="strips" :types="types"/>
    </el-col>
    <el-col :span=24>
      <circleContent/>
    </el-col>
  </el-row>


</template>

<script>
import circleContentTop from "@/components/circleContentTop";
import circleContentTypeStrip from "@/components/circleContentTypeStrip";
import circleContent from "@/components/circleContent";
import axios from "axios";

export default {

  created() {
    this.getTypeStripList();
  },
  props:['userTitle','userAvatar','username'],
  name: "midList",
  data:()=>({
    strips:[],
    types:[]
  }),
  components: {
    circleContentTop,
    circleContentTypeStrip,
    circleContent
  },
  methods:{
    getTypeStripList() {
      axios.get("./circleTypeStripData.json").then((res) => {
        this.strips = res.data;
      })
      axios.get("./circleTypeList.json").then((res) => {
        this.types = res.data;
      })
    }
  }
}
</script>

<style scoped>
.circle-mid-outer {
  font-size: 14px;
  padding: 0;
  text-align: left;

}
</style>