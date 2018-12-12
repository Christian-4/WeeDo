const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendConfirmationSchema = new Schema({
    status: {
        type: String,
        enum: ["Pendient", "Accept", "Denied"],
        default: "Pendient"
    },
    originUser: { type: Schema.Types.ObjectId, ref: 'User' },
    finalUser: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const FriendConfirmation = mongoose.model('FriendConfirmation', friendConfirmationSchema);
module.exports = FriendConfirmation;
