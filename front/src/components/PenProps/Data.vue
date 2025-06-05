<template>
    <div class="pen-tag-box">
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
  import { ref, inject, onMounted } from 'vue';
  
  const defaultSwitchTags = ['power', 'switch'];
  const checkedSwitchTags = ref([...defaultSwitchTags]);
  const tags = ref([...defaultSwitchTags]);
  
  let activePen = inject('activePen', ref({ target: [] }));
  let multiPen = inject('multiPen', ref(false));
  
  onMounted(() => {
    // 初始化时同步当前节点的tags
    if (activePen.value && activePen.value.target) {
      let nodeTags = [];
      if (multiPen.value) {
        const first = activePen.value.target[0];
        if (first && first.tags) nodeTags = [...first.tags];
      } else {
        if (activePen.value.target.tags) nodeTags = [...activePen.value.target.tags];
      }
      tags.value = nodeTags.length ? nodeTags : ["power"];
      checkedSwitchTags.value = ["power"];
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
    if (window.meta2d && activePen.value && activePen.value.target) {
      if (multiPen.value) {
        for (let pen of activePen.value.target) {
          window.meta2d.setValue({ id: pen.id, tags: [...tags.value] }, { render: false });
        }
        window.meta2d.render();
      } else {
        const pen = activePen.value.target;
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
  