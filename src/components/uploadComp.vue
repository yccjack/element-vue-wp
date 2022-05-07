<template >
  <div >
  <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"

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

}

</script>

<style scoped>

</style>