const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  unit: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number },// soos luowngj ton kho
  image: { type: String },
  supplier: { type: String },
  status: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Ingredient", ingredientSchema)