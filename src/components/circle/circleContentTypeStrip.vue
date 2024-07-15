<template>
  <el-card class="box-card tabs-text el-card__body" style="width: 100%;">
    <el-row>
      <el-col :span=5 class="text" v-for="o in strips" :key="o">
        <el-button class="btn" :class="butSize" @click="typeBtnClick(o.id)">
          <el-avatar shape="square" :size="17" :src="o.avatar"></el-avatar>
          <span style="margin-left: 2px">{{ o.content }}</span>
        </el-button>
      </el-col>
      <el-divider style="margin:4px"/>
      <el-col :span=4 class="text" v-for="o in types" :key="o">
        <el-button class="btn " :class="butSize" @click="typeBtnClick(o.id)">
          {{ o.content }}
        </el-button>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
export default {
  props: ['strips', 'types'],
  data: () => ({
    butSize: {}
  }),
  created() {
    this.butSize = this.$getObjectClass(2)
  },
  methods: {
    typeBtnClick(id) {

    }
  },
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
.btn {
  border: none;
  background-color: transparent;
}
</style>