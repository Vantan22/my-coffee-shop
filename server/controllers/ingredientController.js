const ingedient = require('../models/Ingredient');
const errorMessage = require('../utils/errorMessages');

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await ingedient.find();
    if (!ingredients) {
      return res
        .status(404)
        .json({ message: errorMessage.INGREDIENT_NOT_FOUND });
    }
    return res.status(200).json({ ingredients });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createIngredient = async (req, res) => {
  const {
    name,
    category,
    unit,
    price,
    quantity,
    image,
    supplier,
    status,
    description,
  } = req.body;
  try {
    const ingredientExists = await ingedient.findOne({ name });
    if (ingredientExists) {
      return res.status(400).json({ message: errorMessage.INGREDIENT_EXISTS });
    }
    const ingredient = new ingedient({
      name,
      category,
      unit,
      price,
      quantity,
      image,
      supplier,
      status,
      description,
    });
    await ingredient.save();
    return res.status(201).json({ message: 'Ingredient created successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateIngredient = async (req, res) => {
  const {
    name,
    category,
    unit,
    price,
    quantity,
    image,
    supplier,
    status,
    description,
  } = req.body;
  const { id } = req.params;
  try {
    const ingredient = await ingedient.findByIdAndUpdate(id, {
      name,
      category,
      unit,
      price,
      quantity,
      image,
      supplier,
      status,
      description,
    });
    if (!ingredient) {
      return res
        .status(404)
        .json({ message: errorMessage.INGREDIENT_NOT_FOUND });
    }
    return res.status(200).json({ message: 'Ingredient updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await ingedient.findByIdAndDelete(id);
    if (!ingredient) {
      return res
        .status(404)
        .json({ message: errorMessage.INGREDIENT_NOT_FOUND });
    }
    return res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
