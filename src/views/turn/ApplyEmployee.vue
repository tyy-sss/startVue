<template>
  <div class="apply-employee">
    <div>
      <search :options="applySearchList" />
      <el-table :data="data.tableData" border stripe style="width: 1200px">
        <el-table-column prop="staffName" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="shopName" label="店铺" />
        <el-table-column prop="position" label="职位" />
        <el-table-column prop="hourlyWage" label="时薪" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column label="操作">
          <template #default="slot">
            <el-button type="primary" @click="handleApplpy(slot.row)"
              >调动</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="12" />
      </div>
    </div>
    <el-drawer
      v-model="data.showDrawer"
      title="员工门店调动"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form :model="data.changPeople" label-width="120px">
        <el-form-item label="员工姓名：">
          <el-input
            v-model="data.changPeople.staffName"
            style="width: 100px"
            disabled
          />
        </el-form-item>
        <el-form-item label="员工性别：">
          <el-input
            v-model="data.changPeople.sex"
            style="width: 80px"
            disabled
          />
        </el-form-item>
        <el-form-item label="员工职位：">
          <el-input
            v-model="data.changPeople.position"
            style="width: 150px"
            disabled
          />
        </el-form-item>
        <el-form-item label="调动公司选择：">
          <el-select v-model="data.changPeople.shop" class="m-2">
            <el-option
              v-for="item in data.options"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="pager">
        <el-button type="primary" @click="change">修改</el-button>
        <el-button>取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import search from "@/components/common/search.vue";
import { applySearchList } from "@/assets/js/common/search";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const data = reactive({
  tableData: [
    {
      staffName: "田小小",
      sex: "女",
      shopName: "天知晓",
      position: "保洁",
      hourlyWage: 50,
      phone: "17892802894",
    },
    {
      staffName: "陈娇",
      sex: "女",
      shopName: "天知晓",
      position: "保洁",
      hourlyWage: 50,
      phone: "17543950436",
    },
    {
      staffName: "徐重节",
      sex: "男",
      shopName: "天知晓",
      position: "保洁",
      hourlyWage: 55,
      phone: "15784936795",
    },
    {
      staffName: "李符佳",
      sex: "女",
      shopName: "步步高",
      position: "保洁",
      hourlyWage: 50,
      phone: "15748957490",
    },
    {
      staffName: "杨大元",
      sex: "女",
      shopName: "步步高",
      position: "保洁",
      hourlyWage: 65,
      phone: "15473896785",
    },
    {
      staffName: "成天天",
      sex: "女",
      shopName: "步步高",
      position: "保洁",
      hourlyWage: 70,
      phone: "16890567348",
    },
    {
      staffName: "文凯",
      sex: "男",
      shopName: "时尚驿站",
      position: "保洁",
      hourlyWage: 50,
      phone: "15784956725",
    },
    {
      staffName: "肖导单",
      sex: "男",
      shopName: "时尚驿站",
      position: "保洁",
      hourlyWage: 50,
      phone: "17894389478",
    },
  ],
  options: [
    {
      value: "蜜雪冰城",
    },
  ],
  showDrawer: false,
  changPeople: reactive({
    staffName: "",
    sex: "",
    position: "",
    shopName: "",
  }),
});
const handleApplpy = (person) => {
  data.changPeople = reactive(person);
  data.changPeople.shop = person.shopName;
  data.showDrawer = true;
};
const change = () => {
  setTimeout(() => {
    ElMessage.success("操作成功，通知门店调动");
    data.tableData[0].shopName = "蜜雪冰城";
    data.showDrawer = false;
  }, 500);
};
</script>
<style scoped>
.apply-employee {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.apply-employee > div {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
}
.search {
  display: flex;
  justify-content: flex-end;
}
.pager {
  padding-top: 20px;
  float: right;
}
</style>