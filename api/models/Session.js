const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  content: {
    type: String,
    default: '',
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Session', sessionSchema);
