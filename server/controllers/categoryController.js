const Category = require('../models/Category');
const errorMessage = require('../utils/errorMessages');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: errorMessage.CATEGORY_NOT_FOUND });
    }
    return res.status(200).json({ categories });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: errorMessage.CATEGORY_EXISTS });
    }
    const category = new Category({ name, description });
    await category.save();
    return res.status(201).json({ message: 'Category created successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, {
      name,
      description,
    });
    if (!category) {
      return res.status(404).json({ message: errorMessage.CATEGORY_NOT_FOUND });
    }
    return res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: errorMessage.CATEGORY_NOT_FOUND });
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
