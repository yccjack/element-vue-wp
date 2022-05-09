<template>
  <el-card class="box-card" style="width: 200px">
    <div class="card-header">
      <span>圈子</span>
    </div>
    <div class="circle-list-content">
      <div class="text item" v-for="o in list" :key="o">
        <el-button class="btn">
          <div class="block avatar">
            <el-avatar shape="square" :size="32" :src="o.avatar"></el-avatar>
          </div>
          {{ o.introduction }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props:['list'],
  name: "circleTags",

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