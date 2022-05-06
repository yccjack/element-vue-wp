<template>

  <el-card class="box-card" style="width: 100%;">
    <el-row>
      <el-col :span="8">
          <el-col :span="12">
            <el-avatar shape="square" :size="50" :src="avatar"></el-avatar>
          </el-col>
          <el-col :span="12">
            <div class="circle-content-tip-div">
              <el-col span="24">
                <span> 标题</span>
              </el-col>
            </div>
            <div class="circle-content-tip-div">
              <el-col span="24">
                <span>  <el-link :underline="false"> 个人信息</el-link></span>
              </el-col>
            </div>
          </el-col>
      </el-col>
      <el-col :span="16" >
        <el-row style="height: 50px; margin-left: 20%">
          <el-col span="8">
            <el-card>card</el-card>
          </el-col>
          <el-col span="8">
            <el-card>card</el-card>
          </el-col>
          <el-col span="8">
            <el-card>card</el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="circle-desc msy-radius">这是一行提示文字</p>
    <div class="circle-three-title">
      <el-row>
        <el-col span="4" style="padding-top: 6px">
          <el-avatar :size="20" :src="avatar"></el-avatar>

        </el-col>
        <span style="margin-top: 6px">在</span>
        <el-col span="20">

          <el-popover
              placement="bottom-start"
              :width="300"
              trigger="click"
              :visible="msyPopover.hidden"
          >
            <div class="msy-popover">
              <span> 可以选择广场、您加入的圈子或者您创建的圈子 </span>
              <div>
                <el-button v-for="o in popoverId" :key="o.id" size="small" @click="popoverContentClick(o.id)"
                           :icon="Search">Search
                </el-button>
              </div>
            </div>

            <template #reference>
              <el-link type="danger" @click="popoverClick()" class="msy-popover-pop-link"># 广场</el-link>
            </template>
          </el-popover>
        </el-col>

        <el-col :span="24"  >
          <el-form ref="ruleFormRef"
                   :model="ruleForm"
                   :rules="rules"
                   class="demo-ruleForm"
                   :size="ruleForm.formSize">
            <el-form-item  prop="name">
              <el-input v-model="ruleForm.name" placeholder="标题"/>
            </el-form-item>
            <el-form-item prop="desc">
              <el-input v-model="ruleForm.desc" type="textarea" :rows="6" minlength="5" show-word-limit maxlength="800"  resize="none" placeholder="输入你想说的内容"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()"
              >Create</el-button
              >
              <el-button @click="resetForm()">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { reactive } from 'vue'
export default {


  name: "circleContentTop",
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      return this.msyPopover.autoClose > 0 ? 'Yes' : 'No'
    }
  },
  data: () => ({
    msyPopover: {
      autoClose: 0,
      hidden: false
    },
    ruleForm :reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      formSize: 300,
    }),
    id: 1,
    name: "李四",
    avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg",
    props: {
      expandTrigger: 'hover',
    },
    popoverId: [
      {
        id: 1,
        avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg",
        name: "测试1"
      }, {
        id: 2,
        avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg",
        name: "测试2"
      }, {
        id: 3,
        avatar: "https://gschaos.club//wp-content/uploads/2021/06/1d5641c0a89db1_avatar.jpg",
        name: "测试3"
      },
    ]
  }),
  methods: {
    handleChange(value) {
      console.log(value)
    },
    popoverContentClick(value) {
      console.log(value)
      this.msyPopover.hidden = false;
    },
    popoverClick() {
      this.msyPopover.hidden = true;
    },
    async  submitForm(){

    }

  }
}
</script>

<style scoped>
.circle-content-tip-div {
  font-size: 14px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.circle-three-title {
  font-size: 9px;
  padding: 0;
  text-align: left;
  margin-left: 10px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.circle-desc {
  font-size: 12px;
  padding: 10px 20px;
  position: relative;
  min-height: 37px;
  box-sizing: border-box;
  background-color: #fafafa;
}

.msy-radius {
  border-radius: 4px;
}

.msy-popover span {
  font-size: 10px;
}

.msy-popover div {
  font-size: 10px;
  margin-top: 10px;
}
.msy-popover-pop-link {
  font-size: 15px;
  margin: 5px;

}
</style>