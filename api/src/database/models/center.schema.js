import mongoose from "mongoose";

const CenterSchema = mongoose.Schema ({
  id: {
    type: Number
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  time: {
    type: String,
  },
  image: {
    type: String,
  },
  big_image: {
    type: String,
  },
  latitud: {
    type: Number,
  },
  longitud: {
    type: Number,
  },
  province_id: {
    type: Number,
  },
  zone: {
    type: String,
  },
  province: {
    id: {
      type: Number},
    name: {
      type: String,
      },
},
}, {timestamps: true}
);

export const CenterModel = mongoose.model("Center", CenterSchema);