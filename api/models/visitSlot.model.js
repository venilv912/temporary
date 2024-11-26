import mongoose from "mongoose";

const visitSlotSchema = new mongoose.Schema(
    {
        buyerId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            requred: true,
        },
        listingId: {
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
        type: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

const VisitSlot = mongoose.model('VisitSlot', visitSlotSchema);

export default VisitSlot;