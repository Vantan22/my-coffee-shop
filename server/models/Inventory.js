const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
  quantity: Number,
  date: Date // Ngày cập nhật
});

module.exports = mongoose.model("Inventory", inventorySchema)