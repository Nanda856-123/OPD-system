const mongoose = require('mongoose');

const additionalChargeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true }
});
const BillingSchema = new mongoose.Schema(
    {
        opdId: {
            type: String,
            required: true
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient",
            required: true
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor",
            required: true
        },
        consultation_fee: {
            type: Number,
            required: true
        },
        additional_charges: {
            type: [additionalChargeSchema],
            default: []
        },
        discount: {
            type: Number,
            default: 0
        },
        total_amount: {
            type: Number,
            required: true
        },
        payment_status: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid"
        },
        payment_method: {
            type: String,
            enum: ["cash", "card", "upi", null],
            default: null
        },
        // created_by: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "user",
        //     required: true
        // }
    },
    {
        timestamps: true // adds createdAt & updatedAt
    }
);

const BillingModel = mongoose.model("billing", BillingSchema);

module.exports = BillingModel;
