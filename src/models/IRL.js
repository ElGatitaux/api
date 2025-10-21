import mongoose from 'mongoose';

const IRLSchema = new mongoose.Schema({
  period: { type: String, required: true, unique: true }, // ex: "2025-T3"
  value: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now }
});

export default mongoose.model('IRL', IRLSchema);
