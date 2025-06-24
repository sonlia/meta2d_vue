import axios from "axios"
import { parseSvg } from "@meta2d/svg"
import { ElMessage } from "element-plus"
import { EventAction, PenType } from "@meta2d/core"
import { useEventbus } from "../hooks/useEventbus.js"
import Uploader from 'simple-uploader.js';
 


import { ref } from "vue"
  

// 统一API获取目录内容，type为icon/svg/png/path2D/canvasDraw
function getUserDirApi(type, extend = []) {
  return async () => {
    const { data } = await axios.get(`/api/packages?type=${type}`)
    let fileList = Array.isArray(data) ? data : (data?.data || [])
    return fileList.concat(extend)
  }
}

export async function openFile(filePath) {
  try {
    const blob = await downloadFileFromServer(filePath);
    const text = await blob.text();
  
    let data=""
    if (text) {
 
      const resdata = JSON.parse(text);
      data = resdata.projectData
     }
 
    meta2d.open(data);
    meta2d.store.data.locked = 2;
    lockStatus.value = 2;
 
  } catch (e) {
    alert(e.message || '打开错误.');
  }
}
globalThis.openFile = openFile

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const year = date.getFullYear() // 年
  const month = String(date.getMonth() + 1).padStart(2, "0") // 月，补零
  const day = String(date.getDate()).padStart(2, "0") // 日，补零

  const hours = String(date.getHours()).padStart(2, "0") // 小时，24小时制，补零
  const minutes = String(date.getMinutes()).padStart(2, "0") // 分钟，补零
  const seconds = String(date.getSeconds()).padStart(2, "0") // 秒，补零

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
 

export const lockStatus = ref();
export  const updateData = ref(0)
 

export const currentSelect = ref()
export const userPensUrl = {
  icon: getUserDirApi('icon'),
  svg: getUserDirApi('svg'),
  png: getUserDirApi('png'),
  path2D: getUserDirApi('path2D'),
  canvasDraw: getUserDirApi('canvasDraw'),
}

export const menu = {
  left: [
    {
      key: "file",
      name: "文件",
      icon: "",
      children: [
  
        {
          name: "打开文件",
          action: "openFile",
        },
        {
          name: "导入文件",
          action: "loadFile",
        },
        {
          name: "下载到本地Json",

          action: "saveFile",
        },
        {
          name: "导出png",
          action: "saveAs",
          value: "png",
        },
        {
          name: "导出svg",
          action: "saveAs",
          value: "svg",
        },
    
      ],
    },

    
    {
      key: "pen",
      name: "钢笔",
      icon: "",
      action: "usePen",
    },
    {
      key: "pencil",
      name: "铅笔",
      icon: "",
      action: "usePencil",
    },
    {
      name: "保存",

      action: "saveToserver",
    },
    {
      name: "恢复到上一次",
      action: "lastVersion",
    },
  ],
  right: [
    {
      key: "centerView",
      name: "居中显示",
      icon: "t-angle-left",
      action: "centerView",
    },
 
    {
      key: "undo",
      name: "撤销",
      icon: "t-angle-left",
      action: "undo",
    },
    {
      key: "redo",
      name: "重做",
      icon: "t-angle-right",
      action: "redo",
    },
    {
      key: "start",
      name: "起点",
      icon: "t-line",
      children: [
        {
          name: "line",
          icon: "t-line",
          action: "start",
          value: "",
        },
        {
          name: "triangle",
          icon: "t-to-triangle",
          action: "start",
          value: "triangle",
        },
        {
          name: "diamond",
          icon: "t-to-diamond",
          action: "start",
          value: "diamond",
        },
        {
          name: "circle",
          icon: "t-to-circle",
          action: "start",
          value: "circle",
        },
        {
          name: "lineDown",
          icon: "t-to-lineDown",
          action: "start",
          value: "lineDown",
        },
        {
          name: "lineUp",
          icon: "t-to-lineUp",
          action: "start",
          value: "lineUp",
        },
        {
          name: "triangleSolid",
          icon: "t-to-triangleSolid",
          action: "start",
          value: "triangleSolid",
        },
        {
          name: "diamondSolid",
          icon: "t-to-diamondSolid",
          action: "start",
          value: "diamondSolid",
        },
        {
          name: "circleSolid",
          icon: "t-to-circleSolid",
          action: "start",
          value: "circleSolid",
        },
        {
          name: "lineArrow",
          icon: "t-to-line",
          action: "start",
          value: "line",
        },
      ],
    },
    {
      key: "end",
      name: "终点",
      icon: "t-line",
      children: [
        {
          name: "line",
          icon: "t-line",
          action: "end",
          value: "",
        },
        {
          name: "triangle",
          icon: "t-to-triangle",
          action: "end",
          value: "triangle",
        },
        {
          name: "diamond",
          icon: "t-to-diamond",
          action: "end",
          value: "diamond",
        },
        {
          name: "circle",
          icon: "t-to-circle",
          action: "end",
          value: "circle",
        },
        {
          name: "lineDown",
          icon: "t-to-lineDown",
          action: "end",
          value: "lineDown",
        },
        {
          name: "lineUp",
          icon: "t-to-lineUp",
          action: "end",
          value: "lineUp",
        },
        {
          name: "triangleSolid",
          icon: "t-to-triangleSolid",
          action: "end",
          value: "triangleSolid",
        },
        {
          name: "diamondSolid",
          icon: "t-to-diamondSolid",
          action: "end",
          value: "diamondSolid",
        },
        {
          name: "circleSolid",
          icon: "t-to-circleSolid",
          action: "end",
          value: "circleSolid",
        },
        {
          name: "lineArrow",
          icon: "t-to-line",
          action: "end",
          value: "line",
        },
      ],
    },
    {
      key: "line",
      name: "连线",
      icon: "t-line",
      children: [
        {
          name: "直线",
          icon: "t-line",
          action: "line",
          value: "line",
        },
        {
          name: "曲线",
          icon: "t-curve2",
          action: "line",
          value: "curve",
        },
        {
          name: "线段",
          icon: "t-polyline",
          action: "line",
          value: "polyline",
        },
        {
          name: "脑图",
          icon: "t-mind",
          action: "line",
          value: "mind",
        },
      ],
    },
    
    {
      key: "setting",
      name: "设置",
      icon: "",
      children: [
        {
          key: "magnifier",
          name: "放大镜",
          icon: "",
          action: "openMagnifier",
        },
        {
          key: "map",
          name: "缩略图",
          icon: "",
          action: "openMap",
        },
        {
          key: "manual",
          name: "手动锚点",
          icon: "",
          action: "manual",
        },
        {
          key: "grid",
          name: "网格",
          icon: "",
          action: "grid",
        },
        {
          key: "rule",
          name: "标尺",
          icon: "",
          action: "rule",
        },
      ],
    },
  ],
}

// 分发执行事件函数
export function dispatchFunc(act, value, ...args) {
  // doSomething before
  menuFunc[act](value, ...args)
}

const menuFunc = {
  newFile() {
    window.meta2d.open()
  },
  async openFile() {
    const file = await window.showOpenFilePicker().catch(() => {
      console.log("打开文件失败")
      return false
    })
    if (file) {
      const dataObj = await file[0].getFile()
      const data = await dataObj.text()
      if (data) {
        const json = JSON.parse(data)
        window.meta2d.open(json)
        useEventbus().customEmit("opened")
      }
    }
  },
  async loadFile() {
    // 该方法有兼容性问题
    const file = await window.showOpenFilePicker().catch(() => {
      ElMessage({ message: "打开文件失败", type: "error" })
      return false
    })
    if (file) {
      //判断文件类型
      const dataObj = await file[0].getFile()
      const data = await dataObj.text()
      if (dataObj.type === "image/svg+xml") {
        const pen = parseSvg(data)
        meta2d.canvas.addCaches = pen
        ElMessage({ message: "添加成功，请点击放置点", type: "success" })
        return
      }
      ElMessage({ message: "添加失败，暂且只支持svg文件", type: "error" })
    }
  },

 async  lastVersion (){
  const parts = currentSelect.value.split('/'); // 将路径按 '/' 分割成数组

  // 获取最后一个元素（文件名）
  const fileName = parts.pop(); // 移除并获取文件名，例如 "New Node.json"

  // 在文件名前添加 "bak-" 前缀
  const newFileName = `bak-${fileName}`; // 新文件名，例如 "bak-New Node.json"

  // 将新的文件名添加到 parts 数组的末尾
  parts.push(newFileName); // 添加新文件名到数组中

  // 拼接成新的完整路径
  const newFilePath = parts.join('/'); // 重新组合成路径，例如 "projectData/bak-New Node.json"
 
  await  openFile(newFilePath)
 },
  async saveToserver() {
    return new Promise(async (resolve, reject) => {
      try {
        const json = meta2d.data();
        const path = currentSelect.value;

        if (!path) {
          return reject('未选择任何文件，无法保存');
        }

        const content = typeof json === 'string' ? json : JSON.stringify(json, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const file = new File([blob], path.split('/').pop(), { type: 'application/json' });
        
        updateData.value++
 
        const res = await uploadFileToServer(file, path);
        ElMessage({ message: "保存成功", type: "success" })
        resolve(res);
      } catch (err) {
        reject(err.message || '保存失败');
      }
    });
  },
    saveFile() {
      const jsonData = window.meta2d.data() // 获取数据 数据怎么来？怎么处理？
      const json = JSON.stringify(jsonData)
      const file = new Blob([json], { type: "application/json" })
      const link = URL.createObjectURL(file)
      let a = document.createElement("a")
      a.setAttribute("download", meta2d.fileName || "未命名")
      a.setAttribute("href", link)
      a.click()
    },
    openMagnifier() {
      if (window.meta2d.canvas.magnifierCanvas.magnifier) {
      
        window.meta2d.hideMagnifier() // 关闭放大镜
      } else {
        window.meta2d.showMagnifier() // 打开放大镜
      }
    },
    openMap() {
      if (window.meta2d.map?.isShow) {
        window.meta2d.hideMap()
      } else {
        window.meta2d.showMap()
      }
    },

    // TODO 使用前 判断是否已被占用
    usePen() {
      if (window.meta2d.canvas.drawingLineName) {
        window.meta2d.drawLine()
        window.meta2d.finishPencil()
      } else {
        window.meta2d.drawLine("line")
      }
    },
    usePencil() {
      if (window.meta2d.canvas.pencil) {
        window.meta2d.stopPencil()
        window.meta2d.finishPencil()
      } else {
        window.meta2d.drawingPencil()
      }
    },
    undo() {
      meta2d.undo()
    },
    centerView() {
      meta2d.centerView()
    },
 
    redo() {
      meta2d.redo()
    },
    start(value, icon) {
      const a = menu.right.find((i) => i.key === "start") // 获取按钮元数据
      a.icon = icon // 修改元数据的图标
      meta2d.store.data.fromArrow = value // 修改meta2d的fromArrow样式值
      if (meta2d.store.active) {
        // 循环遍历 修改激活图元fromArrow// 样式
        meta2d.store.active.forEach((i) => {
          if (i.type === PenType.Line) {
            i.fromArrow = value
          }
        })
      }
      meta2d.render() //重新渲染
    },
    end(value, icon) {
      const a = menu.right.find((i) => i.key === "end")
      a.icon = icon
      meta2d.store.data.toArrow = value
      if (meta2d.store.active) {
        meta2d.store.active.forEach((i) => {
          if (i.type === PenType.Line) {
            i.toArrow = value
          }
        })
      }
      meta2d.render()
    },
    line(value, icon) {
      const a = menu.right.find((i) => i.key === "line")
      a.icon = icon
      meta2d.store.options.drawingLineName = value
      meta2d.canvas.drawingLineName && (meta2d.canvas.drawingLineName = value)
      meta2d.store.active?.forEach((pen) => {
        meta2d.updateLineType(pen, value)
      })
      meta2d.render()
    },
    grid() {
      if (meta2d.store.data.grid) {
        meta2d.setGrid({
          grid: false,
        })
      } else {
        meta2d.setGrid({
          grid: true,
          gridColor: "#e2e2e2",
          gridSize: 10,
          gridRotate: 0,
        })
      }
      meta2d.render()
    },
    rule() {
      if (meta2d.store.data.rule) {
        meta2d.setRule({
          rule: false,
        })
      } else {
        meta2d.setRule({
          rule: true,
          ruleColor: "#414141",
        })
      }
      meta2d.render()
    },
    manual() {
      meta2d.toggleAnchorMode()
    },
    saveAs(value) {
      // 选择导出格式
      switch (value) {
        case "png":
          let name = meta2d.store.data.name
          if (name) {
            name += ".png"
          }
          meta2d.downloadPng(name) // 导出为png
          break
        case "svg":
        downloadSvgWithFonts() // 导出为svg
          break
        case "pdf":
          downloadAsPdf()
          break
      }
    },
  }

function isShowChild(pen, store) {
    let selfPen = pen
  while (selfPen && selfPen.parentId) {
  const oldPen = selfPen
  selfPen = store.pens[selfPen.parentId]
  const showChildIndex = selfPen?.calculative?.showChild
  if (showChildIndex != undefined) {
    const showChildId = selfPen.children[showChildIndex]
    if (showChildId !== oldPen.id) {
      return false
    }
  }
}
return true
}

// 获取单个 iconfont.css 内容中的 @font-face 片段
async function fetchFontFace(cssPath) {
  const res = await axios.get( cssPath);
  const match = res.data.match(/@font-face([\s\S]*?)\}/);
  return match ? `@font-face ${match[1]}}` : '';
}

// 收集当前画布用到的 icon 字体
async function collectUsedFontFaces() {
  const hasIcon = meta2d.store.data.pens.some(p => p.iconFamily && p.icon);
  if (!hasIcon) return [];

  const cssList = [
    '/icon/国家电网/iconfont.css',
    '/icon/电气工程/iconfont.css',
    '/icon/通用图标/iconfont.css'
  ];
  return Promise.all(cssList.map(fetchFontFace));
}

// 内部函数，只负责生成完整的SVG字符串
async function _generateSvgString() {
  if (!window.C2S) {
    throw new Error("请先加载乐吾乐官网下的canvas2svg.js");
  }

  const fontFaces = await collectUsedFontFaces();

  let isFullViewExport = false;
  const canvasWidth = meta2d.store.data.width || meta2d.store.options.width;
  const canvasHeight = meta2d.store.data.height || meta2d.store.options.height;
  if (canvasWidth && canvasHeight && !meta2d.store.data.component) {
    isFullViewExport = true;
  }

  const contentRect = meta2d.getRect();
  if (isFullViewExport) {
    contentRect.x = meta2d.store.data.origin.x;
    contentRect.y = meta2d.store.data.origin.y;
    contentRect.width = canvasWidth * meta2d.store.data.scale;
    contentRect.height = canvasHeight * meta2d.store.data.scale;
  }

  contentRect.x -= 10;
  contentRect.y -= 10;
  const svgWidth = contentRect.width + 20;
  const svgHeight = contentRect.height + 20;

  const ctx = new window.C2S(svgWidth, svgHeight);
  ctx.textBaseline = "middle";
  ctx.strokeStyle = meta2d.store.styles.color;

  const backgroundColor = meta2d.store.options.downloadBgTransparent
    ? undefined
    : meta2d.store.data.background || meta2d.store.styles.background;

  if (backgroundColor) {
    ctx.save();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, svgWidth, svgHeight);
    ctx.restore();
  }
  if (meta2d.store.bkImg && isFullViewExport) {
    ctx.drawImage(meta2d.store.bkImg, 0, 0, contentRect.width, contentRect.height);
  }

  for (const pen of meta2d.store.data.pens) {
    if (pen.visible !== false && isShowChild(pen, meta2d.store)) {
      meta2d.renderPenRaw(ctx, pen, contentRect);
    }
  }

  let svgString = ctx.getSerializedSvg();

  if (fontFaces && fontFaces.length) {
    const fontDefs = `<defs>
      <style type="text/css">
        ${fontFaces.join('\n')}
      </style>
      {{bk}}
    </defs>
    {{bkRect}}`;
    svgString = svgString.replace("<defs/>", fontDefs);
  }

  if (backgroundColor) {
    svgString = svgString.replace("{{bk}}", "");
    svgString = svgString.replace("{{bkRect}}", `<rect x="0" y="0" width="100%" height="100%" fill="${backgroundColor}"></rect>`);
  } else {
    svgString = svgString.replace("{{bk}}", "");
    svgString = svgString.replace("{{bkRect}}", "");
  }

  svgString = svgString.replace(/--le5le--/g, "&#x");

  return svgString;
}

 

export async function downloadSvgWithFonts() {
  const svgString = await _generateSvgString();
  if (!svgString) {
    console.error("生成SVG内容失败，无法下载。");
    return;
  }

  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const blobUrl = window.URL.createObjectURL(blob);

  const linkElement = document.createElement("a");
  linkElement.setAttribute("download", `${meta2d.store.data.name || "le5le.meta2d"}.svg`);
  linkElement.setAttribute("href", blobUrl);

  const clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent("click", true, true);
  linkElement.dispatchEvent(clickEvent);
  URL.revokeObjectURL(blobUrl);
}

export const mapProps = {
  fileName: "",
  color: "#eeeeee",
  penBackground: "",
  background: "",
  backGroundImage: "",
  rule: false,
  ruleColor: "",
  grid: false,
  gridColor: "",
  gridSize: 10,
  gridRotate: 90,
}

export const communicateProp = {
  websocketUrl: "",
  websocketConnected: false,
  mqttUrl: "ws://broker.emqx.io:8083/mqtt",
  mqttConnected: false,
  clientId: "",
  username: "",
  password: "",
  mqttTopics: "le5le",
}

export const globalConfigProps = {
  color: "",
  activeColor: "",
  hoverColor: "",
  hoverBackground: "",
  anchorColor: "",
  anchorRadius: "",
  anchorBackground: "",
  dockColor: "",
  dragColor: "",
  animateColor: "",
  textColor: "",
  fontFamily: "",
  fontSize: "",
  lineHeight: "",
  textAlign: "",
  textBaseline: "",
  rotateCursor: "",
  hoverCursor: "",
  disableInput: false,
  disableRotate: false,
  disableAnchor: false,
  disableEmptyLine: false,
  disableRepeatLine: false,
  disableScale: false,
  disableDockLine: false,
  disableTranslate: false,
  minScale: 0.1,
  maxScale: 10,
  autoAnchor: true,
  interval: 10,
  animateInterval: 10,
  textRotate: true,
  textFlip: false,


}

export const appearanceProps = {
  x: 0,
  y: 0,
  text: "",
  textLeft:0,
  textTop:0,
   PointNumber:"",
  color: "",
  width: 0,
  height: 0,
  lineWidth: 0,
  hoverColor: "",
  activeColor: "",
  background: "",
  hoverBackground: "",
  activeBackground: "",
  shadowColor: "",
  shadowBlur: 0,
  textHasShadow: false,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  anchorColor: "",
  anchorRadius: 0,
  borderRadius: 0,
  globalAlpha: 0,
  ratio: false,
  rotate: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
  paddingLeft: 0,
  progress: 0,
  progressColor: "",
  verticalProgress: false,
  flipX: false,
  flipY: false,
  dash: 0,
  fontFamily: "",
  fontSize: "",
  textColor: "",
  hoverTextColor: "",
  activeTextColor: "",
  textBackground: "",
  textAlign: "",
  textBaseline: "",
  lineHeight: 0,
  whiteSpace: "",
  textWidth: 0,
  textHeight: "",
  ellipsis: "",
  hiddenText: false,
  disableAnchor: false,
  disableInput: false,
  disableRotate: false,
  disableSize: false,
  image: "",
}

// 事件类型
export const eventType = [
  {
    name: "鼠标移入",
    event: "enter",
  },
  {
    name: "鼠标移出",
    event: "leave",
  },
  {
    name: "选中",
    event: "active",
  },
  {
    name: "取消选中",
    event: "inactive",
  },
  {
    name: "单击",
    event: "click",
  },
  {
    name: "双击",
    event: "dblclick",
  },
]

// 事件行为
export const eventBehavior = [
  {
    name: "打开链接",
    behavior: EventAction.Link,
    depend: [
      {
        name: "链接地址",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "URL",
        },
        bindData: "",
      },
      {
        name: "打开方式",
        type: "select",
        bindProp: "params",
        option: {
          list: [
            {
              name: "新窗口打开",
              value: "_blank",
            },
            {
              name: "覆盖当前页面",
              value: "self",
            },
          ],
        },
        bindData: "",
      },
    ],
  },
  {
    name: "执行动画",
    behavior: EventAction.StartAnimate,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "暂停动画",
    behavior: EventAction.PauseAnimate,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "停止动画",
    behavior: EventAction.StopAnimate,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "播放视频",
    behavior: EventAction.StartVideo,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "暂停视频",
    behavior: EventAction.PauseVideo,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "停止视频",
    behavior: EventAction.StopVideo,
    depend: [
      {
        name: "目标id/tag",
        type: "input",
        bindProp: "value",
        option: {
          placeholder: "id/tag",
        },
        bindData: "",
      },
    ],
  },
  {
    name: "执行js",
    behavior: EventAction.JS,
    depend: [
      {
        name: "js",
        type: "editor",
        bindProp: "value",
 
        bindData: "",
      },
    ],
  },
  {
    name: "执行全局js",
    behavior: EventAction.GlobalFn,
    depend: [
      {
        name: "全局js函数",
        type: "input",
        bindProp: "value",
 
        bindData: "",
      },
    ],
  },
]

export const animateType = [
  {
    name: "跳动",
    key: "bounce",
    frames: [
      {
        duration: 300,
        y: 10,
      },
    ],
  },
  {
    name: "旋转",
    key: "rotate",
    frames: [
      {
        duration: 1000,
        rotate: 360,
      },
    ],
  },
  {
    name: "提示",
    key: "tip",
    frames: [
      {
        duration: 300,
        scale: 1.3,
      },
    ],
  },
]

/**
 * 使用 simple-uploader.js 分片上传
 * @param {File|Blob} file - 要上传的文件
 * @param {string} relativePath - 目标路径（如 projectData/xxx/xxx.json）
 * @returns {Promise<string>} - 上传成功后返回后端保存的路径
 */
export function uploadFileToServer(file, relativePath) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2 * 1024 * 1024; // 2MB

    const uploader = new Uploader({
      target: '/api/uploadFileChunk',
      chunkSize,
      simultaneousUploads: 3,
      testChunks: false, // 不做秒传判断
      headers: {},
      withCredentials: true,
      // 每个分片附带额外字段，全部使用小写，便于后端统一解析
      query: (fileObj, chunk) => {

        return {
          relativepath: relativePath
        };
      },
    });

    uploader.addFile(file);

    // 每个分片返回都会触发 fileSuccess，这里统一解析
    uploader.on('fileSuccess', (fileObj, message) => {
      let data;
      try {
        data = typeof message === 'string' ? JSON.parse(message) : message;
      } catch (_) {
        data = {};
      }

      // 后端在最后一个分片会返回文件信息
      if (data.success && data.file && data.file.path) {
        resolve(data.file.path);
      }
    });

    uploader.on('fileError', (_fileObj, message) => {
      reject(message || '上传失败');
    });

    uploader.on('error', (message) => {
      reject(message || '上传失败');
    });

    uploader.upload();
  });
}

/**
 * 分片下载大文件（保留原有实现，后端需支持 Range）
 * @param {string} filePath - 后端保存的 file.path
 * @param {number} [chunkSize=2*1024*1024] - 分片大小，默认2MB
 * @returns {Promise<Blob>} - 返回完整文件 Blob
 */
export async function downloadFileFromServer(filePath, chunkSize = 2 * 1024 * 1024) {
  // 1. 获取文件总大小
  const headRes = await axios.head(`/api/downloadFile?filename=${encodeURIComponent(filePath)}`, {
    withCredentials: true
  });
  const totalSize = Number(headRes.headers['content-length']);
  if (!totalSize) return new Blob(); // 空文件直接返回空 Blob

  // 2. 分片下载
  const chunks = [];
  let downloaded = 0;
  while (downloaded < totalSize) {
    const end = Math.min(downloaded + chunkSize - 1, totalSize - 1);
    const res = await fetch(`/api/downloadFile?filename=${encodeURIComponent(filePath)}`, {
      method: 'GET',
      headers: { Range: `bytes=${downloaded}-${end}` },
      credentials: 'include'
    });
    if (!res.ok && res.status !== 206) throw new Error('分片下载失败');
    const blob = await res.blob();
    chunks.push(blob);
    downloaded = end + 1;
  }
  // 3. 合并 Blob
  return new Blob(chunks);
}
/**
 * 获取指定文件的 switchChangHistory
 * @param {string} id - 文件路径
 * @returns {Promise<Array>} - 返回 switchChangHistory 数组
 */
export async function getSwitchHistory(id) {
  const response = await axios.post('/api/getSwitchHistory', { id }, {
    withCredentials: true
  });
  if (response.data.success) {
    return response.data.switchChangHistory || [];
  } else {
    throw new Error(response.data.message || '获取历史失败');
  }
}
