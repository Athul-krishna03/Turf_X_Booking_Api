import { Schema } from "mongoose";
import { ITurfModel } from "../models/turf.model";

export const TurfSchema = new Schema<ITurfModel>(
  {
    turfId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String 
    },
    email: { 
      type: String, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String
    },
    isBlocked: { 
      type: Boolean, 
      default: false 
    },
    aminities: [{ type: String }],
    courtSize: { 
      type: String, 
      required: true 
    },
    games:[{type:String}],
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    status:{ 
      type:String,
      default:"Pending"
    },
    turfPhotos: [String],
    location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  }
  },
  {
    timestamps: true, 
  }
);
TurfSchema.index({ "location.coordinates": "2dsphere" })