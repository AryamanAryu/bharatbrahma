import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  name: String,
  interests: [String],
  budget: Number,
  duration: Number,
  response: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Itinerary', itinerarySchema);
