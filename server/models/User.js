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
    userStocks: [
      String
    ],
  },
  {
    collection: 'users'
  }
);
const userData = model("userData", userSchema)
module.exports = userData;