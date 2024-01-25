<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  weatherSituation: String,
});
</script>

<template>
  <div class="bg-white rounded-3xl px-7 py-6 flex justify-between items-center   transition-colors dark:bg-[#292727]">
    <div class="flex flex-col gap-3">
      <h1 class="font-semibold transition-colors dark:text-slate-200">Condition Current Weather</h1>
      <div class="flex flex-col gap-1 transition-colors dark:text-slate-200">
        <p class="text-sm">{{ weatherSituation }}</p>
        <p class="text-xs italic tracking-wider font-thin text-slate-400 transition-colors dark:text-slate-300">Note: This Condition will change over time</p>
      </div>
    </div>
  </div>
</template>
