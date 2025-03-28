import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define your interface
export interface ISubscription extends Document {
    endpoint: string;
    expirationTime: Date;
    keys: Object
    created_at: Date;
    updated_at: Date;
}
// 2. Create a Schema corresponding to the interface
const subscriptionSchema = new Schema<ISubscription>({
    endpoint: { type: String, required: true, unique: true },
    expirationTime: { type: Date, default: null },
    keys: { type: Object, required: true }
}, { timestamps: true }); // With this option, Mongoose automatically adds created_at and updated_at fields

// 3. Create a Model
const Subscription: Model<ISubscription> = mongoose.models.subscription || mongoose.model<ISubscription>('subscription', subscriptionSchema);

export default Subscription;