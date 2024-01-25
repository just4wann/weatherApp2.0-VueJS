<script setup>
import { defineEmits, defineProps } from 'vue';
const emits = defineEmits(['closeModal']);
const props = defineProps({
  className: String,
  description: String,
  sourceImage: String
})

</script>

<template>
  <div :class="className" class="relative flex justify-start items-center gap-2 w-56 py-3 px-5 bg-white text-slate-800 text-center inset-x-8 z-10 rounded-lg shadow-lg dark:bg-[#292727] dark:text-slate-200">
    <img :src="sourceImage" alt="close" class="w-7" />
    <p class="leading-tight text-sm">{{ description }}</p>
    <img src="../assets/icon/weather/close.png" alt="" @click="emits('closeModal')" class="absolute w-2 top-2 right-2 hover:cursor-pointer" />
  </div>
</template>
