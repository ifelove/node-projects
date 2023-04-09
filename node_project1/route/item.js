const express = require("express");
const router = express.Router();

const {
  getAllItem,
  createItem,
  updateItem,
  deleteItem,
  getSingleItem,
} = require("../controller/item");

router.route("/").get(getAllItem).post(createItem);
router.route("/:id").get(getSingleItem).patch(updateItem).delete(deleteItem);

module.exports = router;
