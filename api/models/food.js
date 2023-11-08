const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  userId: { type: String, required: [true] },
  name: { type: String, required: [true] },
  foodId: { type: String, required: [true]},
  carbs: {  type: Number},
  prots: {  type: Number },
  fats: {  type: Number },
  calorias: {  type: Number, required: [true]},
});


// convert to model
const Food = mongoose.model('Food', foodSchema);

module.exports = Food;