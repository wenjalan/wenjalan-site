export default interface ResortWeatherData {
  "name": string,
  "tempCurrent": number,
  "tempLow": number,
  "tempHigh": number,
  "snowLastDay": number | string,
  "snowLastWeek": number | string,
  "liftsOpen": number,
  "liftsTotal": number,
  "weather": "SUNNY" | "CLOUDY" | "SNOW" | "RAIN" | string,
}