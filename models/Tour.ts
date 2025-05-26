import mongoose, { Document, Schema } from "mongoose";

export interface ITour extends Document {
  city: string;
  country: string;
  title: string;
  description: string;
  image?: string;
  places: string[];
  createdAt: Date;
  updatedAt: Date;
}

const tourSchema = new Schema<ITour>(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    places: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.index({ city: 1, country: 1 }, { unique: true });

const Tour = mongoose.models.Tour || mongoose.model<ITour>("Tour", tourSchema);

export default Tour;
