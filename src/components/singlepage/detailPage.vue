<template>
  <el-row class="page_left_align item" :class="content_title" v-if="!doEdit">
    <el-col :span=24 :style="{'max-width': componentWith,'margin-left': componentMargin}">
      <el-card class="box-card">
        <el-row>
          <el-col :span=24 class="user-content-padding">
            <msyAvatar :avatar="detailData.avatar"
                       :admin-name="detailData.adminName"
                       :nickname="detailData.nickname"
                       :lever-title="detailData.leverTitle "
                       :lever="detailData.lever"
                       :user_id="detailData.avatar_id"
            />
            <el-col v-if="detailData.self ===1" :span=2 :offset=18 @click="editThis">
              <el-button type="text">
                <el-icon :size="20">
                  <Edit/>
                </el-icon>
              </el-button>
            </el-col>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span=24 class="text-box">
            <h3>{{ detailData.contentTitle }}</h3>
            <p class="text-content">{{ detailData.content }}</p>
            <el-row :gutter="10">
              <el-col :span=5 v-for="(pic,index) in detailData.pics" :key="pic" >
                <el-image :src="getPic(pic)" :fit="contain" :preview-src-list="srcList" :initial-index="index"
                />
              </el-col>
            </el-row>
          </el-col>
          <like :id=detailData.id
                :like-count=detailData.likeCount
                :talk=detailData.talk
                :you-liked="detailData.youLiked"
                :single-page=true
          />
        </el-row>

      </el-card>
    </el-col>
  </el-row>
  <el-row v-if="doEdit" :class="classObject">
    <el-col :span=24 :style="{'max-width': componentWith,'margin-left': componentMargin}">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>内容修改</span>
            <el-button class="button" text @click="returnDetail">返回</el-button>
          </div>
        </template>
        <div>
          <editPage
              :title="detailData.contentTitle"
              :content="detailData.content"
              :pic-list="detailData.imgId"
              :content_id="detailData.id"
              @changeData="receiveEditData"
              @editPicChange="receivePic"
              @editPicList="receivePicList"
          />
        </div>
      </el-card>
    </el-col>
  </el-row>
  <discuss
      :content_id="detailData.id"
      @addTalk="receiveTalk"
  />
</template>

<script>
import like from "@/components/like";
import {getCurrentInstance, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import editPage from "@/components/singlepage/editPage";
import discuss from "@/components/singlepage/discuss";
import msyAvatar from "@/components/user/msyAvatar";

export default {

  activated() {
    if (document.body.clientWidth < 768) {
      this.componentWith = '100%'
      this.componentMargin = '1%'
    }
  },
  props: {
    circleId: {
      type: [String, Number],
      default: 1
    },
  },
  components: {
    like,
    editPage,
    discuss,
    msyAvatar
  },
  setup(props) {
    const {proxy} = getCurrentInstance()
    const urlParam = ref('')
    const path = ref('')
    const doEdit = ref(false)
    const currentPageComponent = ref('')
    const componentWith = ref('100%')
    const componentMargin = ref('0')
    const srcList = ref([])
    const previewIndex = ref(0)
    const detailData = ref({
      id: "",
      name: "",
      nickname: '',
      leverTitle: "",
      adminName: "",
      contentTitle: "",
      content: "",
      pics: [],
      imgId: '',
      likeCount: 0,
      talk: 0,
      youLiked: 0,
      self: 0
    })

    function getCircleDetail(id) {
      proxy.$http.get("/getCircleDetail?id=" + id).then((res) => {
        if (res.status === 200) {
          detailData.value = res.data
          for (let k in detailData.value.pics) {
            srcList.value.push(getPic(detailData.value.pics[k]))
          }
        } else {
          ElMessage.error('获取内容失败')
        }
      })
    }

    urlParam.value = proxy.$route.params.id
    getCircleDetail(urlParam.value)

    function getPicPreview(index, pics) {
      let picPreviewList = []
      for (const k in pics) {
        picPreviewList.push(this.getPic(pics[k]))
      }
      previewIndex.value = index
      return picPreviewList
    }


    const editThis = () => {
      doEdit.value = true
    }
    const returnDetail = () => {
      doEdit.value = false
    }

    function getPic(pic) {
      if (pic.startsWith('http')) {
        return pic
      }
      return proxy.$Global.imgPre + pic
    }

    const receiveEditData = (data) => {
      detailData.value.contentTitle = data.name
      detailData.value.content = data.desc
      doEdit.value = false

    }

    const receiveTalk = (data) => {
      detailData.value.talk = data
    }
    const receivePic = (data) => {
      let pic = data.name
      if (detailData.value.pics === undefined) {
        detailData.value.pics = []
      }
      detailData.value.pics.push(pic)
      srcList.value.push(pic)
    }

    const receivePicList = (data) => {
      let receivePics = []
      for (let k in data) {
        receivePics.push(data[k].url)
      }
      detailData.value.pics = receivePics
    }
    return {
      getPicPreview,
      getPic,
      previewIndex,
      urlParam,
      path,
      currentPageComponent,
      componentWith,
      componentMargin,
      detailData,
      editThis,
      doEdit,
      returnDetail,
      srcList,
      receiveEditData,
      receivePic,
      receivePicList,
      receiveTalk
    }
  },
  created() {
    this.content_title=this.$getObjectClass(2)
  },
  data: () => ({
    picPreviewList: [],
    content_title:{}
  }),
  name: "detailPage",
  methods: {},
}
</script>

<style scoped>
.text-box {
  white-space: pre-line;
  margin-left: 10%;
}

.text-content {
  line-height: 30px;
}
.page_left_align {
  text-align: left;
}

.page_center_align {
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>