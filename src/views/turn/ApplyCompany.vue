<template>
  <div class="apply-company">
    <div class="top">
      <div class="choose-card" @click="handleCheckHistory">
        <div class="left">
          <img :src="require('@/assets/images/' + data.chooseData.img)" />
        </div>
        <div class="right">{{ data.chooseData.name }}</div>
      </div>
    </div>
    <div class="middle">
      <div>
        <div class="choose">
        <el-date-picker
        v-model="data.time"
        type="date"
        placeholder="选择调动时间"
      />
        <search :options="applySearchList" />
      </div>
        <el-table :data="data.tableData" border stripe style="width: 1200px">
          <el-table-column prop="shop" label="店铺" width="180" />
          <el-table-column prop="person" label="申请操作人" width="180" />
          <el-table-column prop="position" label="申请调动职位" />
          <el-table-column prop="num" label="申请调动人数" />
          <el-table-column prop="time" label="申请时间" />
          <el-table-column prop="statue" label="状态" />
          <el-table-column label="操作" width="280">
            <template #default>
              <el-button type="primary" @click="handleApply"
                >调动员工</el-button
              >
              <el-button type="success" @click="handleNews">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination layout="prev, pager, next" :total="10" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import search from "@/components/common/search.vue";
import { applySearchList } from "@/assets/js/common/search";
const router = useRouter();

const data = reactive({
  chooseData: {
    img: "exchange.png",
    name: "员工调动历史",
  },
  tableData: [
    {
      shop: "蜜雪冰城",
      person: "杜刚",
      position: "保洁",
      num: 1,
      statue: "未处理",
      time: "2023-08-02",
    },
    {
      shop: "蜜雪冰城",
      person: "杜刚",
      position: "收银员",
      num: 2,
      statue: "处理中",
      time: "2023-07-28",
    },
    {
      shop: "天知晓",
      person: "陈雪",
      position: "经理",
      num: 1,
      statue: "未处理",
      time: "2023-07-26",
    },
    {
      shop: "时尚驿站",
      person: "罗晋",
      position: "导购",
      num: 3,
      statue: "处理中",
      time: "2023-07-24",
    },
    {
      shop: "天知晓",
      person: "陈雪",
      position: "库房",
      num: 1,
      statue: "未处理",
      time: "2023-07-23",
    },
    {
      shop: "步步高",
      person: "昊天",
      position: "库房",
      num: 2,
      statue: "处理中",
      time: "2023-07-16",
    },
    {
      shop: "步步高",
      person: "昊天",
      position: "经理",
      num: 1,
      statue: "已处理",
      time: "2023-07-07",
    },
  ],
});
const handleCheckHistory = () => {
  const href = router.resolve({
    path: "/turn/apply-history",
  });
  window.open(href.href, "_blank");
};
const handleApply = () => {
 
    const href = router.resolve({
    path: "/turn/apply-employee",
  });
  window.open(href.href, "_blank");
  setTimeout(()=>{
    data.tableData[0].statue = "已处理"
  },1000)
};
const handleNews = () => {
  const href = router.resolve({
    path: "/turn/apply-news",
  });
  window.open(href.href, "_blank");
};
</script>
<style scoped>
.choose{
  display: flex;
  justify-content: space-between;
}
.middle > div{
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
}
.choose-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 180px;
  margin-left: 20vh;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
}
.choose-card img {
  height: 50px;
  width: 50px;
}
.right {
  margin-left: 1em;
  font-weight: bolder;
}
.middle {
  padding: 25px;
  display: flex;
  justify-content: center;
}
.pager {
  padding-top: 20px;
  float: right;
}
</style>