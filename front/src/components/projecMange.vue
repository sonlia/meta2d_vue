<template>
  <div class="tree-container relative">
    <el-tree ref="treeRef"  default-expanded-keys="./projectData" @node-click="nodeClick" :data="treeData" node-key="id" :load="loadNode" lazy :props="defaultProps" @node-contextmenu="rightClick" :key="updateKey"> </el-tree>

    <!-- 右键菜单 -->
    <div v-if="showMenu" :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }" class="context-menu" @mouseleave="showMenu = false">
      <el-button @click="add('file')" style="width: 100%">添加文件夹</el-button>
      <el-button @click="add('folder')" style="width: 100%">添加项目</el-button>
      <el-button v-if="contentshow" @click="handleRemove" style="width: 100%">删除</el-button>
      <el-button v-if="contentshow" @click="handleRename" style="width: 100%">重命名</el-button>
    </div>

    <!-- 重命名对话框 -->
    <el-dialog v-model="renameInputVisible" title="重命名节点" width="30%" :modal="true" :append-to-body="true">
      <el-input v-model="newName" ref="renameInputRef" placeholder="请输入新名称" @keyup.enter="finishRename(true)"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="finishRename(false)">取消</el-button>
          <el-button type="primary" @click="finishRename(true)">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue"
import axios from "axios"
import { ElMessageBox } from "element-plus"

const updateKey = ref(1)
// refs
const treeRef = ref(null)
const renameInputRef = ref(null)

// 响应式状态
const treeData = ref([])
const showMenu = ref(false)
const menuLeft = ref(0)
const menuTop = ref(0)
const currentNode = ref(null)
const renameInputVisible = ref(false)
const newName = ref("")
const contentshow = computed(() => {
  return currentNode.value.node.level != 1
})

const emit  = defineEmits(["node-click"])
// 树的配置
const defaultProps = {
  children: "children",
  label: "label",
  isLeaf: (data) => {
    // 检查节点是否有 children 属性，如果没有则认为是叶子节点
    return !data.children || data.children.length === 0
  },
}

// 方法
const closeContextMenu = () => {
  showMenu.value = false
}
const  nodeClick=(data,node,zNode,event)=>{
if(node.data.hasOwnProperty("children")) return
emit('node-click', data);
}
const loadNode = async (node, resolve) => {
  try {
    if (node.level === 0) {
      const response = await axios.get("/api/loadRoot")

      resolve(response.data)
    } else {
      const response = await axios.post("/api/loadChildren", { id: node.data.id })
      resolve(response.data)
    }
  } catch (error) {
    console.error("Error loading nodes:", error)
    resolve([])
  }
}

const rightClick = (event, data, node) => {
  event.preventDefault()
  event.stopPropagation()
if(node.hasOwnProperty("children ")){
  node.loaded = false; // 强制重新加载子节点
  node.expand(); // 手动展开父节点以触发懒加载
}
  showMenu.value = true
  currentNode.value = { data, node }
  console.log(contentshow.value, "ffff", currentNode.value.node)
  // 计算菜单位置
  const menuWidth = 120
  const menuHeight = 120
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  menuLeft.value = Math.min(event.clientX, windowWidth - menuWidth)
  menuTop.value = Math.min(event.clientY, windowHeight - menuHeight)
}
const add = async (type) => {
  let node = {};
  showMenu.value = false; // 隐藏右键菜单

  try {
    if (type === "file") {
      node = {
        parentId: currentNode.value.data.id,
        name: "New Node.json",
      };

      const response = await axios.post("/api/addFile", node);

      if (response.data.success) {
        const newNode = {
          label: response.data.name || "New Node.json",
          id: `${currentNode.value.data.id}/${response.data.name || "New Node.json"}`,
        };

        if (treeRef.value) {
          // 深拷贝父节点的 children，并添加新节点
          const updatedChildren = [...currentNode.value.data.children, newNode];
          currentNode.value.data.children = updatedChildren;

          // 更新树形数据
          treeRef.value.updateKeyChildren(currentNode.value.data.id, currentNode.value.data);
          updateKey.value++
        }
      } else {
        alert(response.data.message || "Failed to add file.");
      }
    } else if (type === "folder") {
      node = {
        parentId: currentNode.value.data.id,
        name: "New Folder",
      };

      const response = await axios.post("/api/addFolder", node);

      if (response.data.success) {
        const newNode = {
          label: response.data.name || "New Folder",
          id: `${currentNode.value.data.id}/${response.data.name || "New Folder"}`,
          children: [],
        };

        if (treeRef.value) {
          // 深拷贝父节点的 children，并添加新文件夹节点
          const updatedChildren = [...currentNode.value.data.children, newNode];
          currentNode.value.data.children = updatedChildren;

          // 更新树形数据
          treeRef.value.updateKeyChildren(currentNode.value.data.id, currentNode.value.data);
          updateKey.value++
        }
      } else {
        alert(response.data.message || "Failed to add folder.");
      }
    }
  } catch (error) {
    console.error("Error during adding node:", error);
    alert("An error occurred while adding the node.");
  }
};
const handleRemove = async () => {
  showMenu.value = false
  try {
    await ElMessageBox.confirm(`确定要删除节点 "${currentNode.value.data.label}" 吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })

    const response = await axios.post("/api/delete", {
      id: currentNode.value.data.id,
    })

    if (response.data.success) {
      if (treeRef.value) {
        await treeRef.value.remove(currentNode.value.data.id)
      }
    }
  } catch (error) {
    if (error !== "cancel") {
      console.error("Error during deleting node:", error)
    }
  }
}

const handleRename = () => {
  showMenu.value = false
  newName.value = currentNode.value.data.label
  renameInputVisible.value = true
  currentNode.value.editing = true
  nextTick(() => {
    renameInputRef.value?.input?.focus()
  })
}

const finishRename = async (isConfirmed) => {
  if (isConfirmed && newName.value.trim()) {
    console.log(currentNode.value, "fefefe")
    try {
      const response = await axios.post("/api/rename", {
        id: currentNode.value.data.id,
        newName: newName.value,
      })

      if (response.data.success) {
        if (treeRef.value) {
          currentNode.value.data.label = newName.value
          const nid = currentNode.value.data.id.split("/")
          nid.splice(-1, 1, newName.value)

          currentNode.value.data.id = nid.join("/")
          await treeRef.value.updateKeyChildren(currentNode.value.data.id, currentNode.value)
        }
      }
    } catch (error) {
      console.error("Error during renaming node:", error)
    }
  }
  renameInputVisible.value = false
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener("click", closeContextMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", closeContextMenu)
})

 
</script>

<style scoped>
.tree-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.context-menu {
  position: fixed;
  background-color: white;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 4px;
  z-index: 9999;
}

.context-menu button {
  margin: 2px 0;
  text-align: left;
  padding: 8px 16px;
}

.context-menu button:hover {
  background-color: #f5f7fa;
}
</style>
