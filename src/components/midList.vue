<template>
  <el-row class="circle-mid-outer text item ">
    <el-col :span=24>
      <circleContentTop
          :user-title="userTitle"
          :user-avatar="userAvatar"
          :username="username"
          :joined-topic="userTopic"
          :current-topic="currentTopic"
          @submitSuccess="receiveMessage"
      />
    </el-col>
    <el-col :span=24 style="margin-top: 2%">
      <circleContentTypeStrip :strips="strips" :types="types"/>
    </el-col>
    <el-col :span=24>
      <circleContent
          :contents="contents"/>
    </el-col>
  </el-row>


</template>

<script>
import circleContentTop from "@/components/circleContentTop";
import circleContentTypeStrip from "@/components/circleContentTypeStrip";
import circleContent from "@/components/circleContent";
import axios from "axios";
import {ref} from "vue";

export default {

  created() {
    this.getTypeStripList();
    this.getCircleContent();
    this.getContent(this.tagChangeId);
    this.getUserTopic(this.userId);
    this.getCurrentTopicInfo(this.tagChangeId);
  },
  props: ['userTitle', 'userAvatar', 'username', 'tagChange', "userId"],
  name: "midList",
  data: () => ({
    strips: [],
    types: [],
    tagChangeId: 5,
    contents: [],
    userTopic: [],
    currentTopic: {}
  }),
  components: {
    circleContentTop,
    circleContentTypeStrip,
    circleContent
  },
  methods: {
    getTypeStripList() {
      axios.get("/config?type=2").then((res) => {
        this.strips = res.data;
      })
    },
    getContent(type) {
      axios.get("/getCircleContent?type=" + type).then((res) => {
        this.contents = res.data
      })
    },
    getCircleContent(type) {
      axios.get("/config?type=3" + type).then((res) => {
        this.types = res.data;
      })
    },
    getUserTopic(userId) {
      axios.get("/getUserTopic?userId=" + userId).then((res) => {
        this.userTopic = res.data;
      })
    },
    getCurrentTopicInfo(topic) {
      axios.get("/getCurrentTopicInfo?topic=" + topic).then((res) => {
        console.log(res.data)
        this.currentTopic = res.data;
      })
    }
  }, setup() {
    const receiveData = ref(0);
    const receiveMessage = (data) => {
      console.log(data)
      receiveData.value = data;
    }
    return {receiveMessage, receiveData}
  },
  watch: {
    tagChange: {
      immediate: true,
      handler(value) {
        if (this.tagChangeId !== value) {
          console.log(value)
          if (0 === value) {
            return
          }
          this.tagChangeId = value
          this.getContent(value);
        }
      }
    },
    receiveData: {
      immediate: true,
      handler(value) {
        console.log(value)
        if(0 === value){
          return
        }
        this.getContent(this.tagChangeId);

      }
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