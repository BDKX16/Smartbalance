const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    userId: { type: String },
    dId: { type: String, unique: true, required: [true] },
    name: { type: String, required: [true],default:"balanza" },
});

// Validator
deviceSchema.plugin(uniqueValidator, { message: 'Error, device already exists.' });

// Schema to model.
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;