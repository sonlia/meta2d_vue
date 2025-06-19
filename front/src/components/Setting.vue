<script setup>
import {onMounted, ref, watch, h, defineAsyncComponent, nextTick} from "vue";
import MapProps from "./MapProps/Map.vue";
import Global from "./MapProps/Global.vue";
import Appearance from "./PenProps/Appearance.vue";
import Event from "./PenProps/Event.vue";
import Animate from "./PenProps/Animate.vue";
import Data from "./PenProps/Data.vue";
import { ElInput, ElButton, ElDialog, ElTree } from "element-plus";
import axios from "axios";
import { lockStatus } from "../data/defaultsConfig.js";

const props = defineProps(['activeType'])
let activeName1 = ref('map')
let activeName2 = ref('appearance')
let activeName3 = ref('appearance')
let activePen = ref(false)
let multiPen = ref(false)
let showTreeDialog = ref(false)
let selectedPath = ref("")
let  activeData=ref({})

onMounted(()=>{
  console.log('setting')
  // 监听鼠标点击事件，返回
  meta2d.on('active',(args)=>{
    if(args.length >= 1) activePen.value = true
    if(args.length >1){
      multiPen.value = true
    }else {
      multiPen.value = false
      activeData.value = args[0]
      // 如果节点具有 goToOutPath，则显示并同步输入框内容
      if(activeData.value && activeData.value.hasOwnProperty('goToOutPath')){
        selectedPath.value = activeData.value.goToOutPath || ""
      } else {
        selectedPath.value = ""
      }
    }
  })
  meta2d.on('inactive',()=>{
    activePen.value = false
    multiPen.value = false
  })
})

// 选择tree节点后回填
function handleTreeSelect(data) {
  // data.fullPath 是完整路径
  selectedPath.value = data.fullPath || data.id;
  if (window.meta2d && window.meta2d.store.active && window.meta2d.store.active[0]) {
 
    window.meta2d.setValue({ id: window.meta2d.store.active[0].id, goToOutPath: selectedPath.value });
  }
  showTreeDialog.value = false;
}

// TreeSelectDialog函数式实现
const TreeSelectDialog = (props, { emit }) => {
  const dialogVisible = props.modelValue;
  const treeRef = ref(null); // 新增
  const defaultProps = {
    children: "children",
    label: "label",
    isLeaf: (data) => !data.children || data.children.length === 0,
  };
  // 懒加载
  const loadNode = async (node, resolve) => {
    if (node.level === 0) {
      const response = await axios.get("/api/loadRoot");
      resolve(response.data);
    } else {
      const response = await axios.post("/api/loadChildren", { id: node.data.id });
      resolve(response.data);
    }
  };
  // 递归获取全路径
  function getFullPath(node) {
    let path = [];
    let cur = node;
    while (cur) {
      // 优先从 data.label 获取，以防 node.label 不存在
      const lbl = cur.data?.label || cur.label || "";
      if (lbl) path.unshift(lbl);
      cur = cur.parent;
    }
    return path.join("/");
  }

  // 双击检测：两次 node-click 的间隔小于 300ms 且同一节点视为双击
  const lastClick = { id: null, time: 0 };
  function handleNodeClick(data) {
    const now = Date.now();
    if (lastClick.id === data.id && now - lastClick.time < 300) {
      // 视为双击
      let fullPath = "";
      if (treeRef.value) {
        const treeNode = treeRef.value.getNode(data.id);
        fullPath = getFullPath(treeNode);
      }
      emit('select', { ...data, fullPath });
      lastClick.id = null; // 重置
    } else {
      lastClick.id = data.id;
      lastClick.time = now;
    }
  }

  return h(ElDialog, {
    modelValue: dialogVisible,
    "onUpdate:modelValue": v => emit('update:modelValue', v),
    title: "选择路径",
    width: "400px",
    appendToBody: true,
    closeOnClickModal: false,
    'destroy-on-close': true,
  }, {
    default: () => h(ElTree, {
      ref: treeRef,
      style: "height: 400px; overflow:auto;",
      props: defaultProps,
      lazy: true,
      load: loadNode,
      nodeKey: "id",
      highlightCurrent: true,
      onNodeClick: handleNodeClick
    }),
    footer: () => h('div')
  });
};
TreeSelectDialog.props = ['modelValue']
TreeSelectDialog.emits = ['update:modelValue', 'select']
</script>

<template>

  <div class="setting">

    <div class="tz_props" v-show="!activePen">
      <el-tabs v-model="activeName1" class="demo-tabs"  active-name="first">
        <el-tab-pane label="图纸" name="map" class="tab" >
         <MapProps></MapProps>
        </el-tab-pane>
        <el-tab-pane label="全局配置" name="global" class="tab"><Global></Global></el-tab-pane>
      </el-tabs>
    </div>

    <div class="ty_props" v-show="activePen && !multiPen">
  
      <el-tabs v-model="activeName2" class="demo-tabs">
        <el-tab-pane label="外观" name="appearance" >
          <Appearance></Appearance>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event" >
          <Event></Event>
        </el-tab-pane>
        <el-tab-pane label="动效" name="animate">
          <Animate></Animate></el-tab-pane>
          <el-tab-pane label="数据" name="data" >
          <Data></Data>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="ty_props" v-show="activePen && multiPen">
      <el-tabs v-model="activeName3" class="demo-tabs">
        <el-tab-pane label="外观" name="appearance" >
          <Appearance></Appearance>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="ty_props" v-show="activeData && activeData.hasOwnProperty('goToOutPath') && lockStatus === 0">
          <!-- 存在 goToOutPath 属性时显示路径选择 -->
          <div   class="q-mb-md row items-center">
        <el-input
          v-model="selectedPath"
          placeholder="请选择路径"
          readonly
          dense
          dark
          style="width: 70%; margin-right: 8px;"
   
        />
        <el-button @click="showTreeDialog = true" type="primary" size="small" dense dark>选择</el-button>
      </div>
      <TreeSelectDialog
        v-if="showTreeDialog"
       v-model="showTreeDialog"
      
        @select="(data)=>handleTreeSelect(data)"
      />
      
    </div>
</div>
</template>

<style scoped>
.setting {
  position: relative;
  display: flex;
  width: 350px;
 padding-left: 12px;
  overflow: auto;
  box-shadow: 0 2px 4px 0 #dad7d7;
}
 
</style>