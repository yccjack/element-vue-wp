<template >
  <div >
  <el-upload
      action="http://localhost:5000/upload"
      list-type="picture-card"
      :file-list="fileList"
      multiple=true
      name="fileList"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
  >
    <el-icon>
      <Plus/>
    </el-icon>
  </el-upload>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "uploadComp",
  data:()=>({
    fileList:[]
  }),
  methods:{
    handleRemove(UploadFile){
      console.log(UploadFile)
      console.log(this.fileList)
    },
     handleSuccess(res, file){
      console.log('handleSuccessres',res)
      console.log('handleSuccessfile',file)
      if (res) {
        setTimeout(() => {
          alert('上传成功')
        }, 1500);

      } else {
        alert('视频上传失败，请重新上传！');
      }
    }
  }
}

</script>

<style scoped>

</style>