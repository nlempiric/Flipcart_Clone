const slugify = require("slugify");
const Product = require("../models/product");

const addProduct = (req, res) => {

  const { name, price, description, category, quantity  } = req.body;
  // console.log("name, price, description, category, quantity",name, price, description, category, quantity,req.user);
  try
  {
    let productPictures = [];

    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const product = new Product({
      name: name,
      slug: slugify(name),
      price,
      quantity,
      description,
      productPictures:productPictures,
      category,
      createdBy: req.user.id,
    });
    product.save();
    
    return res.status(201).json({message:"Product Added", product, files: req.files });
  }
  catch(err)
  {
    return res.json({message:"error",error:err});

  } 

};

const getProduct = async (req, res) => {
  try {
    const cat = await Product.find({}).populate({path:"category",select:"_id name"});
    if (cat) {
      return res.status(200).json({ product: cat });
    } else {
      return res.json({ message: "No Categories" });
    }
  } catch (err) {
    return res.status(201).json({ message: "Failed" });
  }
};

module.exports = { addProduct,getProduct };
