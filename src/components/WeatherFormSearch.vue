<script setup>
import { ref, defineEmits } from 'vue';

const city = ref();
const emits = defineEmits(['getWeatherData']);
const onSubmit = () => {
  emits('getWeatherData', city.value);
  city.value = '';
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="relative">
    <div class="flex justify-start items-center gap-3 relative w-64">
      <img src="../assets/icon/weather/search.png" alt="" class="w-5 absolute left-4" />
      <input
        type="text"
        placeholder="Search for location..."
        class="w-full h-11 leading-7 bg-slate-100 rounded-xl pl-12 pr-5 focus:outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-sm transition-colors dark:bg-[#292727] dark:text-slate-200"
        v-model="city"
      />
    </div>
  </form>
</template>
