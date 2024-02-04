import { ref } from 'vue';
import { LIST_COUNTRY_CODE } from '@/constants';

// Temperature Counting
export const temp = ref(0);
export const tempMax = ref(0);
export const tempMin = ref(0);
export const countTemp = (tempVal, tempMaxVal, tempMinVal) => {
  let start = 0;
  const stop = new Date().getTime();
  setInterval(() => {
    if (new Date().getTime() - stop > 1000) {
      clearInterval();
      return;
    }
    temp.value = start++;
    tempMax.value = start++;
    tempMin.value = start++;
  }, 25);
  setTimeout(() => {
    temp.value = Math.round(tempVal / 10);
    tempMax.value = Math.round(tempMaxVal / 10);
    tempMin.value = Math.round(tempMinVal / 10);
  }, 1000);
};

// Convert UTC to Current Time
export const getCurrentTime = (utc) => {
  const timeInUTC = new Date(utc * 1000),
    weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    curDay = weekday[timeInUTC.getDay()],
    curHour = timeInUTC.getHours() > 12 ? timeInUTC.getHours() - 12 : timeInUTC.getHours(),
    curMinute = timeInUTC.getMinutes() < 10 ? '0' + timeInUTC.getMinutes() : timeInUTC.getMinutes(),
    curMeridiem = timeInUTC.getHours() > 12 ? 'PM' : 'AM';
  const time = `${curHour}.${curMinute} ${curMeridiem}`;
  const day = curDay;
  return [time, day];
};

// Country Code
export const countryNameByCode = LIST_COUNTRY_CODE.reduce((acc, cur) => ({ 
    ...acc, [cur.code]: cur.name
}), {});

// Weather Image
export const listWeatherImage = {
  Clouds: 'src/assets/icon/weather/clouds-strokeless.png',
  Clear: 'src/assets/icon/weather/clear-strokeless.png',
  Rain: 'src/assets/icon/weather/rain-strokeless.png',
  Thunderstorm: 'src/assets/icon/weather/thunder-strokeless.png',
  Snow: 'src/assets/icon/weather/snowflakes-strokeless.png',
  Haze: 'src/assets/icon/weather/haze-strokeless.png',
  Mist: 'src/assets/icon/weather/mist-strokeless.png',
}