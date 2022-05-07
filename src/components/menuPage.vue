<template>
  <el-menu
      :default-active="activeIndex"
      mode="horizontal"
  >
    <el-menu-item index="1" @click="toChat('0')">论坛</el-menu-item>
    <el-menu-item index="3" @click="toHome('1')">主页</el-menu-item>
    <el-menu-item index="4" @click="toDetail(id)">文章详情</el-menu-item>
    <div class="menu-div-search">
      <el-input
          placeholder="Please input"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="Select" placeholder="Select" style="width: 91px">
            <el-option label="Restaurant" value="1" />
            <el-option label="Order No." value="2" />
            <el-option label="Tel" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" circle />
        </template>
      </el-input>
    </div>
    <div class="menu-div-search">
      <el-button type="text">
        <div class="block "><el-avatar shape="square" :size="32" :src="avatar"></el-avatar></div>
      </el-button>
    </div>


  </el-menu>

</template>

<script>
import { Search,Select } from '@element-plus/icons-vue'

export default {
  props: ['avatar'],

  data: () => ({
    id: 1,
    activeIndex:3
  }),
  components:{

  },
  setup: () => {
    return { Search,Select };
  },
  methods: {
    toDetail(e) {
      this.$router.push({
        path: `/details/${e}`,
      });
    },
    toHome(e) {
      if ("1" === e) {
        this.$router.push({
          path: `/`,
        });
      } else {
        this.$router.push({
          path: `/circle`,
        });
      }
    },
    toChat() {
      this.$router.push({
        path: `/chat`,
      });
    },
  },
}
</script>

<style scoped>
.home-content-max-width{
  width: 1000px;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  text-align: center;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.menu-div-search{
  margin-left: 100px;
  padding-top: 11px;
  padding-left: 61px;
}
</style>