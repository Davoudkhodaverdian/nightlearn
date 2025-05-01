import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define your interface
export interface ICourse extends Document {
  teacher: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  name: string;
  title: string;
  price: number;
  image: String;
  description: String;
  episodes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create a Schema corresponding to the interface
const courseSchema = new Schema<ICourse>({
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }]
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields

// 3. Create a Model
const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export default Course;