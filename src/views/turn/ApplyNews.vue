<template>
  <div class="apply-news">
    <div class="box">
      <div class="box-header">
        <h3>员工调动申请</h3>
      </div>
      <div class="content">
        <add-post-news :data="addTitleData[0]" />
        <el-form
          ref="form"
          label-width="100px"
          :model="data.form"
          style="width: 90vh"
        >
          <el-form-item label="申请职位：" prop="position" style="width: 300px">
            <el-input v-model="data.form.position" disabled />
          </el-form-item>
          <el-form-item label="申请人数：" prop="num" style="width: 300px">
            <el-input v-model="data.form.num" disabled />
          </el-form-item>
          <el-form-item label="到职时间：" prop="time" style="width: 400px">
            <el-input v-model="data.form.time" disabled />
          </el-form-item>
          <el-form-item label="申请说明：" prop="describe">
            <el-input
              v-model="data.form.describe"
              disabled
              :autosize="{ minRows: 4, maxRows: 6 }"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone" style="width: 300px">
            <el-input v-model="data.form.phone" disabled />
          </el-form-item>
        </el-form>
        <add-post-news :data="addTitleData[1]" />
        <div v-for="(item, index) in data.apply" :key="index">
          <div class="user-item">
            <h3 class="title">调动员工（{{ index + 1 }}）号:</h3>
            <el-form
              ref="form"
              label-width="100px"
              :model="item"
              style="width: 90vh"
            >
              <el-form-item label="调动员工：" style="width: 200px">
                <el-input v-model="item.name" disabled />
              </el-form-item>
              <el-form-item label="当前店铺：" prop="shop" style="width: 300px">
                <el-input v-model="item.shop" disabled />
              </el-form-item>
              <el-form-item label="调动时间：" prop="time" style="width: 300px">
                <el-input v-model="item.time" disabled />
              </el-form-item>
              <el-form-item label="调动情况：">
                <el-timeline>
                  <el-timeline-item placement="top" type="primary">
                    <el-card>
                      <h4>门店提交申请</h4>
                      <p>杜刚 提交 调动员工申请 2023/08/02</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item placement="top" type="primary">
                    <el-card>
                      <h4>企业调动员工</h4>
                      <p>企业选择调动 田小小员工 2023/08/02</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item placement="top" type="primary">
                    <el-card>
                      <h4>通知门店调动</h4>
                      <p>通知天知晓门店 要调动田小小员工  2023/08/02</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item placement="top" type="primary">
                    <el-card>
                      <h4>员工操作</h4>
                      <p>田小小员工 同意调动 2023/08/02</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item placement="top" type="primary">
                    <el-card>
                      <h4>通知门店调动</h4>
                      <p>通知天知晓，蜜雪冰城门店 调动田小小员工 成功  2023/08/02</p>
                    </el-card>
                  </el-timeline-item>
                  <!-- <el-timeline-item placement="top">
                    员工操作
                  </el-timeline-item>
                  <el-timeline-item placement="top">
                    通知门店
                  </el-timeline-item> -->
                </el-timeline>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import addPostNews from "@/components/common/add-post-news.vue";
import {
  Edit,
  Monitor,
  Message,
  User,
  Position,
} from "@element-plus/icons-vue";
import { reactive } from "vue";
const data = reactive({
  form: {
    position: "保洁",
    num: "1",
    time: "2023-08-05",
    describe: "客流量增多，需要保洁打扫卫生",
    phone: "19874339023",
  },
  apply: [
    {
      name: "田小小",
      shop: "天知晓",
      time: "2023-08-02",
      steps: 2,
    },
  ],
});
const addTitleData = reactive([
  {
    num: 1,
    name: "基本信息",
  },
  {
    num: 2,
    name: "人员调动处理",
  },
]);
</script>
<style scoped>
.apply-news {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.content {
  padding: 30px;
}
.user-item {
  padding: 10px;
}
.user-item .title {
  padding-bottom: 1em;
  color: #414a60;
}
</style>
<style src="@/assets/css/common/box.css" scoped>
</style>