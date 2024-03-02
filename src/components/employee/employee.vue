<template>
  <div class="box employee">
    <div class="box-header">
      <h3>员工管理</h3>
    </div>
    <div class="content">
      <div class="header">
        <div class="add">
          <excel-leading-in
            class="add-excel"
            v-if="isCompany()"
            @add-excel-data="addExcelData"
            :excel-list="data.excelList"
          />
          <excel-export
            ref="outExcel"
            class="add-excel"
            :excelList="data.excelList"
            @click="handleExcelExport"
          />
          <div class="applies">
            <el-badge value="1" class="item" v-if="isCompany()">
              <el-button type="danger" @click="handleApplyCompany"
                >员工调动申请</el-button
              >
            </el-badge>
            <el-button v-else type="danger"  @click="handleApplyStore">员工调动申请</el-button>
          </div>
        </div>
        <div>
          <search
            :options="employeeSearchList"
            @getSearchNews="getSearchNews"
          />
        </div>
      </div>
      <div class="middle" style="height: auto">
        <div class="changeShow">
          <el-select v-model="data.showContent">
            <el-option value="技能" />
            <el-option value="偏好" />
          </el-select>
        </div>
      </div>
      <div class="bottom">
        <el-row class="table">
          <el-table :data="data.tableData" border stripe style="width: 100%">
            <el-table-column prop="staffName" label="姓名" width="80px" />
            <el-table-column prop="sex" label="性别" width="60px" />
            <el-table-column
              prop="shopName"
              label="公司"
              width="150px"
              v-if="isCompany()"
            >
              <template v-slot="scoped">
                <div
                  @click="
                    data.showDrawer = true;
                    data.changPeople = scoped.row;
                  "
                >
                  <div v-if="scoped.row.shopName">
                    {{ scoped.row.shopName }}
                  </div>
                  <div v-if="!scoped.row.shopName">暂无公司</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="position" label="职位" width="80px" />
            <el-table-column prop="hourlyWage" label="时薪" width="100px" />
            <el-table-column prop="idNumber" label="身份证号" width="180px" />
            <el-table-column
              v-if="data.showContent === '技能'"
              prop="phone"
              label="电话号码"
              width="130px"
            />
            <el-table-column
              v-if="data.showContent === '技能'"
              prop="staffEmail"
              label="邮箱"
              width="180px"
            />
            <el-table-column
              v-if="data.showContent === '技能'"
              aria-placeholder="无"
              prop="skills"
              label="技能"
              max-height="20px"
            />
            <el-table-column
              prop="timePreference"
              v-if="data.showContent === '偏好'"
              aria-placeholder="无"
              label="工作日偏好"
              min-width="120px"
              max-height="60px"
            />
            <el-table-column
              prop="datePreference"
              v-if="data.showContent === '偏好'"
              aria-placeholder="无"
              label="工作时间偏好"
              min-width="120px"
              max-height="60px"
            />
            <el-table-column
              prop="timeLongPreference"
              v-if="data.showContent === '偏好'"
              aria-placeholder="无"
              label="班次时长偏好"
              min-width="120px"
              max-height="60px"
            />
            <el-table-column label="操作" width="160">
              <template v-slot>
                <el-button link type="primary">编辑</el-button>
                <el-button link type="danger">删除</el-button>
                <el-button link type="warning">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pager">
          <el-pagination
            layout="prev, pager, next"
            :total="data.pageData.total"
          >
          </el-pagination>
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
            <el-select v-model="data.changPeople.shopName" class="m-2">
              <el-option
                v-for="item in data.options"
                :key="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="drawer-button">
          <el-button type="primary">修改</el-button>
          <el-button>取消</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script setup>
import excelLeadingIn from "@/components/excel/excel-leading-in.vue";
import excelExport from "@/components/excel/excel-export.vue";
import search from "@/components/common/search.vue";
import { ElMessage } from "element-plus";
// 数据
import { employeeExport } from "@/assets/js/common/excel/excel-information";
import { employeeSearchList } from "@/assets/js/common/search";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 处理数据
import { handleEmployeeDataFormat } from "@/assets/js/common/excel/excel-format";
import { isCompany } from "@/assets/js/utils/user";
// 接口
import { getShopEmployees, getCompanyEmployees } from "@/api/employee";
import store from "@/store";
const data = reactive({
  excelList: employeeExport,
  searchNews: {
    data: "",
    msg: "",
  },
  showDrawer: false,
  isSearch: false,
  showContent: "技能",
  tableData: [],
  chooseCompany: false,
  pageData: {
    page: 1,
    limit: 10,
    total: 0,
  },
  options: [
    {
      value: "蜜雪冰城",
    },
    {
      value: "蜜雪冰城（永定店）",
    },
    {
      value: "蜜雪冰城（长沙店）",
    },
  ],
  changPeople: {
    staffName: "",
    sex: "",
    position: "",
    shopName: "",
  },
});
// 上传数据给后端
const addExcelData = (data) => {
  // addAudit(data).then((res) => {
  //   if (res.data.code === store.state.global.success) {
  //     ElMessage.success(res.data.msg);
  //   } else {
  //     ElMessage.error(res.data.msg);
  //   }
  // });
  ElMessage.success("员工上传成功");
};
const router = useRouter();
const outExcel = ref(null);
// 导出数据
const handleExcelExport = () => {
  outExcel.value.outExcel([]);
};
// 修改分页
// 得到分页的员工数据
const getList = () => {
  const news = {
    pages: data.pageData.page,
    limit: data.pageData.limit,
    isSearch: data.isSearch,
    searchType: data.searchNews.data,
    searchKeywords: data.searchNews.msg,
  };
  if (isCompany()) {
    getCompanyEmployees(news).then((res) => {
      if (res.data.code === store.state.global.success) {
        console.log(res.data.data);
        data.tableData = handleEmployeeDataFormat(res.data.data.records);
        data.pageData.total = res.data.data.total;
      }
    });
  } else {
    getShopEmployees(news).then((res) => {
      if (res.data.code === store.state.global.success) {
        console.log(res.data.data);
        data.tableData = handleEmployeeDataFormat(res.data.data.records);
        data.pageData.total = res.data.data.total;
      }
    });
  }
};
// 得到搜索的数据
const getSearchNews = (searchNews) => {
  data.searchNews = searchNews;
  data.isSearch = true;
  getList();
};
// 跳转界面
const handleApplyStore = () => {
  const href = router.resolve({
    path: "/turn/apply-store",
  });
  window.open(href.href, "_blank");
};
const handleApplyCompany = () => {
  const href = router.resolve({
    path: "/turn/apply-company",
  });
  window.open(href.href, "_blank");
};
onMounted(() => {
  getList();
});
</script>
<style src="@/assets/css/common/content.css" scoped>
</style>
<style src="@/assets/css/common/box.css" scoped>
</style>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.middle {
  padding-bottom: 20px;
}
.add {
  display: flex;
}
.add-excel {
  margin-right: 0.5em;
}
.pager {
  float: right;
  padding-bottom: 20px;
}
.drawer-button {
  margin-top: 1em;
  float: right;
}
</style>