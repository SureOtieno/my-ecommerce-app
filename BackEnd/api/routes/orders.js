const express = require("express");

const router = express.Router();

const CheckAuth = require("../auth/auth_check");

const OrdersController = require("../controllers/Orders_ops");

router.get("/", CheckAuth, OrdersController.orders_get_all);

router.post("/", CheckAuth, OrdersController.orders_post_new);
router.get("/:orderId", CheckAuth, OrdersController.orders_get_one);
router.delete("/:orderId", CheckAuth, OrdersController.orders_delete_one);
router.patch("/:orderId", CheckAuth, OrdersController.orders_update_one);

module.exports = router;
