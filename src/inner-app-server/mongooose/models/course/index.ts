import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define your interface
export interface ICourse extends Document {
  teacher: mongoose.Types.ObjectId
  name: string;
  title: string;
  price: string;
  image: String;
  episodes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
// 2. Create a Schema corresponding to the interface
const courseSchema = new Schema<ICourse>({
  teacher: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  image: { type: String },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'episode' }]
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields

// 3. Create a Model
const Course: Model<ICourse> = mongoose.models.course || mongoose.model<ICourse>('course', courseSchema);
export default Course;