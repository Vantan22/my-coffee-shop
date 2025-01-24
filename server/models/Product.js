const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  unit: { type: String },
  cost: { type: Number },
  quantity: { type: Number },// soos luowngj ton kho
  image: { type: String },
  status: { type: String },
  description: { type: String },
  others: { type: String },
});

module.exports = mongoose.model("Product", productSchema)