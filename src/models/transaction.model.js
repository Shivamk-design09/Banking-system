const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transition must be associated with a from account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transiton must be associated with a from account"],
        index: true
    },
    status: {
        type: String,
        enum: {
            value: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either Pending,completed, failed,reversed"
        },
        default: "Pending"
    },
    amount: {
        type: Number,
        required: [true, "amount is required for doing transation"],
        min: [0, "Transation amount can not be negative"],
    },
    idempotencyKey: {
        type: String,
        required: [true, "IdemyPotency key is required for creating a transation"],
        index: true,
        unique: true
    }
}, { timestamps: true })


const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports = transactionModel


// idemptency key is something which se generate while someone do a payment and it generate one time