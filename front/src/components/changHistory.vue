<template>
  <div class="setting">
    <!-- 表格组件 -->
    <el-table 
      :data="sortedData" 
      style="width: 100%" 
      border 
      row-key="id"
    >
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template #default="props">
          <!-- 遍历 content 数组，为每条数据生成一个卡片 -->
          <el-card 
            v-for="(item, index) in props.row.content" 
            :key="index" 
            class="box-card" 
            style="margin-bottom: 10px; width: 100%; box-sizing: border-box;"
          >
            <div class="card-item">
              <span><strong>内容 {{ index + 1 }}：</strong>{{ item }}</span>
            </div>
          </el-card>
        </template>
      </el-table-column>

      <!-- 表头列 -->
      <el-table-column prop="lastChange" label="时间" width="180">
        <template #default="scope">
          {{ scope.row.lastChange }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ElTable, ElTableColumn, ElCard } from 'element-plus';
import {lastChangeTime  ,switchChangHistory } from "../data/defaultsConfig.js" 
 

// 排序后的数据
const sortedData = computed(() => {
    return switchChangHistory.value
  // return switchChangHistory.sort((a, b) => a.lastChange - b.lastChange); // 按时间排序
});

 
</script>

<style scoped>
/* 表格样式 */
.el-table {
  width: 100%;
  box-sizing: border-box;
}

/* 卡片样式 */
.box-card {
  width: 100%; /* 卡片宽度自适应 */
  box-sizing: border-box; /* 包含边框和内边距 */
  margin-bottom: 10px; /* 添加上下间距 */
   
}

.card-item {
  margin-bottom: 10px;
  font-size: 14px;
}
.card-item:last-child {
  margin-bottom: 0;
}

/* 父级容器样式 */
.setting {
  position: relative;
  display: flex;
  width: 350px;
  padding: 16px 0 0 16px;
  overflow: auto;
  box-shadow: 0 2px 4px 0 #dad7d7;
  overflow: hidden; /* 防止内容溢出 */
  box-sizing: border-box;
}
</style>