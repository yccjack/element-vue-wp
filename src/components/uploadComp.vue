<template>
  <div>
    <el-upload
        :action="actionUrl"
        list-type="picture-card"
        :file-list="fileList"
        name="fileList"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="picCanUploadCount"
        :on-exceed="exceed"
        :headers="headerObj"
        :before-upload="beforeUpload"
    >
      <el-icon>
        <Plus/>
      </el-icon>
      <template #tip>
        <div class="el-upload__tip text-red">
          <p>请勿上传超过{{ picCanUploadCount }}张图片</p>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {getCurrentInstance, ref} from "vue";


export default {
  props: {
    fileList: {
      type: [],
      default: []
    },
    picCanUploadCount: {
      type: [Number, String],
      default: 10
    }
  },
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance();
    const actionUrl = proxy.$uploadUrl;

    function exceed(uploadFiles) {
      ElMessage.error('上传图片请勿超过' + this.picCanUploadCount + '张')
    }

    function handleRemove(file, fileList) {
      emit('picList', fileList)
    }

    const beforeUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片格式错误')
        return false
      } else if (rawFile.size / 1024 / 1024 > proxy.$Global.global_pic_size_limit) {
        ElMessage.error('请不要上传超过' + proxy.$Global.global_pic_size_limit + 'MB!的图片')
        return false
      }
      return true
    }

    function handleSuccess(res, file) {
      if (res) {
        file.id = res
        ElMessage({
          message: '上传成功！',
          type: 'success',
        })
        emit('picChange', file)
      } else {
        ElMessage.error('上传失败')
      }
    }

    return {
      exceed,
      handleRemove,
      handleSuccess,
      beforeUpload,
      actionUrl
    }
  },

  name: "uploadComp",
  data: () => ({
    headerObj: {Authorization: '', user_id: ''}
  }),
  created() {
    this.headerObj.Authorization = this.$Global.user.id
    this.headerObj.user_id = this.$Global.user.id
  },
  methods: {}
}

</script>

<style scoped>

</style>