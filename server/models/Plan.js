const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const planSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: String,
    description: String,
    location: String,
    date: Date,
    limit: Number,
    hobby: String,
    confirmations: [{ type: Schema.Types.ObjectId, ref: 'PlanConfirmations' }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;