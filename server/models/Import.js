const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true, // Bắt buộc phải có tên nhà cung cấp
  },
  date: {
    type: Date,
    required: true, // Bắt buộc phải có ngày nhập
    default: Date.now, // Nếu không nhập ngày, mặc định là ngày hiện tại
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Tham chiếu đến model Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Số lượng phải lớn hơn hoặc bằng 1
      },
      cost: {
        type: Number,
        required: true,
        min: 0, // Giá nhập phải lớn hơn hoặc bằng 0
      },
    },
  ],
  totalAmount: {
    type: Number,
    min: 0, // Tổng giá trị phải lớn hơn hoặc bằng 0
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Tham chiếu đến model Staff (nếu có)
  },
  notes: {
    type: String,
  },
});

// Tính toán tổng giá trị phiếu nhập trước khi lưu
importSchema.pre('save', async function (next) {
  try {
    let total = 0;
    for (const item of this.items) {
      total += item.quantity * item.cost;
    }
    this.totalAmount = total;
    next();
  } catch (error) {
    next(error);
  }
});

const Import = mongoose.model('Import', importSchema);

module.exports = Import;
