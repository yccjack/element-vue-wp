<template>
  <el-container class="home-content-max-width">
    <el-header height="64px">
      <menuPage
          :avatar="user.avatar"
      />
    </el-header>
    <el-main>
      <el-row>
        <el-col :xs="0" :sm="3" :md="3" :lg="5">
          <div :style="{position: 'absolute',top:bothPosition+'px' }">
            <leftList @tagClick="receiveMessage"/>
          </div>
        </el-col>
        <el-col :lg="13" :md="17" :sm="17" :xs="24">
          <midList :user-title="user.title"
                   :user-avatar="user.avatar"
                   :username="user.name"
                   :tag-change="receiveData"
          />
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="6">
          <div :style="{position: 'absolute',top:bothPosition+'px' }" class="right-content-outer">
            <userCard :id="user.id" :avatar="user.avatar"/>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import menuPage from "./menuPage"
import leftList from "./leftList"
import userCard from "./userCard"
import midList from "@/components/midList";
import {reactive, ref} from 'vue'
import {onMounted} from "vue";

export default {
  created() {
    this.getUserInfo()
  },

  setup() {
    const receiveData = ref(0);
    const receiveMessage = (data) => {
      receiveData.value = data;
    }
    const bothPosition = ref(0);
    const scrollContent = () => {
      // scrollTop为显示屏顶部与整个文档顶部间的距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      bothPosition.value = scrollTop - 80;
      if (scrollTop === 0) {
        bothPosition.value = scrollTop;
      }
    }
    onMounted(() => {
      window.onscroll = () => {
        // 监听浏览器/页面滚动条的滚动
        window.addEventListener("scroll", scrollContent, true);
      }
    });
    return {bothPosition, receiveMessage, receiveData}
  },

  data: () => ({
    user: {
      id: 1,
      name: "",
      avatar: "",
      title: "",
    },
  }),
  components: {
    menuPage,
    leftList,
    midList,
    userCard
  },
  methods: {
    toDetail(e) {
      this.$router.push({
        path: `/details/${e}`,
      });
    },
    getUserInfo() {
      axios.get("./user.json").then((res) => {
        this.user.avatar = res.data.avatar;
        this.user.id = res.data.id
        this.user.title = res.data.title
        this.user.name = res.data.name
        axios.defaults.headers.common['user_id'] = res.data.id;
      })
    },
    toHome(e) {
      if ("1" == e) {
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

.home-content-max-width {
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

.menu-div-search {
  margin-left: 10%;
  padding-top: 11px;
  padding-left: 6%;
}

.right-content-outer {
  width: 250px;
}
</style>