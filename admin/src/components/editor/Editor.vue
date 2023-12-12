<template>
  <div id="myEditor">
    
  </div>
</template>

<script setup>
import {onMounted, defineEmits} from 'vue'
import E from "wangeditor"

const emit = defineEmits(["event"])
onMounted(() => {
  const editor = new E("#myEditor")
  editor.config.onchange = function (newHtml) {
    console.log("change 之后最新的 html", newHtml);
    emit("event", newHtml)
  };
  editor.config.onchangeTimeout = 500;
  editor.create()
})




</script>