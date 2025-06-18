import { parseSvg } from "@meta2d/svg";

import { ElMessage } from "element-plus";

const user = {
  tag: "icon",
  name: "用户",

  svg: `<svg t="用户图标" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1001" width="25" height="25"><path d="M512 512c106.039 0 192-85.961 192-192S618.039 128 512 128 320 213.961 320 320s85.961 192 192 192z m0 64c-141.385 0-384 71.885-384 192v64h768v-64c0-120.115-242.615-192-384-192z" stroke="#333"  fill="none"  stroke-width="40" /></svg>`,

  data: {
    name: "svgPath",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    text: "用户",
    path: "M512 512c106.039 0 192-85.961 192-192S618.039 128 512 128 320 213.961 320 320s85.961 192 192 192z m0 64c-141.385 0-384 71.885-384 192v64h768v-64c0-120.115-242.615-192-384-192z",
  },
};
const didaoSwitch = {
  tag: "icon",
  name: "地刀",
  icon: "sgcc sgcc-jiedidaozhahe",
  type: "icon",
  data: [
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "5a969121",
      parentId: "42ed772c",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "5a969121",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "5a969121",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "5a969121",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "5a969121",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      iconColor: "rgba(48, 238, 111, 1)",
      disableAnchor: true,
      ex: 1,
      ey: 1,
      locked: 0,
      visible: true,
    },
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "083b843",
      parentId: "42ed772c",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "083b843",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "083b843",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "083b843",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "083b843",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      disabledColor: "",
      color: "rgba(252, 8, 8, 1)",
      disableAnchor: true,
      ex: 1,
      ey: 1,
      locked: 0,
      visible: true,
    },
    {
      id: "42ed772c",
      name: "combine",
      x: 248,
      y: 209.33333333333337,
      ex: 541,
      ey: 351.33333333333337,
      width: 120,
      height: 120,
      center: {
        x: 481,
        y: 291.33333333333337,
      },
      children: ["5a969121", "083b843"],
      showChild: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "42ed772c",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "42ed772c",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "42ed772c",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "42ed772c",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      events: [
        {
          where: {
            type: null,
          },
          name: "click",
          action: 5,
          value:
            "context.meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })",
          fn: null,
        },
        {
          where: {
            type: null,
          },
          name: "click",
          action: 6,
          value: "updateColor",
          fn: null,
        },
      ],
    },
  ],
};
const circuitBreakerSwitch = {
  tag: "icon",
  name: "隔离开关",
  icon: "sgcc sgcc-gelikaiguanfen",
  type: "icon",
  data: [
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "b85948",
      parentId: "082ab6f",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "b85948",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "b85948",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "b85948",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "b85948",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      color: "rgba(48, 238, 111, 1)",
      ex: 1,
      ey: 1,
      locked: 0,
      visible: true,
      disableAnchor: true,
    },
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "26990905",
      parentId: "082ab6f",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "26990905",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "26990905",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "26990905",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "26990905",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      color: "rgba(255, 0, 0, 1)",
      ex: 1,
      ey: 1,
      locked: 0,
      visible: true,
      disableAnchor: true,
    },
    {
      id: "082ab6f",
      name: "combine",
      x: 373,
      y: 235,
      ex: 493,
      ey: 355,
      width: 120,
      height: 120,
      center: {
        x: 433,
        y: 295,
      },
      children: ["b85948", "26990905"],
      showChild: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "082ab6f",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "082ab6f",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "082ab6f",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "082ab6f",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      events: [
        {
          where: {
            type: null,
          },
          name: "click",
          action: 5,
          value:
            "context.meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })",
          fn: null,
        },
        {
          where: {
            type: null,
          },
          name: "click",
          action: 6,
          value: "updateColor",
          fn: null,
        },
      ],
    },
  ],
};

const loadSwitch = {
  tag: "icon",
  name: "断路器",
  icon: "sgcc sgcc-a-shouchekaiguanguan--_huaban1",
  type: "icon",
  text: "断路器  ",
  data: [
    {
      anchors: [
        {
          id: "0",
          penId: "55bef82a",
          x: 0.5,
          y: 0,
        },
        {
          id: "1",
          penId: "55bef82a",
          x: 1,
          y: 0.5,
        },
        {
          id: "2",
          penId: "55bef82a",
          x: 0.5,
          y: 1,
        },
        {
          id: "3",
          penId: "55bef82a",
          x: 0,
          y: 0.5,
        },
      ],
      center: {
        x: 228.5999999999999,
        y: 442.14285714285717,
      },
      children: ["365c8da", "b059964"],

      events: [
        {
          where: {
            type: null,
          },
          name: "click",
          action: 5,
          value:
            "const node = context.meta2d.findOne(pen.id)\r\ncontext.meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })",
          fn: null,
        },
        {
          where: {
            type: null,
          },
          name: "click",
          action: 6,
          value: "updateColor",
          fn: null,
        },
      ],
      ex: 288.5999999999999,
      ey: 502.1428571428572,
      fontSize: 12,
      height: 120.00000000000003,
      id: "55bef82a",
      lineHeight: 1.5,
      lineWidth: 1,
      name: "combine",
      rotate: 0,
      showChild: 0,
      width: 120.00000000000003,
      x: 168.5999999999999,
      y: 382.14285714285717,
      componentId: "01948d77-0662-700a-9b80-340bc2fe4a9e",
      originId: "168de522",
      lineAnimateImages: [],
      text: "断路器",
    },
    {
      anchors: [
        {
          id: "0",
          penId: "365c8da",
          x: 0.5,
          y: 0,
        },
        {
          id: "1",
          penId: "365c8da",
          x: 1,
          y: 0.5,
        },
        {
          id: "2",
          penId: "365c8da",
          x: 0.5,
          y: 1,
        },
        {
          id: "3",
          penId: "365c8da",
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
      id: "365c8da",
      lineHeight: 1.5,
      lineWidth: 1,
      locked: 0,
      name: "image",
      parentId: "55bef82a",
      rotate: 0,
      visible: true,
      width: 1.0000000000000002,
      x: 0,
      y: 0,
      originId: "2f898e8",
      lineAnimateImages: [],
    },
    {
      anchors: [
        {
          id: "0",
          penId: "b059964",
          x: 0.5,
          y: 0,
        },
        {
          id: "1",
          penId: "b059964",
          x: 1,
          y: 0.5,
        },
        {
          id: "2",
          penId: "b059964",
          x: 0.5,
          y: 1,
        },
        {
          id: "3",
          penId: "b059964",
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
      id: "b059964",
      lineHeight: 1.5,
      lineWidth: 1,
      locked: 0,
      name: "image",
      parentId: "55bef82a",
      rotate: 0,
      visible: true,
      width: 1.0000000000000002,
      x: 0,
      y: 0,
      originId: "5f986060",
      lineAnimateImages: [],
    },
  ],
};
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
    text: "母线",
  },
};

const fuhekaiguan = {
  tag: "icon",
  name: "负荷开关",
  icon: "sgcc sgcc-fuhekaiguanhe",
  type: "icon",
  data: [
    {
      id: "1db21a9",
      name: "combine",
      x: 0,
      y: 0,
      ex: 0.9999999999999996,
      ey: 1,
      text: "负荷开关",
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
          action: 5,
          value:
            "const node = context.meta2d.findOne(pen.id)\r\ncontext.meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })",
          fn: null,
        },
        {
          where: {
            type: null,
          },
          name: "click",
          action: 6,
          value: "updateColor",
          fn: null,
        },
      ],
    },
  ],
};
const power = {
  tag: "icon",
  name: "电源",
  icon: "sgcc sgcc-fadianji",
  type: "icon",
  data: [
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "5d86a6a3",
      parentId: "976e94a",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "5d86a6a3",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "5d86a6a3",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "5d86a6a3",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "5d86a6a3",
        },
      ],
      lineAnimateImages: [],
      ex: 1,
      ey: 1,
      center: {
        x: 383.80000000000007,
        y: 237.20000000000002,
      },
      color: "rgba(156, 156, 156, 1)",
      locked: 0,
      visible: true,
      disableAnchor: true,
    },
    {
      width: 1,
      height: 1,
      name: "image",
      iconFamily: "sgcc",
      icon: "",
      id: "4f43b6d",
      children: [],
      x: 0,
      y: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "4f43b6d",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "4f43b6d",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "4f43b6d",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "4f43b6d",
        },
      ],
      lineAnimateImages: [],
      ex: 1,
      ey: 1,
      center: {
        x: 383.80000000000007,
        y: 237.20000000000002,
      },
      parentId: "976e94a",
      rotate: 0,
      color: "rgba(255, 0, 0, 1)",
      locked: 0,
      visible: true,
      disableAnchor: true,
    },
    {
      id: "976e94a",
      name: "combine",
      x: 419.5000000000001,
      y: 142.25000000000006,
      ex: 619.5000000000001,
      ey: 342.25000000000006,
      width: 200,
      height: 200,
      center: {
        x: 519.5000000000001,
        y: 242.25000000000006,
      },
      children: ["5d86a6a3", "4f43b6d"],
      showChild: 0,
      lineWidth: 1,
      fontSize: 12,
      lineHeight: 1.5,
      anchors: [
        {
          x: 0.5,
          y: 0,
          id: "0",
          penId: "976e94a",
        },
        {
          x: 1,
          y: 0.5,
          id: "1",
          penId: "976e94a",
        },
        {
          x: 0.5,
          y: 1,
          id: "2",
          penId: "976e94a",
        },
        {
          x: 0,
          y: 0.5,
          id: "3",
          penId: "976e94a",
        },
      ],
      rotate: 0,
      lineAnimateImages: [],
      events: [
        {
          where: {
            type: null,
          },
          name: "click",
          action: 5,
          value:
            "const node = context.meta2d.findOne(pen.id)\r\ncontext.meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild })",
          fn: null,
        },
        {
          where: {
            type: null,
          },
          name: "click",
          action: 6,
          value: "updateColor",
          fn: null,
        },
      ],
    },
  ],
};

// 上一节点（朝上）
const prevNode = {
  tag: "icon",
  name: "上一节点",
  svg: `<svg viewBox="0 0 32 32" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><path d="M16 28V6M8 20h16M4 28h24" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  data: {
    name: "svgPath",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    path: "M16 28V6M8 20h16M4 28h24",
    lineWidth: 6, // 这里设置线宽
    text: "上一节点",
  },
};

// 下一节点（朝下，旋转180°）
const nextNode = {
  tag: "icon",
  name: "下一节点",
  svg: `<svg viewBox="0 0 32 32" width="25" height="25" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(180deg)"><path d="M16 28V6M8 20h16M4 28h24" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  data: {
    name: "svgPath",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    path: "M16 28V6M8 20h16M4 28h24",
    lineWidth: 6, // 这里设置线宽
    text: "下一节点",
  },
};

// 记录已用色相
const usedHues = [];

/**
 * 生成高对比度且不相似的随机颜色
 * @param {number} minDiff 色相最小间隔（建议30-40）
 * @returns {string} 颜色字符串（如 #ff00ff）
 */
function getRandomBrightColor(minDiff = 40) {
  let hue, isDistinct;
  let tryCount = 0;
  do {
    hue = Math.floor(Math.random() * 360);
    isDistinct = usedHues.every((used) => {
      const diff = Math.abs(hue - used);
      return Math.min(diff, 360 - diff) >= minDiff;
    });
    tryCount++;
    if (tryCount > 100) break;
  } while (!isDistinct);

  usedHues.push(hue);
  // 高饱和度90%、亮度60%，保证无灰无黑
  return hslToHex(hue, 90, 60);
}

// HSL转HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

globalThis.updateColor = (pen, params) => {
  const hasStep = [];

  // power节点：从 tags 包含 power 的节点开始
  const start = meta2d
    .data()
    .pens.filter(
      (n) =>
        Array.isArray(n.tags) && n.tags.includes("power") && n.showChild == 1
    );

  // 遍历 type=1 并初始化颜色
  meta2d.data().pens.forEach((pen) => {
    if (pen.type === 1) {
      meta2d.setValue({
        id: pen.id,
        color: "#666666", // 设置默认颜色为灰色
      });
    }
  });

  const updateNode = (id, color, powerId) => {
    const node = meta2d.findOne(id);
    if (!node) return;
    //判断短路
    if (
      Array.isArray(node?.tags) &&
      node?.tags.includes("power") &&
      node.id != powerId
    ) {
      ElMessage({
        message: "线路短路",
        type: "error",
      });

      meta2d.setValue({ id: pen.id, showChild: 1 - pen.showChild });
      updateColor();
      return;
    }

    if (node?.type == 1) {
      meta2d.setValue({
        id: node.id,
        color: color,
      });
    }

    // showChild 为 0 时表示断开，忽略，不继续遍历
    if (node?.showChild === 0) {
      return;
    }
    hasStep.push(id);
    // 有连接节点的遍历
    if (node.hasOwnProperty("connectedLines")) {
      node.connectedLines.forEach((n) => {
        const nid = n.lineId;
        if (hasStep.includes(nid)) return;
        updateNode(nid, color, powerId);
      });
    }
    // 如果是线 则继续遍历
    if (node?.type === 1) {
      node.anchors.forEach((n) => {
        const nid = n.connectTo;
        if (hasStep.includes(nid)) return;
        updateNode(nid, color, powerId);
      });
    }
  };

  start.forEach((node) => {
    const color = getRandomBrightColor();
    updateNode(node.id, color, node.id);
  });
  // 颜色分配完后清空色相池，保证下次重新分配时颜色依然分散
  usedHues.length = 0;
};

export const customData = {
  loaded: true,
  name: "常用图元",
  show: true,
  list: [
    power,
    busBar,
    fuhekaiguan,
    circuitBreakerSwitch,
    loadSwitch,
    didaoSwitch,
    user,
    prevNode,
    nextNode,
  ],
};
