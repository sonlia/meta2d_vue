<script setup>
import Icons from "./Icons.vue";
import Meta2d from "./Meta2d.vue";
import Setting from "./Setting.vue";
import changHistory from "./changHistory.vue";
import  {lockStatus} from "../data/defaultsConfig.js"
import { watch } from "vue";

watch(lockStatus,()=>{
  console.log(lockStatus.value, "lockStatus");
})``
</script>

<template>
  <div class="main">
    <Icons></Icons>
    <Meta2d></Meta2d>
    <Setting v-show="lockStatus==0"></Setting>
    <changHistory v-show="lockStatus!=0"></changHistory>
  </div>
</template>

<style scoped>

.main{
  flex:1;
  height: calc(100% - 58px);
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}


</style>