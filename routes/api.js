const express = require("express");
const products = require("../data/products");
const router = express.Router();

router.get("/products", (req, res) => {
  res.json({ status: "success", message: "Data produk berhasil diambil", data: products });
});

module.exports = router;
