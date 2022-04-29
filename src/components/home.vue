<template>
  <div class="home-content-max-width">
    <el-container>
      <el-header height="64px">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="1" @click="toHome('0')">论坛</el-menu-item>
          <el-menu-item index="3" @click="toHome('1')">主页</el-menu-item>
          <el-menu-item index="4" @click="toDetail(id)">文章详情</el-menu-item>
          <div class="menu-div-search">
            <el-input
                v-model="input3"
                placeholder="Please input"
                class="input-with-select"
            >
              <template #prepend>
                <el-select v-model="select" placeholder="Select" style="width: 91px">
                  <el-option label="Restaurant" value="1" />
                  <el-option label="Order No." value="2" />
                  <el-option label="Tel" value="3" />
                </el-select>
              </template>
              <template #append>
                <el-button type="primary">
                  <el-icon style="vertical-align: middle">
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="menu-div-search">
            <el-button type="text">
              <div class="block "><el-avatar shape="square" :size="32" :src="avatar"></el-avatar></div>
            </el-button>
          </div>


        </el-menu>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="4">
            <el-card class="box-card">
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>

          </el-col>
          <el-col :span="8">

          </el-col>
          <el-col :span="6">

          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import axios from "axios";
import menu from "./menu"
import { ref } from 'vue'
const input3 = ref('')

export default {
  created() {
    this.getUserInfo()
    console.log("调用一次接口")
  },
  data: () => ({
    id: 1,
    name: "李四",
    avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg"
  }),
  components:{
    menu
  },
  methods: {
    toDetail(e) {
      this.$router.push({
        path: `/details/${e}`,
      });
    },
    getUserInfo(){
      axios.get("./user.json").then((res)=>{
        this.avatar=res.data.avatar;
        this.id = res.data.id
      })
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
  name: "home"
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