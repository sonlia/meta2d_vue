<script setup>
import {
  defaultIcons,
  getOtherIcons,
  pngToPens,
  svgToPens,
} from "../data/icons.js";
import { Search } from "@element-plus/icons-vue";
import projecMange from "./projecMange.vue";
import { Meta2d } from "@meta2d/core";
import { computed, onMounted, reactive, ref, watch, nextTick, toRaw } from "vue";
import axios from "axios";
import { deepClone } from "@meta2d/core";
import { customData } from "../../public/custom/custom.js";
import {
  currentSelect,
  lockStatus,
 
  openFile,
} from "../data/defaultsConfig.js";
const activeName = ref("filelist");
let iconList = reactive([customData]);
const filePath = ref();
const inputValue = ref("");

let showList = computed(() => iconList.filter((i) => i.show));
const handleClick = (name, event) => {
  console.log(name, "eee");
};
onMounted(async () => {
  let meta2d = new Meta2d("meta2d");

  const icons = await getOtherIcons();
  iconList.push(...icons.flat(2));
  iconList.push(...defaultIcons);
 
 


});

function dragPen(data, e) {
  if (meta2d.store.data.locked != 0) {
    window.alert('画布已锁定，无法添加图元，确认已选择工程,右上角解锁');
    return;
  }
  const json = JSON.stringify(data);
  e.dataTransfer.setData("Meta2d", json);
}

function onTouchstart(data, e) {
  meta2d.canvas.addCaches = deepClone([data]);
}
const getCurrentSelect = async (data) => {
  currentSelect.value = data.id;
  console.log(data, "currentSelect.value");
  await openFile(currentSelect.value);
};
async function changeState(tab) {
  console.log(tab);
  if (tab.folder) {
    if (!tab.loaded) {
      const { data: files } = await axios.get(
        (tab.svg ? "/svg/" : "/png/") + tab.name + "/"
      );
      tab.loaded = true;
      if (tab.svg) {
        const fs = await Promise.all(files.map((f) => svgToPens(f, tab.name)));
        tab.list = fs;
      } else {
        const fs = await Promise.all(files.map((f) => pngToPens(f, tab.name)));
        tab.list = fs;
      }
    }
  }
}
let searchList = reactive([]);
function doSearch(value) {
  value = value.trim(); // 清除空格
  searchList = []; // 重置表格
  if (value) {
    // 输入有值
    // 遍历搜索
    showList.value.forEach((item) => {
      searchList.push(...item.list.filter((i) => i.name.includes(value)));
    });
  } else {
    searchList = []; //设置为空
  }
}

// ========== 自定义图元相关 =============
const customList = ref([])
const customLoading = ref(false)
const customEditDialog = ref(false)
const customRenameDialog = ref(false)
const customEditData = ref({})
const customRenameData = ref({})
const customNewName = ref("")
const editingIcon = ref(null);

// 加载自定义图元
const loadCustomIcons = async () => {
  customLoading.value = true
  try {
    const res = await axios.get("/api/customIcons/list", { withCredentials: true })
    if (res.data.success) {
      customList.value = res.data.list
    }
  } finally {
    customLoading.value = false
  }
}

// 保存自定义图元（新增）
const saveCustomIcon = async (data) => {
  const res = await axios.post("/api/customIcons/save", { data }, { withCredentials: true })
  if (res.data.success) {
    // 保存成功后延迟100ms再请求list，增强稳健性
    setTimeout(() => {
      loadCustomIcons()
    }, 500)
  }
}

// 删除自定义图元
const deleteCustomIcon = async (id) => {
  await axios.post("/api/customIcons/delete", { id }, { withCredentials: true })
  setTimeout(() => {
      loadCustomIcons()
    }, 500)
}

// 重命名自定义图元
const renameCustomIcon = async (id, newName) => {
  await axios.post("/api/customIcons/rename", { id, newName }, { withCredentials: true })
  setTimeout(() => {
      loadCustomIcons()
    }, 500)
}

// 编辑自定义图元数据
const editCustomIcon = async (data) => {
  await axios.post("/api/customIcons/edit", { data }, { withCredentials: true })
  setTimeout(() => {
      loadCustomIcons()
    }, 500)
}

// base64图片缩放为指定尺寸
function resizeBase64Img(base64, width = 50, height = 50) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = base64;
  });
}

// 保存当前画布为新图元
const saveCurrentComponentAsIcon = async () => {
  const selected = window.meta2d?.store?.active;
  if (!selected || selected.length === 0) {
    window.ElMessage?.warning('请先在画布选择一个组件');
    return;
  }
  const allPen= meta2d.canvas.getAllByPens(selected)
  const pens = window.meta2d.toComponent(allPen);
  const rawImage = window.meta2d.activeToPng();
  const resizedImage = await resizeBase64Img(rawImage, 50, 50);
  const data = {
    tag: "comstom",
    name: Date.now().toString(),
    id: Date.now().toString(),
    data: pens,
    rawImage: resizedImage
  };
  await saveCustomIcon(data);
  window.ElMessage?.success('保存成功');
};

// 编辑状态下保存图元（覆盖）
const saveEditedIcon = async () => {
  if (!editingIcon.value) return;
  const rawItem = toRaw(editingIcon.value);
  const pens = meta2d.store.data.pens;
  const rawImage = window.meta2d.toPng();
  const resizedImage = await resizeBase64Img(rawImage, 50, 50);
  const data = {
    id: rawItem.id,
    name: rawItem.name,
    data: deepClone(pens),
    rawImage: resizedImage
  };
  await editCustomIcon(data);
  window.ElMessage?.success('图元已更新');
  editingIcon.value = null;
};

// 打开重命名弹窗
const openRenameDialog = (item) => {
  customRenameData.value = item
  customNewName.value = item.name
  customRenameDialog.value = true
}
const handleRename = async () => {
  await renameCustomIcon(customRenameData.value.id, customNewName.value)
  customRenameDialog.value = false
}

// 打开编辑弹窗（这里只做示例，实际可扩展为表单编辑data）
const openEditDialog = (item) => {
  editingIcon.value = item;
  meta2d.open({ pens: item.data }, false);
  meta2d.fitView();
  meta2d.render(true);
};

onMounted(() => {
  loadCustomIcons()
})

// 监听icon_item悬停，动态加_hover属性
const setHover = (item, val) => { item._hover = val }
</script>

<template>
  <el-tabs v-model="activeName" class="icons" @tab-click="handleClick">
    <el-tab-pane label="工程列表" name="filelist">
      <projecMange @node-click="getCurrentSelect" />
    </el-tab-pane>

    <el-tab-pane label="图元列表" class="tablist" name="iconlist">
      <div class="icons">
        <div class="icon_search">
          <el-input v-model="inputValue" size="small" placeholder="搜索图元" :prefix-icon="Search" @input="doSearch"
            class="search_input" clearable />

          <div class="icon_search_container">
            <div class="icon_item" v-for="(item, index) in searchList" draggable="true"
              @dragstart="dragPen(item.data, $event)" :index="index" :title="item.name">
              <i v-if="item.type == 'icon'" class="l-icon" :class="item.icon"></i>
              <svg v-else-if="item.icon" class="l-icon" aria-hidden="true">
                <use :xlink:href="'#' + item.icon"></use>
              </svg>
              <img v-else-if="item.image" :src="item.image" />
              <div v-else-if="item.svg" v-html="item.svg"></div>
            </div>
          </div>
        </div>
        <div class="icon_list">
          <el-collapse>
            <el-collapse-item title="自定义图元" name="custom">
              <div class="icon_container">
                <div class="custom-icon-item" v-for="(item, index) in customList" :key="item.id"
                  :class="{ editing: editingIcon && editingIcon.id === item.id }"
                  draggable="true"
                  @dragstart="dragPen(item.data, $event)" @click.stop="onTouchstart(item.data, $data)" :index="index"
                  :title="item.name"
                  @mouseenter="setHover(item, true)" @mouseleave="setHover(item, false)">
                  <img :src="item.rawImage" style="width:120px;height:120px;object-fit:contain;display:block;margin:0 auto;" />
                  <div style="font-size:12px;max-width:120px;overflow:hidden;text-overflow:ellipsis;text-align:center;margin:4px auto 0 auto;">{{ item.name || (item.data && item.data.name) }}</div>
                  <div class="custom-icon-actions" v-show="item._hover">
                    <button class="icon-btn" @click.stop="openRenameDialog(item)" title="重命名">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#409EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                    <button class="icon-btn" @click.stop="deleteCustomIcon(item.id)" title="删除">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F56C6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                    <button class="icon-btn" @click.stop="openEditDialog(item)" title="编辑数据">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#909399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div style="margin-top:10px;text-align:center;">
                <el-button v-if="!editingIcon"
                           type="success"
                           @click="saveCurrentComponentAsIcon">
                  保存当前图元
                </el-button>
                <el-button v-else
                           type="primary"
                           @click="saveEditedIcon">
                  保存图元
                </el-button>
              </div>
            </el-collapse-item>
            <template v-for="icons in showList">
              <el-collapse-item :title="icons.name" @click="changeState(icons)">
                <div class="icon_container">
                  <div class="icon_item" v-for="(item, index) in icons.list" draggable="true"
                    @dragstart="dragPen(item.data, $event)" @click.stop="onTouchstart(item.data, $data)" :index="index"
                    :title="item.name">
                    <!--              这里做了修改-->
                    <i v-if="item.type == 'icon'" class="l-icon" :class="item.icon"></i>
                    <svg v-else-if="item.icon" class="l-icon" aria-hidden="true">
                      <use :xlink:href="'#' + item.icon"></use>
                    </svg>
                    <img v-else-if="item.image" :src="item.image" />
                    <div v-else-if="item.svg" v-html="item.svg"></div>
                  </div>
                </div>
              </el-collapse-item>
            </template>
          </el-collapse>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

  <!-- 重命名弹窗 -->
  <el-dialog v-model="customRenameDialog" title="重命名图元" width="300px">
    <el-input v-model="customNewName" placeholder="请输入新名称" />
    <template #footer>
      <el-button @click="customRenameDialog = false">取消</el-button>
      <el-button type="primary" @click="handleRename">确定</el-button>
    </template>
  </el-dialog>
 
</template>

<style scoped>
.icons {
  width: 300px;

  height: 100%;
  padding: 3px;
}

.icon-size {
  font-size: 25px !important;
  width: 25px;
}

img {
  max-width: 25px;
  max-height: 25px;
  margin: 4px;
}

.icon_search {
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon_list {
  padding: 5px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  max-height: 600px;
  /* 可根据实际UI调整 */
  min-height: 200px;
}

.icon_manage {
  border-top: 1px solid #eee;
  display: flex;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
}

.icon_container {
  display: flex;
  justify-content: flex-start;
  overflow: auto;
  flex-wrap: wrap;
  align-content: center;
}

.icon_search_container {
  padding: 0 10px;
  max-height: 200px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}

.icon_item {
  padding: 5px;

  width: 35px;
  height: 35px;
}

.tablist {
  display: flex;
  flex-wrap: wrap;
}

.icon_search_container::-webkit-scrollbar,
.icon_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.icon_search_container::-webkit-scrollbar-thumb,
.icon_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}

.icon_search_container::-webkit-scrollbar-track,
.icon_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}

.search_input {
  padding: 10px 10px;
}

.icon_search_container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.icon_search_container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}

.icon_search_container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}

.icon_manage_container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  overflow: auto;
}

.icon_manage_item {
  display: flex;
  justify-content: space-between;
}

.custom-icon-item {
  padding: 5px;
  width: 90px;
  height: 100px;
  margin: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fafbfc;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}
.custom-icon-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.custom-icon-actions {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 2;
  pointer-events: auto;
  background: rgba(255,255,255,0.95);
  border-radius: 0 0 8px 8px;
  padding: 2px 0;
  visibility: hidden;
}
.custom-icon-item:hover .custom-icon-actions {
  visibility: visible;
}
.custom-icon-item img {
  width: 80px !important;
  height: 60px !important;
  max-width: 80px !important;
  max-height: 60px !important;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.icon-btn {
  background: none;
  border: none;
  padding: 2px 4px;
  margin: 0 2px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  background: #f0f0f0;
}
.custom-icon-item.editing {
  border: 2px solid #409EFF;
  box-shadow: 0 0 8px #409EFF33;
  background: #e6f7ff;
}
</style>
