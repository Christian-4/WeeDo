const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlanConfirmation = require('./PlanConfirmation')

const planSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: String,
    description: String,
    location: {},
    date: Date,
    limit: Number,
    hobby: String,
    image: String,
    type: String,
    confirmations: [{ type: Schema.Types.ObjectId, ref: 'PlanConfirmation' }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;