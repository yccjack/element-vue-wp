<template>
  <div class="circle-content">
    <el-card v-for="(o) in contents" :key="o" class="circle-content">
      <el-row>
        <el-col :span=12>
          <el-col :xs="0" :sm="12" :md="6" :lg="6" :lx="6">
            <el-button type="text" @click="jumpUserDetail(o.userId)">
              <el-avatar :size="50" :src="o.avatar"></el-avatar>
            </el-button>
          </el-col>
          <el-col :xs="12" :sm="0" :md="0" :lg="0" :lx="0">
            <el-button type="text" @click="jumpUserDetail(o.userId)">
              <el-avatar :size="25" :src="o.avatar"></el-avatar>
            </el-button>
          </el-col>
          <el-col :xs="0" :sm="12" :md="8" :lg="8" :lx="8">
            <div :class="contentUserClass">
              <el-col :span=24>
                <span>{{ o.nickname }}</span>
              </el-col>
            </div>
            <div :class="contentUserClass">
              <el-col :span=24>
                <span>{{ o.leverTitle }}</span>
                <span style="background-color: #fafafa;margin-left: 2px">Lv1</span>
              </el-col>
            </div>
          </el-col>
        </el-col>
        <el-col :xs="8" :sm="8" :md="10" :lg="8" :lx="8"></el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :lx="4">
          <el-link type="danger" class="msy-popover-pop-link" @click="jumpToTopic(o.type)"># {{ o.introduction }}
          </el-link>
        </el-col>

        <el-col :span=24 :class="contentClass" class="circle-content-tip-div">
          <a href="javascript:void(0);" @click="jumpCircleDetail(o.id)">
            <h3>{{ o.contentTitle }}</h3>
            <p>{{ o.content }}</p>
          </a>
          <el-row>
            <el-col :span=6 v-for="l in o.pics" :key="l">
              <el-image style="width: 120px; height: 100px" :src="getPic(l)" :fit="contain"/>
            </el-col>
          </el-row>
        </el-col>

        <like :id=o.id
              :like-count=o.likeCount
              :talk=o.talk

        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getCurrentInstance, ref} from 'vue'
import like from "@/components/like";

export default {

  props: {
    contents: {
      default: [{
        "id": 0,
        userId: '',
        "contentTitle": "",
        "content": "",
        "contentPic": '',
        "pics": [],
        "talk": 0,
        "likeCount": 0,
        "name": '',
        "leverTitle": ''
      }]
    }
  },
  components: {
    like
  },
  name: "circleContent",
  methods: {
    popoverClick(id) {

    },
    getPic(pic) {
      return this.$Global.imgPre + pic
    },
    jumpCircleDetail(id) {
      this.$router.push({
        path: `/circle/${id}` + this.$Global.global_suffix,
      });
    },

    jumpUserDetail(id) {
      this.$router.push({
        path: `/user/${id}` + this.$Global.global_suffix
      });
    }
  },
  created() {
    this.contentUserClass = this.$getObjectClass(1)
    this.contentClass = this.$getObjectClass(1)
  },
  setup() {
    const {proxy} = getCurrentInstance()
    const radios = ref(-1)
    const contentUserClass = ref({})
    const contentClass = ref({})

    function jumpToTopic(id) {
      proxy.$router.push({
        path: `/topic/${id}` + proxy.$Global.global_suffix,
      });
    }

    return {radios, contentUserClass, contentClass, jumpToTopic}
  },

  data: () => ({})
}
</script>

<style scoped>
.circle-content {
  margin-top: 10px;
  padding-top: 10px;
}

</style>