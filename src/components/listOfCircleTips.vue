<template>

  <el-card class="box-card" style="width: 200px">
    <template #header>
      <div class="card-header">
        <span>标题</span>
      </div>
    </template>
    <div class="circle-tips-div">
      <div class="circle-tips-div">
        <ul v-for="o in 4" :key="o">
          <li class="text item">
            <el-link :underline="false">   {{ '列表内容 ' + o }}</el-link>
          </li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "listOfCircleTips"
}
</script>

<style scoped>



</style>