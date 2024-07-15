<template>
  <el-card>
    <el-divider content-position="left">全部圈子</el-divider>
    <el-row v-for="(val,key) in detailInfo" :key="key" :class="contentClass" class="circle-content-tip-div">
      <el-col :span=24>
        <el-row>
          <el-col :span=6>
            <el-icon :size="10">
              <Timer/>
            </el-icon>
            <span>{{ String(val.create_time).substr(0,10) }}</span>
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
import {useRoute} from "vue-router";
import userContent from "@/components/singlepage/userContent";

export default {
  name: "CircleDetailPage",
  components:{
    userContent
  },
  props: {},
  setup(props) {
    const {proxy} = getCurrentInstance()
    const route = useRoute()
    const contentClass = ref(proxy.$getObjectClass(1))
    const topic_id = ref(route.params.id)
    const detailInfo = ref([])
    const user_id = ref(proxy.$Global.user.id)
    const getDetail = () => {
      if (topic_id.value === '-1') {
        return
      }
      proxy.$http.get('getTopicDetail?id=' + topic_id.value).then((res) => {
        detailInfo.value = res.data
      })
    }
    watch(
        () => route.params.id,
        async newId => {
          if (newId !== undefined && String(newId) !== '-1') {
            topic_id.value = newId
            proxy.$http.get('/getTopicDetail?id=' + newId).then((res) => {
              detailInfo.value = res.data
            })
          }
        }
    )
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
    getDetail()
    return {
      getDetail, detailInfo, user_id,getPic,jumpCircleDetail,getReplyView,contentClass
    }
  }
}
</script>

<style scoped>

</style>