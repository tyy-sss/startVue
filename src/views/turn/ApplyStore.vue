<template>
  <div class="apply-store">
    <div class="box">
      <div class="box-header">
        <h3>员工调动申请</h3>
      </div>
      <div class="content">
        <el-form
          ref="form"
          label-width="100px"
          :model="data.form"
          :rules="data.rules"
          style="width: 70vh"
        >
          <add-post-news :data="addTitleData[0]" />
          <el-form-item label="申请职位：" prop="position">
            <el-select v-model="data.form.position" placeholder="选择职位">
              <el-option
                v-for="(item, index) in data.options"
                :key="index"
                :value="item"
                >{{ item }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="申请人数：" prop="num">
            <el-input-number v-model="data.form.num" :step="1" :min="1" />
          </el-form-item>
          <el-form-item label="到职时间：" prop="time">
            <el-date-picker
              v-model="data.form.time"
              type="date"
              :disabledDate="disablesDate"
              placeholder="选择入职时间"
            />
          </el-form-item>
          <el-form-item label="申请说明：" prop="describe">
            <el-input
              v-model="data.form.describe"
              placeholder="请输入申请说明描述"
              :autosize="{ minRows: 4, maxRows: 6 }"
              type="textarea"
            ></el-input>
          </el-form-item>
          <add-post-news :data="addTitleData[1]" />
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="data.form.phone" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item>
            <div class="button">
              <el-button type="primary" @click="handleChange">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import addPostNews from "@/components/common/add-post-news.vue";
import { ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
// 接口
import { getPosts } from "@/api/posts";

const disablesDate = (time) => {
  const _minTime = Date.now() - 24 * 60 * 60 * 1000 * 1; //最大时间可选今天
  return time.getTime() < _minTime;
};
const data = reactive({
  form: {
    position: "",
    num: "",
    time: "",
    describe: "",
    phone: "",
  },
  rules: {
    position: [{ required: true, message: "请输入申请职位" }],
    num: [{ required: true, message: "请输入申请人数" }],
    time: [{ required: true, message: "请输入到职时间" }],
  },
  options: [],
});
const addTitleData = reactive([
  {
    num: 1,
    name: "基本信息",
    description: "加 * 内容，为必填字段",
  },
  {
    num: 2,
    name: "联系方式",
    description: "调动员工期间，将与这个电话号码取得联系",
  },
]);
const form = ref(null);
const router = useRouter();
const handleChange = () => {
  form.value.validate((valid) => {
    if (valid) {
      setTimeout(() => {
        ElMessageBox.alert("员工调动申请已经发送，返回员工界面", "员工调动", {
          confirmButtonText: "确定",
          callback: (action) => {
            const href = router.resolve({
              path: "/Employee",
            });
            window.open(href.href, "_self");
          },
        });
      }, 100);
    }
  });
};
onMounted(() => {
  getPosts().then((res) => {
    if (res.data.code === store.state.global.success) {
      let list = res.data.data;
      list.forEach((element) => {
        data.options.push(element.positionName);
      });
    }
  });
});
</script>
<style scoped>
.apply-store {
  display: flex;
  justify-content: center;
}
.content {
  padding: 29px 60px;
}
.button {
  margin-top: 1em;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
<style src="@/assets/css/common/box.css" scoped>
</style>