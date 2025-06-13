<template>
  <div class="setting">
    <el-scrollbar style="height: 100%">
      <el-card v-for="(item, index) in formattedData" :key="index" class="card-item">
        <!-- 修正了这里的 <b> 标签 -->
        <div class="card-header"><b>  {{ item.timestamp }}</b></div>
        <div v-if="item.added.length !== 0" class="section">
          <b>添加:</b>
          <div v-for="(add, addIndex) in item.added" :key="`added-${addIndex}`" class="item">
            名称: {{ add.text || '无' }}, 状态: {{ add.status === 0 ? '关' : '开' }}
          </div>
        </div>
        <div v-if="item.removed.length !== 0" class="section">
          <b>删除:</b>
          <div v-for="(remove, removeIndex) in item.removed" :key="`removed-${removeIndex}`" class="item">
            名称: {{ remove.text || '无' }}, 状态: {{ remove.status === 0 ? '关' : '开' }}
          </div>
        </div>
        <div v-if="item.updated.length !== 0" class="section">
          <b>更新:</b>
          <div v-for="(update, updateIndex) in item.updated" :key="`updated-${updateIndex}`" class="item">
            名称: {{ update.text || '无' }}<br />
            更改:  {{ update.change.status?.oldStatus === 0 ? '关' : '开' }} --> {{ update.change.status?.newStatus === 0 ? '关' : '开' }}
          </div>
        </div>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { currentSelect, getSwitchHistory } from "../data/defaultsConfig.js";

const switchChangHistory = ref([]);

async function fetchHistory() {
  if (!currentSelect.value) return;
  try {
    const history = await getSwitchHistory(currentSelect.value);
    switchChangHistory.value = history;
  } catch (e) {
    switchChangHistory.value = [];
  }
}

// 监听 currentSelect 变化自动请求
watch(currentSelect, () => {
  fetchHistory();
}, { immediate: true });

// 监听 meta2d.store.data.locked，locked!=0时延迟500ms重试
if (window.meta2d && window.meta2d.store && window.meta2d.store.data) {
  watch(
    () => window.meta2d.store.data.locked,
    (val) => {
      if (val !== 0) {
        setTimeout(() => {
          fetchHistory();
        }, 500);
      }
    }
  );
}

const formattedData = computed(() => {
  return (switchChangHistory.value || []).map(item => {
    const timestamp = Object.keys(item)[0];
    const data = item[timestamp] || { added: [], removed: [], updated: [] };
    return {
      timestamp: new Date(parseInt(timestamp)).toLocaleString(),
      added: (data.added || []).map(add => ({ ...add, text: add.text || '无' })),
      removed: (data.removed || []).map(remove => ({ ...remove, text: add.text || '无' })),
      updated: (data.updated || []).map(update => ({
        ...update,
        change: update.change,
        text: update.text || '无'
      }))
    };
  });
});
</script>

<style>
/* 卡片样式 */
.card-item {
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
 
}

.card-header {
  font-size: 16px;
  padding: 10px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.section {
  padding: 10px;
  border-bottom: 1px dashed #ebeef5;
}

.section:last-child {
  border-bottom: none;
}

.item {
  margin: 5px 0;
  font-size: 14px;
  color: #606266;
}

/* 父级容器样式 */
.setting {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
}
/* 覆盖 CSS 变量 */

</style>
<style>
.card-item  .el-card__body  {
   padding: 8px !important; /* 覆盖默认变量值 */
}
</style>