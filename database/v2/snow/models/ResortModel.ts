import mongoose from "mongoose";

const ResortSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    enum: ["ikon", "epic"]
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  weather: {
    current: {
      temperature: {
        type: Number,
      },
      status: {
        type: String,
        enum: ["sunny", "cloudy", "snowing", "windy", "blizzard"]
      }
    },
    forecast: {
      snow: {
        type: [Number],
      }
    }
  },
  webcams: [
    {
      type: {
        type: String,
        enum: ["photo", "video"]
      },
      src: {
        type: String,
      },
      srcIsRedirect: {
        type: Boolean,
      },
    }
  ],
  sns: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

export default mongoose.models.Resort || mongoose.model("Resort", ResortSchema);