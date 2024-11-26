import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            requred: true,
        },
        address: {
            type: String,
            requred: true,
        },
        city: {
            type: String,
            required: true,
        },
        pinCode: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        gym: {
            type: Boolean,
            required: true,
        },
        garden: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        tokenAmount: {
            type: Number,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
        visitSlots: {
            type: Array,
            required: true,
        },
    }, {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;