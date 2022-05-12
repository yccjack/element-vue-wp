<template>
  <div>
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
export default {
  props: {
    fileList: {
      type: [],
      default: []
    }
  },


  name: "uploadComp",
  data: () => ({}),
  methods: {
    handleRemove(file, fileList) {

      this.$emit('picList', this.fileList)
    },
    handleSuccess(res, file) {
      if (res) {
        setTimeout(() => {
          file.id = res
          alert('上传成功')
        }, 100);

      } else {
        alert('上传失败，请重新上传！');
      }
    }
  }
}

</script>

<style scoped>

</style>