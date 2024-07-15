<template>
  <el-row>
    <el-col :xs="0" :sm="0" :md="3" :lg="5" :lx="5">
      <div :style="{position: 'absolute',top:bothPosition+'px' }">
        <leftList @tagClick="receiveMessage" :is-login="isLogin"/>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="13" :lx="13">
      <midList :tag-change="receiveData" :is-login="isLogin" :avatar="avatarLocal"/>
    </el-col>
    <el-col :xs="0" :sm="0" :md="3" :lg="6" :lx="6">
      <div :style="{position: 'absolute',top:bothPosition+'px' }" class="right-content-outer">
        <userCard :is-login="isLogin" :avatar="avatarLocal"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import leftList from "./leftList"
import userCard from "./userCard"
import midList from "@/components/midList";
import {getCurrentInstance, ref, watch} from 'vue'
import {onMounted} from "vue";

export default {

  props: {
    avatar: {
      type: String
    }
  },
  setup(props) {
    let {proxy} = getCurrentInstance()
    const isLogin = ref(false)
    const avatarLocal = ref(props.avatar)
    if (proxy.$Global.login) {
      isLogin.value = true
    }
    watch(
        () => props.avatar,
        async newId => {
          avatarLocal.value = newId
        }
    )
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
    return {bothPosition, receiveMessage, receiveData, isLogin,avatarLocal}
  },
  data: () => ({
    user: {
      type: Object,
      default: {
        id: 1,
        name: "",
        avatar: "",
        title: "",
      }
    },
    circle: {
      type: Object,
      default: {
        id: 1,
        title: "",
        name: "",
      }
    }
  }),
  components: {
    leftList,
    midList,
    userCard
  },
  methods: {
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