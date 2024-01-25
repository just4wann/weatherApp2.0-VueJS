<script setup>
import { ref, defineAsyncComponent } from 'vue';
import axios from 'axios';

import { API_KEY, BASE_URL } from '../constants';
import { countTemp, countryNameByCode, listWeatherImage } from '../utils';

// import Component
import FormSearch from '../components/FormSearch.vue';
import Location from '../components/Location.vue';
import Logo from '../components/Logo.vue';
import DarkModeToggle from '../components/DarkModeToggle.vue';
import Description from '../components/Description.vue';

// import Async Component
const MainWeather = defineAsyncComponent(() => import('../components/MainWeather.vue'));
const CardHighlight = defineAsyncComponent(() => import('../components/CardHighlight.vue'));
const CardWeather = defineAsyncComponent(() => import('../components/CardWeather.vue'));
const WeatherCondition = defineAsyncComponent(() => import('../components/WeatherCondition.vue'));
const Modal = defineAsyncComponent(() => import('../components/Modal.vue'));

// declare variable's
const weatherData = ref(null);
const cityName = ref('');
const listSummaryWeather = ref([]);
const key = ref(0);
const weatherSituation = ref('');
const isDarkMode = ref(false);
const notFound = ref(false);
const inputEmpty = ref(false);
const errorCode = ref(0);

// declare function's
const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    weatherData.value = response.data;
    console.log('fetch');
    cityName.value = weatherData.value.name;
    key.value = weatherData.value.id;
  } catch (error) {
    errorCode.value = Number(error.response.data.cod);
    console.log(error.response.data.message);
  }
};

const handleLocationData = async (locationParams) => {
  if (!locationParams) {
    console.log('no location');
    inputEmpty.value = true;
    return setTimeout(() => {
      inputEmpty.value = false;
    }, 3600);
  }
  await getWeatherData(locationParams);
  if (errorCode.value === 404) {
    console.log('error');
    notFound.value = true;
    errorCode.value = 0;
    return setTimeout(() => {
      notFound.value = false;
    }, 3600);
  }
  console.log('success');
  countTemp(weatherData.value.main.temp, weatherData.value.main.temp_max, weatherData.value.main.temp_min);
  isKeyExisted(weatherData.value);
  addWeatherSearched(weatherData.value)
};

const addWeatherSearched = (weatherPayload) => {
  listSummaryWeather.value.unshift({
    id: key.value,
    cityName: `${weatherPayload.name}, ${countryNameByCode[weatherPayload.sys.country]}`,
    image: listWeatherImage[weatherPayload.weather[0].main],
    temperature: `${Math.round(weatherPayload.main.temp / 10)}°C`,
    highlights: [
      {
        name: 'Humidity',
        image: 'src/assets/icon/weather/humidity-color.png',
        value: `${weatherPayload.main.humidity}%`,
      },
      {
        name: 'Wind',
        image: 'src/assets/icon/weather/wind-color.png',
        value: `${weatherPayload.wind.speed} km/h`,
      },
      {
        name: 'Pressure',
        image: 'src/assets/icon/weather/pressure-color.png',
        value: `${weatherPayload.main.pressure} Kpa`,
      },
    ],
  });
}

const isKeyExisted = (weatherPayload) => {
  weatherPayload.hasOwnProperty('rain')
    ? (weatherSituation.value = `Today will be rain with Average Rainfall ${weatherPayload.rain['3h'] ?? weatherPayload.rain['1h']} mm.`)
    : weatherPayload.hasOwnProperty('snow')
    ? (weatherSituation.value = `Today will be snow with Average Snowfall ${weatherPayload.snow['3h'] ?? weatherPayload.snow['1h']} mm.`)
    : (weatherSituation.value = 'Today is great, Enjoy your day.');
};

const handleDeleteSummary = (id) => {
  listSummaryWeather.value.splice(id, 1);
};

const handleExpandSummary = async (cityParams) => {
  const city = cityParams.split(',');
  await getWeatherData(city[0]);
  countTemp(weatherData.value.main.temp, weatherData.value.main.temp_max, weatherData.value.main.temp_min);
  isKeyExisted(weatherData.value);
}; 

const handleErrorModal = () => {
  notFound.value = false;
  errorCode.value = 0;
};
const handleWarningModal = () => (inputEmpty.value = false);

const setDarkModeToLocalStorage = (booleanParams) => {
  localStorage.setItem('darkMode', booleanParams);
  isDarkMode.value = booleanParams;
};
</script>

<template>
  <main :class="{ dark: isDarkMode }">
    <header class="flex justify-between items-center px-36 py-4 border-b-2 border-cyan-500 bg-white transition-colors dark:bg-[#121212]">
      <Logo />
      <div class="flex gap-7 items-center justify-center">
        <TransitionGroup name="fade-slide" tag="ul" class="relative flex gap-7">
          <Location :cityName="cityName" v-if="weatherData" key="$21" />
          <FormSearch @getWeatherData="handleLocationData" key="$22" />
        </TransitionGroup>
        <DarkModeToggle @setDarkModeToLocalStorage="setDarkModeToLocalStorage" />
      </div>
    </header>
    <section class="relative transition-colors dark:bg-[#121212] h-screen pt-8">
      <TransitionGroup name="slide" mode="out-in" tag="ul" class="absolute top-2 flex flex-col gap-2 right-14">
        <Modal v-if="notFound" @closeModal="handleErrorModal" :className="'error'" :sourceImage="'src/assets/icon/weather/error.png'" :description="'Location not found!'" key="$1" />
        <Modal v-if="inputEmpty" @closeModal="handleWarningModal" :className="'warning'" :sourceImage="'src/assets/icon/weather/warning.png'" :description="'Please input location'" key="$2" />
      </TransitionGroup>
      <Transition name="once" appear>
        <Description v-if="!weatherData" />
      </Transition>
      <section class="mx-36">
        <Transition name="zoom">
          <section v-if="weatherData">
            <MainWeather :dataFetching="weatherData" :key="key + 1" />
          </section>
        </Transition>
        <Transition name="zoom">
          <section v-if="weatherData" class="flex justify-between items-start mt-8 gap-8">
            <aside class="flex flex-col gap-5 w-2/3">
              <CardHighlight :dataFetching="weatherData" :key="key + 2" />
              <WeatherCondition :weatherSituation="weatherSituation" :key="key + 3" />
            </aside>
            <CardWeather :dataFetching="weatherData" :summarySearch="listSummaryWeather.slice(1, listSummaryWeather.length)" @deleteSummary="handleDeleteSummary" @expandSummary="handleExpandSummary" :key="key + 4" />
          </section>
        </Transition>
      </section>
    </section>
  </main>
</template>
