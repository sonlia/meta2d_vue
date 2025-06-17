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
const jsEditorValue = ref("");
const showGlobalJsEditor = ref(false);
const globalJsValue = ref('');
const showWhereEditor = ref(false);
const whereEditorValue = ref("");
const whereTypeValue = ref("");
let currentDep = null;
// 新增：当前是否为新增事件模式
const isAddMode = ref(false);
// 当前选中的事件索引
const currentEventIndex = ref(-1);
let editingEventIdx = ref(-1);
let editingWhereIdx = ref(-1);

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

function openJsEditorForEvent(ev, idx) {
  jsEditorValue.value = ev.value || '';
  editingEventIdx.value = idx;
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

function onConfirmJsEdit() {
  if (editingEventIdx.value >= 0 && activePen.events[editingEventIdx.value]) {
    activePen.events[editingEventIdx.value].value = jsEditorValue.value;
    autoSave();
  }
  showJsEditor.value = false;
  editingEventIdx.value = -1;
}

function onCancelJsEdit() {
  showJsEditor.value = false;
  editingEventIdx.value = -1;
}

function autoSave() {
  if (window.meta2d && activePen.id) {
    window.meta2d.setValue({ id: activePen.id, events: activePen.events });
  }
}

function openWhereEditor(ev, idx) {
  whereEditorValue.value = (ev.where && ev.where.fnJs) ? ev.where.fnJs : '';
  whereTypeValue.value = (ev.where && ev.where.type) ? ev.where.type : '';
  editingWhereIdx.value = idx;
  showWhereEditor.value = true;
}

function onConfirmWhereEdit() {
  if (editingWhereIdx.value >= 0 && activePen.events[editingWhereIdx.value]) {
    if (!activePen.events[editingWhereIdx.value].where) {
      activePen.events[editingWhereIdx.value].where = {};
    }
    activePen.events[editingWhereIdx.value].where.fnJs = whereEditorValue.value;
    activePen.events[editingWhereIdx.value].where.type = whereTypeValue.value;
    autoSave();
  }
  showWhereEditor.value = false;
  editingWhereIdx.value = -1;
}

function onCancelWhereEdit() {
  showWhereEditor.value = false;
  editingWhereIdx.value = -1;
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
          <!-- 附属数据label和内容根据行为类型动态变化 -->
          <el-form-item :label="ev.action === EventAction.GlobalFn ? '全局函数' : (ev.action === EventAction.JS ? '' : 'id/tag')">
            <template v-if="ev.action === EventAction.GlobalFn">
              <el-input v-model="ev.value" placeholder="请输入全局函数" @input="autoSave"   :rows="6" />
            </template>
            <template v-else-if="ev.action === EventAction.JS">
              <el-button type="primary" size="mini" @click="openJsEditorForEvent(ev, idx)">编辑JS代码</el-button>
              <span v-if="ev.value && ev.value.length > 0" style="margin-left:8px;color:#888;">已编辑</span>
            </template>
            <template v-else>
              <el-input v-model="ev.value" placeholder="请输入id/tag" @input="autoSave"/>
            </template>
          </el-form-item>
          <!-- 触发条件按钮及显示 -->
          <el-form-item label="触发条件">
            <el-button type="primary" size="mini" @click="openWhereEditor(ev, idx)">编辑触发条件</el-button>
            <span v-if="ev.where && ev.where.fnJs" style="margin-left:8px;color:#888;max-width:120px;overflow:hidden;text-overflow:ellipsis;display:inline-block;vertical-align:middle;">{{ ev.where.fnJs }}</span>
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
      <span>可获取pen、params和context参数</span>
      <div style="text-align:center;margin-top:10px;">
        <el-button type="primary" @click="onConfirmJsEdit">确定</el-button>
        <el-button @click="onCancelJsEdit">取消</el-button>
      </div>
    </el-dialog>
    <!-- 触发条件编辑弹窗 -->
    <el-dialog v-model="showWhereEditor" title="编辑触发条件JS" width="600px">
      <el-input
        v-model="whereTypeValue"
        placeholder="请输入类型(type)"
        style="margin-bottom: 10px;"
      />
      <el-input
        v-model="whereEditorValue"
        type="textarea"
        :rows="10"
        placeholder='通过js代码返回值触发条件，如：return pen.id === "xxx"'
      />
      <span>可获取pen、context参数，需返回true或false</span>
      <div style="text-align:center;margin-top:10px;">
        <el-button type="primary" @click="onConfirmWhereEdit">确定</el-button>
        <el-button @click="onCancelWhereEdit">取消</el-button>
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
  bottom: 0px;
 
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