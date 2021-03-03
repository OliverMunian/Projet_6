const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: Number, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl : {type: String, required: true},
});

module.exports = mongoose.model('Thing', thingSchema);