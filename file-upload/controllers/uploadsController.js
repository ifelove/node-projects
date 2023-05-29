const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError=require('../errors')

const uploadProduct = async (req, res) => {
    //check if file exist
    //check format
    //check size
  console.log(req.files);
  if(!req.files){throw new CustomError.BadRequestError('Please upload image,no file uploaded')}
  const productImage = req.files.image;
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError(
      "Please upload Image"
    );
  }

const maxSize=1024 * 1024
if(productImage.size>maxSize){throw new CustomError.BadRequestError(`Please upload image smaller than ${maxSize}`);}

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

module.exports = { uploadProduct };
