<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  dataFetching: Object,
  summarySearch: Array,
});
const emits = defineEmits(['deleteSummary', 'expandSummary']);
</script>

<template>
  <div class="relative flex flex-col flex-wrap gap-2 w-4/5 overflow-hidden">
    <h1 class="font-semibold transition-colors transition-colors dark:text-slate-200">Searching Summary</h1>
    <TransitionGroup name="list" tag="ul" class="flex gap-6 relative">
      <div v-if="!summarySearch.length" class="bg-white h-80 w-full flex justify-center items-center card-temporary rounded-3xl transition-colors dark:bg-[#292727]">
        <h1 class="text-slate-600 transition-colors transition-colors dark:text-slate-200">Your Latest Searching will appear...</h1>
      </div>
      <li
        v-for="(summary, index) in summarySearch"
        :key="summary.id"
        class="group/item relative flex flex-col justify-center items-center gap-5 py-8 px-5 rounded-3xl card bg-white w-72 overflow-hidden transition-colors dark:bg-[#292727]"
      >
        <div class="absolute opacity-0 w-full h-full transition-all group-hover/item:opacity-100 bg-white/[.85] transition-all dark:bg-[#292727]/[.85]">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center">
            <button @click="emits('expandSummary', summary.cityName)" class="group/subitem relative flex justify-center items-center gap-5 w-14 py-4 rounded-full bg-discord text-black transition-all  hover:bg-discord-500 hover:w-24 hover:delay-200">
              <img src="../assets/icon/weather/expand-white.png" alt="" class="absolute transition-all group-hover/subitem:-translate-x-7 group-hover/subitem:delay-200 w-4"/>
              <p class="absolute text-xs text-slate-100 transition-all opacity-0 group-hover/subitem:translate-x-4 group-hover/subitem:opacity-100 group-hover/subitem:delay-200">Expand</p>
            </button>
            <button @click="emits('deleteSummary', index + 1)" class="group/subitem relative flex justify-center items-center gap-5 w-14 py-4 rounded-full bg-discord text-black transition-all hover:bg-discord-500 hover:w-24 hover:delay-200">
              <img src="../assets/icon/weather/delete-white.png" alt="" class="absolute transition-all group-hover/subitem:-translate-x-7 group-hover/subitem:delay-200 w-4"/>
              <p class="absolute text-xs text-slate-100 transition-all opacity-0 group-hover/subitem:translate-x-4 group-hover/subitem:opacity-100 group-hover/subitem:delay-200">Delete</p>
            </button>
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-lg transition-colors dark:text-slate-200">{{ summary.cityName }}</h1>
        </div>
        <div class="flex flex-col justify-center items-center gap-5">
          <img class="w-16" :src="summary.image" alt="" />
          <div class="text-center">
            <h1 class="text-3xl transition-colors dark:text-slate-200">{{ summary.temperature }}</h1>
          </div>
        </div>
        <ul class="flex justify-center items-center gap-5">
          <li v-for="highlight in summary.highlights" class="flex flex-col justify-center items-center gap-1">
            <img class="w-7" :src="highlight.image" :alt="highlight.name" />
            <div class="text-center leading-tight transition-colors dark:text-slate-200">
              <p>{{ highlight.value }}</p>
            </div>
          </li>
        </ul>
      </li>
    </TransitionGroup>
  </div>
</template>
