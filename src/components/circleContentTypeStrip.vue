<template>
  <el-card class="box-card tabs-text el-card__body" style="width: 100%;">
    <div >
      <div class="text">
        <el-button class="btn msy-link-ui" v-for="o in strips" :key="o" @click="typeBtnClick(o.id)" >
          <div class="block avatar">
            <el-avatar shape="square" :size="17" :src="o.avatar"></el-avatar>
          </div>
          {{ o.introduction }}
        </el-button>
      </div>
      <el-divider style="margin:4px"/>
      <div class="text">
        <el-button class="btn msy-link-ui" v-for="o in types" :key="o" @click="typeBtnClick(o.id)" >
          {{ o.name }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props:['strips','types'],
  data: () => ({

  }),
  methods:{
    typeBtnClick(id){
      console.log(id)
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
.msy-link-ui{
  font-size: 15px;
}

.btn {
  border: none;
  background-color: transparent;
}
</style>