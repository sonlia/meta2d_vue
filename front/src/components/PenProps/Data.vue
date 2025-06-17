<template>
    <div class="pen-tag-box">
      
      <div  style="color: #666; margin-bottom: 10px;">ID: {{ activePenId }}</div>
      <div class="pen-tag-row">
        <span class="pen-tag-label">默认标签：</span>
        <el-checkbox-group v-model="checkedSwitchTags" @change="onSwitchGroupChange" class="tag-switch-group">
          <el-checkbox-button
            v-for="tag in defaultSwitchTags"
            :key="tag"
            :label="tag"
          >{{ tag }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="pen-tag-row">
        <span class="pen-tag-label">标签：</span>
        <el-input-tag
          v-model="tags"
          :placeholder="'输入标签并回车'"
          @change="onTagsChange"
          @remove="onTagRemove"
          style="max-width: 320px;"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  
  const defaultSwitchTags = ['power', 'switch'];
  const checkedSwitchTags = ref([]);
  const tags = ref([]);
  
  // 1. 本地定义 activePen 和 multiPen
  let activePen = reactive({ target: [] });
  let multiPen = ref(false);
  
  const activePenId = computed(() => {
    if (multiPen.value) {
      return activePen.target && activePen.target[0] ? activePen.target[0].id : '';
    } else {
      return activePen.target && activePen.target.id ? activePen.target.id : '';
    }
  });
  
  onMounted(() => {
    // 2. 监听 meta2d 的 active 事件
    if (window.meta2d && window.meta2d.on) {
      window.meta2d.on('active', (args) => {
        multiPen.value = args.length > 1;
        if (multiPen.value) {
          activePen.target = args;
          const first = args[0];
         } else {
          activePen.target = args[0];
         }
        
      });
    }
    // 初始化时同步当前节点的tags（兼容首次加载）
    if (activePen.target) {
      let nodeTags = [];
      if (multiPen.value) {
        const first = activePen.target[0];
        if (first && first.tags) nodeTags = [...first.tags];
      } else {
        if (activePen.target.tags) nodeTags = [...activePen.target.tags];
      }
 
    }
  });
  
  function onSwitchGroupChange(val) {
    // 先移除所有默认标签
    tags.value = tags.value.filter(t => !defaultSwitchTags.includes(t));
    // 再加上选中的
    tags.value.push(...val);
    updatePenTags();
  }
  
  function onTagsChange() {
    checkedSwitchTags.value = defaultSwitchTags.filter(tag => tags.value.includes(tag));
    updatePenTags();
  }
  
  function onTagRemove(tag) {
    if (defaultSwitchTags.includes(tag)) {
      checkedSwitchTags.value = checkedSwitchTags.value.filter(t => t !== tag);
    }
    updatePenTags();
  }
  
  function updatePenTags() {
    debugger
    if (window.meta2d && activePen.target) {
      if (multiPen.value) {
        for (let pen of activePen.target) {
          console.log(pen,{ id: pen.id, tags: [...tags.value] })
          window.meta2d.setValue({ id: pen.id, tags: [...tags.value] }, { render: false });
        }
        window.meta2d.render();
      } else {
        const pen = activePen.target;
        window.meta2d.setValue({ id: pen.id, tags: [...tags.value] });
      }
    }
  }
  </script>
  
  <style scoped>
  .pen-tag-box {
    padding: 12px 0;
  }
  .pen-tag-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .pen-tag-label {
    min-width: 72px;
    color: #666;
    font-size: 14px;
    margin-right: 8px;
  }
  .tag-switch-group {
    margin-left: 0;
  }
  </style>
  