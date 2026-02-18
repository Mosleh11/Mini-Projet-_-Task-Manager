import mongoose, { Schema, Document } from 'mongoose';

// 1. L'Interface TypeScript
export interface IMovie extends Document {
  title: string;
  director: string;
  year: number;
  genre: string;
  duration: number;
  poster?: string;
  description?: string;
}

// 2. Le Schéma Mongoose 
const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    poster: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

// 3. L'Export du Modèle
export default mongoose.model<IMovie>('Movie', MovieSchema);