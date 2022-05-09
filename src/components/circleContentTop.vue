<template>
  <el-card class="box-card" style="width: 100%;">
    <el-row>
      <el-col :lg="8" :sm="24" :xs="24" :md="24" :xl="8">
        <el-col :span="12">
          <el-avatar shape="square" :size="50" :src="userAvatar"></el-avatar>
        </el-col>
        <el-col :span=12>
          <div class="circle-content-tip-div">
            <el-col span=24>
              <span>{{ userTitle }} </span>
            </el-col>
          </div>
          <div class="circle-content-tip-div">
            <el-col span=24>
              <span>  <el-link :underline="false"> {{ username }}</el-link></span>
            </el-col>
          </div>
        </el-col>
      </el-col>
      <el-col :span="16" :lg="16" :sm="0" :xs="0" :md="0" :xl="16">
        <el-row style="height: 50px; margin-left: 20%">
          <el-col :span=8>
            <el-card>card</el-card>
          </el-col>
          <el-col :span=8>
            <el-card>card</el-card>
          </el-col>
          <el-col :span=8>
            <el-card>card</el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="circle-desc msy-radius">这是一行提示文字</p>

    <div style=" display:inline;">
      <el-image style="width: 20px; height: 20px" :src="avatar" :fit="fill"/>
      <b>在</b>
      <el-popover
          placement="bottom-start"
          :width=300
          trigger="click"
          :visible="msyPopover.hidden"
      >
        <div class="msy-popover">
          <span> 可以选择广场、您加入的圈子或者您创建的圈子 </span>
          <div>
            <el-button v-for="o in popoverId" :key="o.id" @click="popoverContentClick(o.id)">
              <div class="block avatar">
                <el-avatar shape="square" :size="17" :src="o.avatar"></el-avatar>
              </div>
              <span style=" text-align: center;padding-top: 7px"> {{ o.name }}</span>
            </el-button>
          </div>
        </div>

        <template #reference>
          <el-link type="danger" @click="popoverClick()" class="msy-popover-pop-link"># 广场</el-link>
        </template>
      </el-popover>
      <b style="margin-bottom: 100px">说：</b>
    </div>
    <div class="circle-content-form-title">

      <el-row>
        <el-col :span=24>
          <el-form ref="ruleFormRef"
                   :model="ruleForm"
                   class="demo-ruleForm"
                   :size="ruleForm.formSize">
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name" placeholder="标题" clearable/>
            </el-form-item>
            <el-form-item prop="desc">
              <el-input v-model="ruleForm.desc" @input="changeDesc()" type="textarea" :rows="6" minlength="5"
                        show-word-limit maxlength="800" resize="none" placeholder="输入你想说的内容"/>
            </el-form-item>
            <el-form-item v-show="uploadAble">
              <uploadComp/>
            </el-form-item>
            <el-form-item>
              <el-button @click="uploadPic()" v-model="ruleForm.uploadPic">
                {{ ruleForm.uploadPic }}
              </el-button>
              <el-button :type="ruleForm.subType" @click="submitForm()" v-model="ruleForm.sub"
                         :disabled="ruleForm.disabledSub">
                {{ ruleForm.sub }}
              </el-button>
              <el-button @click="resetForm()" type="primary">清空输入</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import {reactive} from 'vue'
import uploadComp from '@/components/uploadComp';

export default {
  props: ['userTitle', 'userAvatar', 'username'],
  name: "circleContentTop",
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      return this.msyPopover.autoClose > 0 ? 'Yes' : 'No'
    }
  },
  components: {
    uploadComp
  },
  data: () => ({
    uploadAble: false,
    msyPopover: {
      autoClose: 0,
      hidden: false
    },
    ruleForm: reactive({
      name: '',
      delivery: false,
      desc: '',
      formSize: '300',
      sub: '少于5字',
      disabledSub: true,
      subType: '',
      uploadPic: '上传图片'
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
    popoverContentClick() {
      this.msyPopover.hidden = false;
    },
    popoverClick() {
      this.msyPopover.hidden = true;
    },
    async submitForm() {

    },
    resetForm() {
      this.ruleForm.name = "";
      this.ruleForm.desc = "";
      this.changeDesc();
    },
    changeDesc() {
      if (this.ruleForm.desc.length < 5) {
        this.ruleForm.disabledSub = true;
        this.ruleForm.sub = '少于5字';
        this.ruleForm.subType = '';
      } else {
        this.ruleForm.disabledSub = false;
        this.ruleForm.sub = '立即提交';
        this.ruleForm.subType = 'primary';

      }

    },
    uploadPic() {
      this.uploadAble = true;
    }

  }
}
</script>

<style scoped>


.circle-content-form-title {
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

.align-center {
  width: 60px;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
}

.circle-list-in {
  font-size: 14px;
}


</style>