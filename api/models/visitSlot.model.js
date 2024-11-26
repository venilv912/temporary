import mongoose from "mongoose";

const visitSlotSchema = new mongoose.Schema(
    {
        buyerId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        listingId: {
            type: String,
            required: true,
        },
        buyerName: {
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
        date: {
            type: String,
            required: true,
        },
        visitSlot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

const VisitSlot = mongoose.model('VisitSlot', visitSlotSchema);

export default VisitSlot;