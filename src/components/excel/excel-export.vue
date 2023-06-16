<template>
  <div id="excel-exprot">
    <div>
      <el-button type="primary">导出{{ data.excelList.show }}</el-button>
    </div>
  </div>
</template>
     
<script setup>
import { reactive } from "vue";
import { exportExcel } from "@/assets/js/common/excel/excel-export";

const props = defineProps({ excelList: Object });
const data = reactive({
  excelList: props.excelList,
});

const outExcel = (tableData) => {
  tableData = JSON.parse(JSON.stringify(tableData));
  exportExcel(tableData, data.excelList.listHander, data.excelList.show);
};

// 把参数暴露给父组件，让父组件进行修改
defineExpose({
  outExcel,
});

</script>
  <style>
#excel-export {
  max-width: 150px;
  padding: 0;
}
</style>
    