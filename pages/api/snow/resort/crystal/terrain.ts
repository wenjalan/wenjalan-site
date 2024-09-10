import { TerrainStatus } from "@/app/snow/SnowAPI";
import { NextApiRequest, NextApiResponse } from "next";

const CRYSTAL_STATUS_URL = "https://alerts.quicktrax.com/feed?resortId=80&format=json"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(CRYSTAL_STATUS_URL)
  if (!response.ok) {
    res.status(500).json({ error: `Error fetching Terrain Status data for Crystal, WA from ${CRYSTAL_STATUS_URL}: ${response.status} ${response.statusText}`})
    return
  }


  const data = await response.json()
  const status: TerrainStatus = {
    liftsOpen: data.SnowReport.TotalOpenLifts,
    liftsTotal: data.SnowReport.TotalLifts,
    trailsOpen: data.SnowReport.TotalOpenTrails,
    trailsTotal: data.SnowReport.TotalTrails,
    terrainOpenPercent: Math.round(parseInt(data.SnowReport.OpenTerrainAcres) / parseInt(data.SnowReport.TotalTerrainAcres)),
  }
  res.status(200).json(status)
}

const SAMPLE = {
  "Name": "Crystal Mountain",
  "LastUpdate": "2023-11-30T15:52:41-0800",
  "GettingHere": "--",
  "OperatingStatus": "--",
  "SnowReport": {
    "LastUpdate": "2023-11-29T15:33:12-0800",
    "BaseConditions": "Wet Snow",
    "Report": "--",
    "AdditionalText": "--",
    "News": "\u003cp\u003e\u003cstrong\u003e11/28/23 \u003c/strong\u003e\u003c/p\u003e                                                                   \n\u003cp\u003eIt's time! Thanks to the hard work of our mountain operations and snowmaking teams, we are excited to announce the opening of the 23/24 winter season! Friday, December 1st, we will open the lower mountain exclusively for Crystal Legend, Roots, Premier Season Pass and Ikon Pass holders. Starting Saturday, December 2nd, we will open to all guests. We will open more terrain if conditions allow on Saturday and Sunday. \u003ca href=\"https://www.crystalmountainresort.com/media/news/2324-season-opening-details\"\u003eView the details of the announcement.\u003c/a\u003e\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eOTHER INFO:\u003c/strong\u003e\u003c/p\u003e\n\u003cp\u003e-\u003cstrong\u003eUPHILL TRAVEL NOTICE:\u003c/strong\u003e Uphill travel is allowed within the ski area prior to the start of the winter operating season. Heavy equipment and machinery including snowmaking, chairlifts, and tracked vehicles may be operating at any time. All users must avoid equipment, machinery, and work zones. There is no avalanche mitigation work being conducted and no rescue possible at this time.\u003c/p\u003e\n\u003cp\u003e-Construction is currently underway in the base area as part of the \u003ca href=\"https://blog.crystalmountainresort.com/reimagine\" target=\"_blank\"\u003eReimagine Crystal\u003c/a\u003e project. We are planning to open the Mountain Commons by spring of 2024 but are working with our construction crews and Mother Nature to open as soon as possible. Stay tuned for more updates to come!\u003c/p\u003e\n\u003cp\u003e-Check out\u003ca href=\"https://www.crystalmountainresort.com/plan-your-trip/whats-new-at-crystal#tab=arrival-experience\" target=\"_blank\"\u003e What's New \u003c/a\u003eand what to expect this coming winter.\u003c/p\u003e\n\u003cp\u003e-Starting this winter, Crystal Mountain will no longer accept cash as a form of payment. For guests who are unable to pay with a cashless form of payment (Apple Pay, Google Pay, Credit card, Debit card), we will have a cash-to-card ATM located in Cascade Lodge outside of Brand X Equipment. \u003c/p\u003e\n",
    "Alert": "--",
    "StormRadar": "--",
    "StormRadarButtonText": "--",
    "SafetyReport": "--",
    "LiftNotification": "--",
    "LastUpdatedLift": {
      "Mt. Rainier Gondola": "closed_for_season"
    },
    "OpenTerrainAcres": "0.0",
    "TotalTerrainAcres": "2600.0",
    "StormTotalIn": "0.0",
    "StormTotalCM": "0.0",
    "AnnualAverageSnowfallIn": "480.0",
    "AnnualAverageSnowfallCm": "1220.0",
    "SnowBaseRangeIn": "0 - 7",
    "SnowBaseRangeCM": "0 - 17",
    "SeasonTotalIn": "14.0",
    "SeasonTotalCm": "35.56",
    "SecondarySeasonTotalIn": "14.0",
    "SecondarySeasonTotalCm": "35.56",
    "OpenTerrainHectares": "0.0",
    "TotalTerrainHectares": "1052.0",
    "TotalOpenTrails": 0,
    "TotalTrails": 85,
    "TotalTrailsMakingSnow": 0,
    "GroomedTrails": 0,
    "TotalOpenLifts": 0,
    "TotalLifts": 11,
    "TotalOpenActivities": 0,
    "TotalActivities": 6,
    "TotalOpenParks": 0,
    "TotalParks": 0,
    "OpenNightParks": 0,
    "TotalNightParks": 0,
    "TotalParkFeatures": 0,
    "OpenNightTrails": 0,
    "TotalNightTrails": 0,
    "BaseArea": {
      "SinceLiftsClosedIn": "0.0",
      "BaseIn": "0.0",
      "BaseCm": "0.0",
      "Last24HoursIn": "0.0",
      "Last48HoursIn": "0.0",
      "Last72HoursIn": "--",
      "Last7DaysIn": "--",
      "SinceLiftsClosedCm": "0.0",
      "Last24HoursCm": "0.0",
      "Last48HoursCm": "0.0",
      "Last72HoursCm": "0.0",
      "Last7DaysCm": "0.0"
    },
    "MidMountainArea": {
      "SinceLiftsClosedIn": "0.0",
      "BaseIn": "7.0",
      "BaseCm": "17.78",
      "Last24HoursIn": "0.0",
      "Last48HoursIn": "0.0",
      "Last72HoursIn": "0.0",
      "Last7DaysIn": "7.0",
      "SinceLiftsClosedCm": "0.0",
      "Last24HoursCm": "0.0",
      "Last48HoursCm": "0.0",
      "Last72HoursCm": "0.0",
      "Last7DaysCm": "17.78"
    },
    "SummitArea": {
      "SinceLiftsClosedIn": "0.0",
      "BaseIn": "7.0",
      "BaseCm": "17.78",
      "Last24HoursIn": "0.0",
      "Last48HoursIn": "0.0",
      "Last72HoursIn": "0.0",
      "Last7DaysIn": "7.0",
      "SinceLiftsClosedCm": "0.0",
      "Last24HoursCm": "0.0",
      "Last48HoursCm": "0.0",
      "Last72HoursCm": "0.0",
      "Last7DaysCm": "17.78"
    },
    "GroomingActive": "false",
    "SnowMakingActive": "false",
    "ApiMetrics": "--",
    "TotalHalfpipes": 0,
    "OpenHalfpipes": 0
  },
  "MountainAreas": [
    {
      "Name": "Lower Mountain",
      "LastUpdate": "2023-04-21T21:25:13-0700",
      "OpenTrailsCount": 0,
      "TotalTrailsCount": 20,
      "Trails": [
        {
          "Name": "After Burn",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Boondoggle",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Broadway",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Discover Meadow",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Downhill",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Gold Hills",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Little Magoo",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Arwine's",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Chappelle's",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Magoo",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Mr. Magoo",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Queens",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Quicksilver",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Rolling Knolls",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Sideburn",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Snow Garden",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Stump Farm",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Tinkerbell",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Easy",
          "TrailIcon": "GreenCircle",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Upper Chappelle's",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Wally's Way",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        }
      ],
      "Lifts": [
        {
          "Id": 527,
          "Name": "Discovery",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:24:30-0700",
          "LiftType": "Triple Chair",
          "LiftIcon": "triple_chair",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 657,
          "Name": "Forest Queen Express",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:24:54-0700",
          "LiftType": "High-Speed Quad",
          "LiftIcon": "high_speed_quad",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 533,
          "Name": "Quicksilver",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:25:04-0700",
          "LiftType": "Quad Chair",
          "LiftIcon": "quad_chair",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 534,
          "Name": "Gold Hills",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:25:10-0700",
          "LiftType": "Triple Chair",
          "LiftIcon": "triple_chair",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 656,
          "Name": "Discovery Conveyor",
          "MountainAreaName": "Lower Mountain",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:25:21-0700",
          "LiftType": "Magic Carpet",
          "LiftIcon": "magic_carpet",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        }
      ],
      "Activities": [
        {
          "Name": "Discovery Meadow",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        },
        {
          "Name": "Lower Arwines",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        },
        {
          "Name": "Queens",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        },
        {
          "Name": "Quicksilver",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        }
      ]
    },
    {
      "Name": "Frontside",
      "LastUpdate": "2023-09-24T17:55:00-0700",
      "OpenTrailsCount": 0,
      "TotalTrailsCount": 37,
      "Trails": [
        {
          "Name": "Berry Patch",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Bill's Face",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Blazing Elk",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Buck",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Bull Run",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Deer Fly",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Exterminator",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Gandy's Run",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Green Valley",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Grubstake",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Howeirds",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Huckleberry",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Kelly's Gap Road",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Left Angle Trees",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Little Portillo",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Little Shot",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Ferk's",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lucky Shot",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Melby's",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Mel's Left",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Mel's Right",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Memorial Forest",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Middle Ferk's",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Pro Course",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Right Angle",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Right Angle Trees",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Sheppard",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Sled Face",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Sluiceway",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Snorting Elk",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Snorting Elk Bowl",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Sunnyside",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "The Doors",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Upper Arwine's",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Upper Ferk's",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Intermediate",
          "TrailIcon": "BlueSquare",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "West Face",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Willie's Run",
          "MountainAreaName": "Frontside",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        }
      ],
      "Lifts": [
        {
          "Id": 525,
          "Name": "Mt. Rainier Gondola",
          "MountainAreaName": "Frontside",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-09-24T17:55:00-0700",
          "LiftType": "Gondola",
          "LiftIcon": "gondola",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 526,
          "Name": "Chinook Express",
          "MountainAreaName": "Frontside",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-05-03T10:20:26-0700",
          "LiftType": "High-Speed 6 Chair",
          "LiftIcon": "high_speed_six_chair",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        },
        {
          "Id": 529,
          "Name": "Rainier Express",
          "MountainAreaName": "Frontside",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-05-03T10:20:21-0700",
          "LiftType": "High-Speed Quad",
          "LiftIcon": "high_speed_quad",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        }
      ],
      "Activities": [
        {
          "Name": "Little Shot",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        }
      ]
    },
    {
      "Name": "High Campbell",
      "LastUpdate": "2023-05-22T08:53:32-0700",
      "OpenTrailsCount": 0,
      "TotalTrailsCount": 3,
      "Trails": [
        {
          "Name": "Bear Pits",
          "MountainAreaName": "High Campbell",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Campbell Basin",
          "MountainAreaName": "High Campbell",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Powder Bowl",
          "MountainAreaName": "High Campbell",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "The Throne",
          "MountainAreaName": "High Campbell",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        }
      ],
      "Lifts": [
        {
          "Id": 531,
          "Name": "Green Valley",
          "MountainAreaName": "High Campbell",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-05-22T08:53:31-0700",
          "LiftType": "High-Speed Quad",
          "LiftIcon": "high_speed_quad",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        }
      ],
      "Activities": []
    },
    {
      "Name": "North",
      "LastUpdate": "2023-05-03T10:20:42-0700",
      "OpenTrailsCount": 0,
      "TotalTrailsCount": 22,
      "Trails": [
        {
          "Name": "Brand X",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Bruce's Bowl",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Employee Housing",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Glory Days",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "I-5",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Brand-X Cliff",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Lower Otto Bahn",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Morning Glory Bowl",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Niagaras",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Northway",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "O-Meadows",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Paradise",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Paradise Bowl",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Paradise Trees",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Penny Dawg's",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Pucker's Gulch",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Spook Hill",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "The Nose",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Upper Northway",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Upper Otto Bahn",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Whit's End",
          "MountainAreaName": "North",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Difficult",
          "TrailIcon": "BlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        }
      ],
      "Lifts": [
        {
          "Id": 532,
          "Name": "Northway",
          "MountainAreaName": "North",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-04-18T10:20:37-0700",
          "LiftType": "Double",
          "LiftIcon": "double",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        }
      ],
      "Activities": []
    },
    {
      "Name": "South",
      "LastUpdate": "2023-09-02T09:20:12-0700",
      "OpenTrailsCount": 0,
      "TotalTrailsCount": 3,
      "Trails": [
        {
          "Name": "A-Basin",
          "MountainAreaName": "South",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Silver Basin",
          "MountainAreaName": "South",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Silver King",
          "MountainAreaName": "South",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-05-27T07:25:33-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        },
        {
          "Name": "Three Way Peak",
          "MountainAreaName": "South",
          "StatusId": 30,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "UpdateDate": "2023-09-02T09:20:12-0700",
          "Difficulty": "Very difficult",
          "TrailIcon": "DoubleBlackDiamond",
          "SnowMaking": "No",
          "Grooming": "No",
          "NightSkiing": "No",
          "Moguls": "No",
          "Glades": "No",
          "Touring": "No",
          "Nordic": "No",
          "TerrainParkOnRun": "No",
          "RunOfTheDay": "No",
          "TrailSummary": "--",
          "TerrainParkFeatures": 0
        }
      ],
      "Lifts": [
        {
          "Id": 530,
          "Name": "Chair 6",
          "MountainAreaName": "South",
          "StatusId": 9,
          "Status": "Closed for Season",
          "StatusEnglish": "closed_for_season",
          "FirstTracks": "No",
          "UpdateDate": "2023-05-03T10:20:32-0700",
          "LiftType": "Double",
          "LiftIcon": "double",
          "Hours": {
            "Sunday": {
              "Open": "",
              "Close": ""
            },
            "Monday": {
              "Open": "",
              "Close": ""
            },
            "Tuesday": {
              "Open": "",
              "Close": ""
            },
            "Wednesday": {
              "Open": "",
              "Close": ""
            },
            "Thursday": {
              "Open": "",
              "Close": ""
            },
            "Friday": {
              "Open": "",
              "Close": ""
            },
            "Saturday": {
              "Open": "",
              "Close": ""
            }
          },
          "NightHours": "--",
          "WaitTime": "--",
          "WaitTimeString": "--",
          "WaitTimeStatus": "--"
        }
      ],
      "Activities": [
        {
          "Name": "Southback",
          "Status": "off_season",
          "StatusEnglish": "off-season",
          "LinkUrl": "https://www.crystalmountainresort.com/the-mountain/mountain-safety/uphill-travel",
          "UpdateDate": "2023-11-25T10:55:02-0800",
          "Hours": {
            "Sunday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Monday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Tuesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Wednesday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Thursday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Friday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            },
            "Saturday": {
              "Open": "Uphill Travel",
              "Close": "Open"
            }
          }
        }
      ]
    }
  ],
  "Roads": [],
  "CurrentConditions": {
    "Base": {
      "Name": "Base",
      "FeedSavedTime": "2023-11-30T16:49:57-0700",
      "PressureIN": "--",
      "PressureMB": "--",
      "TemperatureF": "30.0",
      "TemperatureC": "-1.5",
      "Humidity": "--",
      "DewPointF": "--",
      "DewPointC": "--",
      "WindDirection": "--",
      "WindStrengthMph": "--",
      "WindStrengthKph": "--",
      "WindGustsMph": "--",
      "WindGustsKph": "--",
      "WindChillF": "30.0",
      "WindChillC": "-1.1",
      "Skies": "Snow",
      "TemperatureHighF": "27.0",
      "TemperatureHighC": "-3.0",
      "TemperatureLowF": "21.0",
      "TemperatureLowC": "-6.0",
      "UvIndex": "--",
      "Conditions": "snow",
      "Icon": "rain_snow.svg",
      "Default": "false"
    },
    "MidMountain": {
      "Name": "Mid-Mountain",
      "FeedSavedTime": "2023-11-30T16:49:57-0700",
      "PressureIN": "--",
      "PressureMB": "--",
      "TemperatureF": "24.0",
      "TemperatureC": "-4.5",
      "Humidity": "--",
      "DewPointF": "--",
      "DewPointC": "--",
      "WindDirection": "--",
      "WindStrengthMph": "--",
      "WindStrengthKph": "--",
      "WindGustsMph": "--",
      "WindGustsKph": "--",
      "WindChillF": "24.0",
      "WindChillC": "-4.4",
      "Skies": "Snow",
      "TemperatureHighF": "27.0",
      "TemperatureHighC": "-3.0",
      "TemperatureLowF": "21.0",
      "TemperatureLowC": "-6.0",
      "UvIndex": "--",
      "Conditions": "snow",
      "Icon": "rain_snow.svg",
      "Default": "false"
    },
    "Summit": {
      "Name": "Summit",
      "FeedSavedTime": "2023-11-30T16:49:57-0700",
      "PressureIN": "--",
      "PressureMB": "--",
      "TemperatureF": "23.0",
      "TemperatureC": "-5.0",
      "Humidity": 94,
      "DewPointF": "22.0",
      "DewPointC": "-5.8",
      "WindDirection": "S",
      "WindStrengthMph": 15,
      "WindStrengthKph": 25,
      "WindGustsMph": 28,
      "WindGustsKph": 44,
      "WindChillF": "10.0",
      "WindChillC": "-12.2",
      "Skies": "Snow",
      "TemperatureHighF": "27.0",
      "TemperatureHighC": "-3.0",
      "TemperatureLowF": "21.0",
      "TemperatureLowC": "-6.0",
      "UvIndex": "--",
      "Conditions": "snow",
      "Icon": "rain_snow.svg",
      "Default": "true"
    }
  },
  "Forecast": {
    "FeedSavedTime": "2023-11-30T16:52:41-0700",
    "TempHighF": "27.0",
    "TempLowF": "21.0",
    "TempHighC": "-3.0",
    "TempHigh_c": "-3.0",
    "TempLowC": "-6.0",
    "ForecastedSnowIn": "3.0",
    "ForecastedSnowCm": "8.0",
    "DayComments": "Snow.  High near 28. Wind chill values between 15 and 20. South southeast wind around 9 mph.  Chance of precipitation is 80%. Total daytime snow accumulation of less than a half inch possible. ",
    "NightComments": "Snow. The snow could be heavy at times.  Low around 23. Wind chill values between 12 and 17. South wind 9 to 14 mph.  Chance of precipitation is 80%. New snow accumulation of 1 to 3 inches possible. ",
    "OneDay": {
      "skies": "Cloudy. Cloudy",
      "date": "2023-11-30",
      "temp_high_f": "27.0",
      "temp_low_f": "21.0",
      "temp_high_c": "-3.0",
      "temp_low_c": "-6.0",
      "forecasted_snow_in": 3,
      "forecasted_snow_cm": 8,
      "forecasted_snow_day_in": "0-1",
      "forecasted_snow_day_cm": "0-3",
      "forecasted_snow_night_in": "1-2",
      "forecasted_snow_night_cm": "3-5",
      "conditions": "cloudy",
      "icon": "bkn.svg",
      "avewind": {
        "mph": "5mph",
        "kph": "8kph",
        "dir": "S"
      }
    },
    "TwoDay": {
      "skies": "Blizzard. Blizzard",
      "date": "2023-12-01",
      "temp_high_f": "25.0",
      "temp_low_f": "25.0",
      "temp_high_c": "-4.0",
      "temp_low_c": "-4.0",
      "forecasted_snow_in": 19,
      "forecasted_snow_cm": 47,
      "forecasted_snow_day_in": "4-8",
      "forecasted_snow_day_cm": "10-20",
      "forecasted_snow_night_in": "7-11",
      "forecasted_snow_night_cm": "17-27",
      "conditions": "blizzard",
      "icon": "snow.svg",
      "avewind": {
        "mph": "14mph",
        "kph": "23kph",
        "dir": "W"
      }
    },
    "ThreeDay": {
      "skies": "Blizzard. Snow and Rain",
      "date": "2023-12-02",
      "temp_high_f": "28.0",
      "temp_low_f": "24.0",
      "temp_high_c": "-2.0",
      "temp_low_c": "-5.0",
      "forecasted_snow_in": 8,
      "forecasted_snow_cm": 21,
      "forecasted_snow_day_in": "2-4",
      "forecasted_snow_day_cm": "5-10",
      "forecasted_snow_night_in": "2-4",
      "forecasted_snow_night_cm": "5-11",
      "conditions": "blizzard",
      "icon": "snow.svg",
      "avewind": {
        "mph": "20mph",
        "kph": "31kph",
        "dir": "W"
      }
    },
    "FourDay": {
      "skies": "Snow and Rain. Scattered Thunderstorms",
      "date": "2023-12-03",
      "temp_high_f": "38.0",
      "temp_low_f": "35.0",
      "temp_high_c": "3.0",
      "temp_low_c": "1.0",
      "forecasted_snow_in": 0,
      "forecasted_snow_cm": 0,
      "forecasted_snow_day_in": "0",
      "forecasted_snow_day_cm": "0",
      "forecasted_snow_night_in": "0",
      "forecasted_snow_night_cm": "0",
      "conditions": "rain_snow",
      "icon": "snow.svg",
      "avewind": {
        "mph": "14mph",
        "kph": "23kph",
        "dir": "WSW"
      }
    },
    "FiveDay": {
      "skies": "Rain. Rain",
      "date": "2023-12-04",
      "temp_high_f": "41.0",
      "temp_low_f": "41.0",
      "temp_high_c": "5.0",
      "temp_low_c": "5.0",
      "forecasted_snow_in": 0,
      "forecasted_snow_cm": 0,
      "forecasted_snow_day_in": "0",
      "forecasted_snow_day_cm": "0",
      "forecasted_snow_night_in": "0",
      "forecasted_snow_night_cm": "0",
      "conditions": "rain",
      "icon": "rain.svg",
      "avewind": {
        "mph": "9mph",
        "kph": "14kph",
        "dir": "SSW"
      }
    }
  },
  "ParkingLots": [
    {
      "GeneralLots": ""
    }
  ],
  "LayoutOptions": {
    "soldOut": "false",
    "PrimaryWeather": "toggle_48",
    "SecondaryWeather": [
      "toggle_overnight",
      "toggle_24",
      "season_total"
    ],
    "Weather": [
      "toggle_overnight",
      "toggle_24",
      "season_total"
    ],
    "SnowfallChart": "false",
    "Disclaimer": "--",
    "Maps": [
      {
        "Title": "Resort Map",
        "MapUrl": "https://www.crystalmountainresort.com/-/media/crystal/images/maps/2324/2324-resort-map-full.jpg",
        "MapType": "image",
        "ThumbnailUrl": "https://www.crystalmountainresort.com/-/media/crystal/images/maps/2324/2324-resort-map-thumb.jpg"
      },
      {
        "Title": "Northway Insert",
        "MapUrl": "https://www.crystalmountainresort.com/-/media/crystal/images/maps/2324/2324-northway-map-full.jpg",
        "MapType": "image",
        "ThumbnailUrl": "https://www.crystalmountainresort.com/-/media/crystal/images/maps/2324/2324-northway-map-thumb.jpg"
      }
    ],
    "AdditionalResources": [
      {
        "Title": "View Webcams",
        "Url": "https://www.crystalmountainresort.com/the-mountain/mountain-report-and-webcams/webcams"
      },
      {
        "Title": "Purchase Lift Tickets",
        "Url": "https://www.crystalmountainresort.com/plan-your-trip/tickets-and-passes/day-tickets/winter-lift-tickets"
      },
      {
        "Title": "View Lessons",
        "Url": "https://www.crystalmountainresort.com/plan-your-trip/ski-and-snowboard-lessons"
      },
      {
        "Title": "View Equipment Rentals",
        "Url": "https://www.crystalmountainresort.com/plan-your-trip/rental-and-demo-equipment"
      },
      {
        "Title": "Download Crystal App",
        "Url": "https://www.crystalmountainresort.com/media/mobile-app"
      }
    ]
  },
  "DigitalSignage": "--",
  "PatrolHours": {
    "Sunday": {
      "Open": "",
      "Close": ""
    },
    "Monday": {
      "Open": "",
      "Close": ""
    },
    "Tuesday": {
      "Open": "",
      "Close": ""
    },
    "Wednesday": {
      "Open": "",
      "Close": ""
    },
    "Thursday": {
      "Open": "",
      "Close": ""
    },
    "Friday": {
      "Open": "",
      "Close": ""
    },
    "Saturday": {
      "Open": "",
      "Close": ""
    }
  }
}