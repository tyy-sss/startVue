<template>
  <div class="apply-history">
    <div>
      <div class="choose">
        <el-date-picker
        v-model="data.time"
        type="date"
        placeholder="选择调动时间"
      />
        <search :options="applySearchList" />
      </div>
     
      <el-table :data="data.tableData" border strip style="width: 1300px">
        <el-table-column prop="employee" label="员工"/>
        <el-table-column prop="position" label="职位" />
        <el-table-column prop="firstShop" label="调动前店铺" width="170" />
        <el-table-column prop="endShop" label="调动后店铺" width="170" />
        <el-table-column prop="time" label="调动时间" />
        <el-table-column label="处理进度" width="600px">
          <template #default="slot">
            <el-steps :active="slot.row.steps"  align-center >
              <el-step title="门店提交申请"  :icon="Edit"/>
              <el-step title="企业调动员工" :icon="Monitor"/>
              <el-step title="通知门店调动" :icon="Message"/>
              <el-step title="员工操作" :icon="User"/>
              <el-step title="通知门店"  :icon="Position"/>
            </el-steps>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="12" />
      </div>
    </div>
  </div>
</template>
<script setup>
import search from "@/components/common/search.vue";
import { applySearchList } from "@/assets/js/common/search";
import { Edit, Monitor, Message,User,Position } from '@element-plus/icons-vue'
import { reactive } from "vue";

const data = reactive({
  time:"",
  tableData: [
    {
      employee: "田小小",
      position:"保洁",
      firstShop: "天知晓",
      endShop: "蜜雪冰城",
      time: "2023-08-02",
      steps: 5,
    },
    {
      employee: "程记高",
      position:"收银员",
      firstShop: "时尚驿站",
      endShop: "蜜雪冰城",
      time: "2023-07-29",
      steps: 4,
    },
    {
      employee: "杨世博",
      position:"收银员",
      firstShop: "步步高",
      endShop: "蜜雪冰城",
      time: "2023-07-28",
      steps: 5,
    },
    {
      employee: "陈静",
      position:"导购",
      firstShop: "天知晓",
      endShop: "时尚驿站",
      time: "2023-07-26",
      steps: 3,
    },
    {
      employee: "周威",
      position:"库房",
      firstShop: "时尚驿站",
      endShop: "步步高",
      time: "2023-07-20",
      steps: 4,
    },
  ],
});
</script>
<style scoped>
.apply-history {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.apply-history > div {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
}
.choose{
  display: flex;
  justify-content: space-between;
}
.pager {
  float: right;
  padding-top: 20px;
}
/* 设置进度条 */
.el-step {
  width: 43px;
}
/* ::v-deep .el-step__icon {
  border-radius: 50%;
  background-color: #fff !important;
  color: RGB(137, 144, 158);
  border: 2px solid RGB(137, 144, 158);
} */
::v-deep .el-step__main{
  color: RGB(137, 144, 158);
}
::v-deep .el-table th{
  text-align: center;
}
</style>