<template>

    <el-col :xs="0" :sm="12" :md="4" :lg="2" :lx="2">
      <el-button type="text" @click="jumpUserDetail(user_id)">
      <el-avatar :size="50" :src="avatar"></el-avatar>
      </el-button>
    </el-col>
  <el-col :xs="12" :sm="0" :md="0" :lg="0" :lx="0">
    <el-button type="text" @click="jumpUserDetail(o.userId)">
      <el-avatar :size="25" :src="avatar"></el-avatar>
    </el-button>
    </el-col>
    <el-col :xs="0" :sm="12" :md="4" :lg="2" :lx="2">
      <div class="circle-content-tip-div" :class="avatar_size">
        <el-col :span=24>
          <span>{{ nickname }}</span><span v-if="lever>0" class="circle-admin" :class="avatar_size">Lv{{ lever }}</span>
        </el-col>
      </div>
      <div class="circle-content-tip-div" :class="avatar_size">
        <el-col :span=24 v-if="floor>0">
          <span class="circle-admin">{{ floor }}楼</span>
        </el-col>
      </div>
    </el-col>

</template>

<script>
export default {
  props: ['avatar', 'nickname', 'adminName', 'leverTitle', 'lever','floor','user_id'],
  name: "avatar",
  created() {
    this.avatar_size = this.$getObjectClass(1)
  },
  data:()=>({
    avatar_size:{}
  }),
  methods:{
    jumpUserDetail(id) {
      this.$router.push({
        path: `/user/${id}` + this.$Global.global_suffix
      });
    }
  }
}
</script>

<style scoped>

.circle-admin {
  display: inline-block;
  margin-left: 5px;
  color: #aaaeb3;
}

</style>