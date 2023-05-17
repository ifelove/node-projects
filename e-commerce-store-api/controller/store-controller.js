const Product = require("../models/store-model");

const getAllProductStatic = async (req, res) => {
  //throw new Error("testing asyn error ");
  const products = await Product.find({}).sort("name price");
  res.status(200).json({ products, nmbHits: products.length });
};

const getAllProduct = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const regEX = /\b(>|<|>=|<=|=)\b/g;

    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  if (company) {
    queryObj.company = company;
  }

  
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  console.log(queryObj);
  let result = Product.find(queryObj);

  if (sort) {
    console.log(sort);
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort(" createdAt");
  }

  if (fields) {
    console.log(fields);
    const fieldsList = fields.split(",").join(" ");
    console.log(fieldsList);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nmbHits: products.length });
};

module.exports = { getAllProduct, getAllProductStatic };
