<template>
  <div class="circle-content">
    <el-card v-for="(o,index) in contents" :key="o" class="circle-content">
      <el-row>
        <el-col class="user-content-padding" :span=12>
          <el-col :span=12>
            <el-avatar :size="50" :src="o.userAva"></el-avatar>
          </el-col>
          <el-col :span=12>
            <div class="circle-content-tip-div">
              <el-col :span=24>
                <span>{{ o.name }}</span>
              </el-col>
            </div>
            <div class="circle-content-user-info">
              <el-col :span=24>
                <span>{{ o.leverTitle }}</span>
                <span style="background-color: #fafafa;margin-left: 2px">Lv1</span>
              </el-col>
            </div>
          </el-col>
        </el-col>
        <el-col :span=12 style="text-align: right">
          <el-link type="danger" @click="popoverClick()" class="msy-popover-pop-link"># 广场</el-link>
        </el-col>
        <el-col :span=24>
          <a @click="jumpCircleDetail(o.id)">
            <h3>{{ o.contentTitle }}</h3>
            <p>{{ o.content }}</p>
          </a>
          <el-row>
            <el-col :span=6 v-for="l in o.pics" :key="l">
              <el-image style="width: 120px; height: 100px" :src="getPic(l)" :fit="contain"/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span=12>
          <div style="margin-top: 15px;">
            <el-button :key="o.id" plain=true size="small" @click.prevent="like($event,o.id)"
                       :class="getCurrentType(o.id) ? 'selectIn' : ''">
              <el-icon :size="10">
                <CaretTop/>
              </el-icon>
              <span :id="o.id" v-text="'赞'+ o.likeCount "></span>
            </el-button>
            <el-button plain=true size="small" @click="unlike($event,o.id)" style="margin: 0">
              <el-icon :size="10">
                <CaretBottom/>
              </el-icon>
            </el-button>

          </div>
        </el-col>
        <el-col :span=12 style="text-align: right">
          <el-button :key="o.id" plain=true size="small" @click.prevent="like($event,o.id)" style="margin-top: 12px">
            <span class="topic-footer-right">{{ o.talk }}条讨论</span></el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";

export default {
  props: {
    contents: {
      default: [{
        "id": 0,
        "contentTitle": "",
        "content": "",
        "contentPic": '',
        "pics": [],
        "talk": 0,
        "userAva": "",
        "likeCount": 0,
        "name": '',
        "leverTitle": ''
      }]
    }
  },
  name: "circleContent",
  methods: {
    popoverClick(id) {
      console.log(id)
    },
    like(e, id) {
      if (e.target.tagName === 'INPUT') return
      if (this.current_type.includes(id)) {
        this.unlike(e, id)
        return;
      }
      axios.get("/like?type=1&id=" + id).then((res) => {
        if (res.status === 200) {
          this.current_type.push(id)
          document.getElementById(id).innerText = '赞' + res.data
        }
        console.log(res.data)
      })
    },
    unlike(e, id) {
      if (e.target.tagName === 'INPUT') return
      axios.get("/like?type=0&id=" + id).then((res) => {
        if (res.status === 200) {
          this.current_type.map((val, i) => {
            if (val === id) {
              this.current_type.splice(i, 1)
            }
          })
          document.getElementById(id).innerText = '赞' + res.data
        }
        console.log(res.data)
      })
    },
    getPic(pic) {
      return "https://gschaos.club/pyimg/" + pic
    },
    getCurrentType(id) {
      return this.current_type.includes(id)
    },
    jumpCircleDetail(id){

    }
  },
  setup() {
    axios.defaults.headers.common['user_id'] = localStorage.getItem("user_id");
    const radios = ref(-1)
    return {radios}
  },

  data: () => ({
    current_type: []
  })
}
</script>

<style scoped>
.circle-content {
  margin-top: 10px;
  padding-top: 10px;
}

.circle-content-user-info {
  font-size: 9px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.selectIn {
  background-color: #dbb0b0;
}

.topic-footer-right {
  color: #e04a1c !important;
  transition: opacity .2s;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  margin: 0;
  white-space: nowrap;
}

a{
  text-decoration: none;
  color: #000;
}
</style>