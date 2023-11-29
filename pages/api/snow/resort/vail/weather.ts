import { WeatherStatus } from '@/app/snow/SnowAPI'
import { NextApiRequest, NextApiResponse } from 'next'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url
  const response = await fetch(url as string)

  if (!response.ok) {
    res.status(500).json({ error: `Error fetching Vail data from ${url}: ${response.status} ${response.statusText}` })
    return
  }

  const data = await response.json()
  const weatherData: WeatherStatus = {
    name: data.HeaderSettings.DefaultWeatherLocation.Name,

    tempCurrent: data.CurrentTempStandard,
    tempLow: data.LowTempStandard,
    tempHigh: data.HighTempStandard,

    snowLastDay: data.SnowReportSections[0].Depth.Inches,
    snowLastWeek: data.SnowReportSections[1].Description === "7 Day<br/>Snowfall" ? `${data.SnowReportSections[1].Depth.Inches} in` : "-",

    liftsOpen: data.OpenLifts,
    liftsTotal: data.TotalLifts,

    weather: parseWeatherShortDescription(data.WeatherShortDescription),
  }
  res.status(200).json(weatherData)
}

function parseWeatherShortDescription(weatherShortDescription: string): WeatherStatus["weather"] {
  const desc = weatherShortDescription.toLowerCase()
  if (desc.includes("sun") || desc.includes("clear")) return "SUNNY"
  if (desc.includes("snow")) return "SNOW"
  if (desc.includes("rain")) return "RAIN"
  if (desc.includes("cloud")) return "CLOUDY"

  // if the above doesn't match, return the original string (and later, add it to the above)
  return weatherShortDescription
}

const sample = {
  HeaderSettings: {
    EnableCart: true,
    SignInTitleText: 'Sign In',
    ShowSignIn: true,
    WeatherTitleForMobileNavigation: 'Weather and Conditions',
    ShowWeatherWidget: true,
    DefaultWeatherLocation: {
      Latitude: 38.92431,
      Longitude: -119.91641,
      LocationDisplayName: 'Heavenly',
      WeatherSponsorImage: null,
      WeatherSponsorLink: null,
      WeatherSponsorCopy: '',
      ElevationText: '',
      Elevation: '8536',
      Id: '9a1d2ace-150f-4700-82f7-fc1846b73702',
      Name: 'Heavenly',
      SortOrder: 0,
      ConvertedElevation: 8536
    },
    DailyForecastTitle: "TODAY'S FORECAST",
    ShowWeatherIconMenu: true,
    SnowReportTitle: 'SNOW AND WEATHER REPORT',
    ShowSnowReportSection: true,
    SnowReportSections: [
      [Object
      ],
      [Object
      ]
    ],
    LiftAndTerrainStatusTitle: 'LIFT & TERRAIN STATUS',
    ShowLiftAndTerrainStatusSection: false,
    ShowLiftsOpenSection: false,
    ShowLiftsGraph: false,
    LoginContent: {
      SignInCtaImage: [Object
      ],
      SignInCtaText: 'As an Epic Pass holder, you get 20% off food, lodging, lessons, rentals, and more. *Not eligible for Bike Passes.',
      CreateAccountCtaImage: [Object
      ],
      CreateAccountCtaText: 'Access your exclusive Epic Pass holder savings, including 20% off food, lodging, lessons, rentals, and more with Epic Mountain Rewards. *Not eligible for Bike Passes.',
      ContinueAsAGuestText: 'You can create an account at the end of checkout to save information for future purchases ',
      CreateAnAccountText: '',
      Id: '6d6061d7-8dd4-48b3-82d4-50b64019d9c4',
      Name: 'Global Login',
      SortOrder: 9000
    },
    ShowSearch: true,
    SearchLink: {
      Anchor: '',
      Class: '',
      Text: 'Search',
      Query: '',
      Title: '',
      Url: '/search/search-results.aspx',
      Target: '',
      TargetId: 'ebeb1547-0398-4796-86d6-2e008f7620cc',
      Type: 4,
      Style: ''
    },
    TopSearchesTitle: 'Top Searches',
    TopSearches: [
      [Object
      ],
      [Object
      ],
      [Object
      ],
      [Object
      ]
    ],
    Id: 'e7c1c0a9-48ac-4147-83ae-f33cdc8634dc',
    Name: 'Header Settings',
    SortOrder: 0
  },
  UnitOfMeasure: 1,
  WeatherShortDescription: 'Cloudy',
  CurrentTempStandard: 28,
  CurrentTempMetric: -3,
  HighTempStandard: 35,
  HighTempMetric: 2,
  LowTempStandard: 19,
  LowTempMetric: -8,
  SnowReportSections: [
    {
      Depth: [Object
      ], Description: '24 Hour<br/>Snowfall'
    },
    {
      Depth: [Object
      ], Description: 'Base<br/>Depth'
    }
  ],
  TotalLifts: 0,
  OpenLifts: 0,
  HoursOfOperationTitle: null,
  CurrentWorkDay: null,
  WeatherIcon: '10',
  MountainCamLink: {
    Anchor: '',
    Class: '',
    Text: 'Mountain Cams',
    Query: '',
    Title: '',
    Url: '/the-mountain/mountain-conditions/mountain-cams.aspx',
    Target: '',
    TargetId: '7dcff87e-2139-4358-8acd-7d988abc1f60',
    Type: 4,
    Style: ''
  },
  TerrainStatusLink: null,
  WeatherReportLink: {
    Anchor: '',
    Class: '',
    Text: 'Snow & Weather Report',
    Query: '',
    Title: '',
    Url: '/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
    Target: '',
    TargetId: '7920bcfe-7962-4859-b730-647b6c8ecaf8',
    Type: 4,
    Style: ''
  }
}