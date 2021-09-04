const cartModel = require("../models/cart.model");
const userModel = require("../models/user.model");
module.exports.createCart = async (req, res) => {
  const { nom, nomEntreprise, numeroTel, author, email } = req.body;
  const user = await userModel.findOne({ _id: author });
  try {
    await cartModel.create(
      { nom, nomEntreprise, numeroTel, author, email },
      async (err, docs) => {
        if (!err) {
          await userModel.findByIdAndUpdate(
            { _id: author },
            {
              $set: {
                cart: [...user.cart, docs._id],
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) {
                res.status(201).json({
                  status: true,
                  contant: docs,
                });
              } else {
                res.status(401).json({
                  status: false,
                  contant: err,
                });
              }
            }
          );
        } else {
          res.status(400).json({
            status: false,
            contant: err,
          });
        }
      }
    );
  } catch (err) {
    res.status(401).json({
      status: false,
      content: err,
    });
  }
};

const getData = async (id) => {
    const cart =  await cartModel.findOne({_id: id})
    return cart
};

module.exports.getCarteByAuthorID = async (req, res) => {
  const authorID = req.params.id;
  try {
    await cartModel.find({ author: authorID }, async (err, docs) => {
      if (!err) {
        res.status(200).json({
          status: true,
          content: docs
        });
      } else {
        res.status(400).json({
          status: false,
          content: err,
        });
      }
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      content: err,
    });
  }
};

module.exports.shareCart = async (req, res) => {
  const { cartID, authorID } = req.body;
  const cart = await cartModel.findOne({ _id: cartID });
  const user = await userModel.findOne({ _id: authorID });

  try {
    await userModel.findByIdAndUpdate(
      { _id: authorID },
      {
        $set: {
          cart: [...user.cart, cartID],
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.status(201).json({
            status: true,
            content: docs,
          });
        } else {
          res.status(400).json({
            status: false,
            content: err,
          });
        }
      }
    );
  } catch (err) {
    res.status(401).json({
      status: false,
      content: err,
    });
  }
};
