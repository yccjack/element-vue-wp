<template>
  <el-card class="box-card"  style="width: 100%;" >
    <el-col span="12">
      <div class="block "><el-avatar shape="square" :size="50" :src="avatar"></el-avatar></div>
    </el-col>

    <el-col span="12">
      <div class="block "><el-avatar shape="square" :size="50" :src="avatar"></el-avatar></div>
    </el-col>

  </el-card>
</template>

<script>
export default {
  name: "circleContentTop",
  data: () => ({
    id: 1,
    name: "李四",
    avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg"
  }),
}
</script>

<style scoped>

</style>