<template>
  <el-space :size="20"
            fill
            wrap
            :fill-ratio="fillRatio"
            :direction="direction"
            style="width: 100%">
    <el-row>
      <el-col :span=24>
        <listOfCircleTips
            :list="list"/>
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
  </el-space>


</template>

<script>
import {ref} from 'vue'

import listOfCircleTips from "./listOfCircleTips"
import circleTags from "./circleTags"
import axios from "axios";

export default {
  created() {
    this.getList();
    this.getTagList();
  },
  setup: (props,{emit}) => {
    const receiveMessage=(data)=>{
      emit('tagClick', data)
    }
    const tabPosition = ref('left');
    const direction = ref('horizontal')
    const fillRatio = ref(30)
    return {tabPosition, direction, fillRatio,receiveMessage};
  },

  name: "leftList",
  components: {
    listOfCircleTips,
    circleTags
  },
  data: () => ({
    list: [],
    tagList: []

  }),
  methods: {
    getList() {
      axios.get("./topic.json").then((res) => {
        this.list = res.data;
      })
    },
    getTagList() {
      axios.get("./circle.json").then((res) => {
        this.tagList = res.data;
      })
    },

  }
}
</script>

<style>
.circle-desc {
  font-size: 12px;
  padding: 10px 20px;
  position: relative;
  min-height: 37px;
  box-sizing: border-box;
  background-color: #fafafa;
}

.msy-radius {
  border-radius: 4px;
}

.circle-content-tip-div {
  font-size: 14px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.circle-list-content {
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