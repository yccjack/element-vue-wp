<template>
  <el-row class="circle-mid-outer text item ">
    <el-col :span=24>
      <circleContentTop
          :circle='circle'
          :joined-topic="userTopic"
          :current-topic="currentTopic"
          @submitSuccess="receiveMessage"
          :avatar="avatar"
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
import circleContentTop from "@/components/circle/circleContentTop";
import circleContentTypeStrip from "@/components/circle/circleContentTypeStrip";
import circleContent from "@/components/circle/circleContent";
import {ref} from "vue";

export default {
  activated() {
    this.getContent(this.tagChangeId);
  },
  created() {
    this.getTypeStripList();
    this.getCircleContentType();
    if (this.$Global.login) {
      this.getUserTopic();
    }
    this.getCurrentTopicInfo(this.tagChangeId);
  },
  props: ['tagChange', 'circle', 'isLogin','avatar'],
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
      this.$http.get("/config?type=2").then((res) => {
        this.strips = res.data;
      })
    },
    getContent(type) {
      this.$http.get("/getCircleContent?type=" + type).then((res) => {
        this.contents = res.data
      })
    },
    getCircleContentType() {
      this.$http.get("/config?type=3").then((res) => {
        this.types = res.data;
      })
    },
    getUserTopic() {
      this.$http.get("/getUserTopic").then((res) => {
        this.userTopic = res.data;
      })
    },
    getCurrentTopicInfo(topic) {
      this.$http.get("/getCurrentTopicInfo?topic=" + topic).then((res) => {
        this.currentTopic = res.data;
      })
    }
  }, setup() {
    const receiveData = ref(0);
    const receiveMessage = (data) => {
      receiveData.value = data;
    }
    return {receiveMessage, receiveData}
  },
  watch: {
    tagChange: {
      immediate: true,
      handler(value) {
        if (this.tagChangeId !== value) {
          if (0 === value) {
            return
          }
          this.tagChangeId = value
          this.getContent(value);
          this.getCurrentTopicInfo(value)
        }
      }
    },
    receiveData: {
      immediate: true,
      handler(value) {

        if (0 === value) {
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
  font-size:calc(100vw* 14 /1920);
  padding: 0;
  text-align: left;

}
</style>