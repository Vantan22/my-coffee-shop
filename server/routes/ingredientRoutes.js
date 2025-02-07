const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/ingredientController');

router.post('', protect, createIngredient);
router.get('', protect, getIngredients);
router.put('', protect, updateIngredient);

router.delete('/:id', protect, deleteIngredient);

module.exports = router;
