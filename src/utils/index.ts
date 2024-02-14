import { LIST_COUNTRY_CODE } from '@/constants';

// Temperature Counting
export let temp: number = 0;
export let tempMax: number = 0;
export let tempMin: number = 0;
export const countTemp = (tempVal: number, tempMaxVal: number, tempMinVal: number) => {
  let start: number = 0;
  const stop: number = new Date().getTime();
  const handle = setInterval((): void => {
    if (new Date().getTime() - stop > 1000) {
      clearInterval(handle)
      return;
    }
    temp = start++;
    tempMax = start++;
    tempMin = start++;
  }, 25);
  setTimeout((): void => {
    temp = Math.round(tempVal / 10);
    tempMax = Math.round(tempMaxVal / 10);
    tempMin = Math.round(tempMinVal / 10);
  }, 1000);
};

// Convert UTC to Current Time
export const getCurrentTime = (utc: number) => {
  const timeInUTC = new Date(utc * 1000),
    weekday: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
interface Weather {
  Clouds: string,
  Clear: string,
  Rain: string,
  Thunderstorm: string,
  Snow: string,
  Haze: string,
  Mist: string
}
export const listWeatherImage: Weather = {
  Clouds: 'src/assets/icon/weather/clouds-strokeless.png',
  Clear: 'src/assets/icon/weather/clear-strokeless.png',
  Rain: 'src/assets/icon/weather/rain-strokeless.png',
  Thunderstorm: 'src/assets/icon/weather/thunder-strokeless.png',
  Snow: 'src/assets/icon/weather/snowflakes-strokeless.png',
  Haze: 'src/assets/icon/weather/haze-strokeless.png',
  Mist: 'src/assets/icon/weather/mist-strokeless.png',
}