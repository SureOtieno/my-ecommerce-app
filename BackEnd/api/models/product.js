const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema(
  {
    _id: ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { String },
    productImage: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", productSchema);
