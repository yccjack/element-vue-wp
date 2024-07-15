<template>
  <el-col :span=12>
    <div style="margin-top: 15px;">
      <el-button :key="id" plain=true size="small" @click.prevent="like($event,id)"
                 :style="{'background-color': currentLike}">
        <el-icon :size="10">
          <CaretTop/>
        </el-icon>
        <span>赞{{ likeTemCount }} </span>
      </el-button>
      <el-button plain=true size="small" @click="unlike($event,id)" style="margin: 0">
        <el-icon :size="10">
          <CaretBottom/>
        </el-icon>
      </el-button>


    </div>
  </el-col>
  <el-col :span=12 style="text-align: right" >
    <el-button :key="id" plain=true size="small"  style="margin-top: 15px" >
      <span class="topic-footer-right" :class="contentClass">{{ talk }}条讨论</span></el-button>
  </el-col>
</template>

<script>

import {ElMessage} from "element-plus";

export default {
  props: {
    id: {
      type: [Number, String],
      default: -1
    },
    talk: {
      type: [Number, String],
      default: 0
    },
    likeCount: {
      type: [Number, String],
      default: 0
    },
    singlePage: {
      type: Boolean,
      default: false
    },
    youLiked: {
      type: [Number, String],
      default: 0
    },
    isRegister: {
      type: Boolean,
      default: false
    }

  },
  data: () => ({
    currentLike: '#FFFFFFFF',
    Liked: false,
    likeTemCount: 0,
    contentClass:''
  }),
  created() {
    this.contentClass = this.$getObjectClass(1)
    this.likeTemCount = this.likeCount
    if (this.singlePage) {
      if (this.youLiked > 0) {
        this.currentLike = '#d57878'
        this.Liked = true
      } else {
        this.Liked = false
        this.currentLike = '#FFFFFFFF'
      }
    } else {
      if (this.$Global.circle_current_like_list.includes(this.id)) {
        this.Liked = true
        this.currentLike = '#d57878'
      } else {
        this.Liked = false
        this.currentLike = '#FFFFFFFF'
      }
    }
  },
  name: "like",
  methods: {
    like(e, id) {
      if (e.target.tagName === 'INPUT') return
      if (this.Liked) {
        this.unlike(e, id)
        return;
      }
      this.$http.get("/like?type=1&id=" + id).then((res) => {
        if (res.status === 200) {
          let data = res.data
          if (typeof data === 'string') {
            if (res.data.includes("fail")) {
              ElMessage.error('点赞失败')
              return
            }
          }
          this.$Global.circle_current_like_list.push(id)
          this.likeTemCount = res.data
          this.currentLike = '#d57878'
          this.Liked = true
        }
      })
    },
    unlike(e, id) {
      if (e.target.tagName === 'INPUT') return
      this.$http.get("/like?type=0&id=" + id).then((res) => {
        if (res.status === 200) {
          this.$Global.circle_current_like_list.map((val, i) => {
            if (val === id) {
              this.$Global.circle_current_like_list.splice(i, 1)
              this.likeTemCount = res.data
              this.currentLike = '#FFFFFFFF'
              this.Liked = false
            }
          })
        }
      })
    },

  },

  watch: {
    youLiked: {
      immediate: true,
      handler(value) {
        if (this.singlePage) {
          if (this.youLiked > 0) {
            this.currentLike = '#d57878'
            this.Liked = true
          } else {
            this.Liked = false
            this.currentLike = '#FFFFFFFF'
          }
        } else {
          if (this.$Global.circle_current_like_list.includes(this.id)) {
            this.Liked = true
            this.currentLike = '#d57878'
          } else {
            this.Liked = false
            this.currentLike = '#FFFFFFFF'
          }
        }
      }
    },
    likeCount: {
      immediate: true,
      handler(value) {
        this.likeTemCount = value
      }
    }
  }

}
</script>

<style scoped>
.selectIn {
  background-color: #dbb0b0;
}

.topic-footer-right {
  color: #e04a1c !important;
  transition: opacity .2s;
  position: relative;
  cursor: pointer;
  margin: 0;
  white-space: nowrap;
}
</style>