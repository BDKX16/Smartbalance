const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  userId: { type: String, required: [true] },
  foodId: { type: String, required: [true]},
  grams: {  type: Number, required: [true]},
  time: {type: Number, required: [true]}
});


// convert to model
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;