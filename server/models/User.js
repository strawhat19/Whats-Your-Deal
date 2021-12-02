const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userStocks: {
      type: Array,
<<<<<<< HEAD
      required: true
    },
    userHistories: {
      type: Array,
      required: true
    }
=======
      required: true,
    },  
    userHistories: {
      type: Array,
      required: true,
    },
>>>>>>> 8ffa71404f8077f087dce871f74cea934a025224
  },
  {
    collection: 'users'
  }
);
const userData = model("userData", userSchema)
module.exports = userData;