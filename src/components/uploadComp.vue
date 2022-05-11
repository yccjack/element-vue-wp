<template>
  <div>
    <el-upload
        action="http://localhost:5000/upload"
        list-type="picture-card"
        :file-list="fileList"
    >
      <el-icon>
        <Plus/>
      </el-icon>
    </el-upload>
  </div>
</template>

<script>


export default {
  name: "uploadComp",
  data() {
    return {
      fileList: []
    };
  },
}

</script>

<style scoped>

</style>