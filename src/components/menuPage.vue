<template>
  <div class="menu text">
    <el-menu class="msy-menu"
             mode="horizontal">
      <el-row class="home-content-max-width text">
        <el-col :xs="16" :sm="12" :md="12" :lg="12" :xl="12" style="text-align: left">
          <el-button @click="toHome(me.asName)" class="menu_bt" v-for="me in menuArr" :key="me" size="large">{{
              me.name
            }}
          </el-button>
        </el-col>
        <el-col :xs="8" :sm="12" :md="12" :lg="12" :xl="12">
          <el-row class="menu_user" :gutter="20">
            <el-col :xs="0" :sm="12" :md="12" :lg="12">
              <el-input
                  placeholder="Please input"
                  class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="Select" placeholder="Select">
                    <el-option label="Restaurant" value="1"/>
                    <el-option label="Order No." value="2"/>
                    <el-option label="Tel" value="3"/>
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" circle/>
                </template>
              </el-input>

            </el-col>
            <el-col :xs="8" :sm="12" :md="12" :lg="12" v-if="!loginStatus"
                    :style="{'text-align':btnSize==='default'?'left':'center'}">
              <div v-if="!smallP">
                <el-button @click="login(e)" class="btn-1" :size="btnSize">登录</el-button>
                <el-button @click="register(1)" class="btn-1" :size="btnSize">快速注册</el-button>
              </div>
              <div v-if="smallP">
                <el-col :xs="8" style="margin-top: 5px">
                  <el-button @click="login(e)" :icon="Stamp" :size="btnSize"/>
                </el-col>
              </div>
              <login-dialog
                  :dialog-visible="dialogVisible"
                  :is-register="isRegister"
                  @loginOrRegister="receiveMessage"
                  @loginOrRegisterChange="receiveLoginInfo"
              />
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" v-if="loginStatus">
              <el-dropdown style="margin-right: 20px;padding-top: 10px">
                <el-badge :value="userMsg.total" :max="99" class="item">
                  <a href="javascript:void(0);">消息</a>
                </el-badge>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <a href="javascript:void(0);" @click="jumpMsgDetail('reply')">回复我的</a><span class="msg">{{userMsg.reply}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a href="javascript:void(0);" @click="jumpMsgDetail('likeMe')">收到的赞</a><span  class="msg">{{userMsg.likeMe}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item disabled>
                      <a href="javascript:void(0);" @click="jumpMsgDetail('aite')">主动@我</a><span class="msg">{{userMsg.aite}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item disabled>
                      <a href="javascript:void(0);" @click="jumpMsgDetail('sys')">系统通知</a><span  class="msg">{{userMsg.tip}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-popover
                  trigger="click"
                  placement="bottom-end"
                  :width=300
              >
                <template #reference>
                  <el-button type="text" ref="cardAvaBtn">
                    <el-avatar shape="square" :size="32" :src="avatarLocal"></el-avatar>
                  </el-button>
                </template>
                <div class="msy-popover">
                  <div>
                    <user-card :is-login="loginStatus"
                               :menu-include=true
                               :avatar="avatarLocal"
                               @jumpUserDetail='receiveUserClick'

                    />
                  </div>
                </div>
              </el-popover>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
import {Search, Select, Edit, Stamp} from '@element-plus/icons-vue'
import {getCurrentInstance, ref, unref, watch} from "vue";
import {ClickOutside as vClickOutside, Bell} from 'element-plus'
import loginDialog from "@/components/user/loginDialog";
import userCard from "@/components/userCard";

export default {
  props: {
    suffix: {
      type: String,
      default: ".html"
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: [String, Boolean],
    },
    userMsg:{
      type:Object,
      default:{
        total: '1',
        reply: '1',
        likeMe: '1',
        aite: '1',
        tip: '1'
      }
    }
  },
  beforeCreate() {
    if (this.isLogin) {
      this.loginStatus = this.isLogin
    }

    if (this.$Global.login) {
      this.loginStatus = this.$Global.login
    }
    this.$http.get('/getMenu').then((res) => {
      this.$Global.menuList = res.data
      this.menuArr = res.data
    })
  },
  created() {
    if (document.body.clientWidth < 768) {
      this.btnSize = 'small'
      this.smallP = true
    }

  },
  data: () => ({
    id: 1,
    activeIndex: 3,
    user_login: false,
    isRegister: false,
    menuArr: [{}],
    btnSize: 'default',
    smallP: false,
  }),
  components: {
    loginDialog,
    userCard
  },
  setup: (props, {emit}) => {
    const dialogVisible = ref(false);
    const userCardVisible = ref(false);
    const loginStatus = ref(false);
    let {proxy} = getCurrentInstance()
    const avatarLocal = ref(props.avatar)
    const receiveMessage = (data) => {
      dialogVisible.value = data;
    }

    if (proxy.$Global.login) {
      loginStatus.value = true
    }
    const receiveUserClick = (data) => {
      if (data) {
        proxy.$refs.cardAvaBtn.$el.click()
      }
    }
    watch(
        () => props.avatar,
        async newId => {
          avatarLocal.value = newId
          loginStatus.value = true
        }
    )
    const receiveLoginInfo = (data) => {
      loginStatus.value = true
      avatarLocal.value = data.avatar
      emit('menuLoginChange', data)
    }
    return {
      Search, Select, Edit, Stamp, receiveMessage,
      dialogVisible, userCardVisible, receiveUserClick, loginStatus, avatarLocal, receiveLoginInfo, Bell
    };
  },
  methods: {
    toHome(e) {
      this.$router.push({
        path: `/${e}`+ this.$Global.global_suffix,
      });
    },
    login() {
      this.isRegister = false
      this.dialogVisible = true
    },
    register() {
      this.isRegister = true
      this.dialogVisible = true
    },
    jumpMsgDetail(type){
      this.$router.push({ path: `/notifications/${type}` + this.$Global.global_suffix})
    }

  },

}
</script>

<style scoped>


.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.menu {
  text-align: left;
  border-bottom: 1px solid var(--el-border-color);
}

.menu_user {
  text-align: center;
}

.menu_bt {
  border: none;
}

.btn-1 {
  color: #2D6EFB;
  border: 1px solid #2D6EFB;
  background: #FFFFFF;
}

.btn-1:hover {
  color: white;
  background-color: rgba(45, 110, 251, 0.8);
  border-color: rgba(45, 110, 251, 0.8);
}

.msy-menu {
  height: 64px;
}

.msy-popover span {
  font-size: calc(100vw * 10 / 1920);
}

.msy-popover div {
  font-size: calc(100vw * 10 / 1920);
  margin-top: 10px;
}

.msy-popover-pop-link {
  font-size: calc(100vw * 10 / 1920);
  margin: 5px;
}

.btn {
  border: none;
  background-color: transparent;
}
.msg{
  margin-left: 20px;color: red
}
</style>