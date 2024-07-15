<template>
  <div style="width: 1920px">
    <el-dialog
        :model-value="dialogVisible"
        title="Tips"
        :width="dialogWidth"
        :before-close="handleClose"
        :destroy-on-close="true"
    >
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <el-row v-for="(v,k) in replyList" :key="k" class="reply_content">
          <el-col :span=24 class="user-content-padding">
            <msyAvatar :avatar="v.avatar"
                       :admin-name="v.adminName"
                       :nickname="v.nickname"
                       :lever-title="v.leverTitle"
                       :user_id="v.avatar_id"
            />
          </el-col>
          <el-col :span=24 class="text-box">
            <p class="text-content " :class="discuss_font">{{ v.reply_content }}</p>
            <el-row :gutter="10" v-if="v.pics !=null && v.pics!==''">
              <el-col :span=6 v-for="(pic,index) in v.pics" :key="pic">
                <el-image :src="getPic(pic)" :fit="contain" :preview-src-list="getReplyView(v.pics)"
                          :initial-index="index"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-divider></el-divider>
        </el-row>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, reactive, ref,watch} from "vue";
import msyAvatar from "@/components/user/msyAvatar";

export default {
  created() {
    if (document.body.clientWidth>=1000){
      this.dialogWidth = '50%'
    }else{
      this.dialogWidth = '90%'
    }
  },
  name: "replyAll",
  activated() {

  },
  components: {
    msyAvatar
  },
  methods: {
    handleClose() {
      this.$emit('dialogClose', true)
    },
    getPic(pic) {
      if (pic.startsWith('http')) {
        return pic
      }
      return this.$Global.imgPre + pic
    },
    getReplyView(pics) {
      let srcList = []
      for (let k in pics) {
        srcList.push(this.getPic(pics[k]))
      }
      return srcList;
    },
  },
  props: {
    count: {
      type: Number,
      default: 1
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    discuss_id: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const limit = ref(props.count)
    const dialogWidth = ref('1000px')
    const {proxy} = getCurrentInstance()
    const discuss_font = ref(proxy.$getObjectClass(2))
    const replyList = reactive([])
    const load = () => {
      if (limit.value % 10 !== 0) {
        return false
      }
      proxy.$http.get("/getReply?limit=" + limit.value + "&discuss_id=" + props.discuss_id).then((res) => {
        for (let k in res.data) {
          replyList.push(res.data[k])
        }
        limit.value = limit.value + replyList.length
      })
    }

    watch(
        () => document.body.clientWidth,
        async newId => {
          if (newId>=1000){
            dialogWidth.value = '1000px'
          }else{
            dialogWidth.value = '90%'
          }
        }
  )

    return {load, limit, replyList, discuss_font, dialogWidth}
  }
}
</script>

<style scoped>
.infinite-list {
  height: 600px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.reply_content {
  padding-left: 10%;
  padding-right: 10%;
}

.text-box {
  white-space: pre-line;
  margin-left: 10%;
}
</style>