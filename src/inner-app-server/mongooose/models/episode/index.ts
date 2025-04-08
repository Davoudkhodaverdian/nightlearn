import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEpisode extends Document {
  title: string;
  description: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const episodeSchema = new Schema<IEpisode>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true }
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields

const Episode: Model<IEpisode> = mongoose.models.Episode || mongoose.model<IEpisode>('Episode', episodeSchema);
export default Episode;
