<template>
  <div class="circle-content-form-title">
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
            <uploadComp :file-list="fileList"
                        @picChange="receivePic"
                        @picList="receivePicList"
            />
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
</template>

<script>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import uploadComp from "@/components/uploadComp";

export default {
  name: "editPage",
  created() {
    this.ruleForm.name = this.title
    this.ruleForm.desc = this.content
    this.ruleForm.id = this.content_id
    this.ruleForm.disabledSub = true;
    this.ruleForm.sub = '未修改';
    this.ruleForm.subType = '';

    if (this.picList !== undefined && this.picList !== "") {
      this.$http.get('/getPic?pics=' + this.picList).then((res) => {
        for (let k in res.data) {
          this.uploadAble = true
          this.fileList.push({
            id: res.data[k].id,
            name: res.data[k].filename,
            url: this.getImgUrl(res.data[k].filePath)
          })
        }
      })
    }
  },
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    picList: {
      type: [Array, Object]
    },
    content_id: {
      type: [String, Number],
      default: -1
    }
  },
  components: {
    uploadComp
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

  }),
  setup(props,{emit}) {
    const ruleForm = reactive({
      id: -1,
      name: '',
      delivery: false,
      desc: '',
      formSize: '300',
      sub: '少于5字',
      disabledSub: true,
      subType: '',
      uploadPic: '上传图片'
    })
    const receivePic = (data) => {
      emit('editPicChange',data)
      ruleForm.disabledSub = false;
      ruleForm.sub = '立即提交';
      ruleForm.subType = '';

    }
    const receivePicList = (data) => {
      emit('editPicList',data)
      ruleForm.disabledSub = false;
      ruleForm.sub = '立即提交';
      ruleForm.subType = '';
    }

    return {
      receivePic,
      ruleForm,
      receivePicList
    }
  },
  methods: {
    submitForm() {
      let formData = new FormData();
      this.fileList.forEach(file => {
        this.fileIds.push(file.id)
      })
      formData.append("title", this.ruleForm.name)
      formData.append("id", this.ruleForm.id)
      formData.append("content", this.ruleForm.desc)
      formData.append("pics", this.fileIds)
      this.$http.post('/updateCircleContent', formData).then((res) => {
        if (res.status === 200) {
          ElMessage({
            message: '保存成功！',
            type: 'success',
          })
          this.$emit('changeData', this.ruleForm)
          this.resetForm();
          this.fileList = [];
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
    getImgUrl(path) {
      return this.$Global.imgPre + path
    }
  }
}
</script>

<style scoped>

</style>