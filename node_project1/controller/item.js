const Item = require("../models/Item");
const getAllItem = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(201).json({ items });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error.message);
  }
};

const getSingleItem = async (req, res) => {
  try {
    const { id: ItemId } = req.params;
    const item = await Item.findOne({ _id: ItemId });

    if (!item) {
      return res.status(404).json({ msg: `No item found :${ItemId}` }); //return must be there
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const item = await Item.findOneAndDelete({ _id: itemId });
    if (!item) {
      return res.status(404).json({ msg: `No item found :${ItemId}` }); //return must be there
    }
    res.status(200).json({ item: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await Item.findOneAndUpdate({ _id: itemID }, req.body,{new:true,runValidators:true});

    if (!item) {
      return res.status(404).json({ msg: `No item found :${ItemId}` }); //return must be there
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error.message);
  }  
};

module.exports = {
  getAllItem,
  getSingleItem,
  updateItem,
  deleteItem,
  createItem,
};
