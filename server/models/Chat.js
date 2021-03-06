const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: Array,
    plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    type: {
        type: String,
        enum: ["Plan", "Friend"]
    }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
