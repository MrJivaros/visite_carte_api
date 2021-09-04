const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
  },
  nomEntreprise: {
      type:String,
      trim: true
  },
  email : {
      type:String,
      trim: true
  },
  numeroTel:{
      type: String,
      trim: true
  },
  author: {
      type:String
  },
  share : {
      type: [String]
  }
},
{
    timestamps:true
});


const cartModel = mongoose.model('carts', cartSchema)

module.exports = cartModel
