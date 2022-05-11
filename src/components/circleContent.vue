<template>
  <div class="circle-content">
    <el-card v-for="o in contentList" :key="o" class="circle-content">
      <el-row>
        <el-col class="user-content-padding" :span=12>
          <el-col :span=12>
            <el-avatar :size="50" :src="o.userAva"></el-avatar>
          </el-col>
          <el-col :span=12>
            <div class="circle-content-tip-div">
              <el-col :span=24>
                <span>{{ o.contentTitle }}</span>
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
        <el-col :span=12 style="text-align: right">
          <el-link type="danger" @click="popoverClick()" class="msy-popover-pop-link"># 广场</el-link>
        </el-col>
        <el-col :span=24>
          <h3>{{ o.contentTitle }}</h3>
          <p>{{ o.content }}</p>
          <el-image style="width: 100px; height: 100px" :src="l" :fit="contain" v-for="l in o.contentPic" :key="l"/>
        </el-col>
        <el-col :span=12>
          <div style="margin-top: 15px">
            <el-radio-group v-model="radios" size="small">
              <el-radio-button :label="0">
                <el-icon :size="10">
                  <CaretTop/>
                </el-icon>
                赞{{ o.like }}
              </el-radio-button>
              <el-radio-button :label="1">
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
    tagChange: {
      type: [String, Number],
      default: 0
    },
    pageSize: {
      type: [String, Number],
      default: 10
    }
  },
  created() {
    this.getContent(10);

  },
  name: "circleContent",
  data: () => ({
    receiveTag: 0,
    contentList: [{
      "id": 0,
      "contentTitle": "",
      "content": "",
      "contentPic": [],
      "talk": 0,
      "userAva": "",
      like: 0
    }],
  }),
  methods: {
    popoverClick(id) {
      console.log(id)
    },
    getContent(id) {
      if (id === 2) {
        axios.get("./circleContent" + "_2" + ".json").then((res) => {
          this.contentList = res.data
        })
      } else {
        axios.get("./circleContent.json").then((res) => {
          this.contentList = res.data
        })
      }
    }
  },
  setup() {
    const radios = ref(-1)
    return {radios}
  },
  watch: {
    tagChange: {
      immediate: true,
      handler(value) {
        console.log(value)
        if (this.tagChangeId !== value) {
          this.tagChangeId = value
          this.getContent(2);
        }

      }
    }
  }

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