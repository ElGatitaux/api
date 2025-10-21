import mongoose from "mongoose";

const IRLSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    quarter: { type: String, required: true }, // e.g. "Q1", "Q2", "Q3", "Q4"
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicates
IRLSchema.index({ year: 1, quarter: 1 }, { unique: true });

const IRL = mongoose.model("IRL", IRLSchema);

export default IRL;
