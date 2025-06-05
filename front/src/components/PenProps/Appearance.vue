<script setup>
import Form from "../Form.vue";
import { computed, onMounted, reactive, ref, toRaw, watch } from "vue";
import { appearanceProps } from "../../data/defaultsConfig.js";
import { mergeProps } from "../../data/utils.js";
import { deepClone } from "@meta2d/core";

// 记录是否有选中多个图元
const multiPen = ref(false);
const defaultConfig = deepClone(appearanceProps); //深拷贝保存默认配置
let m = reactive(appearanceProps); // 响应式数据源
let activePen = reactive({ target: [] });
let otherProps = reactive({ props: [] });
// 新增：单独定义 showChildRef
const showChildRef = ref(0);

// 监听 activePen.target.showChild 的变化，保持同步
watch(
  () => activePen.target,
  (val) => {
    showChildRef.value =  {
            list: Array.from({ length: activePen.target.length }, (_, i) => ({
              label: i  + "",
              value: i ,
            })),
          };
  },
  { immediate: true }
);

// 更新属性方法
function updateFunc(prop) {
  return (value) => {
    if (multiPen.value) {
      for (let i of activePen.target) {
        meta2d.setValue(
          {
            id: i.id,
            [prop]: value,
          },
          { render: false }
        );
      }
      meta2d.render();
    } else {
      meta2d.setValue({
        id: activePen.target.id,
        [prop]: value,
      });
    }
  };
}

onMounted(() => {
  meta2d.on("active", (args) => {
    // 只修改一个
    if (args.length >= 1) {
      multiPen.value = args.length > 1;
      if (multiPen.value) {
        // 批量修改
        activePen.target = reactive(args);
        // 以最后一个图元信息为主
        for (let i of activePen.target) {
          mergeProps(m, i);
        }
      } else {
        // 修改一个
        activePen.target = reactive(args[0]);
        otherProps.props = [];
        if (activePen.target.props) {
          let otherProp = {
            title: "其他",
            children: [],
          };
          activePen.target.props.forEach((prop) => {
            otherProp.children.push({
              title: prop.title,
              type: prop.type,
              prop: prop.prop,
              bindProp: m,
              event: prop.event,
              func: updateFunc(prop.prop),
            });
          });
          otherProps.props.push(otherProp);
        }
        mergeProps(m, defaultConfig);
        mergeProps(m, activePen.target);
        const penRect = meta2d.getPenRect(toRaw(activePen.target));
        Object.assign(m, penRect);
      }
    }
  });
  // 更新数据  合并多个事件
  meta2d.on("update", () => {
    meta2d.emit("editPen");
  });
  meta2d.on("resizePens", () => {
    meta2d.emit("editPen");
  });
  meta2d.on("rotatePens", () => {
    meta2d.emit("editPen");
  });
  meta2d.on("valueUpdate", () => {
    meta2d.emit("editPen");
  });
  meta2d.on("editPen", () => {
    if (multiPen.value) {
      // 若有多个图元，则设置以最后一个图元为主
      for (let i of activePen.target) {
        mergeProps(m, i);
      }
    } else {
      mergeProps(m, activePen.target);
    }
  });
});

const map = [
  {
    title: "位置与大小",
    multiShow: false,
    children: [
      {
        title: "x",
        type: "number",
        prop: "x",
        option: {
          placeholder: "px",
        },
        bindProp: m,
        event: "change",
        func(value) {
          // meta2d.setPenRect(toRaw(activePen.target),{x:value,y:activePen.target.y,width:activePen.target.width,height:activePen.target.height},false)
          meta2d.setValue({
            id: activePen.target.id,
            x: value,
          });
          meta2d.canvas.calcActiveRect();
          mergeProps(m, activePen.target);
          meta2d.render();
        },
      },
      {
        title: "y",
        type: "number",
        prop: "y",
        option: {
          placeholder: "px",
        },
        bindProp: m,
        event: "change",
        func(value) {
          // meta2d.setPenRect(toRaw(activePen.target),{x:activePen.target.x,y:value,width:activePen.target.width,height:activePen.target.height},false)
          meta2d.setValue({
            id: activePen.target.id,
            y: value,
          });
          meta2d.canvas.calcActiveRect();
          mergeProps(m, activePen.target);
          meta2d.render();
        },
      },
      {
        title: "宽度",
        type: "number",
        prop: "width",
        bindProp: m,
        option: {
          min: 0,
        },
        event: "change",
        func(value) {
          if (activePen.target.ratio) {
            meta2d.setValue({
              id: activePen.target.id,
              width: value,
              height:
                (value / activePen.target.width) * activePen.target.height,
            });
          } else {
            meta2d.setValue({
              id: activePen.target.id,
              width: value,
            });
          }
          mergeProps(m, activePen.target);
        },
      },
      {
        title: "高度",
        type: "number",
        prop: "height",
        bindProp: m,
        event: "change",
        func(value) {
          if (activePen.target.ratio) {
            meta2d.setValue({
              id: activePen.target.id,
              height: value,
              width: (value / activePen.target.height) * activePen.target.width,
            });
          } else {
            meta2d.setValue({
              id: activePen.target.id,
              height: value,
            });
          }
          mergeProps(m, activePen.target);
        },
      },
      {
        title: "锁定宽高比",
        type: "switch",
        prop: "ratio",
        bindProp: m,
        event: "change",
        func(value) {
          // meta2d.setValue({
          //   id:activePen.target.id,
          //   ratio:value
          // })
          activePen.target.ratio = value;
          meta2d.render();
          mergeProps(m, activePen.target);
        },
      },
      {
        title: "圆角",
        type: "number",
        prop: "borderRadius",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "<1为比例",
          min: 0,
        },
        func: updateFunc("borderRadius"),
      },
      {
        title: "旋转",
        type: "number",
        prop: "rotate",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "角度",
        },
        func: updateFunc("rotate"),
      },
      {
        title: "内边距上",
        type: "number",
        prop: "paddingTop",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "px",
        },
        func: updateFunc("paddingTop"),
      },
      {
        title: "内边距下",
        type: "number",
        prop: "paddingBottom",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "px",
        },
        func: updateFunc("paddingBottom"),
      },
      {
        title: "内边距左",
        type: "number",
        prop: "paddingLeft",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "px",
        },
        func: updateFunc("paddingLeft"),
      },
      {
        title: "内边距右",
        type: "number",
        prop: "paddingRight",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "px",
        },
        func: updateFunc("paddingRight"),
      },
      {
        title: "进度",
        type: "number",
        prop: "progress",
        bindProp: m,
        event: "change",
        option: {
          placeholder: "px",
          min: 0,
          step: 0.1,
          max: 1,
        },
        func: updateFunc("progress"),
      },
      {
        title: "垂直进度",
        type: "switch",
        prop: "verticalProgress",
        bindProp: m,
        event: "change",
        func: updateFunc("verticalProgress"),
      },
      {
        title: "水平翻转",
        type: "switch",
        prop: "flipX",
        bindProp: m,
        event: "change",
        func: updateFunc("flipX"),
      },
      {
        title: "垂直翻转",
        type: "switch",
        prop: "flipY",
        bindProp: m,
        event: "change",
        func: updateFunc("flipY"),
      },
      {
        title: "状态",
        type: "select",

        multiShow: true,
        prop: "showChild",
        bindProp: m,
        event: "change",
        option: {},
        show: computed(() => showChildRef.value !== undefined),
        func(value) {
          m.showChild = Number(value);
          meta2d.setValue({
            id: activePen.target.id,
            showChild: Number(value),
          });
          meta2d.render();
        },
      },
    ],
  },
  {
    title: "样式",
    multiShow: true,
    children: [
      {
        title: "线条样式",
        type: "select",
        multiShow: true,
        prop: "dash",
        option: {
          placeholder: "线条样式",
          list: [
            {
              label: "直线",
              template:
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">\n' +
                '                  <g fill="none" stroke="black" stroke-width="1">\n' +
                '                    <path d="M0 9 l85 0"></path>\n' +
                "                  </g>\n" +
                "                </svg>",
              value: 0,
            },
            {
              label: "虚线",
              template:
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">\n' +
                '                  <g fill="none" stroke="black" stroke-width="1">\n' +
                '                    <path stroke-dasharray="5 5" d="M0 9 l85 0"></path>\n' +
                "                  </g>\n" +
                "                </svg>",
              value: 1,
            },
            {
              label: "点横线",
              template:
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">\n' +
                '                  <g fill="none" stroke="black" stroke-width="1">\n' +
                '                    <path stroke-dasharray="10 10 2 10" d="M0 9 l85 0"></path>\n' +
                "                  </g>\n" +
                "                </svg>",
              value: 2,
            },
          ],
        },
        bindProp: m,
        event: "change",
        func(value) {
          const dash = [
            [0, 0],
            [5, 5],
            [10, 10, 2, 10],
          ];
          if (multiPen.value) {
            for (let i of activePen.target) {
              meta2d.setValue(
                {
                  id: i.id,
                  lineDash: dash[value],
                },
                { render: false }
              );
            }
            meta2d.render();
          } else {
            activePen.target.dash = value;
            meta2d.setValue({
              id: activePen.target.id,
              lineDash: dash[value],
            });
          }
        },
      },
      {
        title: "连接样式",
        type: "select",
        multiShow: true,
        option: {
          placeholder: "连接样式",
          list: [
            {
              label: "默认",
              value: "miter",
            },
            {
              label: "圆形",
              value: "round",
            },
            {
              label: "斜角",
              value: "bevel",
            },
          ],
        },
        prop: "lineJoin",
        bindProp: m,
        event: "change",
        func: updateFunc("lineJoin"),
      },
      {
        title: "末端样式",
        type: "select",
        multiShow: true,
        option: {
          placeholder: "末端样式",
          list: [
            {
              label: "默认",
              value: "butt",
            },
            {
              label: "圆形",
              value: "round",
            },
            {
              label: "方形",
              value: "square",
            },
          ],
        },
        prop: "lineCap",
        bindProp: m,
        event: "change",
        func: updateFunc("lineCap"),
      },
      {
        title: "颜色",
        type: "color",
        multiShow: true,
        prop: "color",
        bindProp: m,
        event: "change",
        func: updateFunc("color"),
      },
      {
        title: "浮动颜色",
        type: "color",
        multiShow: true,
        prop: "hoverColor",
        bindProp: m,
        event: "change",
        func: updateFunc("hoverColor"),
      },
      {
        title: "选中颜色",
        type: "color",
        multiShow: true,
        prop: "activeColor",
        bindProp: m,
        event: "change",
        func: updateFunc("activeColor"),
      },
      {
        title: "线条宽度",
        type: "number",
        multiShow: true,
        prop: "lineWidth",
        bindProp: m,
        event: "change",
        func: updateFunc("lineWidth"),
      },
      {
        title: "背景颜色",
        type: "color",
        multiShow: true,
        prop: "background",
        bindProp: m,
        event: "change",
        func: updateFunc("background"),
      },
      {
        title: "浮动背景颜色",
        type: "color",
        multiShow: true,
        prop: "hoverBackground",
        bindProp: m,
        event: "change",
        func: updateFunc("hoverBackground"),
      },
      {
        title: "选中背景颜色",
        type: "color",
        multiShow: true,
        prop: "activeBackground",
        bindProp: m,
        event: "change",
        func: updateFunc("activeBackground"),
      },
      {
        title: "透明度",
        type: "number",
        multiShow: true,
        prop: "globalAlpha",
        bindProp: m,
        option: {
          min: 0,
          step: 0.1,
          max: 1,
        },
        event: "change",
        func: updateFunc("globalAlpha"),
      },

      {
        title: "锚点颜色",
        type: "color",
        prop: "anchorColor",
        bindProp: m,
        event: "change",
        func: updateFunc("anchorColor"),
      },
      {
        title: "锚点半径",
        type: "number",
        prop: "anchorRadius",
        bindProp: m,
        option: {
          min: 0,
          step: 1,
          max: 10,
        },
        event: "change",
        func: updateFunc("anchorRadius"),
      },
      {
        title: "阴影颜色",
        type: "color",
        prop: "shadowColor",
        bindProp: m,
        event: "change",
        func: updateFunc("shadowColor"),
      },
      {
        title: "阴影模糊",
        type: "number",
        prop: "shadowBlur",
        bindProp: m,
        option: {
          min: 0,
          step: 1,
          max: Infinity,
        },
        event: "change",
        func: updateFunc("shadowBlur"),
      },
      {
        title: "阴影x偏移",
        type: "number",
        prop: "shadowOffsetX",
        bindProp: m,
        event: "change",
        func: updateFunc("shadowOffsetX"),
      },
      {
        title: "阴影y偏移",
        type: "number",
        prop: "shadowOffsetY",
        bindProp: m,
        event: "change",
        func: updateFunc("shadowOffsetY"),
      },
      {
        title: "文字阴影",
        type: "switch",
        prop: "textHasShadow",
        bindProp: m,
        event: "change",
        func: updateFunc("textHasShadow"),
      },
    ],
  },
  {
    title: "文字",
    multiShow: true,
    children: [
      {
        title: "字体名",
        type: "select",
        multiShow: true,
        prop: "fontFamily",
        option: {
          placeholder: "请选择字体",
          list: [
            {
              label: "宋体",
              value: "宋体",
            },
            {
              label: "黑体",
              value: "黑体",
            },
          ],
        },
        bindProp: m,
        event: "change",
        func: updateFunc("fontFamily"),
      },
      {
        title: "字体大小",
        type: "number",
        multiShow: true,
        prop: "fontSize",
        bindProp: m,
        event: "change",
        func: updateFunc("fontSize"),
      },
      {
        title: "字体颜色",
        type: "color",
        multiShow: true,
        prop: "textColor",
        bindProp: m,
        event: "change",
        func: updateFunc("textColor"),
      },
      {
        title: "浮动字体颜色",
        type: "color",
        multiShow: true,
        prop: "hoverTextColor",
        bindProp: m,
        event: "change",
        func: updateFunc("hoverTextColor"),
      },
      {
        title: "选中字体颜色",
        type: "color",
        multiShow: true,
        prop: "activeTextColor",
        bindProp: m,
        event: "change",
        func: updateFunc("activeTextColor"),
      },
      {
        title: "文字背景颜色",
        type: "color",
        multiShow: true,
        prop: "textBackground",
        bindProp: m,
        event: "change",
        func: updateFunc("textBackground"),
      },
      {
        title: "水平对齐",
        type: "select",
        multiShow: true,
        prop: "textAlign",
        option: {
          placeholder: "请选择对齐方式",
          list: [
            {
              label: "左对齐",
              value: "left",
            },
            {
              label: "居中对齐",
              value: "center",
            },
            {
              label: "右对齐",
              value: "right",
            },
          ],
        },
        bindProp: m,
        event: "change",
        func: updateFunc("textAlign"),
      },
      {
        title: "垂直对齐",
        type: "select",
        multiShow: true,
        prop: "textBaseline",
        option: {
          placeholder: "请选择对齐方式",
          list: [
            {
              label: "顶部对齐",
              value: "top",
            },
            {
              label: "居中对齐",
              value: "center",
            },
            {
              label: "底部对齐",
              value: "bottom",
            },
          ],
        },
        bindProp: m,
        event: "change",
        func: updateFunc("textBaseline"),
      },
      {
        title: "行高",
        type: "number",
        multiShow: true,
        option: {
          step: 0.1,
        },
        prop: "lineHeight",
        bindProp: m,
        event: "change",
        func: updateFunc("lineHeight"),
      },
      {
        title: "换行",
        type: "select",
        multiShow: true,
        prop: "whiteSpace",
        option: {
          placeholder: "请选择换行方式",
          list: [
            {
              label: "默认",
              value: "nowrap",
            },
            {
              label: "不换行",
              value: "nowrap",
            },
            {
              label: "回车换行",
              value: "pre-line",
            },
            {
              label: "永远换行",
              value: "break-all",
            },
          ],
        },
        bindProp: m,
        event: "change",
        func: updateFunc("whiteSpace"),
      },
      {
        title: "文字宽度",
        type: "number",
        multiShow: true,
        option: {
          min: 0,
        },
        prop: "textWidth",
        bindProp: m,
        event: "change",
        func: updateFunc("textWidth"),
      },
      {
        title: "文字宽度",
        type: "number",
        multiShow: true,
        option: {
          min: 0,
        },
        prop: "textWidth",
        bindProp: m,
        event: "change",
        func: updateFunc("textWidth"),
      },
      {
        title: "水平偏移",
        type: "number",
        multiShow: true,
        option: {
          min: 0,
        },
        prop: "textLeft",
        bindProp: m,
        event: "change",
        func: updateFunc("textLeft"),
      },
      {
        title: "垂直偏移",
        type: "number",
        multiShow: true,
        option: {
          min: 0,
        },
        prop: "textTop",
        bindProp: m,
        event: "change",
        func: updateFunc("textTop"),
      },
      {
        title: "点位号",
        type: "input",
        option: {
          type: "textarea",
        },
        prop: "PointNumber",
        bindProp: m,
        event: "input",
        func: updateFunc("PointNumber"),
      },
      {
        title: "超出省略",
        type: "switch",
        prop: "ellipsis",
        bindProp: m,
        event: "change",
        func: updateFunc("ellipsis"),
      },
      {
        title: "隐藏文字",
        type: "switch",
        prop: "hiddenText",
        bindProp: m,
        event: "change",
        func: updateFunc("hiddenText"),
      },
      {
        title: "文字内容",
        type: "input",
        option: {
          type: "textarea",
        },
        prop: "text",
        bindProp: m,
        event: "input",
        func: updateFunc("text"),
      },
    ],
  },
  {
    title: "禁止",
    multiShow: false,
    children: [
      {
        title: "禁止输入",
        type: "switch",
        prop: "disableInput",
        bindProp: m,
        event: "change",
        func: updateFunc("disableInput"),
      },
      {
        title: "禁止旋转",
        type: "switch",
        prop: "disableRotate",
        bindProp: m,
        event: "change",
        func: updateFunc("disableRotate"),
      },
      {
        title: "禁止缩放",
        type: "switch",
        prop: "disableSize",
        bindProp: m,
        event: "change",
        func: updateFunc("disableSize"),
      },
      {
        title: "禁止锚点",
        type: "switch",
        prop: "disableAnchor",
        bindProp: m,
        event: "change",
        func: updateFunc("disableAnchor"),
      },
    ],
  },
];

// 计算展示字段列表
let showMap = computed(() => {
  if (multiPen.value) {
    return map.filter((i) => {
      i.multiShow
        ? (i.children = i.children.filter((item) => item.multiShow))
        : "";
      return i.multiShow;
    });
  } else if (!multiPen.value && otherProps) {
    const props = map.concat(otherProps.props);
 
    // 遍历 props 找到 title 是 "位置与大小"   然后在遍历 title 是 "状态" 把 showChildRef.value  的 值 赋值给 option 属性 
    props.forEach(item => {
      if (item.title === "位置与大小") {
        item.children.forEach(child => {
          if (child.title === "状态") {
            child.option = showChildRef.value;
          }
        });
      }
    });
    return props;
  }
});

function alignLeft() {
  const minX = Math.min(...activePen.target.map(p => p.x));
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, x: minX }, { render: false });
  }
  meta2d.render();
}

function alignRight() {
  const maxRight = Math.max(...activePen.target.map(p => p.x + p.width));
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, x: maxRight - pen.width }, { render: false });
  }
  meta2d.render();
}

function alignTop() {
  const minY = Math.min(...activePen.target.map(p => p.y));
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, y: minY }, { render: false });
  }
  meta2d.render();
}

function alignBottom() {
  const maxBottom = Math.max(...activePen.target.map(p => p.y + p.height));
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, y: maxBottom - pen.height }, { render: false });
  }
  meta2d.render();
}

function alignVCenter() {
  const centerY = (Math.min(...activePen.target.map(p => p.y)) + Math.max(...activePen.target.map(p => p.y + p.height))) / 2;
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, y: centerY - pen.height / 2 }, { render: false });
  }
  meta2d.render();
}

function alignHCenter() {
  const centerX = (Math.min(...activePen.target.map(p => p.x)) + Math.max(...activePen.target.map(p => p.x + p.width))) / 2;
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, x: centerX - pen.width / 2 }, { render: false });
  }
  meta2d.render();
}

function distributeH() {
  let pens = [...activePen.target].sort((a, b) => a.x - b.x);
  const left = pens[0].x;
  const right = pens[pens.length - 1].x;
  const totalWidth = pens.reduce((sum, p) => sum + p.width, 0);
  const gap = (pens[pens.length - 1].x - pens[0].x - totalWidth) / (pens.length - 1);
  let x = left;
  for (let pen of pens) {
    meta2d.setValue({ id: pen.id, x }, { render: false });
    x += pen.width + gap;
  }
  meta2d.render();
}

function distributeV() {
  let pens = [...activePen.target].sort((a, b) => a.y - b.y);
  const top = pens[0].y;
  const bottom = pens[pens.length - 1].y;
  const totalHeight = pens.reduce((sum, p) => sum + p.height, 0);
  const gap = (pens[pens.length - 1].y - pens[0].y - totalHeight) / (pens.length - 1);
  let y = top;
  for (let pen of pens) {
    meta2d.setValue({ id: pen.id, y }, { render: false });
    y += pen.height + gap;
  }
  meta2d.render();
}

function sameSize() {
  const w = activePen.target[0].width;
  const h = activePen.target[0].height;
  for (let pen of activePen.target) {
    meta2d.setValue({ id: pen.id, width: w, height: h }, { render: false });
  }
  meta2d.render();
}
</script>

<template>
  <div>
    <div v-if="multiPen" class="align-toolbar-wrapper">
      <div class="align-toolbar">
        <button @click="alignLeft" title="左对齐">
          <svg width="20" height="20"><rect x="2" y="4" width="3" height="12" fill="#333"/><rect x="7" y="6" width="11" height="8" fill="#bbb"/></svg>
        </button>
        <button @click="alignRight" title="右对齐">
          <svg width="20" height="20"><rect x="15" y="4" width="3" height="12" fill="#333"/><rect x="2" y="6" width="11" height="8" fill="#bbb"/></svg>
        </button>
        <button @click="alignTop" title="顶部对齐">
          <svg width="20" height="20"><rect x="4" y="2" width="12" height="3" fill="#333"/><rect x="6" y="7" width="8" height="11" fill="#bbb"/></svg>
        </button>
        <button @click="alignBottom" title="底部对齐">
          <svg width="20" height="20"><rect x="4" y="15" width="12" height="3" fill="#333"/><rect x="6" y="2" width="8" height="11" fill="#bbb"/></svg>
        </button>
        <button @click="alignVCenter" title="垂直居中">
          <svg width="20" height="20"><rect x="4" y="9" width="12" height="2" fill="#333"/><rect x="6" y="4" width="8" height="12" fill="#bbb"/></svg>
        </button>
        <button @click="alignHCenter" title="水平居中">
          <svg width="20" height="20"><rect x="9" y="4" width="2" height="12" fill="#333"/><rect x="4" y="6" width="12" height="8" fill="#bbb"/></svg>
        </button>
        <button @click="distributeH" title="等距分布左右">
          <svg width="20" height="20"><rect x="2" y="7" width="3" height="6" fill="#bbb"/><rect x="8.5" y="7" width="3" height="6" fill="#bbb"/><rect x="15" y="7" width="3" height="6" fill="#bbb"/><rect x="5" y="10" width="10" height="1" fill="#333"/></svg>
        </button>
        <button @click="distributeV" title="等距分布上下">
          <svg width="20" height="20"><rect x="7" y="2" width="6" height="3" fill="#bbb"/><rect x="7" y="8.5" width="6" height="3" fill="#bbb"/><rect x="7" y="15" width="6" height="3" fill="#bbb"/><rect x="10" y="5" width="1" height="10" fill="#333"/></svg>
        </button>
        <button @click="sameSize" title="相同大小">
          <svg width="20" height="20"><rect x="4" y="4" width="5" height="5" fill="#bbb"/><rect x="11" y="11" width="5" height="5" fill="#bbb"/><rect x="4" y="4" width="12" height="12" fill="none" stroke="#333" stroke-width="1"/></svg>
        </button>
      </div>
    </div>
    <Form :form-list="showMap"></Form>
  </div>
</template>

<style scoped>
.align-toolbar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.align-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
  justify-content: center;
  width: auto;
}
.align-toolbar button {
  width: 36px;
  height: 36px;
  background: #f4f8fb;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
  padding: 0;
}
.align-toolbar button:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64,158,255,0.15);
  background: #eaf4ff;
}
.align-toolbar svg {
  display: block;
}
.align-toolbar rect[fill="#333"] {
  fill: #409eff;
}
.align-toolbar rect[fill="#bbb"] {
  fill: #bfcbd9;
}
.align-toolbar rect[stroke="#333"] {
  stroke: #409eff;
}
</style>
