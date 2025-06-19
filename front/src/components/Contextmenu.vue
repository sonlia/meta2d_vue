<script setup>
import {computed, onMounted, reactive, ref, nextTick} from "vue";
import {useEventbus} from "../hooks/useEventbus.js";

import {lockStatus} from "../data/defaultsConfig.js"
let isPens = ref(false)
let ctxMenu = ref()
let activePens = ref([])
let isGroup = ref(false)
let isCombine = ref(false)

let menuPos = reactive({
  top:-9999,
  left:-9999,
  visible:false
})

const calcMenuPos = computed(()=>{
  return {
    top:menuPos.top+"px",
    left:menuPos.left+"px",
    visible:menuPos.visible?"visible":"hidden"
  }
})

const eventBus = useEventbus()
eventBus.customOn('load',()=>{
  window.addEventListener('contextmenu',(e)=>{
    e.preventDefault()
    ctxMenu.value.focus()
  })
  meta2d.on('contextmenu',({e})=>{
    menuPos.top = e.clientY
    menuPos.left = e.clientX
    menuPos.visible = true
    nextTick(() => {
      // 获取菜单高度和页面高度
      const menuEl = ctxMenu.value
      if (menuEl) {
        const menuHeight = menuEl.offsetHeight
        const pageHeight = window.innerHeight
        // 如果菜单底部超出页面底部，则调整top
        if (e.clientY + menuHeight > pageHeight) {
          menuPos.top = pageHeight - menuHeight
          // 防止top为负数
          if (menuPos.top < 0) menuPos.top = 0
        }
      }
      ctxMenu.value.focus()
    })
  })
  meta2d.on("active",(pens)=>{
    if(pens.length>0){
      activePens.value = pens
      isPens.value = true
      if(pens.length === 1 && pens[0].name === 'combine') {
        isGroup.value = true
        isCombine.value = true
      } else {
        isGroup.value = false
        isCombine.value = false
      }
    }else {
      isPens.value = false
      isGroup.value = false
      isCombine.value = false
      activePens.value = []
    }
  })
  meta2d.on('inactive',()=>{
    isPens.value = false
  })
})
function changeCoverage(pos){
  switch (pos){
    case "top":
      meta2d.top(activePens.value)
      break
    case "bottom":
      meta2d.bottom(activePens.value)
      break
    case "up":
      meta2d.up(activePens.value)
      break
    case "down":
      meta2d.down(activePens.value)
      break
  }
  ctxMenu.value.blur()
}

function lock() {
  meta2d.lock(2)
  meta2d.emit('lock')
  ctxMenu.value.blur()
}

function paste() {
  meta2d.paste()
  ctxMenu.value.blur()
}
function copy() {
  meta2d.copy(activePens.value)
  ctxMenu.value.blur()
}

function ctxMenuClose() {
  menuPos.visible = false
}

function group() {
  if(activePens.value.length > 1) {
    meta2d.combine(activePens.value)
    ctxMenu.value.blur()
  }
}

function unGroup() {
  if(activePens.value.length === 1 && activePens.value[0].name === 'combine') {
    meta2d.uncombine(activePens.value[0])
    ctxMenu.value.blur()
  }
}

function combine() {
  if(activePens.value.length > 1) {
    meta2d.combine(activePens.value, 0)
    ctxMenu.value.blur()
  }
}

const isAppendToCombineVisible = computed(() => {
  const pens = activePens.value
  if (pens.length < 2) return false;
  const stateCombinePens = pens.filter(
    (p) => p.name === 'combine' && typeof p.showChild === 'number'
  );
  return (stateCombinePens.length === 1);
});

function appendToCombine() {
  meta2d.active(activePens.value);
  meta2d.appendChild();
  ctxMenu.value.blur();
}

function clearCombine() {
  // 递归清除组合
  // 如果传入参数，优先用参数，否则用当前选中的组合
  let pen = activePens.value.length === 1 ? activePens.value[0] : null;
  if (!pen || pen.name !== 'combine') {
    ctxMenu.value.blur();
    return;
  }
  // 调用 meta2d.clearCombine，如果有该API，否则递归uncombine
  if (typeof meta2d.clearCombine === 'function') {
    meta2d.clearCombine(pen);
  } else {
    // 递归解组
    function recursiveUncombine(p) {
      if (p && p.name === 'combine' && Array.isArray(p.children)) {
        // 先对子组合递归
        for (const childId of p.children) {
          const child = meta2d.findOne(childId);
          if (child && child.name === 'combine') {
            recursiveUncombine(child);
          }
        }
        // 解除当前组合
        meta2d.uncombine(p);
      }
    }
    recursiveUncombine(pen);
  }
  ctxMenu.value.blur();
}

function setBreakPoint(){
  if(!isPens.value || activePens.value.length===0) return;
  const target = activePens.value[0];
  // 以中心为基准放大 1.3 倍
  const scale = 1.3;
  const newWidth = target.width * scale;
  const newHeight = target.height * scale;
  const newX = target.x - (newWidth - target.width) / 2;
  const newY = target.y - (newHeight - target.height) / 2;

  const bpPen = {
    id:`bp-${Date.now()}`,
    name:'square', // 使用方形描边
    breakpoint:true,
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
    lineWidth:3,
    color:'#ff0000',
    background:'',
    locked:2,
  };
  meta2d.addPen(bpPen);
 
  ctxMenu.value.blur();
}

function clearBreakPoint(){
 
  if(!isPens.value || activePens.value.length===0) return;
  const target = activePens.value[0];
  if(target.hasOwnProperty('breakpoint')&&target.breakpoint===true){
    meta2d.delete([target],true);
  }
  ctxMenu.value.blur();
}

</script>

<template>
  <div class="contextmenu" ref="ctxMenu" tabindex="-1" @blur="ctxMenuClose" >
 
    <div class="ctx_item" v-show="isPens&& lockStatus === 0" @click="changeCoverage('top')">置顶</div>
    <div class="ctx_item" v-show="isPens&& lockStatus === 0" @click="changeCoverage('bottom')">置底</div>
    <div class="ctx_item" v-show="isPens&& lockStatus === 0" @click="changeCoverage('up')">上一图层</div>
    <div class="ctx_item" v-show="isPens&& lockStatus === 0" @click="changeCoverage('down')">下一图层</div>
    <div class="ctx_item" v-show="lockStatus === 0" @click="lock">锁定</div>
    <div class="ctx_item" v-show="isPens&& lockStatus === 0" @click="copy">复制</div>
    <div class="ctx_item" v-show="lockStatus === 0" @click="paste">粘贴</div>
    <div class="ctx_item" v-show="isPens && activePens.length > 1&& lockStatus === 0" @click="group">组合</div>
    <div class="ctx_item" v-show="isGroup&& lockStatus === 0" @click="unGroup">取消组合</div>
    <div class="ctx_item" v-show="isPens && activePens.length > 1&& lockStatus === 0" @click="combine">组合为状态</div>
    <div class="ctx_item"  v-show="isAppendToCombineVisible&& lockStatus === 0" @click="appendToCombine">追加到组合</div>
    <div class="ctx_item" v-show="isGroup&& lockStatus === 0" @click="clearCombine">递归取消组合</div>

    <div class="ctx_item" v-show="isPens && lockStatus!==0" @click="setBreakPoint">设置断开点</div>
    <div class="ctx_item" v-show="isPens && lockStatus!==0" @click="clearBreakPoint">清除断开点</div>
  </div>

</template>

<style scoped>

.contextmenu {
  padding: 6px;
  position: absolute;
  top: v-bind("calcMenuPos.top");
  left:v-bind("calcMenuPos.left");
  visibility: v-bind("calcMenuPos.visible");
  background-color: #fff;
  max-height: 5000px;
  width: 180px;
  z-index: 999;
  border-radius: 10px;
}
.ctx_item{
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: background-color .5s ease;
}
.ctx_item:hover{
  background-color: #eeeeee;
}
</style>