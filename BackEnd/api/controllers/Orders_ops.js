const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .populate("productId", "name")
    .exec()
    .then((docs) => {
      res.json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.productId,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });
};

exports.orders_post_new = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        res.json({
          message: "Invalid ProductId",
        });
      } else {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          productId: req.body.productId,
        });
        order.save().then((result) => {
          res.status(201).json({
            message: "Success!",
            fetchedOrder: result,
          });
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Product not found",
        error: err,
      });
    });
};

exports.orders_get_one = (req, res) => {
  const id = req.params.orderId;
  Order.findById(id)
    .populate("productId")
    .select("_id productId quantity")
    .exec()
    .then((result) => {
      if (!result) {
        res.json({
          message: "Order not found.",
        });
      } else {
        res.json({
          message: "Order fetched successfully",
          order: result,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/",
          },
        });
      }
    });
};

exports.orders_delete_one = (req, res) => {
  const id = req.params.orderId;
  Order.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Order not found.",
        });
      } else {
        res.json({
          message: "Order deleted.",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Invalid ID",
        error: err,
      });
    });
};

exports.orders_update_one = (req, res) => {
  const id = req.params.orderId;
  const updates = {};
  for (let ord of req.body) {
    updates[ord.propName] = ord.value;
  }
  Order.findByIdAndUpdate({ _id: id }, { $set: updates }, { new: true })
    .exec()
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: "Order not found.",
        });
      } else {
        res.status(201).json({
          message: "Order details updated",
          orderId: req.params.orderId,
        });
      }
    })
    .catch((err) => {
      return res.json({
        message: "Invalid ID",
        error: err,
      });
    });
};
