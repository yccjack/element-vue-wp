<template>
  <el-row class="current_largest_index">
    <el-col :span="24"
            :style="{ height: '300px','background-image' : user!=null?user.user_top_pic!=null?'url('+user.user_top_pic+')':false:false }">

      <el-row style="margin-top: 20px">
        <el-col :xs="12" :sm="12" :md="20" :lg="20" :lx="20"></el-col>
        <el-col :xs="12" :sm="12" :md="4" :lg="4" :lx="4" v-if="self">
          <el-upload
              :action="actionUrl"
              :show-file-list="false"
              name="userTopPic"
              :on-success="handleTopSuccess"
              :before-upload="beforeTopUpload"
              :headers="headerObj"
          >
            <el-button>上传封面图
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="0" :sm="24" :md="24" :lg="24" :lx="24" style="height: 100px;width:100%;background-color: #FFFFFF">
    </el-col>
    <el-col :span=24 style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :xs="0" :sm="6" :md="6" :lg="6" :lx="6">
          <el-row>
            <el-col :span=24>
              <el-card class="card">
                <el-button type="text">
                  <el-avatar class='card-img' shape="square" :size="80"
                             :src="imageUrl"></el-avatar>
                </el-button>
                <div class="user_info_card" :class="user_card_size" v-if="user !=null">
                  <h3>{{ user.nickname }}</h3>
                  <p>{{ user.leverTitle }}:Lv{{ user.lever }}</p>
                  <p>第{{ user.id }}位注册者</p>
                  <p>入住时间：{{ user.create_time }}</p>
                  <p>{{ user.sign }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span=24 style="margin-top: 10px;text-align: left">
              <el-card style="padding-left: 10px">
                <li>
                  <el-button class="btn" @click="changeType(1)">
                    <div class="block avatar user_font_size">
                      发布的话题
                    </div>
                  </el-button>
                </li>

                <li v-if="self">
                  <el-button class="btn" @click="changeType(2)">
                    <div class="block avatar user_font_size">
                      设置
                    </div>
                  </el-button>
                </li>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col v-if='type===1' :xs="24" :sm="18" :md="18" :lg="18" :lx="18">
          <userContent
              :user_id="user_id"
              @changeUserInfo="receiveData"/>
        </el-col>
        <el-col v-if='type===2' :xs="24" :sm="18" :md="18" :lg="18" :lx="18">
          <el-card>
            <el-row>
              <el-col :span=24 class="segment">
                <h1 class="font" :class="user_info_size">个人资料</h1>
                <el-divider></el-divider>
                <el-row v-for="(v,k) in userParam" :key="k">
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :lx="6">
                    <span class="title_1 user_font_size">{{ userParamZn[k] }}:</span>
                  </el-col>
                  <el-col :xs="0" :sm="0  " :md="6" :lg="6" :lx="6"></el-col>
                  <el-col :xs="12" :sm="12" :md="6" :lg="6" :lx="6">
                    <span class="title_2 user_font_size">{{ v }}</span>
                    <el-link @click="editInfo(k)" style="margin-left: 15px">
                      <el-icon :size="20" :color="color">
                        <Edit/>
                      </el-icon>
                    </el-link>
                  </el-col>
                  <el-divider></el-divider>
                </el-row>

              </el-col>
            </el-row>

            <el-row>
              <el-col :span=24 style="text-align: left;margin-left: 2%">
                <h1 class="font" :class="user_info_size">头像选择</h1>

                <el-col style="padding-top: 20px;padding-bottom: 20px">
                  <el-upload
                      :action=actionUrl
                      :show-file-list="false"
                      name="avatarPic"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :headers="headerObj"
                  >
                    <el-button type="text">
                      <el-avatar shape="square" :size="80"
                                 :src="imageUrl"></el-avatar>
                    </el-button>
                  </el-upload>

                </el-col>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </el-card>
        </el-col>
      </el-row>

    </el-col>
  </el-row>

</template>

<script>
import {getCurrentInstance, ref, watch} from "vue";
import {ElMessageBox, ElMessage} from "element-plus";
import userContent from "@/components/singlepage/userContent";
import {useRoute} from "vue-router";

export default {
  activated() {
    const route = useRoute()
    this.self = route.params.id === String(this.$Global.user.id)
    this.type = 1
  },
  components: {
    userContent
  },
  name: "UserPage",
  data: () => ({
    user_card_size: {},
    user_info_size: {},
  }),

  setup(props, {emit}) {
    const {proxy} = getCurrentInstance()
    const route = useRoute()
    const userData = ref()
    const self = ref(true)
    const routerId = ref(route.params.id)
    // 当参数更改时获取用户信息
    watch(
        () => route.params.id,
        async newId => {
          if (newId!==undefined&&String(newId) !== '-1'&&newId !=='undefined') {
            userData.value = newId
            user_id.value = newId
            proxy.$http.get('/getUserInfo?id=' + newId).then((res) => {
              console.log(res)
              if(res!==null&&res.data!==null){
                user.value = res.data
                imageUrl.value = user.value.avatar
              }
            })
          }
        }
    )
    const actionUrl = proxy.$uploadUrl;
    const user_id = ref(proxy.$route.params.id)
    if (user_id.value === String(-1)) {
      user_id.value = String(proxy.$Global.user.id)
    }
    const imageUrl = ref('')
    const headerObj = ref({Authorization: '', user_id: '', type: 1})
    headerObj.value.Authorization = user_id.value
    headerObj.value.user_id = user_id.value
    imageUrl.value = proxy.$Global.user.avatar
    const color = ref('#3b3bff')
    const userParam = ref({
      nickname: '',
      name: '',
      email: '',
      password: '',
      sign: '系统原装签名'
    })
    const userParamZn = ref({
      nickname: '昵称',
      name: '账户名',
      email: '邮箱',
      password: '密码',
      sign: '签名'
    })
    const user = ref({
      avatar: '',
      comment: 0,
      create_time: '',
      email: '',
      focusOn: 0,
      fan: 0,
      id: -1,
      lever: 1,
      leverTitle: '',
      nickname: '',
      name: '',
      topicCount: 0,
      sign: '',
      user_top_pic: ''
    })

    const userForm = ref({
      name: ''
    })
    if (proxy.$Global.login) {
      if (routerId.value === String(proxy.$Global.user.id)) {
        user.value = proxy.$Global.user
      } else {
        if(routerId.value!==undefined&&routerId.value!=='undefined'){
          proxy.$http.get('/getUserInfo?id=' + routerId.value).then((res) => {
            console.log(res)
            if(res!==null&&res.data!==null){
              user.value = res.data
            }
          })
        }
      }

    }
    userParam.value.nickname = user.value.nickname
    userParam.value.name = user.value.name
    userParam.value.email = user.value.email
    const editInfo = (k) => {
      ElMessageBox.prompt('输入你要修改的内容', 'Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: k === 'email' ?
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ : k === 'name' ? /[a-zA-Z0-9]+?/ : '',
        inputErrorMessage: k === 'email' ? '邮箱格式错误' : '请检查输入是否正确',
      })
          .then(({value}) => {
            let formData = new FormData();
            formData.append(k, value)
            proxy.$http.post('/updateUserInfo', formData).then((res) => {
              if (res.status === 200) {
                if (k === 'nickname') {
                  proxy.$Global.user.nickname = value
                  user.value.nickname = value
                  userParam.value.nickname = value
                }
                if (k === 'name') {
                  proxy.$Global.user.name = value
                  user.value.name = value
                  userParam.value.name = value
                }
                if (k === 'email') {
                  proxy.$Global.user.email = value
                  user.value.email = value
                  userParam.value.email = value
                }
                if (k === 'sign') {
                  proxy.$Global.user.sign = value
                  user.value.sign = value
                  userParam.value.sign = value
                }
                localStorage.setItem('userInfo', JSON.stringify(user.value))
                ElMessage({
                  type: 'success',
                  message: k === 'email' ? `输入的邮箱是:${value}` : `你输入的内容是:${value}`,
                })
              } else {
                ElMessage({
                  type: 'error',
                  message: '更新失败',
                })
              }
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '未修改',
            })
          })
    }
    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片格式错误')
        return false
      } else if (rawFile.size / 1024 / 1024 > proxy.$Global.global_pic_size_limit) {
        ElMessage.error('请不要上传超过' + proxy.$Global.global_pic_size_limit + 'MB!的图片')
        return false
      }
      headerObj.value.type = 1
      return true
    }
    const beforeTopUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片格式错误')
        return false
      } else if (rawFile.size / 1024 / 1024 > proxy.$Global.global_pic_size_limit) {
        ElMessage.error('请不要上传超过' + proxy.$Global.global_pic_size_limit + 'MB!的图片')
        return false
      }
      headerObj.value.type = 2
      return true
    }

    const type = ref(1)
    const changeType = (data) => {
      type.value = data
    }

    const receiveData = (data) => {
      self.value = data === String(proxy.$Global.user.id);
    }
    return {
      type,
      user,
      userForm,
      userParam,
      userParamZn,
      editInfo,
      color,
      imageUrl,
      beforeAvatarUpload,
      beforeTopUpload,
      headerObj,
      user_id,
      actionUrl,
      changeType,
      receiveData,
      self
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = this.$Global.imgPre + file.name
      this.$Global.user.avatar = this.imageUrl
      localStorage.setItem('userInfo', JSON.stringify(this.user))
      this.$emit('userAvatarChange', this.imageUrl)
      ElMessage({
        message: '上传成功！',
        type: 'success',
      })
    },
    handleTopSuccess(res, file) {
      this.user.user_top_pic = this.$Global.imgPre + file.name
      this.$Global.user.user_top_pic = this.user.user_top_pic
      localStorage.setItem('userInfo', JSON.stringify(this.user))
      ElMessage({
        message: '上传成功！',
        type: 'success',
      })
    },
  },
  created() {
    this.user_card_size = this.$getObjectClass(1)
    this.user_info_size = this.$getObjectClass(2)
    this.self = this.user.id === this.$Global.user.id;
  }
}
</script>

<style scoped>
.current_largest_index {
  z-index: 3;
}

.card_outer {
  padding-top: 150px;
  margin-left: 0;
}

.card_size {
  width: 220px;
}

.card {
  overflow: visible;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
}

.card-img {
  transform: translateY(-50%);
  position: relative;
  transition: all .3s ease-in-out;
}

.title_1 {
  font-size: calc(100vw * 20 / 1920);
  font-weight: 700;
}

.title_2 {
  font-size: calc(100vw * 20 / 1920);
  font-weight: 450;
}


.avatar {
  margin-right: 10px;
  text-align: left;
}

.segment {
  text-shadow: 1px 1px 1px #FFF;
  padding: 32px;
  text-align: left;
}

.font {
  color: #BABECC;
}


.user_info_card {
  margin-top: 20px;
  text-align: left;
}
</style>