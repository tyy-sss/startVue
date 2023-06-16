<!-- excel 导入文件 -->
<template>
    <div id="excel-leading-in">
        <div><el-button type="success" @click="handleLeadingIn">导入{{ data.excelList.show }}</el-button></div>
        <upload-excel-card ref="uploadExcel" @addExcelData="addExcelData" :excelList="data.excelList"/>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
// 界面
import uploadExcelCard from "@/components/card/excel/upload-excel-card.vue";
// 数据
const props = defineProps({ excelList: Object })
const data = reactive({
    excelList:props.excelList
}) 
const emit = defineEmits(["addExcelData"]);
const uploadExcel = ref(null)
// 打开导入表
const handleLeadingIn = () =>{
    // 修改导入弹出框的数据
    uploadExcel.value.dialogTableVisible = true;
}
// 向后端发送添加数据
const addExcelData = (data) =>{
    data = JSON.parse(JSON.stringify(data))
    uploadExcel.value.dialogTableVisible = false;
    emit("addExcelData", data);
}
</script>
<style>
#excel-leading-in{
  max-width: 150px;
  padding: 0;
}
</style>
  