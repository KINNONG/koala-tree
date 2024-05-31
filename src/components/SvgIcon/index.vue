<template>
    <svg
        :style="{ width, height }"
        :class="class">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script lang="ts" setup>
defineProps({
  // 是否显示
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "#000",
  },
  class: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style lang="scss" scoped></style>
