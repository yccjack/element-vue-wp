<template>
  <div class="card">
    <el-row>
      <el-col :lg="24" :sm="0" :xs="24" :md="0" :xl="24" class="user-content-padding">
        <el-col :span=12>
          <el-avatar shape="square" :size="50" :src="avatar"></el-avatar>
        </el-col>
        <el-col :span=12>
          <div class="circle-content-tip-div">
            <el-col :span=24>
              <span> 标题</span>
            </el-col>
          </div>
          <div class="circle-content-user-info">
            <el-col :span=24>
              <span>等级称谓</span>
              <span style="background-color: #fafafa;margin-left: 2px">Lv1</span>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="background-color: #fafafa;font-size: 9px;">
      <el-col :span=6>
        <p>主题</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>评论</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>关注</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>粉丝</p>
        <p>1</p>
      </el-col>
    </el-row>
    <div class="user-list-content user-content-padding">
      <div class="user-list-content user-list-content-inner">
        <ul v-for="o in announcement" :key="o">
          <li class="text item ">
            <el-link :underline="false"> {{ o.content}}</el-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['id', 'avatar'],
  name: "userCard",
  created() {
    this.getAnnouncement()
  },
  data: () => ({
    announcement: [{
      id:0,
      content:""
    }]
  }),
  methods: {
    getAnnouncement() {
      axios.get("/config?type=5").then((res) => {
        this.announcement = res.data
      })
    }
  }
}
</script>

<style scoped>
/* From uiverse.io by @Sujitkavaiya */
.card {
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
  margin-left: 8%;
}

.circle-content-user-info {
  font-size: 9px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.user-list-content {
  font-size: 14px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
}

.user-list-content-inner {
  margin-top: 20px;
}

.user-content-padding {
  padding: 15px;
}
</style>