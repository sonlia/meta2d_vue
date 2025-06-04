<script setup>
import { defaultIcons, getOtherIcons, pngToPens, svgToPens } from "../data/icons.js"
import { Search } from "@element-plus/icons-vue"
import projecMange from "./projecMange.vue"
import { Meta2d } from "@meta2d/core"
import { computed, onMounted, reactive, ref, watch } from "vue"
import axios from "axios"
import { deepClone } from "@meta2d/core"
import { currentSelect,  lockStatus, switchChangHistory,openFile } from "../data/defaultsConfig.js"
const activeName = ref("filelist")
let iconList = reactive([])
const filePath = ref()
const inputValue = ref("")

let showList = computed(()=>iconList.filter((i)=>i.show))
const handleClick = (name, event) => {
  console.log(name, "eee")
}
onMounted(async () => {
  let meta2d = new Meta2d("meta2d")

  const icons = await getOtherIcons()
  iconList.push(...icons.flat(2))
  iconList.push(...defaultIcons)
  console.log(iconList,"fefe")
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
  const bianyaqi = {
    tag: "icon",
    name: "变压器",
    icon: "sgcc-shuangraozubianyaqiYdzhongxingdianyinchuxingxing-sanjiaoxinglianjie",
    data:{
    "width": 219.99999999999983,
    "height": 219.99999999999983,
    "name": "image",
    "iconFamily": "sgcc",
    "icon": "",
    "id": "1a412a52",
    "children": [],
    "x": 309.0000000000001,
    "y": 119.00000000000009,
    "lineWidth": 1,
    "fontSize": 12,
    "lineHeight": 1.5,
    "anchors": [
        {
            "x": 0.5,
            "y": 0,
            "id": "0",
            "penId": "1a412a52"
        },
        {
            "x": 1,
            "y": 0.5,
            "id": "1",
            "penId": "1a412a52"
        },
        {
            "x": 0.5,
            "y": 1,
            "id": "2",
            "penId": "1a412a52"
        },
        {
            "x": 0,
            "y": 0.5,
            "id": "3",
            "penId": "1a412a52"
        }
    ],
    "rotate": 0
}
  }

  const didaoSwitch = {
    tag: "icon",
    name: "地刀",
    icon: "sgcc-jiedidaozhahe",
    data:[
    {
        "width": 1.0000000000000004,
        "height": 1,
        "name": "image",
        "iconFamily": "sgcc",
        "icon": "",
        "id": "456ffc0",
        "parentId": "14ee16f3",
        "children": [],
        "x": 0,
        "y": 0,
        "lineWidth": 1,
        "fontSize": 12,
        "lineHeight": 1.5,
        "anchors": [
            {
                "x": 0.5,
                "y": 0,
                "id": "0",
                "penId": "456ffc0"
            },
            {
                "x": 1,
                "y": 0.5,
                "id": "1",
                "penId": "456ffc0"
            },
            {
                "x": 0.5,
                "y": 1,
                "id": "2",
                "penId": "456ffc0"
            },
            {
                "x": 0,
                "y": 0.5,
                "id": "3",
                "penId": "456ffc0"
            }
        ],
        "ex": 1.0000000000000004,
        "ey": 1,
        "center": {
            "x": 581.1363636363636,
            "y": 321
        },
        "disableAnchor": true,
        "color": "rgba(48, 238, 111, 1)",
        "locked": 0
    },
    {
        "width": 1.0000000000000004,
        "height": 1,
        "name": "image",
        "iconFamily": "sgcc",
        "icon": "",
        "id": "7199d3c",
        "parentId": "14ee16f3",
        "children": [],
        "x": 0,
        "y": 0,
        "lineWidth": 1,
        "fontSize": 12,
        "lineHeight": 1.5,
        "anchors": [
            {
                "x": 0.5,
                "y": 0,
                "id": "0",
                "penId": "7199d3c"
            },
            {
                "x": 1,
                "y": 0.5,
                "id": "1",
                "penId": "7199d3c"
            },
            {
                "x": 0.5,
                "y": 1,
                "id": "2",
                "penId": "7199d3c"
            },
            {
                "x": 0,
                "y": 0.5,
                "id": "3",
                "penId": "7199d3c"
            }
        ],
        "ex": 1.0000000000000004,
        "ey": 1,
        "center": {
            "x": 399.1363636363636,
            "y": 303.5
        },
        "disableAnchor": true,
        "color": "rgba(255, 89, 89, 1)",
        "locked": 0
    },
    {
        "id": "14ee16f3",
        "name": "combine",
        "x": 420.13636363636374,
        "y": 242.2500000000001,
        "ex": 560.1363636363637,
        "ey": 382.25000000000017,
        "width": 140,
        "height": 140.00000000000006,
        "center": {
            "x": 490.13636363636374,
            "y": 312.2500000000001
        },
        "children": [
            "456ffc0",
            "7199d3c"
        ],
        "showChild": 0,
        "lineWidth": 1,
        "fontSize": 12,
        "lineHeight": 1.5,
        "anchors": [
            {
                "x": 0.5,
                "y": 0,
                "id": "0",
                "penId": "14ee16f3"
            },
            {
                "x": 1,
                "y": 0.5,
                "id": "1",
                "penId": "14ee16f3"
            },
            {
                "x": 0.5,
                "y": 1,
                "id": "2",
                "penId": "14ee16f3"
            },
            {
                "x": 0,
                "y": 0.5,
                "id": "3",
                "penId": "14ee16f3"
            }
        ],
        "rotate": 0,
        flag:"switch",
        events: [
          {
            name: "click",
            action: 6,
            // params: "我是参数",//传到代码块的参数
            value: "updateSwitchNode", //全局函数名
          },
        ],
    }
]
  }
  const circuitBreakerSwitch = {
    tag: "icon",
    name: "隔离开关",
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
        flag: "switch",
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
    name: "断路器",
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
        flag: "switch",
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
  const fuhekaiguan = {
    tag: "icon",
    name: "负荷开关",
    icon: "sgcc-fuhekaiguanhe",
    data: [
      {
        id: "1db21a9",
        name: "combine",
        x: 0,
        y: 0,
        ex: 0.9999999999999996,
        ey: 1,
        width: 0.9999999999999996,
        height: 1,
        center: {
          x: 142.78960473015235,
          y: 380.6808120095033,
        },
        children: ["b316c62", "30861704", "37f67728", "29a908b", "935df08"],
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "1db21a9",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "1db21a9",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "1db21a9",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "1db21a9",
          },
        ],
        parentId: "2092049",
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        locked: 0,
        visible: true,
        disableAnchor: true,
      },
      {
        id: "b316c62",
        locked: 0,
        parentId: "1db21a9",
        x: 0.6272520552737447,
        y: 0,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.33046511627906927,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "45c6788b",
            penId: "b316c62",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "ac02a0f",
            penId: "b316c62",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6272520552737447,
        ey: 0.33046511627906927,
        center: {
          x: 150.97397973015234,
          y: 332.0976870095032,
        },
        disableAnchor: true,
      },
      {
        id: "30861704",
        locked: 0,
        parentId: "1db21a9",
        x: 0.2543291936330261,
        y: 0.3304651162790701,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.7456708063669738,
        height: 0,
        anchors: [
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "ea24226",
            penId: "30861704",
          },
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "2240a4d8",
            penId: "30861704",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.9999999999999999,
        ey: 0.3304651162790701,
        center: {
          x: 150.9683547301524,
          y: 356.0770620095033,
        },
        disableAnchor: true,
      },
      {
        id: "37f67728",
        locked: 0,
        parentId: "1db21a9",
        x: 0.6272520552737447,
        y: 0.7364341085271322,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0,
        height: 0.26356589147286796,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "5e9373ff",
            penId: "37f67728",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "79472349",
            penId: "37f67728",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6272520552737447,
        ey: 1.0000000000000002,
        center: {
          x: 150.97397973015234,
          y: 434.1183120095034,
        },
        disableAnchor: true,
      },
      {
        id: "29a908b",
        locked: 0,
        parentId: "1db21a9",
        x: 0,
        y: 0.3876744186046507,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.6368724855693527,
        height: 0.3468992248062013,
        anchors: [
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "3a08937d",
            penId: "29a908b",
          },
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "6997cf5e",
            penId: "29a908b",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.6368724855693527,
        ey: 0.734573643410852,
        center: {
          x: 131.11210473015225,
          y: 389.5514370095032,
        },
        disableAnchor: true,
      },
      {
        id: "935df08",
        locked: 0,
        parentId: "1db21a9",
        x: 0.47857267797796055,
        y: 0.33806201550387605,
        rotate: 0,
        color: "rgba(48, 238, 111, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        name: "circle",
        width: 0.2973587545915684,
        height: 0.13178294573643398,
        children: [],
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "935df08",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "935df08",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "935df08",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "935df08",
          },
        ],
        visible: true,
        ex: 0.775931432569529,
        ey: 0.46984496124031006,
        center: {
          x: 150.97397973015234,
          y: 366.7420620095033,
        },
        disableAnchor: true,
      },
      {
        id: "a2d4f",
        name: "combine",
        x: 0.24855693545566265,
        y: 0,
        ex: 1.0000000000000002,
        ey: 0.999999999999998,
        width: 0.7514430645443376,
        height: 0.999999999999998,
        center: {
          x: 278.3014797301528,
          y: 373.1095620095032,
        },
        children: ["720fdd4", "848e044", "fbdf37e", "0cd3991", "1e97bc44"],
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "a2d4f",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "a2d4f",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "a2d4f",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "a2d4f",
          },
        ],
        parentId: "2092049",
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        locked: 0,
        visible: true,
        disableAnchor: true,
      },
      {
        id: "720fdd4",
        locked: 0,
        parentId: "a2d4f",
        x: 0.5039571694599606,
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
        height: 0.33038759689922503,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "78ca8d6",
            penId: "720fdd4",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "375f359",
            penId: "720fdd4",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.5039571694599606,
        ey: 0.33038759689922503,
        center: {
          x: 278.4927297301527,
          y: 324.5208120095032,
        },
        connectedLines: [
          {
            lineId: "48a90100",
            lineAnchor: "4d8d449",
            anchor: "375f359",
          },
        ],
        disableAnchor: true,
      },
      {
        id: "848e044",
        locked: 0,
        parentId: "a2d4f",
        x: 0.007681564245808378,
        y: 0.3303875968992245,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.9923184357541921,
        height: 0,
        anchors: [
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "d4ad7c8",
            penId: "848e044",
          },
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "7b71f61",
            penId: "848e044",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 1.0000000000000004,
        ey: 0.3303875968992245,
        center: {
          x: 278.48710473015274,
          y: 348.4945620095031,
        },
        disableAnchor: true,
      },
      {
        id: "fbdf37e",
        locked: 0,
        parentId: "a2d4f",
        x: 0.5039571694599606,
        y: 0.7364341085271316,
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
        height: 0.26356589147286835,
        anchors: [
          {
            x: 1,
            y: 0,
            hidden: true,
            id: "a2738fe",
            penId: "fbdf37e",
          },
          {
            x: 0,
            y: 1,
            hidden: true,
            id: "32dfa57",
            penId: "fbdf37e",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.5039571694599606,
        ey: 1,
        center: {
          x: 278.4927297301527,
          y: 426.5470620095031,
        },
        disableAnchor: true,
      },
      {
        id: "0cd3991",
        locked: 0,
        parentId: "a2d4f",
        x: 0,
        y: 0.3310077519379836,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "line",
        lineName: "line",
        type: 0,
        width: 0.5116387337057738,
        height: 0.41356589147286854,
        anchors: [
          {
            x: 0,
            y: 0,
            hidden: true,
            id: "54f67c",
            penId: "0cd3991",
          },
          {
            x: 1,
            y: 1,
            hidden: true,
            id: "c7c3682",
            penId: "0cd3991",
          },
        ],
        children: [],
        lineHeight: 1.5,
        visible: true,
        ex: 0.5116387337057738,
        ey: 0.7445736434108521,
        center: {
          x: 266.50022973015285,
          y: 378.59393700950307,
        },
        disableAnchor: true,
      },
      {
        id: "1e97bc44",
        locked: 0,
        parentId: "a2d4f",
        x: 0.3060986964618201,
        y: 0.3379844961240324,
        rotate: 0,
        color: "rgba(255, 89, 89, 1)",
        lineWidth: 2,
        globalAlpha: null,
        fontSize: 16,
        matrix: null,
        name: "circle",
        width: 0.39571694599627666,
        height: 0.13178294573643423,
        children: [],
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "1e97bc44",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "1e97bc44",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "1e97bc44",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "1e97bc44",
          },
        ],
        visible: true,
        ex: 0.7018156424580968,
        ey: 0.46976744186046665,
        center: {
          x: 278.4927297301526,
          y: 359.15956200950336,
        },
        disableAnchor: true,
      },
      {
        id: "2092049",
        name: "combine",
        x: 345.5174927263654,
        y: 257.3769285497134,
        ex: 413.4068677263656,
        ey: 410.56442854971357,
        width: 67.8893750000002,
        height: 153.18750000000017,
        center: {
          x: 379.4621802263655,
          y: 333.9706785497135,
        },
        children: ["1db21a9", "a2d4f"],
        showChild: 0,
        lineWidth: 1,
        fontSize: 12,
        lineHeight: 1.5,
        anchors: [
          {
            x: 0.5,
            y: 0,
            id: "0",
            penId: "2092049",
          },
          {
            x: 1,
            y: 0.5,
            id: "1",
            penId: "2092049",
          },
          {
            x: 0.5,
            y: 1,
            id: "2",
            penId: "2092049",
          },
          {
            x: 0,
            y: 0.5,
            id: "3",
            penId: "2092049",
          },
        ],
        rotate: 0,
        flag: "switch",
        events: [
          {
            where: {
              type: null,
            },
            name: "click",
            action: 6,
            value: "updateSwitchNode",
            fn: null,
          },
        ],
      },
    ],
  }
  const power = {
    tag: "icon",
    name: "电源",
    icon: "sgcc-fadianji",
    data: {
      width: 100,
      height: 100,
      flag: "power",
      isOn: 1,
      name: "icon",
      iconFamily: "sgcc",
      icon: "",
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
  // iconList.push(loadSwitch)
  // iconList.push(circuitBreakerSwitch)
  // iconList.push(busBar)
  // iconList.push(power)
  // iconList.push(text)
  // iconList.push(fuhekaiguan)
  // iconList.push(didaoSwitch)
  // iconList.push(bianyaqi)
})
function getRandomBrightColor() {
  // 定义亮度范围
  const highBrightness = { min: 200, max: 255 }
  const lowBrightness = { min: 128, max: 192 } // 调整下限以确保颜色鲜艳

  function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function componentToHex(c) {
    return c.toString(16).padStart(2, "0")
  }

  // 随机选择一个颜色分量作为高亮度值
  const position = Math.floor(Math.random() * 3)
  const components = [0, 0, 0]

  for (let i = 0; i < 3; i++) {
    if (i === position) {
      // 设置选定位置的颜色为高亮度
      components[i] = getRandomBetween(highBrightness.min, highBrightness.max)
    } else {
      // 其余两个颜色分量设置为低亮度，但足够深以形成对比
      components[i] = getRandomBetween(lowBrightness.min, lowBrightness.max)
    }
  }

  return "#" + components.map(componentToHex).join("")
}
const updateColor = (pen, params) => {
  const blacklist = ["switch", "text"]
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
    if (!node) return
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
    if (node?.flag === "switch") {
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
const getCurrentSelect = async (data) => {
  currentSelect.value = data.id
await openFile(currentSelect.value)

}
async function  changeState(tab){
  console.log(tab)
  if(tab.folder){
    if(!tab.loaded){
      const {data:files} = await axios.get((tab.svg?"/svg/":"/png/")+tab.name+"/")
      tab.loaded = true
      if(tab.svg){
       const fs =  await Promise.all(files.map((f)=>svgToPens(f,tab.name)))
        tab.list = fs
      }else{
        const fs = await Promise.all(files.map((f)=>pngToPens(f,tab.name)))
        tab.list = fs
      }
    }
  }
}
let searchList = reactive([])
function doSearch(value){
  value = value.trim()  // 清除空格
  searchList = []  // 重置表格
  if(value){  // 输入有值
    // 遍历搜索
    showList.value.forEach((item)=>{
      searchList.push(...item.list.filter((i)=>i.name.includes(value)))
    })
  }else {
    searchList = []  //设置为空
  }
 }
</script>

<template>
 <el-tabs v-model="activeName" class="icons" @tab-click="handleClick">
    <el-tab-pane label="工程列表" name="filelist">
      <projecMange @node-click="getCurrentSelect" />
    </el-tab-pane>

    <el-tab-pane label="图元列表" class="tablist " name="iconlist">

  

<div class="icons">
    <div class="icon_search">
      <el-input
          v-model="inputValue"
          size="small"
          placeholder="搜索图元"
          :prefix-icon="Search"
          @input="doSearch"
          class="search_input"
          clearable 
       />
      
      <div class="icon_search_container">
        <div class="icon_item" v-for="(item,index) in searchList" draggable="true" @dragstart="dragPen(item.data,$event)" :index="index" :title="item.name">
          <i v-if="item.type =='icon'" class="l-icon" :class="item.icon"></i>
              <svg v-else-if="item.icon" class="l-icon" aria-hidden="true">
                <use :xlink:href="'#' + item.icon"></use>
              </svg>
          <img v-else-if="item.image" :src="item.image"  />
          <div v-else-if="item.svg" v-html="item.svg"></div>
        </div>
      </div>
    </div>
    <div class="icon_list">
      <el-collapse>
        <template v-for="(icons) in showList">
        <el-collapse-item :title="icons.name" @click="changeState(icons)">
          <div class="icon_container">
            <div class="icon_item" v-for="(item,index) in icons.list" draggable="true"
                 @dragstart="dragPen(item.data,$event)"
                 @click.stop="onTouchstart(item.data, $data)"

                 :index="index" :title="item.name">
<!--              这里做了修改-->
              <i v-if="item.type =='icon'" class="l-icon" :class="item.icon"></i>
              <svg v-else-if="item.icon" class="l-icon" aria-hidden="true">
                <use :xlink:href="'#' + item.icon"></use>
              </svg>
              <img v-else-if="item.image" :src="item.image"/>
              <div v-else-if="item.svg" v-html="item.svg"></div>
            </div>
          </div>
        </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <div class="icon_manage">
      <el-button @click="dialogTableVisible = !dialogTableVisible">
        管理图元
      </el-button>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" title="图元库管理" center align-center>
    <div class="icon_manage_container">
      <div class="icon_manage_item" v-for="item in iconList">
        <el-switch v-model="item.show" />{{item.name}}
      </div>
    </div>
  </el-dialog>

</el-tab-pane>
</el-tabs>
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
  max-height: 600px; /* 可根据实际UI调整 */
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
</style>
