<template>
  <div class="circle-content">
    <el-card v-for="o in 10" :key="o" class="circle-content">
      <p>这是标题部分</p>

      <p>这是内容摘要</p>

      <p>这是内容脚部</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "circleContent"
}
</script>

<style scoped>
.circle-content {
  margin-top: 10px;
  padding-top: 10px;
}
</style>