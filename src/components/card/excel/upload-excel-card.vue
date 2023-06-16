<template>
  <div class="upload-resume">
    <el-dialog v-model="dialogTableVisible" :title="'导出'+data.excelList.show">
      <div class="content">
        <div class="upload">
          <el-upload
            class="upload-demo"
            drag
            aciton
            accept=".xlsx,.xls"
            :on-change="handleExportExcel"
            :auto-upload="false"
            :show-file-list="false"
            :limit="1"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              <div class="big">点击 或 拖拽</div>
              <div class="small">即可上传文件</div>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                <div class="text">
                  <div>存在错误时不导入</div>
                  <div>当数据文件或系统中存在重复的记录时更新重复记录</div>
                  <div>
                    <el-button
                      type="primary"
                      @click="handleExportExcelTemplate"
                      >{{ data.excelList.excelName }}</el-button
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-upload>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  <script setup>
import { reactive, ref, defineEmits } from "vue";
// 方法
import { exportExcel } from "@/assets/js/common/excel/excel-export";
import { readFile,excelLeadingIn } from "@/assets/js/common/excel/excel-leading-in";
import { handleExcelFormat } from "@/assets/js/common/excel/excel-format";

// 数据
const props = defineProps({ excelList: Object });
const data = reactive({
  addData: null,
  excelList: props.excelList,
});

var dialogTableVisible = ref(false);
// 把参数暴露给父组件，让父组件进行修改
defineExpose({
  dialogTableVisible,
});
const emit = defineEmits(["addExcelData"]);

// 获得上传的excel数据
const handleExportExcel = async (ev) => {
  const file = ev.raw;
  if (file) {
    data.addData = await readFile(file);
    // 得到原始数据
    data.addData = excelLeadingIn(data.addData, data.excelList.character);
    // 对原始数据进行处理
    data.addData = handleExcelFormat(data.addData, data.excelList.name);
    // 向后端发送添加数据
    emit("addExcelData", data.addData);
  }
};

// 导出excel表格的模板
const handleExportExcelTemplate = () => {
  exportExcel(
    data.excelList.jsonData,
    data.excelList.listHander,
    data.excelList.excelName
  );
};
</script>
<style src="@/assets/css/views/excel/upload-excel-card.css" scoped>
</style>