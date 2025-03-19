import mongoose, { Schema, Document, Model } from 'mongoose';
// 1. Define your interface
export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
// 2. Create a Schema corresponding to the interface
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields

// 3. Create a Model
const users : Model<IUser> = mongoose.models.user || mongoose.model<IUser>('user', userSchema);

export default users;