<template>
  <el-card class="box-card tabs-text el-card__body" style="width: 100%;">
    <el-link href="" target="_blank" class="msy-link-ui">标头</el-link>
    <el-link href="" target="_blank" class="msy-link-ui">标头</el-link>
    <el-link href="" target="_blank" class="msy-link-ui">标头</el-link>
    <el-link href="" target="_blank" class="msy-link-ui">标头</el-link>

  </el-card>
</template>

<script>
export default {
  data: () => ({
    activeName: 'first'
  }),
  name: "circleContentMid"
}
</script>

<style scoped>
.tabs-text {
  text-align: left;
}

.el-card__body {
  padding: 0;
}
.msy-link-ui{
  font-size: 18px;
  margin-left: 9%;
}
</style>