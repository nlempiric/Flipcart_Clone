const Category = require("../models/categories");
const slugify = require("slugify");

const addCategory = async (req, res) => {
  try {
    const slug = slugify(req.body.name);
    const getCat = await Category.findOne({ slug });

    if (!getCat) {
      const categryObj = {
        name: req.body.name,
        slug: slug,
      };
      if (req.body.parentId) {
        categryObj.parentId = req.body.parentId;
      }
      if (req.file) {
        categryObj.categoryImage = req.file.filename;
      }
      const cat = new Category(categryObj);
      cat.save();
      return res.status(201).json({ message: "Category Added", category: cat });
    } else {
      return res.status(201).json({ message: "Category Already Exist" });
    }
  } catch (err) {
    return res.status(201).json({ message: "Failed" });
  }
};

function createCategoryList(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
    // console.log("category parentid null:--", category);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
    // console.log("category parentid found:--", category);
  }

  for (let cat of category) {
    console.log("category", cat);
    if (cat.parentId) {
      categoryList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        parentId:cat.parentId,
        children: createCategoryList(categories, cat._id),
      });
    }
    else
    {

      categoryList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
  
        children: createCategoryList(categories, cat._id),
      });
    }
    // console.log("category list in foreach:-", categoryList);
  }
  return categoryList;
}

const getCategory = async (req, res) => {
  try {
    const cat = await Category.find({});
    if (cat) {
      const categoryList = createCategoryList(cat);
      return res.status(200).json({ category: categoryList });
    } else {
      return res.json({ message: "No Categories" });
    }
  } catch (err) {
    return res.status(201).json({ message: "Failed" });
  }
};

module.exports = { addCategory, getCategory };
