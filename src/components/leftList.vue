<template>
  <el-row>
    <el-col :span=24>
      <listOfCircleTips
          :list="circleTips"/>
    </el-col>
    <el-col :span=24>
      <div style="margin-top: 15px">
        <circleTags
            :list="tagList"
            @tagClick="receiveMessage"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {ref} from 'vue'

import listOfCircleTips from "./circle/listOfCircleTips"
import circleTags from "./circle/circleTags"


export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.getList();
    this.getTagList();
  },
  setup: (props, {emit}) => {
    const receiveMessage = (data) => {
      emit('tagClick', data)
    }
    const tabPosition = ref('left');
    const direction = ref('horizontal')
    const fillRatio = ref(30)
    return {tabPosition, direction, fillRatio, receiveMessage};
  },

  name: "leftList",
  components: {
    listOfCircleTips,
    circleTags
  },
  data: () => ({
    circleTips: [],
    tagList: []

  }),
  methods: {
    getList() {
      this.$http.get("/config?type=1").then((res) => {
        this.circleTips = res.data;
      })
    },
    getTagList() {
      this.$http.get("/config?type=4").then((res) => {
        this.tagList = res.data;
      })
    },

  }
}
</script>

<style>
.circle-desc {
  padding: 10px 20px;
  position: relative;
  min-height: 37px;
  box-sizing: border-box;
  background-color: #fafafa;
}

.msy-radius {
  border-radius: 4px;
}

.text {
  font-size:calc(100vw* 14 /1920);
}

.item {
  margin-bottom: 18px;
}

.circle-list-content {
  font-size:calc(100vw* 14 /1920);
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