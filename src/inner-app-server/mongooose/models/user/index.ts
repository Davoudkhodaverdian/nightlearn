import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define your interface
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  password: string;
  admin: boolean;
  comments: Schema.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}
// 2. Create a Schema corresponding to the interface
const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'course' }]
}, { timestamps: true }); // With this option, Mongoose automatically adds created_at and updated_at fields

// pre middleware for hashing the password before save
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  // If the password hasn't changed, don't hash it
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});
// 3. Create a Model
const User: Model<IUser> = mongoose.models.user || mongoose.model<IUser>('user', userSchema);

export default User;