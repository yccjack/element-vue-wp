<template>
  <el-card type="box-card">
  <el-row v-for="(val,key) in content" :key="key" :class="contentClass" class="circle-content-tip-div">
    <el-col :span=24>
      <el-row>
        <el-col :span=4>
          <el-icon :size="10">
            <Timer/>
          </el-icon>
          <span>{{ String(val.create_time).substr(0,20) }}</span>
        </el-col>
        <el-col :span=16></el-col>
        <el-col :span=4>
          <span>{{ val.introduction }}</span>
        </el-col>
      </el-row>

    </el-col>
    <el-col :span=24 class="circle-content-tip-div">
      <a href="javascript:void(0);" @click="jumpCircleDetail(val.id)">
      <h2> {{ val.contentTitle }}</h2>
      <p>{{ String(val.content).substr(0,100) }}</p>
      </a>
      <el-row :gutter=10>
        <el-col :span=5 v-for="l in val.pics" :key="l" >
          <el-image :src="getPic(l)" :fit="contain" :preview-src-list="getReplyView(val.pics)"/>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span=24 >
      <el-col :span=8 :offset=16>
        <el-space :size="5" spacer="">
        <el-icon :size="15"><Star /></el-icon>
          <span>{{ val.talk }}</span>
        <el-icon :size="15"><Tickets /></el-icon>
        <span>{{ val.likeCount }}</span>
        </el-space>
      </el-col>
    </el-col>
    <el-divider></el-divider>
  </el-row>
  </el-card>
</template>

<script>
import {getCurrentInstance, ref, watch} from "vue";

export default {
  props: {
    user_id: {
      type: [Number, String],
      default: -1
    },
    info:{
      type:Object,
      default: ''
    }
  },
  setup(props,{emit}) {
    const {proxy} = getCurrentInstance()
    const contentClass = ref({})
    const content = ref([{
      create_time: '',
      contentTitle: '',
      content: '',
      type: 0,
      typeName: '',
      pics: [],
      likeCount: 0,
      talk: 0,
    }])
    watch(
        () => props.user_id,
        async newId => {
          if(props.info!==''){
            return
          }
          if(newId===''||newId===-1){
            return
          }
          emit('changeUserInfo',newId)
          proxy.$http.get('/getUserContent?user_id=' + newId).then((res) => {
            content.value = res.data
          })
        }
    )
    contentClass.value = proxy.$getObjectClass(2)
    const getContent = () => {
      proxy.$http.get('/getUserContent?user_id=' + props.user_id).then((res) => {
        content.value = res.data
      })
    }
    if(props.info===''){
      getContent()
    }else{
      content.value = props.info
    }
    function getPic(pic) {
      return proxy.$Global.imgPre + pic
    }
    function jumpCircleDetail(id) {
      proxy.$router.push({
        path: `/circle/${id}` + proxy.$Global.global_suffix,
      });
    }

   const getReplyView=(pics)=> {
      let srcList = []
      for (let k in pics) {
        srcList.push(getPic(pics[k]))
      }
      return srcList;
    }
    return {
      content,
      getContent,
      getPic,
      contentClass,
      jumpCircleDetail,
      getReplyView
    }
  },
  name: "userContent"
}
</script>

<style scoped>

</style>