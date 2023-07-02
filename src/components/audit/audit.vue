<template>
  <div class="box small-div">
    <div class="box-header">
      <h3>客流量预测</h3>
    </div>
    <div class="content">
      <div class="header">
        <div class="add">
          <!-- 导入客流量表 -->
          <excel-leading-in
            class="add-excel"
            @addExcelData="addExcelData"
            :excelList="data.excelList"
          />
          <!-- 导出 -->
          <excel-export
            ref="outExcel"
            class="add-excel"
            :excelList="data.excelList"
            @click="handleExcelExport"
          />
        </div>
        <div class="search">
          <div class="date-picker">
            <el-date-picker
              v-model="data.searchTime"
              type="date"
              placeholder="选择日期"
              :disabled-date="data.disabledDate"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              @change="changeTime"
            />
          </div>
          <el-switch
            v-model="data.switchValue"
            size="large"
            active-text="表格"
            inactive-text="图示"
            @change="switchReceiveStatus"
          />
        </div>
      </div>
      <div v-if="data.switchValue === true">
        <el-row class="table">
          <el-table :data="data.tableData" border empty-text="没有数据">
            <el-table-column prop="shopName" label="门店姓名" />
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="startTime" label="开始时间" />
            <el-table-column prop="endTime" label="结束时间" />
            <el-table-column prop="audit" label="预测客流量" />
          </el-table>
        </el-row>
      </div>
      <div class="aduit-graph" v-if="data.switchValue === false">
        <div id="aduit" style="width: 100%; height: 480px" ref="aduit" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import store from "@/store";
// 界面
import excelExport from "@/components/excel/excel-export.vue";
import excelLeadingIn from "../excel/excel-leading-in.vue";
import { ElMessage } from "element-plus";
// 数据
import { auditExport } from "@/assets/js/common/excel/excel-information";
import { formatTimeOne } from "@/assets/js/utils/time-format";
import { handleAduitDataFormat } from "@/assets/js/common/excel/excel-format";
// 接口
import { addAudit, getAudit } from "@/api/audit";
const outExcel = ref(null);

// 界面数据
const data = reactive({
  excelList: auditExport,
  tableData: [],
  searchTime: formatTimeOne(new Date()),
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
  switchValue: true,
});
// 得到最近一天的客流量数据
const getList = () => {
  getAudit(data.searchTime).then((res) => {
    if (res.data.code === store.state.global.success) {
      const resData = res.data.data;
      data.tableData = handleAduitDataFormat(
        resData.forecastArrayList,
        resData.shop.shopName
      );
      console.log(data.tableData);
    } else {
      data.tableData = [];
      ElMessage.error(res.data.msg);
    }
  });
};
// 上传数据给后端
const addExcelData = (data) => {
  addAudit(data).then((res) => {
    if (res.data.code === store.state.global.success) {
      ElMessage.success(res.data.msg);
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
// 打印表单数据
const handleExcelExport = () => {
  outExcel.value.outExcel(data.tableData)
};
// 修改时间，搜索客流量
const changeTime = () => {
  getList();
};
// 修改查看方式
const switchReceiveStatus = () => {
  if (switchReceiveStatus === false) {
    getList();
    drawLine();
  }
};
// 展示echarts客流量数据
const drawLine = () => {
  // 新建一个promise对象
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    //	此dom为echarts图标展示dom
    var thatAduit = echarts.init(document.getElementById("aduit"));
    window.addEventListener("resize", function () {
      thatAduit.resize();
    });
    var xData = (function () {
      var data = [];
      for (var i = 8; i < 21; i++) {
        data.push(i + ":00" + "-" + (i + 1) + ":00");
      }
      return data;
    })();
    var yData = (function () {
      var data = [];
      for (var i = 0; i < tableData.length; i++) {
        data.push(tableData[i].audit);
      }
      return data;
    })();
    thatAduit.setOption({
      backgroundColor: "#fff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          textStyle: {
            color: "#fff",
          },
        },
      },
      title: {
        top: 20,
        text: "每日客流量",
        subtext: "",
        x: "center",
        textStyle: {
          color: "black",
        },
      },
      grid: {
        borderWidth: 0,
        top: 110,
        bottom: 95,
        textStyle: {
          color: "#fff",
        },
        top: "50px",
        left: "50px",
        right: "15px",
        bottom: "50px",
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "black",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
          axisTick: {
            show: false,
          },
          data: xData,
          boundaryGap: false,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
          axisLine: {
            lineStyle: {
              color: "black",
            },
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          height: 30,
          xAxisIndex: [0],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon:
            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "110%",
          handleStyle: {
            color: "#5B3AAE",
          },
          textStyle: {
            color: "rgba(204,187,225,0.5)",
          },
          fillerColor: "rgba(67,55,160,0.4)",
          borderColor: "rgba(204,187,225,0.5)",
        },
        {
          type: "inside",
          show: true,
          height: 15,
          start: 1,
          end: 35,
        },
      ],
      series: [
        {
          name: "客流量",
          type: "line",
          symbolSize: 10,
          symbol: "circle",
          itemStyle: {
            color: "#6f7de3",
          },
          markPoint: {
            label: {
              normal: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            data: [
              {
                type: "max",
                name: "最大值",
              },
              {
                type: "min",
                name: "最小值",
              },
            ],
          },
          data: yData,
        },
      ],
    });
  });
};
onMounted(() => {
  getList();
});
</script>
<style src="@/assets/css/views/header/add-header.css" scoped>
</style>
<style src="@/assets/css/common/content.css" scoped>
</style>
<style src="@/assets/css/common/box.css" scoped>
</style>