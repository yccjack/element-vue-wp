<template>

  <el-card class="box-card" style="width: 200px">
    <template #header>
      <div class="card-header">
        <span>创建新的话题</span>
      </div>
    </template>
    <div class="circle-list-content">
      <div class="circle-list-content">
        <ul v-for="o in list" :key="o">
          <li class="text item">
            <el-link :underline="false" @click="circleTipPush(o.content_id)"> {{ o.content }}</el-link>
          </li>
        </ul>
      </div>
    </div>
    <el-divider style="margin: 4px"/>
    <div class=" circle-list-content">
      <el-link class="btn" @click="createCircle()">创建圈子</el-link>
    </div>
  </el-card>
</template>

<script>


export default {
  props: ['list'],
  name: "listOfCircleTips",
  methods: {
    createCircle() {
      this.$router.push({
        path: `/circle` + this.$Global.global_suffix,
      });
    },
    circleTipPush(content_id) {
      if (content_id !== undefined && content_id !== '' && content_id !== null) {
        this.$router.push({
          path: `/circle/${content_id}` + this.$Global.global_suffix,
        });
      }
    }
  }
}
</script>

<style scoped>


</style>