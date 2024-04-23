import mongoose from "mongoose";

const PlanSchema = mongoose.Schema({
    name: {
      type: String,
      minlength: 18,
      maxlength: 60,
    },
    mainBenefits: {
      type: [String]
    },
    otherBenefits:{
      type: [String],
      allownull: true
    },
    subsidies: {
      type: [String],
      allownull: true,
    },
    price:{
      type: Number,
      allownull: false,
    },
});

export const PlanModel = mongoose.model("Plan", PlanSchema);