const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Coffee", coffeeSchema);
