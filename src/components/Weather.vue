<script setup>
import { defineProps } from 'vue';
import { temp, tempMax, tempMin, getCurrentTime, countryNameByCode, listWeatherImage } from '../utils';

const props = defineProps({
  dataFetching: Object,
});

const setWeatherImage = listWeatherImage[props.dataFetching?.weather[0].main] || 'src/assets/icon/weather/error.png';
const countryName = countryNameByCode[props.dataFetching?.sys.country] || 'Oops';
const [sunsetTime, sunsetDay] = getCurrentTime(props.dataFetching?.sys.sunset);

</script>

<template>
  <div class="bg-white pb-5 pt-2 px-10 flex items-end justify-between rounded-3xl main-weather transition-colors dark:bg-[#292727]">
    <div class="flex flex-col gap-5 mt-16">
      <div class="flex gap-5 justify-start items-center">
        <img :src="setWeatherImage" alt="weather-img" class="w-24" />
        <div class="transition-colors dark:text-slate-200">
          <h1 class="text-5xl relative font-semibold">{{ temp }}<span class="absolute -top-2 font-thin">°</span></h1>
          <p class="text-slate-500 transition-colors dark:text-slate-300">High {{ tempMax }}°C / Low {{ tempMin }}°C</p>
          <p class="text-slate-500 transition-colors dark:text-slate-300">{{ dataFetching?.weather[0].main }}</p>
        </div>
      </div>
      <h2 class="text-2xl font-semibold transition-colors dark:text-slate-200">{{ dataFetching?.name }}, {{ countryName }}</h2>
    </div>
    <div class="relative">
      <p class="font-bold transition-colors dark:text-slate-200">{{ sunsetTime }}</p>
      <p class="text-slate-500 transition-colors dark:text-slate-300">Sunset Time, {{ sunsetDay }}</p>
      <div class="group/item">
        <img src="../assets/icon/weather/info-light.png" alt="" class="absolute w-4 top-0 right-0 group-hover/item:cursor-pointer" />
        <img src="../assets/icon/weather/info-dark.png" alt="" class="absolute w-4 top-0 right-0 group-hover/item:cursor-pointer dark:hidden" />
        <p class="text-xs absolute -top-5 -right-14 w-max opacity-0 transition-opacity group-hover/item:opacity-100 dark:text-slate-300">Indonesia Time GMT+7</p>
      </div>
    </div>
  </div>
</template>
