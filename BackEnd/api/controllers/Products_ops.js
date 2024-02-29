const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res) => {
  Product.find()
    .select("name price _id description productImage request")
    .exec()
    .then((docs) => {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const startIndex = (page - 1) * pageSize;
      const endeIndex = page * pageSize;

      const paginatedDocs = docs.slice(startIndex, endeIndex);
      res.json(paginatedDocs);
    })
    .catch((err) => {
      //console.log(err);
      res.json({
        error: err,
      });
    });
};

exports.products_create_new = (req, res, next) => {
  //console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });

  // res.json({
  //   message: "Created product",
  //   createdProduct: product,
  // });
};

exports.products_get_one = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id description request")
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc) {
        res.json({
          _id: doc._id,
          name: doc.name,
          description: doc.description,
          price: doc.price,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id,
          },
        });
      } else {
        res.json({ message: "No entry found matching that ID" });
      }
    })
    .catch((err) => {
      //console.log(err);
      res.json({
        error: err,
      });
    });
};

exports.products_update_one = (req, res) => {
  const id = req.params.productId;
  const updates = {};

  for (const ops of req.body) {
    updates[ops.propName] = ops.val;
  }

  Product.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }
      res.json({ product });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

exports.products_delete_one = (req, res) => {
  const id = req.params.productId;
  Product.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Product not found.",
        });
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });
};
