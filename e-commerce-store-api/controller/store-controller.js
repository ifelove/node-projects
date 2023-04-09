const getAllProductStatic = async (req, res) => {
  throw new Error("testing asyn error ");
  res.status(200).json({ msg: "product testing route" });
};

const getAllProduct = async (req, res) => {
  res.status(200).json({ msg: "product testing" });
};

module.exports = { getAllProduct, getAllProductStatic };
