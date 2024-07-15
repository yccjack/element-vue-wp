<!--<template>-->
<!--  <el-row :class="classObject">-->
<!--    <el-col :span=24 :style="{'max-width': componentWith,'margin-left': componentMargin}">-->
<!--      <component :is="currentPageComponent" :detail-data="detailData"></component>-->
<!--    </el-col>-->
<!--  </el-row>-->
<!--</template>-->

<!--<script>-->
<!--import menuPage from "@/components/menuPage";-->
<!--import detailPage from "@/components/singlepage/detailPage";-->
<!--import userPage from "@/components/singlepage/userPage";-->
<!--import {ElMessage} from "element-plus";-->
<!--import {getCurrentInstance, reactive, ref} from "vue";-->

<!--export default {-->
<!--  setup() {-->
<!--    const {proxy} = getCurrentInstance()-->
<!--    const urlParam = ref('')-->
<!--    const path = ref('')-->
<!--    const currentPageComponent = ref('')-->
<!--    const componentWith = ref('90%')-->
<!--    const componentMargin = ref('50%')-->
<!--    const detailData = ref({-->
<!--      id: "",-->
<!--      userAva: "",-->
<!--      name: "",-->
<!--      leverTitle: "",-->
<!--      adminName: "",-->
<!--      contentTitle: "",-->
<!--      content: "",-->
<!--      pics: [],-->
<!--      likeCount: 0,-->
<!--      talk: 0,-->
<!--      youLiked: 0-->
<!--    })-->
<!--    const classObject = reactive({-->
<!--      page_mid_outer: true,-->
<!--      text: true,-->
<!--      item: true,-->
<!--      page_left_align: true,-->
<!--      page_center_align: false-->
<!--    })-->

<!--    function getCircleDetail(id) {-->
<!--      proxy.$http.get("/getCircleDetail?id=" + id).then((res) => {-->
<!--        if (res.status === 200) {-->
<!--          detailData.value = res.data-->
<!--        } else {-->
<!--          ElMessage.error('获取内容失败')-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--    function getUserDetailInfo(id) {-->
<!--      proxy.$http.get("/getUserDetailInfo?id=" + id).then((res) => {-->
<!--        if (res.status === 200) {-->
<!--          detailData.value = res.data-->
<!--        } else {-->
<!--          ElMessage.error('获取内容失败')-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--    urlParam.value = proxy.$route.params.id-->
<!--    path.value = proxy.$route.fullPath-->
<!--    if (path.value.indexOf("circle") !== -1) {-->
<!--      classObject.page_left_align = true-->
<!--      classObject.page_center_align = false-->
<!--      currentPageComponent.value = detailPage-->
<!--      componentWith.value = '80%'-->
<!--      componentMargin.value = '10%'-->
<!--      getCircleDetail(urlParam.value)-->
<!--    } else if (path.value.indexOf("user") !== -1) {-->
<!--      classObject.page_left_align = false-->
<!--      classObject.page_center_align = true-->
<!--      currentPageComponent.value = userPage-->
<!--      componentWith.value = '100%'-->
<!--      componentMargin.value = '0'-->
<!--      getUserDetailInfo(urlParam.value)-->
<!--    }-->
<!--    return {urlParam, path, currentPageComponent, componentWith, componentMargin, detailData, classObject}-->
<!--  },-->
<!--  name: "page",-->
<!--  components: {-->
<!--    menuPage,-->
<!--    userPage-->
<!--  },-->
<!--  data: () => ({}),-->
<!--  methods: {},-->
<!--  created() {-->
<!--    if (document.body.clientWidth < 768) {-->
<!--      this.componentWith = '100%'-->
<!--      this.componentMargin = '1%'-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->


<!--.page_mid_outer {-->
<!--  font-size: 14px;-->
<!--  padding: 0;-->
<!--}-->

<!--.page_left_align {-->
<!--  text-align: left;-->
<!--}-->

<!--.page_center_align {-->
<!--  text-align: center;-->
<!--}-->
<!--</style>-->