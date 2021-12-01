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
      required: true
    },
    userHistories: {
      type: Array,
      required: true
    }
  },
  {
    collection: 'users'
  }
);
const userData = model("userData", userSchema)
module.exports = userData;