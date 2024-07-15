<template>
  <el-container>

    <el-header height="64px" style="padding: 0">
      <menuPage
          :is-login="isLogin"
          :avatar="avatar"
          @menuLoginChange="receiveLoginChange"
          :user-msg="userMsg"

      />
    </el-header>
    <el-main class="home-content-max-width">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="keepAlive.list">
          <component @userAvatarChange="receiveMessage" :is="Component" :key="$route.name" :avatar="avatar"
                     :msg="userMsg" @msgRead="receiveReadMsg"
                     v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
import menuPage from "@/components/menuPage";
import {ref, getCurrentInstance} from "vue";

export default {
  setup() {
    let {proxy} = getCurrentInstance()
    const isLogin = ref(false)
    const userMsg = ref({})
    if (proxy.$Global.login) {
      isLogin.value = true
      proxy.$http.get('/getCircleLikeList').then((res) => {
        proxy.$Global.circle_current_like_list = res.data
      })

      proxy.$http.get('/getUserMsg?user_id=' + proxy.$Global.user.id).then((res) => {
        userMsg.value = res.data
      })
    }
    const avatar = ref(proxy.$Global.user.avatar)

    const receiveMessage = (data) => {
      avatar.value = data
    }
    const receiveReadMsg = (data) => {
      console.log("用户阅读了信息，将阅读的信息总量减掉：信息类型{},"+data)
      let total = userMsg.value.total;
      if (String(data) === '1') {
        total = total - userMsg.value.reply
        userMsg.value.reply = ''
      } else if (String(data) === '3') {
        total = total - userMsg.value.aite
        userMsg.value.aite = ''
      } else if (String(data) === '2') {
        total = total - userMsg.value.likeMe
        userMsg.value.likeMe = ''
      } else if (String(data) === '0') {
        total = total - userMsg.value.system
        userMsg.value.system = ''
      }
      if (String(total) === '0') {
        userMsg.value.total = ''
      }
    }
    const receiveLoginChange = (data) => {
      avatar.value = data.avatar
    }
    return {isLogin, receiveMessage, avatar, receiveLoginChange, userMsg, receiveReadMsg}
  },
  name: "entrance",
  components: {
    menuPage
  },
  data: () => ({
        keepAlive: {
          list: [
            'circleContent',
            'detailPage',
            'userPage'
          ],
          add(name) {
            if (!this.keepAlive.list.includes(name)) {
              this.keepAlive.list.push(name)
            }
          },

          delete(name) {
            const index = this.keepAlive.list.indexOf(name)
            if (index > -1) {
              this.keepAlive.list.splice(index, 1)
            }
          },

          clear() {
            this.keepAlive.list = []
          },
        }
      }
  ),
}
</script>

<style>
.home-content-max-width {
  max-width: 1500px;
  min-width: 1100px;
  position: absolute;
  left: 20%;
  top: 10%;
  align-content: center;
  text-align: center;
}

.pic_padding {
  padding-left: 10px;
}
</style>