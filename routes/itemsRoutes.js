const express = require("express");
const router = new express.Router();
const Item = require("../itemsClass");

router.get("/", (req, res, next) => {
  try {
    return res.json({ items: Item.getItemList() });
  } catch (err) {
    return next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ added: newItem });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    let foundItem = Item.findItem(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    let updatedItem = Item.updateItem(req.params.name, req.body);

    return res.json({ newItem: updatedItem });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    let deletedItem = Item.deleteItem(req.params.name);
    return res.json({ message: `Item ${req.params.name} deleted` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
