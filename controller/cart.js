const Category = require("../models/categories");
const slugify = require("slugify");
const Cart = require("../models/cart");
const { propfind } = require("../routes/category");

const addCart = async (req, res) => {
  const {product,quantity} = req.body.cartItems;
  try {
    const cartfind = await Cart.findOne({ user: req.user.id });
    if (cartfind) {
      const isproductdound = cartfind.cartItems.find((c) => c.product == product);
      if (isproductdound) {
        isproductdound.quantity=isproductdound.quantity+quantity
        cartfind.save()
        return res.json({ message: "Quantity Updated", cartfind });
      } else {
        cartfind.cartItems.push(req.body.cartItems)
        cartfind.save()
        return res.status(201).json({ message: "CartItem Updated", cartfind });
      }
    } else {
      const cart = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });

      cart.save();
      return res
        .status(201)
        .json({ message: "Item Added To Cart", cart: cart });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { addCart };
