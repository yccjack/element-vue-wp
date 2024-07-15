<template>
  <el-card>
    <div v-show="create===1">
      <el-divider content-position="left">创建新的圈子</el-divider>
      <el-row>
        <el-row>
          <el-col :span=24>
            <el-form ref="ruleFormRef"
                     :model="ruleForm"
                     :size="ruleForm.formSize">
              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="圈子名称" clearable @input="changeDesc"/>
              </el-form-item>
              <el-form-item>
                <el-col style="padding-top: 20px;">
                  <el-upload
                      :action=actionUrl
                      :show-file-list="false"
                      name="avatarPic"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :headers="headerObj"
                  >
                    <el-button type="text">
                      <el-avatar shape="square" :size="80">
                        <el-avatar shape="square" :size="80"
                                   :src="imageUrl"></el-avatar>
                      </el-avatar>
                    </el-button>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        <p>圈子默认头像</p>
                      </div>
                    </template>
                  </el-upload>

                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button :type="ruleForm.subType" @click="submitForm()"
                           v-model="ruleForm.sub"
                           :disabled="ruleForm.disabledSub">
                  {{ ruleForm.sub }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <el-divider content-position="left">我创建的圈子</el-divider>
    <el-row :gutter="12" :class="fontClass">
      <el-col :span="6" v-for="(v,k) in selfCircleInfo" :key="k">
        <el-card shadow="hover" class="msy_left_font_ global_margin_top_">
          <el-button class="btn" @click="tagClick(v.id)">
            <div class="global_margin_left_">
              <el-avatar shape="square" :size="32" :src="v.avatar"></el-avatar>
            </div>
            <span class="global_margin_left_">
          {{ v.introduction }}
            </span>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-divider content-position="left">全部圈子</el-divider>
    <el-row :gutter="12" :class="fontClass">
      <el-col :span="6" v-for="(v,k) in circleInfo" :key="k">
        <el-card shadow="hover" class="msy_left_font_ global_margin_top_">
          <el-button class="btn" @click="tagClick(v.id)">
            <div class="global_margin_left_">
              <el-avatar shape="square" :size="32" :src="v.avatar"></el-avatar>
            </div>
            <span class="global_margin_left_">
          {{ v.introduction }}
            </span>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {getCurrentInstance, reactive, ref} from "vue";
import uploadComp from "@/components/uploadComp";
import {ElMessage, ElNotification} from "element-plus";

export default {
  name: "circleList",
  components: {
    uploadComp
  },
  props: {
    type: {
      type: [String, Number],
      default: 1
    }
  },
  setup(props) {
    const {proxy} = getCurrentInstance()
    const fileIds = ref([])
    const fileList = ref([])
    const uploadAble = ref(false)
    const imageUrl = ref('http://e.gschaos.club/defaultico.jpg')
    const circleInfo = ref([])
    const selfCircleInfo = ref([])
    const actionUrl = proxy.$uploadUrl;
    const create = ref(props.type)
    const headerObj = ref({Authorization: '', user_id: '', type: 1})
    headerObj.value.Authorization = String(proxy.$Global.user.id)
    headerObj.value.user_id = String(proxy.$Global.user.id)

    const ruleForm = reactive({
      name: '',
      delivery: false,
      desc: '',
      formSize: '300',
      sub: '少于2字',
      disabledSub: true,
      subType: '',
      uploadPic: '上传图片'
    })
    const getCircleInfo = () => {
      proxy.$http.get('/circleInfo').then((res) => {
        circleInfo.value = res.data
        for (let k in res.data) {
          let forData = res.data[k]
          if (String(forData.userId) === String(proxy.$Global.user.id)) {
            selfCircleInfo.value.push(forData)
          }
        }
      })
    }

    const uploadPic = () => {
      uploadAble.value = true;
    }
    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片格式错误')
        return false
      } else if (rawFile.size / 1024 / 1024 > proxy.$Global.global_pic_size_limit) {
        ElMessage.error('请不要上传超过' + proxy.$Global.global_pic_size_limit + 'MB!的图片')
        return false
      }
      headerObj.value.type = 1
      return true
    }

    const submitForm = (file) => {
      let formData = new FormData();
      formData.append("name", ruleForm.name)
      formData.append("pic", imageUrl.value)
      proxy.$http.post('/createCircle', formData).then((res) => {
        if (res.status === 200) {
          let newCircle = {
            id: res.data.id,
            avatar: imageUrl.value,
            introduction: ruleForm.name,
          }
          selfCircleInfo.value.push(newCircle)
          circleInfo.value.push(newCircle)
          fileList.value = [];
          fileIds.value = [];
          ruleForm.name = ''
          ruleForm.sub = '今天已创建了新主题，请明天再试';
          ruleForm.disabledSub = true
          create.value = 0

          ElNotification({
            message: '保存成功！',
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Success',
            message: '保存失败',
            type: 'error',
          })
        }

      })
    }
    getCircleInfo
    ()
    const fontClass = ref(proxy.$getObjectClass(1))
    return {
      circleInfo,
      fontClass,
      ruleForm,
      fileIds,
      fileList,
      uploadAble,
      uploadPic,
      submitForm,
      actionUrl,
      headerObj,
      imageUrl,
      beforeAvatarUpload,
      create,
      selfCircleInfo
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = this.$Global.imgPre + file.name
      ElMessage({
        message: '圈子头像设置成功！',
        type: 'success',
      })
    },
    changeDesc() {
      if (this.ruleForm.name.length < 2) {
        this.ruleForm.disabledSub = true;
        this.ruleForm.sub = '少于2字';
        this.ruleForm.subType = '';
      } else {
        this.ruleForm.disabledSub = false;
        this.ruleForm.sub = '提交';
        this.ruleForm.subType = 'primary';
      }
    },
    tagClick(id) {
      this.$router.push({
        path: `/topic/${id}` + this.$Global.global_suffix
      })
    }
  }
}
</script>

<style scoped>

</style>