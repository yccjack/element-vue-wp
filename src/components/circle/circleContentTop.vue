<template>
  <el-card class="box-card" style="width: 100%;">
    <el-row :gutter="10">
      <el-col :lg="10" :sm="24" :xs="24" :md="24" :xl="10">
        <el-col :span=8>
          <el-avatar shape="square" :size="50" :src="currentTopic.avatar"></el-avatar>
        </el-col>
        <el-col :span=16>
          <div :class="topInstro">
            <el-col :span=24>
              <span>{{ currentTopic.introduction }} </span>
            </el-col>
          </div>
          <el-col :span=24 :class="topClass">
            <span>  <el-link :underline="false" @click="jumpToTopic(currentTopic.id)"> # {{ currentTopic.introduction }}</el-link></span>

          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <p class="circle-desc msy-radius" :class="topInstro">这是一行提示文字</p>
    <div v-if="is_login">
      <div style=" display:inline;" :class="topClass">
        <el-image style="width: 20px; height: 20px" :src="avatar" :fit="fill"/>
        <b>在</b>
        <el-link type="danger" vClickOutside="onClickOutside" class="msy-popover-pop-link" ref="buttonRef"><span
            :class="topInstro">#
          {{ currentTopic.introduction }}</span>
        </el-link>
        <el-popover
            placement="bottom-start"
            ref="popoverRef"
            :virtual-ref="buttonRef"
            trigger="click"
            virtual-triggering
            :width=300
        >
          <div class="msy-popover">
            <span :class="topInstro"> 可以选择广场、您加入的圈子或者您创建的圈子 </span>
            <div>
              <el-button v-for="o in joinedTopic" :key="o.id" @click="popoverContentClick(o.id)">
                <div class="block avatar">
                  <el-avatar shape="square" :size="17" :src="o.avatar"></el-avatar>
                </div>
                <span style=" text-align: center;padding-top: 7px" :class="topInstro" > {{ o.introduction }}</span>
              </el-button>
            </div>
          </div>
        </el-popover>
        <b style="margin-bottom: 100px">说：</b>
      </div>
      <div class="msy_left_font_" :class="topClass">
        <el-row>
          <el-col :span=24>
            <el-form ref="ruleFormRef"
                     :model="ruleForm"
                     :size="ruleForm.formSize">
              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="标题" clearable/>
              </el-form-item>
              <el-form-item prop="desc">
                <el-input v-model="ruleForm.desc" @input="changeDesc()" type="textarea" :rows="6" minlength="5"
                          show-word-limit maxlength="800" resize="none" placeholder="输入你想说的内容"/>
              </el-form-item>
              <el-form-item v-show="uploadAble">
                <uploadComp :file-list="fileList"/>
              </el-form-item>
              <el-form-item>
                <el-button @click="uploadPic()" v-model="ruleForm.uploadPic">
                  {{ ruleForm.uploadPic }}
                </el-button>
                <el-button :type="ruleForm.subType" @click="submitForm()" @submitSuccess="succeed"
                           v-model="ruleForm.sub"
                           :disabled="ruleForm.disabledSub">
                  {{ ruleForm.sub }}
                </el-button>
                <el-button @click="resetForm()" type="primary">清空输入</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="!is_login" class="out-login-top-content">
      <el-empty description="登录解锁">
        <el-button @click="login(e)" class="btn-1">登录</el-button>
        <el-button @click="register(1)" class="btn-1">快速注册</el-button>
        <login-dialog
            :dialog-visible="dialogVisible"
            :is-register="isRegister"
            @loginOrRegister="receiveMessage"
        />
      </el-empty>
    </div>
  </el-card>
</template>

<script>
import {getCurrentInstance, reactive, ref, unref} from 'vue'
import uploadComp from '@/components/uploadComp';
import {ElMessage} from 'element-plus'
import loginDialog from "@/components/user/loginDialog";

export default {

  props: {
    joinedTopic: {
      type: Object
    },
    currentTopic: {
      type: Object,
      default: {
        id: -1,
        avatar: '',
        introduction: '',
        name: ''
      }
    },
    avatar: {
      type: String
    }
  },
  name: "circleContentTop",
  computed: {
    publishedBooksMessage() {
      return this.msyPopover.autoClose > 0 ? 'Yes' : 'No'
    }
  },
  components: {
    uploadComp,
    loginDialog
  },
  created() {
    if (this.$Global.login) {
      this.is_login = true
    }
    this.userAvatar = this.$Global.user.avatar
    this.topClass = this.$getObjectClass(1)
    this.topInstro = this.$getObjectClass(2)
  },
  data: () => ({
    succeed: new Date().getTime(),
    fileIds: [],
    fileList: [],
    uploadAble: false,
    isRegister: false,
    msyPopover: {
      autoClose: 0,
      hidden: false
    },
    userAvatar: '',
    ruleForm: reactive({
      name: '',
      delivery: false,
      desc: '',
      formSize: '300',
      sub: '少于5字',
      disabledSub: true,
      subType: '',
      uploadPic: '上传图片'
    }),
    props: {
      expandTrigger: 'hover',
    },
    is_login: false
  }),
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance()
    const topClass = reactive({})
    const topInstro = reactive(proxy.$getObjectClass(1))
    const buttonRef = ref()
    const popoverRef = ref()
    const dialogVisible = ref(false);
    const submitSuccess = (data) => {
      emit('submitSuccess', data)
    }
    const onClickOutside = () => {
      unref(popoverRef).popperRef?.delayHide?.()
    }
    function jumpToTopic(id) {
      proxy.$router.push({
        path: `/topic/${id}` + proxy.$Global.global_suffix,
      });
    }
    const receiveMessage = (data) => {
      dialogVisible.value = data;
    }
    return {submitSuccess, buttonRef, popoverRef, dialogVisible, onClickOutside, receiveMessage, topClass, topInstro,jumpToTopic}
  },
  methods: {
    popoverContentClick() {
      this.msyPopover.hidden = false;
    },
    popoverClick() {
      this.msyPopover.hidden = true;
    },
    submitForm() {
      let formData = new FormData();
      this.fileList.forEach(file => {
        this.fileIds.push(file.id)
      })
      formData.append("title", this.ruleForm.name)
      formData.append("content", this.ruleForm.desc)
      formData.append("pics", this.fileIds)
      formData.append("type", this.currentTopic.id)
      this.$http.post('/saveCircleContent', formData).then((res) => {
        if (res.status === 200) {
          this.resetForm();
          this.fileList = [];
          this.fileIds = [];
          this.submitSuccess(new Date().getTime())
          ElMessage({
            message: '保存成功！',
            type: 'success',
          })
        } else {
          ElMessage.error('保存失败')
        }

      })
    },
    resetForm() {
      this.ruleForm.name = "";
      this.ruleForm.desc = "";
      this.changeDesc();
    },
    changeDesc() {
      if (this.ruleForm.desc.length < 5) {
        this.ruleForm.disabledSub = true;
        this.ruleForm.sub = '少于5字';
        this.ruleForm.subType = '';
      } else {
        this.ruleForm.disabledSub = false;
        this.ruleForm.sub = '立即提交';
        this.ruleForm.subType = 'primary';

      }
    },
    uploadPic() {
      this.uploadAble = true;
    },
    login() {
      this.isRegister = false
      this.dialogVisible = true
    },
    register() {
      this.isRegister = true
      this.dialogVisible = true
    },
  }

}
</script>

<style scoped>


p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 3px;
  margin-inline-end: 3px;
}

.out-login-top-content {
  height: 285px;
  max-height: 400px;
}

</style>