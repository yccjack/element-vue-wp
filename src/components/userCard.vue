<template>
  <div :class="{card:!menuInclude,menuCard:menuInclude}">
    <el-row>
      <el-col class="user-content-padding">
        <div v-if="loginChange">
          <el-col :span=12>
            <el-button type="text" @click="jumpUserDetail">
              <el-avatar shape="square" :size="50" :src="avatarLocal"></el-avatar>
            </el-button>
          </el-col>
          <el-col :span=12>
            <div class="circle-content-tip-div" :class="user_info_size">
              <el-col :span=24>
                <span> {{ user.nickname }}</span>
              </el-col>
            </div>
            <div class="circle-content-user-info" :class="user_info_size">
              <el-col :span=24>
                <span style="background-color: #fafafa;margin-left: 2px">Lv{{ user.lever }}</span>
              </el-col>
            </div>
          </el-col>
          <el-col :span=12  class="user-content-padding">
            <div class=" top-right-text">
              <el-link :underline=false @click="logout"><span :class="user_info_size">退出</span></el-link>
            </div>
          </el-col>
        </div>
        <div v-if="!loginChange">
          <el-link class="text" @click="login(e)" type="success">不入虎穴，焉得虎子</el-link>
          <login-dialog
              :dialog-visible="dialogVisible"
              :is-register=false
              @loginOrRegister="receiveMessage"
          />
        </div>
      </el-col>
    </el-row>
    <el-row style="background-color: #fafafa;" :class="user_info_size">
      <el-col :span=6>
        <p>主题</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>评论</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>关注</p>
        <p>0</p>
      </el-col>
      <el-col :span=6>
        <p>粉丝</p>
        <p>1</p>
      </el-col>
    </el-row>
    <div class="user-list-content user-content-padding" :class="user_info_size">
      <div v-if="!menuInclude" class="user-list-content user-list-content-inner">
        <ul v-for="o in announcement" :key="o">
          <li class="text item ">
            <el-link :underline="false"> {{ o.content }}</el-link>
          </li>
        </ul>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>


import {getCurrentInstance, ref, unref, watch} from "vue";
import loginDialog from "@/components/user/loginDialog";

export default {
  components: {
    loginDialog
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    menuInclude: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String
    }
  },
  name: "userCard",
  created() {
    this.getAnnouncement()
    this.loginChange = this.$Global.login
    this.user_info_size = this.$getObjectClass(1)
  },
  setup(props, {emit}) {
    const user = ref({})
    if (props.isLogin) {
      let {proxy} = getCurrentInstance()
      user.value = proxy.$Global.user
    }
    const buttonRef = ref()
    const popoverRef = ref()
    const loginChange = ref(false)
    const avatarLocal = ref(props.avatar)
    const dialogVisible = ref(false);
    let {proxy} = getCurrentInstance()
    const receiveMessage = (data) => {
      dialogVisible.value = data;
    }
    const onClickOutside = () => {
      dialogVisible.value = false
      unref(popoverRef).popperRef?.delayHide?.()
    }
    watch(
        () => props.avatar,
        async newId => {
          avatarLocal.value = newId
          loginChange.value=true
          user.value=proxy.$Global.user
        }
    )
    watch(
        () => props.isLogin,
        async newId => {
          loginChange.value = newId
        }
    )
    const jumpUserDetail = () => {
      let id = proxy.$Global.user.id
      emit('jumpUserDetail', true)
      proxy.$router.push({
        path: `/user/${id}` + proxy.$Global.global_suffix,
      });
    }
    return {user, buttonRef, popoverRef, receiveMessage, onClickOutside, dialogVisible, jumpUserDetail, loginChange,avatarLocal}
  },
  data: () => ({
    announcement: [{
      id: 0,
      content: ""
    }],
    user_info_size: {}
  }),
  methods: {
    getAnnouncement() {
      this.$http.get("/config?type=5").then((res) => {
        this.announcement = res.data
      })
    },
    logout() {
      this.$Global.user = {}
      this.$Global.user_id = ''
      this.$Global.login = false
      localStorage.setItem('userInfo', '')
      this.$router.go(0)
    },
    login() {
      this.isRegister = false
      this.dialogVisible = true
    },

  },

}
</script>

<style scoped>
/* From uiverse.io by @Sujitkavaiya */
.card {
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
  margin-left: 8%;
}

.menuCard {
  width: auto;
  height: auto;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-left: 8%;
}

.circle-content-user-info {
  padding: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.user-list-content {
  padding: 0;
  text-align: left;
  margin-left: 10px;
}

.user-list-content-inner {
  margin-top: 20px;
}



.top-right-text {
  font-size: calc(100vw * 14 / 1920);
  text-align: right;
  align-content: inherit;
  padding-left: 25px;
}
</style>