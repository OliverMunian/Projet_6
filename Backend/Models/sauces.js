const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId : {type: String, required: true},
  manufacturer: { type: Number, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl : {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, required: true, default: 0},
  dislikes: {type: Number, required: true, default: 0},
  userLiked :{ type:[String], default:[]},
  userDisliked:{ type:[String], default:[]},
});

module.exports = mongoose.model('Thing', thingSchema);