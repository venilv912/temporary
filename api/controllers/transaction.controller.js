import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";

export const createTransaction = async (req, res, next) => {
    try {
        await Transaction.create(req.body);
        res.status(201).json('Transaction Completed Successfully');
    } catch (error) {
        next(error);
    }
};

export const getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({userId: req.params.userId, listingId: req.params.listingId});
        if (!transaction) res.status(204).json('No Transaction Found!');
        else res.status(200).json(transaction);
    } catch (error) {
        next (error);
    }
};