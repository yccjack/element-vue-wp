<template>
  <el-card class="box-card" style="width: 200px">
    <div class="card-header">
      <span>标题</span>
    </div>
    <div class="circle-tips-div">
      <div class="text item" v-for="o in 4" :key="o">
        <el-button class="btn">
          <div class="block avatar">
            <el-avatar shape="square" :size="32" :src="avatar"></el-avatar>
          </div>
          {{ '列表内容 ' + o }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "circleTags",
  data: () => ({
    id: 1,
    name: "李四",
    avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg"
  }),
}
</script>

<style scoped>
.card-header {
  margin-bottom: 14px;
}

.btn {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
}

.avatar {
  margin-right: 10px;
}
</style>