<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {eventType, eventBehavior} from "../../data/defaultsConfig.js";
import {EventAction}  from "@meta2d/core"
let activePen = reactive({})
let event = reactive({
  name:"",
  action:"",
  value:""
})
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

onMounted(()=>{
  meta2d.on('active',(pen)=>{
    if(pen.length === 1){
      activePen = pen[0]
      if(!activePen.events){
        activePen.events = []
      }else {
        // 有事件？
        const actEvent = activePen.events[0]
        if(actEvent){
          event.name = actEvent.name
          event.action = actEvent.action
          otherParams.forEach(i=>event[i]=actEvent[i])
          event.value = actEvent.value
        }else {
          event.name = ""
          event.action = ""
          event.value = ""
        }
      }
    }else {
      activePen = undefined
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
function confirmEvent() {
 
 const e={}
 if(depList.value.name === "执行全局js"){
 
    e.name= event.name
    e.action= EventAction.GlobalFn
    e.value= depList.value.depend[0].bindData // 确保 value 字段存储 js 代码
  }else{
    e.name= event.name
    e.action= event.action
    e.value= event.value // 确保 value 字段存储 js 代码
  };
 
 

 
  activePen.events.push(e);
  
  // 新增：同步到 meta2d 数据模型
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
      <!-- 全局JS按钮 -->
      <el-button type="warning" style="width:100%;margin-bottom:12px" @click="openGlobalJsEditor">全局JS</el-button>
      <el-form @submit="(e)=>e.preventDefault()">
        <el-form-item label="事件类型" >
          <el-select v-model="event.name" placeholder="选择事件类型" >
          <el-option
              v-for="e in eventType"
              :key="e.event"
              :label="e.name"
              :value="e.event"
          >
          </el-option>
        </el-select>
        </el-form-item>

        <!--        行为类型-->
        <el-form-item label="行为类型">
          <el-select  v-model="event.action" placeholder="选择行为类型">
            <el-option
                v-for="i in eventBehavior"
                :key="i.behavior"
                :label="i.name"
                :value="i.behavior"
            >
            </el-option>
          </el-select>
        </el-form-item>

<!--        事件类型依赖表单-->
        <el-form-item :label="dep.name" v-for="dep in depList?.depend">
          <el-input v-model="dep.bindData" :placeholder="dep.option?.placeholder || '请输入'" v-if="dep.type==='input'" @[dep.event]="dep.func" :type="dep.option?.type||'text'"/>
          <!--          选择框-->
          <el-select v-model="dep.bindData" :placeholder="dep.option.placeholder" v-else-if="dep.type==='select'">
            <el-option
                v-for="item in dep.option.list"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <el-button  v-else-if="dep.type === 'button'" @[dep.event]="dep.func" :style="dep.middle?'width:100%;margin: auto;':''">{{dep.option.title}}</el-button>
          <!-- editor   类型都渲染为按钮并弹窗 -->
          <el-button v-else-if="dep.type === 'editor'" @click="openJsEditor(dep)" :style="dep.middle?'width:100%;margin: auto;':''">{{dep.option?.title || '打开编辑器'}}</el-button>

        </el-form-item>



        <div class="event_button">
          <el-button @click="confirmEvent" type="primary" style="width: 100%;margin-right: 14px">确认事件</el-button>
          <el-button @click="removeEvent" type="danger" style="width: 100%;margin-right: 14px">清除事件</el-button>

        </div>
      </el-form>

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