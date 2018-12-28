const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  image: String,
  confirmationCode: String,
  status: {
    type: String,
    enum: ["Disable", "Active"],
    default: "Active"
  },
  location: {},
  hobbies: Array,
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  planchats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  friendchats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  confirmations: [{ type: Schema.Types.ObjectId, ref: 'FriendConfirmation' }],
  sendRequestUser:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Plan' }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
