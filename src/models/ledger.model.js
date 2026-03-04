const mongoose = require("mongoose")
const { findOneAndUpdate, updateOne, deleteOne, deleteMany, updateMany } = require("./transaction.model")
/**
 * account
 */
// for accont which accoutn entry is this pass the account
// immutable is single source of truth which can not be modified 


//transaction
// then we will give the transacation like for which transaction is this amount


const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Account is register is required "],
        index: true,
        immutable: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for createing a ledge Entry"],
        immutable: true,
    },
    transation: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Transaction is required for createing a ledge Entry"],
        ref: "transaction",
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT"
        },
        require: [true, "Ledger Type is required"],
        immutable: true
    }
})


// ledger are immutable and can not be modified  
// give error if someOne tries to modified it

function preventLedgerModification(){
    throw new Error("Ledger are immutable and can not be modified or deleted later")
}


ledgerSchema.pre("findOneAndUpdate",preventLedgerModification)
ledgerSchema.pre("updateOne",preventLedgerModification)
ledgerSchema.pre("deleteOne",preventLedgerModification)
ledgerSchema.pre("remove",preventLedgerModification)
ledgerSchema.pre("deleteMany",preventLedgerModification)
ledgerSchema.pre("updateMany",preventLedgerModification)
ledgerSchema.pre("sfindOneAndDelete",preventLedgerModification)
ledgerSchema.pre("findOneAndReplace",preventLedgerModification)

const ledgerModel = mongoose.model("Ledger",ledgerSchema)

module.exports = ledgerModel



