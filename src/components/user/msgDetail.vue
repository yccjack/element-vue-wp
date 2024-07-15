<template>
  <el-row :gutter="10">
    <el-col :xs="0" :sm="4" :md="4" :lg="4" :lx="4" :span=4>
      <el-card type="text-box" class="msy_left_font_">
        <li v-for="(v,k) in msg" :key="k" v-show="k!=='total'">
          <el-button class="btn" @click="switchType(k)">
            <div class="block avatar user_font_size">
              {{ getTypeName(k) }}
            </div>
          </el-button>
        </li>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="17" :md="17" :lg="17" :lx="17">
      <el-card type="text-box">
        <el-row>
          <el-col :span=24 class="msy_left_font_" v-for="(v,k) in msgInfo" :key="k">
            <el-row>
              <el-col :xs="12" :sm="12" :md="4" :lg="2" :lx="2">
                <el-button type="text" @click="jumpUserDetail(v.from_user_id)">
                  <el-avatar :size="40" :src="v.avatar"></el-avatar>
                </el-button>
              </el-col>
              <el-col :xs="0" :sm="12" :md="4" :lg="2" :lx="2">
                <span :class="infoSize" class="global_margin_left_">{{ v.nickname }}</span>
              </el-col>
              <el-col :xs="12" :sm="12" :md="4" :lg="4" :lx="4">
                <span :class="infoSize" class="global_margin_left_">{{ msgInfoDes }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span=24 :offset="2" :class="infoSize" class="circle-content-tip-div">
                <a href="javascript:void(0);" @click="jumpCircleDetail(v.content_id)"><h2>{{ v.contentTitle }}</h2></a>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import {getCurrentInstance, reactive, ref, watch} from "vue";
import msyAvatar from "@/components/user/msyAvatar";
import {useRoute} from "vue-router";

export default {
  name: "msgDetail",
  components: {
    msyAvatar
  },
  props: {
    msg: {
      type: Object
    }
  },
  setup(props, {emit}) {
    const route = useRoute()
    const type = route.params.id;
    const {proxy} = getCurrentInstance();
    const msgInfo = ref([{
      avatar: '',
      contentTitle: '',
      nickname: '',
      user_id: '',
    }])
    const msgInfoDes = ref('')
    const msgInfoCache = ref({
      system: [],
      reply: [],
      aite: [],
      likeMe: []
    })
    const infoSize = ref(proxy.$getObjectClass(1))
    const getMsg = () => {
      let id = getTypeId(type)
      proxy.$http.get('getMsgInfo?type=' + id).then((res) => {
        msgInfo.value = res.data
        setCache(type, res.data)
        emit('msgRead', id)
      })
    }
    const getTypeId = (typeName) => {
      let typeId = 0
      if (typeName === 'reply') {
        msgInfoDes.value = '回复我的内容'
        typeId = 1;
      } else if (typeName === 'aite') {
        msgInfoDes.value = '@我的内容'
        typeId = 3;
      } else if (typeName === 'likeMe') {
        msgInfoDes.value = '点赞我的话题'
        typeId = 2;
      }
      return typeId;
    }

    const setCache = (typeName, data) => {
      if (typeName === 'reply') {
        msgInfoCache.value.reply = data
      } else if (typeName === 'aite') {
        msgInfoCache.value.aite = data
      } else if (typeName === 'likeMe') {
        msgInfoCache.value.likeMe = data
      } else {
        msgInfoCache.value.system = data
      }
    }

    const getCache = (typeName) => {
      if (typeName === 'reply') {
        return msgInfoCache.value.reply
      } else if (typeName === 'aite') {
        return msgInfoCache.value.aite
      } else if (typeName === 'likeMe') {
        return msgInfoCache.value.likeMe
      } else {
        return msgInfoCache.value.system
      }
    }
    watch(
        () => route.params.id,
        async newId => {
          let cache = getCache(newId)
          if (cache.length>0) {
            msgInfo.value = cache
            return
          }
          let id = getTypeId(newId);
          proxy.$http.get('getMsgInfo?type=' + id).then((res) => {
            msgInfo.value = res.data
            setCache(newId, res.data)
            emit('read', id)
          })
        }
    )
    getMsg()
    return {msgInfo, msgInfoDes, infoSize}
  },
  data: () => ({}),
  methods: {
    getTypeName(type) {
      if (type === 'reply') {
        return '回复我的'
      } else if (type === 'aite') {
        return '主动@我的'
      } else if (type === 'likeMe') {
        return '点赞我的'
      } else if (type === 'system') {
        return '系统通知'
      } else if (type === 'total') {
        return ''
      }
    },
    jumpUserDetail(id) {
      this.$router.push({
        path: `/user/${id}` + this.$Global.global_suffix
      });
    },
    jumpCircleDetail(id) {
      this.$router.push({
        path: `/circle/${id}` + this.$Global.global_suffix,
      });
    },
    switchType(id) {
      this.$router.push({
        path: `/notifications/${id}` + this.$Global.global_suffix,
      });
    }
  }
}
</script>

<style scoped>

</style>