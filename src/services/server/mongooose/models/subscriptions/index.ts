import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define your interface
interface ISubscription extends Document {
    endpoint: string;
    expirationTime: Date;
    keys: Object
    createdAt: Date;
    updatedAt: Date;
}
// 2. Create a Schema corresponding to the interface
const subscriptionSchema = new Schema<ISubscription>({
    endpoint: { type: String, required: true },
    expirationTime: { type: Date, default: null },
    keys: { type: Object, required: true }
}, { timestamps: true }); // With this option, Mongoose automatically adds createdAt and updatedAt fields

// 3. Create a Model
const globalAny = global as any;
globalAny.SubscriptionModel = globalAny.SubscriptionModel || mongoose.model<ISubscription>('subscription', subscriptionSchema);

export default globalAny.SubscriptionModel;