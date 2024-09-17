export type MountainResort = {
  name: string
  id: string
  url: string
  pass?: Pass
  location: ResortLocation
  weather?: Weather
  webcams?: Webcam[]
  sns?: SNS
}

export type Pass = "ikon" | "epic"

export type ResortLocation = {
  latitude: number
  longitude: number
}

export type Weather = {
  current: {
    temperature: number // celcius
    status?: WeatherStatus
  },
  forecast?: {
    snow: number[]
  }
}

export type WeatherStatus = "sunny" | "cloudy" | "snowing" | "windy" | "blizzard"

export type Webcam = {
  type: "photo" | "video"
  src: string
}

type SNS = {
  twitter?: string
  instagram?: string
}