<template>
  <el-dialog
      :close-on-click-modal=false
      :close-on-press-escape=false
      :model-value="dialogVisible"
      :width="loginWith"
      :center=true
      custom-class="customClass"
      :title="loginDiaLogInfo.dialogTitle"
      :before-close="handleClose"
      :destroy-on-close=true
      @open="handleOpen"
  >
    <div class="dialog-body">
      <div v-if="register">
        <el-input v-model="loginForm.email" placeholder="邮箱" type="text" maxlength="30" minlength="5"
                  show-word-limit
                  required="输入正确的邮箱"/>
        <div style="margin-top: 15px"></div>
      </div>
      <el-input v-model="loginForm.username" :placeholder="loginDiaLogInfo.userNamePlace" type="text" maxlength="30"
                minlength="5"
                show-word-limit
                required="输入正确的用户名"/>
      <div style="margin-top: 15px"></div>
      <el-input v-model="loginForm.password" placeholder="密码" type="password" maxlength="50" minlength="5"
                show-word-limit required="输入正确的用户名" @keyup.enter="loginOrRegister"/>
      <div style="text-align: right">
        <el-button type="text" class="cta" @click="loginOrRegister()">
          <span class="hover-underline-animation"> 快速{{ loginDiaLogInfo.dialogTitle }}</span>
          <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10"
               viewBox="0 0 46 16">
            <path id="Path_10" data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"></path>
          </svg>
        </el-button>
      </div>
      <el-divider border-style="dashed" style="margin: 4px"/>
      <el-row style="margin-top: 1px;padding-left: 10px">
        <el-col :span=12>
          <el-link type="danger" class="dialog-font">忘记密码？</el-link>
        </el-col>
        <el-col :span=12 style="text-align: right;padding-right: 10px">
          <span class="dialog-font">{{ loginDiaLogInfo.tipTitle }}
            <el-link type="danger" class="dialog-font" @click="switchReOrLo">{{ loginDiaLogInfo.reOrLo }}
            </el-link>
          </span>
        </el-col>
      </el-row>

    </div>
  </el-dialog>
</template>

<script>

import {reactive, ref, watch, getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";


export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isRegister: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props, {emit}) {
    let {proxy} = getCurrentInstance()
    const loginForm = reactive({
      username: '',
      password: '',
      email: '',
    })
    const loginDiaLogInfo = reactive({
      dialogTitle: '登录',
      tipTitle: '新用户?',
      reOrLo: '注册',
      userNamePlace: '用户名'
    })
    const register = ref(false)
    const loginOrRegister = () => {
      let formData = new FormData();
      formData.append("username", loginForm.username)
      formData.append("password", loginForm.password)
      formData.append("email", loginForm.email)
      let type = register.value ? 1 : 0;
      proxy.$http.post('/loginOrRegister?type=' + type, formData).then((res) => {
        if (res.status === 200) {
          proxy.$Global.user = res.data
          proxy.$Global.user_id = res.data.id
          proxy.$Global.login = true
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          emit('loginOrRegisterChange', res.data)
          ElMessage({
            message: register.value ? '注册成功' : '登录成功',
            type: 'success',
          })
        } else {
          ElMessage.error(register.value ? '注册失败' : '登录失败')
        }
      })
      emit('loginOrRegister', false)

    }

    function handleClose() {
      emit('loginOrRegister', false)
      register.value = false
    }

    function handleOpen() {
      register.value = props.isRegister;
      if (props.isRegister) {
        loginDiaLogInfo.tipTitle = '已有用户?'
        loginDiaLogInfo.reOrLo = '登录'
        loginDiaLogInfo.dialogTitle = '注册'
        if (!loginDiaLogInfo.userNamePlace.includes('用户登录')) {
          loginDiaLogInfo.userNamePlace += '(用户登录)'
        }

      } else {
        loginDiaLogInfo.tipTitle = '新用户?'
        loginDiaLogInfo.reOrLo = '注册'
        loginDiaLogInfo.dialogTitle = '登录'
        loginDiaLogInfo.userNamePlace = '用户名'
      }
    }

    function switchReOrLo() {
      if (register.value) {
        loginDiaLogInfo.tipTitle = '新用户?'
        loginDiaLogInfo.reOrLo = '注册'
        loginDiaLogInfo.dialogTitle = '登录'
        loginDiaLogInfo.userNamePlace = '用户名'
        register.value = false
      } else {
        loginDiaLogInfo.tipTitle = '已有用户?'
        loginDiaLogInfo.reOrLo = '登录'
        loginDiaLogInfo.dialogTitle = '注册'
        loginDiaLogInfo.userNamePlace += '(用户登录)'
        register.value = true
      }
    }

    return {loginOrRegister, handleClose, handleOpen, register, switchReOrLo, loginDiaLogInfo, loginForm}
  },
  data: () => ({

    msyDialog: 'msy_dialog',
    loginWith: '20%'
  }),
  methods: {},
  name: "loginDialog",
  created() {
    if (document.body.clientWidth < 768) {
      this.loginWith = '100%'
    }
  }
}

</script>

<style scoped>

/deep/ .customClass {
  background: #F4F6FB;
  border: 1px solid white;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
}

/* From uiverse.io by @alexmaracinaru */
.cta {
  border: none;
  background: none;
  margin-top: 15px;
  padding-right: 15px;
  padding-left: 10px;
  text-align: right;
}

.cta span {
  padding-bottom: 7px;
  letter-spacing: 4px;
  font-size: calc(100vw * 10 / 1920);
  padding-right: 15px;
  text-transform: uppercase;
}

.cta svg {
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active svg {
  transform: scale(0.9);
}

.hover-underline-animation {
  position: relative;
  color: black;
  padding-bottom: 20px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1.5px;
  bottom: 0;
  left: 0;
  background-color: #000000;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.dialog-body {
  width: 80%;
  margin-left: 10%;

}

.dialog-body-header {
  font-size: calc(100vw * 1 / 1920);
  margin-bottom: 15px;
  padding-left: 10px;
  text-align: center;
}

.dialog-font {
  font-size: calc(100vw * 1 / 1920);
}
</style>