"use client";

const express = require("express");
const multer = require("multer");

const CheckAuth = require("../auth/auth_check");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype in ["image/png", "image/jpg", "image/jpeg"]) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
    filters: fileFilter,
  },
});

const Product = require("../models/product");
const ProductsController = require("../controllers/Products_ops");

router.get("/", ProductsController.products_get_all);

router.post(
  "/",
  CheckAuth,
  upload.single("productImage"),
  ProductsController.products_create_new
);

router.get("/:productId", ProductsController.products_get_one);
router.patch("/:productId", CheckAuth, ProductsController.products_update_one);
router.delete("/:productId", CheckAuth, ProductsController.products_delete_one);

module.exports = router;
