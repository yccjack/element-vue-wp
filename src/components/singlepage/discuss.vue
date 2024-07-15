<template>
  <el-card class="box-card discuss_card">
    <div class="tip_font">
      看帖是喜欢，评论才是真爱:
    </div>
    <el-input v-model="discuss" type="textarea" :rows="6" minlength="5" @input="changeDesc()"
              show-word-limit maxlength="500" resize="none" placeholder="请开始你的表演"/>
    <uploadComp :file-list="fileList" v-show="uploadAble"/>
    <el-button @click="uploadPic" v-model="uploadPicDesc">
      {{ uploadPicDesc }}
    </el-button>
    <el-button :type="subType" @click="submitForm()"
               v-model="sub"
               :disabled="disabledSub">
      {{ sub }}
    </el-button>
  </el-card>
  <el-card class="box-card discuss_card">
    <div v-for="(val,key) in dis" :key="key" class="discuss_content">
      <span>{{ k }}</span>
      <el-row>
        <el-col :span=24 class="user-content-padding">
          <msyAvatar :avatar="val.avatar"
                     :admin-name="val.adminName"
                     :nickname="val.nickname"
                     :lever-title="val.leverTitle"
                     :lever="val.lever"
                     :floor="val.floor"
                     :user_id="val.avatar_id"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=24 class="text-box">
          <p class="text-content" :class="discuss_font">{{ val.discuss_content }}</p>
          <el-row :gutter="10">
            <el-col :span=6 v-for="(pic,index) in val.pics" :key="pic">
              <el-image :src="getPic(pic)" :fit="contain" :preview-src-list="getReplyView(val.pics)"
                        :initial-index="index"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>

        <el-col :xs="12" :sm="12" :md="4" :lg="4" :lx="4"><span class=" discuss_font_color"
                                                                :class="discuss_font">7个小时前</span>
        </el-col>
        <el-col :xs="0" :sm="0" :md="16" :lg="16" :lx="16"></el-col>
        <el-col :xs="12" :sm="12" :md="4" :lg="4" :lx="4">
          <el-space size="10" spacer="|">
            <el-link :underline="false" @click="replyClick(key)">
              <el-icon>
                <ChatLineSquare/>
              </el-icon>
            </el-link>
            <el-link :underline="false">
              <el-icon>
                <Pointer/>
              </el-icon>
            </el-link>
          </el-space>
          <span><span class=" discuss_font_color" :class="discuss_font">1024</span></span>
        </el-col>
      </el-row>

      <div class="reply_back">
        <div v-show="showReply === key">
          <el-input v-model="replyContent" type="textarea" :rows="6" minlength="5" @input="changeDesc(1)"
                    show-word-limit maxlength="500" resize="none" placeholder="请开始你的表演"/>
          <uploadComp :file-list="replyFileList" v-show="replyUploadAble"/>
          <el-button @click="uploadPic(1)" v-model="uploadPicDesc">
            {{ uploadPicDesc }}
          </el-button>
          <el-button :type="replyType" @click="submitForm(1,val.id,key)"
                     v-model="replySub"
                     :disabled="disabledReply">
            {{ replySub }}
          </el-button>
        </div>
        <el-row v-for="(v,k) in val.replyList" :key="k" class="discuss_content">
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
        </el-row>
      </div>
      <div v-if="val.totalReply>2" style="text-align: center">
        <el-link :underline="false" type="info" @click="openAllReply(val.id)">查看全部{{ val.totalReply }}条评论></el-link>
      </div>
      <replyAll
          :count=0
          :dialog-visible="dialogVisible(val.id)"
          :discuss_id="val.id"
          @dialogClose="receiveCloseEvent"
      />
      <el-divider></el-divider>
    </div>
  </el-card>
</template>

<script>
import uploadComp from "@/components/uploadComp";
import {ElMessage, ChatLineSquare, Pointer} from "element-plus";
import msyAvatar from "@/components/user/msyAvatar";
import replyAll from "@/components/singlepage/replyAll";
import {ref} from "vue";

export default {
  created() {
    this.discuss_font = this.$getObjectClass(2)
  },
  props: {
    content_id: {
      type: String
    }
  },
  setup() {
    const openReply = ref(-1)
    const receiveCloseEvent = (data) => {
      openReply.value = -1
    }
    return {
      ChatLineSquare, Pointer, receiveCloseEvent,openReply
    }
  },
  name: "discuss",
  data: () => ({
    showReply: -1,
    discuss: '',
    fileList: [],
    fileIds: [],
    dis: [],
    uploadAble: false,
    uploadPicDesc: '上传图片',
    subType: '',
    sub: '提交',
    replySub: '提交',
    replyType: '',
    disabledSub: true,
    srcList: [],
    disabledReply: true,
    replyContent: '',
    replyUploadAble: false,
    replyFileList: [],
    discuss_font: {},

  }),
  components: {
    uploadComp,
    msyAvatar,
    replyAll,
  },
  methods: {
    openAllReply(discuss_id) {
      this.openReply = discuss_id
    },
    dialogVisible(discuss_id) {
      return this.openReply === discuss_id
    },
    replyFloorSelf(key) {
      if (this.showList.includes(key)) {
        this.showList.map((val, i) => {
          if (val === id) {
            this.showList.splice(i, 1)
          }
        })
        return false;
      }
      return true;
    },
    show(key) {
      this.replyFloorSelf(key)
    },
    getReplyView(pics) {
      let srcList = []
      for (let k in pics) {
        srcList.push(this.getPic(pics[k]))
      }
      return srcList;
    },
    replyClick(key) {
      this.showReply = key;
    },
    getPic(pic) {
      if (pic.startsWith('http')) {
        return pic
      }
      return this.$Global.imgPre + pic
    },
    submitForm(type, discuss_id, index) {
      if (type === 1) {
        let formData = new FormData();
        let reply_list = []
        this.replyFileList.forEach(file => {
          this.fileIds.push(file.id)
          reply_list.push(file.name)
        })
        formData.append("replyContent", this.replyContent)
        if (formData.get("pics") == null || formData.get("pics") === undefined) {
          formData.append("pics", this.fileIds)
        }
        formData.append("content_id", this.content_id)
        formData.append("discuss_id", discuss_id)

        this.$http.post('/saveReply', formData).then((res) => {
          if (res.status === 200) {
            let successRefresh = {
              avatar: this.$Global.user.avatar,
              adminName: this.$Global.user.name,
              nickname: this.$Global.user.nickname,
              levelTitle: this.$Global.user.levelTitle,
              lever: this.$Global.user.lever,
              reply_content: this.replyContent,
              discuss_id: discuss_id,
              pics: reply_list,
            }
            if (this.dis[index].replyList === undefined || this.dis[index].replyList === null) {
              this.dis[index].replyList = [{}]
              this.dis[index].replyList[0] = (successRefresh)
            } else {
              this.dis[index].replyList.push(successRefresh)
            }
            this.replyFileList = [];
            this.replyContent = '';
            this.replyUploadAble = false;
            this.changeDesc(1)
            this.fileIds = []
            this.replyFloorSelf = false
            ElMessage({
              message: '保存成功！',
              type: 'success',
            })
          } else {
            ElMessage.error('保存失败')
          }

        })
      } else {
        let formData = new FormData();
        let pic_list = []
        this.fileList.forEach(file => {
          this.fileIds.push(file.id)
          pic_list.push(file.name)
        })
        formData.append("discuss", this.discuss)
        if (formData.get("pics") == null || formData.get("pics") === undefined) {
          formData.append("pics", this.fileIds)
        }
        formData.append("content_id", this.content_id)

        this.$http.post('/saveDiscuss', formData).then((res) => {
          if (res.status === 200) {
            let result = String(res.data).split(",")
            let successRefresh = {
              avatar: this.$Global.user.avatar,
              adminName: this.$Global.user.name,
              nickname: this.$Global.user.nickname,
              levelTitle: this.$Global.user.levelTitle,
              lever: this.$Global.user.lever,
              floor: result[0],
              id: result[1],
              discuss_content: this.discuss,
              pics: pic_list,
            }
            this.dis.push(successRefresh);
            this.fileList = [];
            this.discuss = '';
            this.uploadAble = false;
            this.changeDesc()
            this.fileIds = []
            this.replyFloorSelf = false
            this.$emit("addTalk", result[0])
            ElMessage({
              message: '保存成功！',
              type: 'success',
            })
          } else {
            ElMessage.error('保存失败')
          }

        })
      }

    },
    changeDesc(type) {
      if (type === 1) {
        if (this.replyContent.length < 5) {
          this.disabledReply = true;
          this.replySub = '少于5字';
          this.replyType = '';
        } else {
          this.disabledReply = false;
          this.replySub = '提交';
          this.replyType = 'primary';
        }
      } else {
        if (this.discuss.length < 5) {
          this.disabledSub = true;
          this.sub = '少于5字';
          this.subType = '';
        } else {
          this.disabledSub = false;
          this.sub = '提交';
          this.subType = 'primary';

        }
      }

    },
    uploadPic(type) {
      if (type === 1) {
        this.replyUploadAble = true;
      } else {
        this.uploadAble = true;
      }

    },
  },
  watch: {
    content_id: {
      immediate: true,
      handler(value) {
        if (value !== undefined && value !== '') {
          this.$http.get('/getDiscuss?content_id=' + this.content_id).then((res) => {
            if (res.status === 200) {
              this.dis = res.data
            } else {

            }
          })
        }
      }
    }
  }

}
</script>

<style scoped>
.discuss_card {
  text-align: left;
  margin-top: 20px;
  padding: 10px;
}

.tip_font {
  color: #aaaeb3;
  margin-bottom: 10px;
  margin-left: 5px;
}

.discuss_content {
  padding-left: 10%;
  padding-right: 10%;
}

.text-box {
  white-space: pre-line;
  margin-left: 10%;
}

.reply_back {
  background-color: #f3f3f4;
}

.discuss_font_color {
  color: #aaaeb3;
}
</style>