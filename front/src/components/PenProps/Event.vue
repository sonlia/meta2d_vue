<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {eventType, eventBehavior} from "../../data/defaultsConfig.js";
import {EventAction}  from "@meta2d/core"
let activePen = reactive({})
let otherParams = []
let depList = computed(()=>{
  let _b =  b.find(i=>i.behavior===event.action)
  otherParams = _b?.depend.map(i=>i.params) || []
  return _b
})
let b = reactive(eventBehavior)
const showJsEditor = ref(false);
const jsEditorValue = ref('');
const showGlobalJsEditor = ref(false);
const globalJsValue = ref('');
let currentDep = null;
// 新增：当前是否为新增事件模式
const isAddMode = ref(false);
// 当前选中的事件索引
const currentEventIndex = ref(-1);

onMounted(()=>{
  meta2d.on('active',(pens)=>{
    if(pens.length === 1){
      // 保持 activePen 响应式引用不变，只更新属性
      Object.keys(activePen).forEach(key => delete activePen[key]);
      Object.assign(activePen, pens[0]);
      if(!activePen.events){
        activePen.events = []
      }
    }else {
      Object.keys(activePen).forEach(key => delete activePen[key]);
    }
  })
  // 加载全局js
  if (window.meta2d && window.meta2d.store && window.meta2d.store.globalJs) {
    globalJsValue.value = window.meta2d.store.globalJs;
  }
})
function removeEvent() {
  activePen.events = []
  event.name = ""
  event.action = ""
  event.value = ""

}
function addNewEvent() {
  if (!activePen.events) activePen.events = [];
  const newEvent = { name: '', action: '', value: '' };
  activePen.events.push(newEvent);
  currentEventIndex.value = activePen.events.length - 1;
  // 同步到 meta2d 数据模型
  if (window.meta2d && activePen.id) {
    window.meta2d.setValue({ id: activePen.id, events: activePen.events });
  }
}
function removeEventByIndex(idx) {
  if (activePen && activePen.events) {
    activePen.events.splice(idx, 1);
    // 如果删除的是当前选中的，重置 currentEventIndex
    if (currentEventIndex.value === idx) {
      currentEventIndex.value = -1;
    } else if (currentEventIndex.value > idx) {
      currentEventIndex.value--;
    }
    // 同步到 meta2d 数据模型
    if (window.meta2d && activePen.id) {
      window.meta2d.setValue({ id: activePen.id, events: activePen.events });
    }
  }
}
function selectEvent(idx) {
  currentEventIndex.value = idx;
}

// 表单数据代理到当前选中的事件
const event = computed({
  get() {
    if (activePen && activePen.events && currentEventIndex.value >= 0) {
      return activePen.events[currentEventIndex.value];
    }
    return { name: '', action: '', value: '' };
  },
  set(val) {
    if (activePen && activePen.events && currentEventIndex.value >= 0) {
      activePen.events[currentEventIndex.value] = { ...val };
      // 同步到 meta2d 数据模型
      if (window.meta2d && activePen.id) {
        window.meta2d.setValue({ id: activePen.id, events: activePen.events });
      }
    }
  }
});

function confirmEvent() {
  // 数据已自动同步，无需额外 push
  if (window.meta2d && activePen.id) {
    window.meta2d.setValue({ id: activePen.id, events: activePen.events });
  }
}

function openJsEditor(dep) {
 
  // 优先读取 event.value 作为 js 代码
  let jsVal = '';
  if (dep.bindProp === 'value') {
    jsVal = event.value || '';
  } else {
    jsVal = dep.bindData || '';
  }
  jsEditorValue.value = jsVal;
  currentDep = dep;
  showJsEditor.value = true;
}

function openGlobalJsEditor() {
  // 读取全局js
  if (window.meta2d && window.meta2d.store && window.meta2d.store.globalJs) {
    globalJsValue.value = window.meta2d.store.globalJs;
  } else {
    globalJsValue.value = '';
  }
  showGlobalJsEditor.value = true;
}

function saveGlobalJs() {
event.action =  EventAction.GlobalFn
 eval(globalJsValue.value)
  if (window.meta2d && window.meta2d.store) {
    window.meta2d.store.globalJs = globalJsValue.value;
  }
  eval(globalJsValue.value)
  showGlobalJsEditor.value = false;
}

function onConfirm() {

 event.action = EventAction.JS
  event.value = jsEditorValue.value
  
  showJsEditor.value = false;
}

function onCancel() {
  showJsEditor.value = false;
}

</script>

<template>
  <div class="event">
    <div class="event-action-bar">
      <el-button type="success" @click="addNewEvent">新增事件</el-button>
      <el-button type="warning" @click="openGlobalJsEditor">全局JS</el-button>
    </div>
    <!-- 事件列表，每个事件为可编辑表单 -->
    <div v-if="activePen && activePen.events && activePen.events.length" class="event-list">
      <div v-for="(ev, idx) in activePen.events" :key="idx" class="event-item-card"
        @mouseenter="ev._hover = true" @mouseleave="ev._hover = false">
        <el-form :model="ev" label-width="80px" size="small">
          <el-form-item label="事件类型">
            <el-select v-model="ev.name" placeholder="选择事件类型" @change="autoSave">
              <el-option v-for="e in eventType" :key="e.event" :label="e.name" :value="e.event"/>
            </el-select>
          </el-form-item>
          <el-form-item label="行为类型">
            <el-select v-model="ev.action" placeholder="选择行为类型" @change="autoSave">
              <el-option v-for="a in eventBehavior" :key="a.behavior" :label="a.name" :value="a.behavior"/>
            </el-select>
          </el-form-item>
          <el-form-item label="id/tag">
            <!-- 执行全局js时显示输入框，执行js时显示编辑按钮，其它行为显示普通输入框 -->
            <template v-if="ev.action === EventAction.GlobalFn">
              <el-input v-model="ev.value" placeholder="请输入全局JS代码" @input="autoSave" :rows="6" />
            </template>
            <template v-else-if="ev.action === EventAction.JS">
              <el-button type="primary" size="mini" @click="openJsEditor(ev)">编辑JS代码</el-button>
              <span v-if="ev.value && ev.value.length > 0" style="margin-left:8px;color:#888;">已编辑</span>
            </template>
            <template v-else>
              <el-input v-model="ev.value" placeholder="请输入id/tag" @input="autoSave"/>
            </template>
          </el-form-item>
          <!-- 删除按钮悬浮显示 -->
          <el-button v-if="ev._hover" class="event-item-delete" type="danger" size="mini" @click="removeEventByIndex(idx)">删除</el-button>
        </el-form>
      </div>
    </div>
    <!-- JS编辑器弹窗 -->
    <el-dialog v-model="showJsEditor" title="编辑JS代码" width="600px">
      <el-input
        v-model="jsEditorValue"
        type="textarea"
        :rows="10"
        placeholder="请输入JS代码"
      />
      <div style="text-align:center;margin-top:10px;">
        <el-button type="primary" @click="onConfirm">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 全局JS编辑器弹窗 -->
    <el-dialog v-model="showGlobalJsEditor" title="全局JS代码(globalThis)" width="600px">
      <el-input
        v-model="globalJsValue"
        type="textarea"
        :rows="10"
        placeholder="请输入全局JS代码"
      />
      <template #footer>
        <el-button @click="showGlobalJsEditor = false">取消</el-button>
        <el-button type="primary" @click="saveGlobalJs">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.event-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}
.event-list {
  margin-bottom: 12px;
}
.event-item-card {
  background: #f7f7f7;
  border-radius: 4px;
  padding: 8px 8px 8px 0px;
  margin-bottom: 8px;
  position: relative;
  transition: box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.event-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-item-delete {
  position: absolute;
  top: 8px;
  right: -12px;
  z-index: 2;
  display: inline-block;
}
.event-item-body {
  margin-top: 4px;
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 13px;
}
.event_button{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.event {
  margin: 10px;
}
</style>