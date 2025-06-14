import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define your interface
export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create a Schema corresponding to the interface
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true }
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields);

// 3. Create a Model
const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);
export default Category;
