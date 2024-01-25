<script setup>
import { ref, defineProps } from 'vue';
import { getCurrentTime } from '@/utils';

const props = defineProps({
  dataFetching: Object
})

const [sunsetTime = time] = getCurrentTime(props.dataFetching?.sys.sunset)
const [sunriseTime = time] = getCurrentTime(props.dataFetching?.sys.sunrise)

const listHighlights = ref([
  {
    id: 1,
    name: 'Humidity',
    value: `${props.dataFetching?.main.humidity}%`,
    image: 'src/assets/icon/weather/humidity-color.png'
  },
  {
    id: 2,
    name: 'Wind',
    value: `${props.dataFetching?.wind.speed} km/h`,
    image: 'src/assets/icon/weather/wind-color.png'
  },
  {
    id: 3,
    name: 'Feels like',
    value: `${Math.round( props.dataFetching?.main.feels_like / 10 )}°C`,
    image: 'src/assets/icon/weather/temperature-color.png'
  },
  {
    id: 4,
    name: 'Sunset',
    value: sunsetTime,
    image: 'src/assets/icon/weather/sunset-color.png'
  },
  {
    id: 5,
    name: 'Sunrise',
    value: sunriseTime,
    image: 'src/assets/icon/weather/sunrise-color.png'
  },
  {
    id: 6,
    name: 'Pressure',
    value: `${props.dataFetching?.main.pressure} Kpa`,
    image: 'src/assets/icon/weather/pressure-color.png'
  }
])
</script>


<template>
  <div class="flex flex-col gap-2">
    <h1 class="font-semibold transition-colors dark:text-slate-200">Highlight Current Weather</h1>
    <ul class="grid grid-cols-3 grid-rows-2 gap-y-5 px-5 justify-center items-center bg-white py-5 rounded-3xl transition-colors dark:bg-[#292727]">
      <li v-for="highlight in listHighlights" :key="highlight.id" class="flex justify-center items-center gap-3" >
        <img :src="highlight.image" :alt="highlight.name" class="w-9 fade" />
        <div>
          <p class="text-md font-medium tracking-wide transition-colors dark:text-slate-200">{{ highlight.name }}</p>
          <p class="text-md transition-colors dark:text-slate-300">{{ highlight.value }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
