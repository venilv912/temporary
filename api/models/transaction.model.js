import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        listingId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tokenAmount: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;