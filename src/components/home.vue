<template>
    <el-container class="home-content-max-width">
      <el-header height="64px">
        <menuPage/>
      </el-header>
      <el-main>
        <el-row :gutter="10">
          <el-col :xs="0" :sm="3" :md="3" :lg="5">
          <leftList/>
          </el-col>
          <el-col  :lg="13" :md="17" :sm="17" :xs="24">
      <midList/>
          </el-col>
          <el-col :xs="0" :sm="4" :md="4" :lg="6">

          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<script>
import axios from "axios";
import menuPage from "./menuPage"
import leftList from "./leftList"
import midList from "@/components/midList";
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
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
    menuPage,
    leftList,
    midList
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
}
</script>

<style scoped>

.home-content-max-width{
  width: 100%;
  max-width: 1080px;
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