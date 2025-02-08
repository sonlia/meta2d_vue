<script setup>
import { defaultIcons, getOtherIcons, pngToPens, svgToPens } from "../data/icons.js"
import { Search } from "@element-plus/icons-vue"
import { Meta2d } from "@meta2d/core"
import { computed, onMounted, reactive, ref, watch } from "vue"
import axios from "axios"
import { deepClone } from "@meta2d/core"
const inputValue = ref("")
let iconList = reactive([...defaultIcons])

watch(iconList, (x) => console.log(x, "fefe"))

const showlist = ref([])
onMounted(async () => {
  let meta2d = new Meta2d("meta2d")

  const icons = await getOtherIcons()
  iconList.push(...icons.flat(2))
  const saveAsComponent = () => {
    const Re = meta2d.canvas.getAllByPens(meta2d.store.active)
    ie.componentDatas = meta2d.toComponent(Re, meta2d.store.data.showChild, !1)
    const Q = meta2d.data()
    if (meta2d.store.active && meta2d.store.active.length === 1 && meta2d.store.active[0].name === "combine") {
      let ie = {
        center: Q.center,
        folder: "",
        origin: Q.origin,
        scale: Q.scale,
        x: Q.x,
        y: Q.y,
      }
      ie.name = meta2d.store.active[0].description || "\u65B0\u5EFA\u9879\u76EE"
      ;(ie.fullname = ke.fullname), (ie.component = !0)
      const Re = meta2d.canvas.getAllByPens(meta2d.store.active)
      ;(ie.componentDatas = meta2d.toComponent(Re, meta2d.store.data.showChild, !1)), (ie.version = Q.version)
      let We = Re.map((Ct) => Ct.id)
      ie.pens = Q.pens.filter((Ct) => We.includes(Ct.id))
    }
  }
  const circuitBreakerSwitch = {
    tag: "icon",
    name: "负荷开关",
    icon: "sgcc-gelikaiguanfen",
    data: [
      {
        id: "b81a6eb",
        name: "combine",
        x: 0.24868835257083277,
        y: 0,
        ex: 0.9999999999999988,
        ey: 1,
        width: 0.751311647429166,
        height: 1,
        center: {
          x: 1926.886353178786,
          y: -77.13516882645408,
        },
        children: ["fa9f22", "44cc16d2", "2c73bc3", "d5abf3"],
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "b81a6eb",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "b81a6eb",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "b81a6eb",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "b81a6eb",
          },
        ],
        parentId: "5950a547",
        rotate: 0,
        disableAnchor: true,
        locked: 0,
        visible: true,
        color: "rgba(255, 89, 89, 1)",
      },
      {
        id: "fa9f22",
        locked: 0,
        parentId: "b81a6eb",
        x: 0,
        y: 0.3310852713178294,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.5116387337057796,
        height: 0.41348837209302314,
        anchors: [
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "bf01bc",
            penId: "fa9f22",
          },
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "1bdb8ad",
            penId: "fa9f22",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.5116387337057796,
        ey: 0.7445736434108525,
        center: {
          x: 2107.643600618067,
          y: -131.63888796268756,
        },
        disableAnchor: true,
      },
      {
        id: "44cc16d2",
        locked: 0,
        parentId: "b81a6eb",
        x: 0.5039571694599858,
        y: 0.7364341085271319,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.26356589147286813,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "9d25b82",
            penId: "44cc16d2",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "16bfb544",
            penId: "44cc16d2",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.5039571694599858,
        ey: 1,
        center: {
          x: 2119.1551595432566,
          y: -61.06278746434881,
        },
        disableAnchor: true,
      },
      {
        id: "2c73bc3",
        locked: 0,
        parentId: "b81a6eb",
        x: 0.007681564245796556,
        y: 0.33046511627906944,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.9923184357542032,
        height: 0,
        anchors: [
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "551ab717",
            penId: "2c73bc3",
          },
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "65221c3",
            penId: "2c73bc3",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.9999999999999998,
        ey: 0.33046511627906944,
        center: {
          x: 2119.1497601253727,
          y: -175.9352438596975,
        },
        disableAnchor: true,
      },
      {
        id: "d5abf3",
        locked: 0,
        parentId: "b81a6eb",
        x: 0.4999999999999978,
        y: 0,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.33046511627906955,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "7264b98",
            penId: "d5abf3",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "1c954438",
            penId: "d5abf3",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.4999999999999978,
        ey: 0.33046511627906955,
        center: {
          x: 2118.9715793352552,
          y: -211.23157380155786,
        },
        connectedLines: [
          {
            lineId: "6260642",
            lineAnchor: "6870080",
            anchor: "7264b98",
          },
          {
            lineId: "79caf611",
            lineAnchor: "2084be5c",
            anchor: "7264b98",
          },
          {
            lineId: "3401329b",
            lineAnchor: "b0bb623",
            anchor: "1c954438",
          },
        ],
        disableAnchor: true,
      },
      {
        id: "2570253e",
        name: "combine",
        x: 0,
        y: 0,
        ex: 1.000000000000002,
        ey: 1,
        width: 1.000000000000002,
        height: 1,
        center: {
          x: 2009.5103834747324,
          y: -77.13516882645408,
        },
        children: ["6fd2d87", "769f1a3e", "8fae70e", "72c8a927"],
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "2570253e",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "2570253e",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "2570253e",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "2570253e",
          },
        ],
        parentId: "5950a547",
        rotate: 0,
        disableAnchor: true,
        locked: 0,
        visible: true,
      },
      {
        id: "6fd2d87",
        locked: 0,
        parentId: "2570253e",
        x: 0.6399090591115697,
        y: 0,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.33046511627906966,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "0f326c6",
            penId: "6fd2d87",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "733cb328",
            penId: "6fd2d87",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6399090591115697,
        ey: 0.33046511627906966,
        center: {
          x: 2014.894656258332,
          y: -187.22046499757118,
        },
        disableAnchor: true,
      },
      {
        id: "769f1a3e",
        locked: 0,
        parentId: "2570253e",
        x: 0.25445960125917794,
        y: 0.33046511627907,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.7455403987408205,
        height: 0,
        anchors: [
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "5fe65d62",
            penId: "769f1a3e",
          },
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "dee4ffc",
            penId: "769f1a3e",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.9999999999999984,
        ey: 0.33046511627907,
        center: {
          x: 2014.1117406653902,
          y: -151.92413505571076,
        },
        disableAnchor: true,
      },
      {
        id: "8fae70e",
        locked: 0,
        parentId: "2570253e",
        x: 0.6271423574676354,
        y: 0.7364341085271319,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.2635658914728681,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "58cf147",
            penId: "8fae70e",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "d0461e6",
            penId: "8fae70e",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6271423574676354,
        ey: 1,
        center: {
          x: 2014.1063412475073,
          y: -37.051678660362185,
        },
        disableAnchor: true,
      },
      {
        id: "72c8a927",
        locked: 0,
        parentId: "2570253e",
        x: 0,
        y: 0.3875968992248065,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.6367611052815688,
        height: 0.34697674418604657,
        anchors: [
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "11b2913",
            penId: "72c8a927",
          },
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "3ab395bd",
            penId: "72c8a927",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6367611052815688,
        ey: 0.7345736434108531,
        center: {
          x: 1995.0409967048995,
          y: -102.65996354408296,
        },
        disableAnchor: true,
      },
      {
        id: "5950a547",
        name: "circuitBreaker",
        x: 1828.127929330622,
        y: -311.87243143711646,
        ex: 1878.648809887339,
        ey: -137.09564572283105,
        width: 50.520880556716975,
        height: 120.7767857142854,
        center: {
          x: 1853.3883696089806,
          y: -224.48403857997374,
        },
        children: ["2570253e", "b81a6eb"],
        showChild: 0,
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        flag: "circuitBreaker",
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "5950a547",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "5950a547",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "5950a547",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "5950a547",
          },
        ],
        rotate: 0,
        events: [
          {
            name: "click",
            action: 6,
            // params: "我是参数",//传到代码块的参数
            value: "updateSwitchNode", //全局函数名
          },
        ],
      },
    ],
  }

  const loadSwitch = {
    tag: "icon",
    name: "负荷开关",
    icon: "sgcc-a-shouchekaiguanguan--_huaban1",
    data: [
      {
        anchors: [
          {
            id: "0",
            penId: "4dd58790",
            x: 0.5,
            y: 0,
          },
          {
            id: "1",
            penId: "4dd58790",
            x: 1,
            y: 0.5,
          },
          {
            id: "2",
            penId: "4dd58790",
            x: 0.5,
            y: 1,
          },
          {
            id: "3",
            penId: "4dd58790",
            x: 0,
            y: 0.5,
          },
        ],
        center: {
          x: 473.95238095238085,
          y: 198.92380952380952,
        },
        children: [],
        color: "rgba(48, 238, 111, 1)",
        disableAnchor: true,
        ex: 1.0000000000000002,
        ey: 1.0000000000000002,
        fontSize: 12,
        height: 1.0000000000000002,
        icon: "",
        iconFamily: "sgcc",
        id: "4dd58790",
        lineHeight: 1.5,
        lineWidth: 1,
        locked: 0,
        name: "image",
        parentId: "17fac50a",
        rotate: 0,
        visible: true,
        width: 1.0000000000000002,
        x: 0,
        y: 0,
        originId: "2f898e8",
      },
      {
        anchors: [
          {
            id: "0",
            penId: "c5c5e03",
            x: 0.5,
            y: 0,
          },
          {
            id: "1",
            penId: "c5c5e03",
            x: 1,
            y: 0.5,
          },
          {
            id: "2",
            penId: "c5c5e03",
            x: 0.5,
            y: 1,
          },
          {
            id: "3",
            penId: "c5c5e03",
            x: 0,
            y: 0.5,
          },
        ],
        center: {
          x: 473.95238095238085,
          y: 198.92380952380952,
        },
        children: [],
        color: "rgba(255, 89, 89, 1)",
        disableAnchor: true,
        ex: 1.0000000000000002,
        ey: 1.0000000000000002,
        fontSize: 12,
        height: 1.0000000000000002,
        icon: "",
        iconFamily: "sgcc",
        id: "c5c5e03",
        lineHeight: 1.5,
        lineWidth: 1,
        locked: 0,
        name: "image",
        parentId: "17fac50a",
        rotate: 0,
        visible: true,
        width: 1.0000000000000002,
        x: 0,
        y: 0,
        originId: "5f986060",
      },
      {
        anchors: [
          {
            id: "0",
            penId: "17fac50a",
            x: 0.5,
            y: 0,
          },
          {
            id: "1",
            penId: "17fac50a",
            x: 1,
            y: 0.5,
          },
          {
            id: "2",
            penId: "17fac50a",
            x: 0.5,
            y: 1,
          },
          {
            id: "3",
            penId: "17fac50a",
            x: 0,
            y: 0.5,
          },
        ],
        center: {
          x: 1496.2638576489874,
          y: -260.7899542914113,
        },
        children: ["4dd58790", "c5c5e03"],
        events: [
          {
            name: "click",
            action: 6,
            // params: "我是参数",//传到代码块的参数
            value: "updateSwitchNode", //全局函数名
          },
        ],
        ex: 1556.2638576489874,
        ey: -200.78995429141122,
        fontSize: 12,
        height: 120.00000000000006,
        id: "17fac50a",
        lineHeight: 1.5,
        lineWidth: 1,
        name: "loadSwitch",
        flag: "loadSwitch",
        rotate: 0,
        showChild: 0,
        width: 120.00000000000006,
        x: 1436.2638576489874,
        y: -320.7899542914113,
        componentId: "01948d77-0662-700a-9b80-340bc2fe4a9e",
        originId: "168de522",
        connectedLines: [],
      },
    ],
  }
  // 母线
  const busBar = {
    // 有 imag  svg
    tag: "aa",
    name: "母线",
    icon: "l-line",
    data: {
      anchors: [
        {
          x: 0,
          y: 0.5,
          id: "0",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
        },
      ],
      flag: "busBar",
      width: 200,
      height: 5,
      name: "rectangle",
      lineWidth: 0,
      background: "#222222",
    },
  }

  const text = {
    tag: "aa",
    name: "text",
    icon: "l-text",
    data: {
      text: "meta2d",
      width: 160,
      height: 30,
      name: "text",
      flag: "text",
    },
  }
  const power = {
    tag: "icon",
    name: "电源",
    icon: "sgcc-weibiaoti-1",
    data: {
      width: 100,
      height: 100,
      flag: "power",
      isOn: 1,
      name: "icon",
      iconFamily: "sgcc",
      icon: "",
      events: [
        {
          name: "click",
          action: 6,
          // params: "我是参数",//传到代码块的参数
          value: "powerUpdate", //全局函数名
        },
      ],
    },
  }
  showlist.value.push(loadSwitch)
  showlist.value.push(circuitBreakerSwitch)
  showlist.value.push(busBar)
  showlist.value.push(power)
  showlist.value.push(text)
})
function getRandomBrightColor() {
    // 定义亮度范围
    const highBrightness = { min: 200, max: 255 };
    const lowBrightness = { min: 128, max: 192 }; // 调整下限以确保颜色鲜艳

    function getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function componentToHex(c) {
        return c.toString(16).padStart(2, '0');
    }

    // 随机选择一个颜色分量作为高亮度值
    const position = Math.floor(Math.random() * 3);
    const components = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        if (i === position) {
            // 设置选定位置的颜色为高亮度
            components[i] = getRandomBetween(highBrightness.min, highBrightness.max);
        } else {
            // 其余两个颜色分量设置为低亮度，但足够深以形成对比
            components[i] = getRandomBetween(lowBrightness.min, lowBrightness.max);
        }
    }

    return "#" + components.map(componentToHex).join('');
}
const updateColor = (pen, params) => {
  const blacklist = ["loadSwitch", "circuitBreaker", "text"]
  // power节点
  const start = meta2d.data().pens.filter((n) => n.flag == "power" && n.isOn === 1)
  //获取 所有非 开关节点的所有节点
  const allId = new Set()
  const alloutId = new Set()
  // 遍历当前节点 并初始化颜色
  meta2d.data().pens.forEach((node) => {
    if (node && node.id !== undefined) {
      // 确保 node 和 node.id 存在
      allId.add(node.id) // 添加节点 ID 到 allId 集合
    }

    ;(node?.children ?? []).forEach((x) => alloutId.add(x))
  })
  const allNodeId = [...allId]
    .filter((id) => ![...alloutId].includes(id))
    .filter((id) => {
      const node = meta2d.findOne(id)
      return !blacklist.includes(node.flag)
    })
  allNodeId.forEach((id) => {
    if (meta2d.findOne(id).flag == "busBar") {
      meta2d.setValue({ id: id, background: "rgba(115,115,115,255)" })
    } else {
      meta2d.setValue({ id: id, color: "rgba(115,115,115,255)" })
    }
  })


  let hasStep = []
  // 记录是否短路。
  let circuitNode
  const updateNode = (id, color, powerId) => {
    const node = meta2d.findOne(id)
    if(!node)return 
    if (node?.flag == "power" && node.id != powerId && node.isOn == 1) {
      circuitNode = ""
      console.log("....", node.flag, node.id, powerId)
      alert("线路短路")
      circuitNode = node
      return 
    }
    //   组元 有 busBar  text   power loadSwitch circuitBreaker 且 不处理开关

    if (node?.flag == "busBar") {
      meta2d.setValue({
        id: node.id,
        background: color,
      })
    }
    if (node?.flag == "power" && node.isOn === 1) {
      meta2d.setValue({
        id: node.id,
        color: color,
      })
    }
    if (node?.type == 1) {
      meta2d.setValue({
        id: node.id,
        color: color,
      })
    }

    // 如果开关  断开 则不继续遍历
    if (node?.flag === "loadSwitch" || node?.flag === "circuitBreaker") {
      if (node.showChild == 0) {
        return
      }
    }
    // 记录已经 计算过的id
    hasStep.push(id)
    // 当是节点
    if (node.hasOwnProperty("connectedLines")) {
      node.connectedLines.forEach((n) => {
        const nid = n.lineId
        if (hasStep.includes(nid)) return
        updateNode(nid, color, powerId)
      })
    } else {
      node.anchors.forEach((n) => {
        const nid = n.connectTo
        if (hasStep.includes(nid)) return
        updateNode(nid, color, powerId)
      })
    }
  }

  start.forEach((node) => {
    const color = getRandomBrightColor()
    updateNode(node.id, color, node.id)
  })
  return circuitNode
}
globalThis.updateSwitchNode = (pen, params) => {
  meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })
  const circuitNode = updateColor(pen, params)

  if (circuitNode) {
    meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })
  }
  updateColor(pen, params)
}
globalThis.powerUpdate = (pen, params) => {
  const cacheColor = pen.color

  if (pen.isOn) {
    // 如果是1
    meta2d.setValue({ id: pen.id, color: "rgba(115,115,115,255)", isOn: 0 })
  } else {
    // 0 的情况
    meta2d.setValue({ id: pen.id, isOn: 1 })
  }
  const circuitNode = updateColor(pen, params)

  if (circuitNode) {
    if (pen.isOn) {
      // 如果是1
      meta2d.setValue({ id: pen.id, color: "rgba(115,115,115,255)", isOn: 0 })
    } else {
      // 0 的情况
      meta2d.setValue({ id: pen.id, isOn: 1, color: cacheColor })
    }
  }
  updateColor(pen, params)
}
function dragPen(data, e) {
  const json = JSON.stringify(data)
  e.dataTransfer.setData("Meta2d", json)
}

function onTouchstart(data, e) {
  meta2d.canvas.addCaches = deepClone([data])
}
</script>

<template>
  <div class="icons">
    <div
      class="icon_item"
      v-for="(item, index) in showlist"
      draggable="true"
      :key="index"
      @dragstart="dragPen(item.data, $event)"
      @click.stop="onTouchstart(item.data, $data)"
      :index="index"
      :title="item.name"
    >
      <!--              这里做了修改-->
      <i v-if="item.tag == 'icon'" aria-hidden="true" :class="['l-icon', 'sgcc', item.icon]" style="font-size: 30px" />
      <svg v-if="item.tag == 'aa'" class="l-icon" aria-hidden="true">
        <use :xlink:href="'#' + item.icon"></use>
      </svg>
      <img v-if="item.tag == 'image'" :src="item.image" />
      <div v-if="item.tag == 'svg'" v-html="item.svg"></div>
    </div>
  </div>
</template>

<style scoped>
.icons {
  width: 300px;
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: left;
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
  overflow: auto;
  flex: 1;
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
  cursor: pointer;
  width: 35px;
  height: 35px;
}

img {
  width: 35px;
  height: 35px;
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
</style>
