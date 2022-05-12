<template>
  <div class="circle-content">
    <el-card v-for="o in contents" :key="o" class="circle-content">
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
          <h3>{{ o.contentTitle }}</h3>
          <p>{{ o.content }}</p>
          <el-row>
            <el-col :span=6 v-for="l in o.pics" :key="l">
              <el-image style="width: 120px; height: 100px" :src="l" :fit="contain"/>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span=12>
          <div style="margin-top: 15px">
            <el-radio-group v-model="radios" size="small">
              <el-radio-button :label="o.id" @click.prevent="like($event,o.id)">
                <el-icon :size="10">
                  <CaretTop/>
                </el-icon>
                赞{{ o.likeCount }}
              </el-radio-button>
              <el-radio-button :label="unlikeLabel(o.id)" @click="unlike($event,o.id)">
                <el-icon :size="10">
                  <CaretBottom/>
                </el-icon>
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span=12 style="text-align: right">
          <button> {{ o.talk }}条讨论</button>
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
    contents:{
      default: [{
        "id": 0,
        "contentTitle": "",
        "content": "",
        "contentPic": '',
        "pics":[],
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
    unlikeLabel(id){
      return "1"+","+id
    },
    like(e,id){
      if (e.target.tagName === 'INPUT') return
      axios.get("/like?type=1&id="+id).then((res)=>{
        console.log(res.data)
      })
    },
    unlike(e,id){
      if (e.target.tagName === 'INPUT') return
      axios.get("/like?type=0&id="+id).then((res)=>{
        console.log(res.data)
      })
    }
  },
  setup() {
    axios.defaults.headers.common['user_id'] = localStorage.getItem("user_id");
    const radios = ref(-1)
    return {radios}
  },


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

button {
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 9px;
  border-radius: 0.5em;
  background: rgba(245, 245, 245, 0.22);
  border: 1px solid #e8e8e8;
  transition: all .3s;
  box-shadow: 1px 1px 1px #c5c5c5
}

button:hover {
  border: 1px solid white;
}

button:active {
  box-shadow: 4px 4px 12px #c5c5c5,
  -4px -4px 12px #ffffff;
}
</style>