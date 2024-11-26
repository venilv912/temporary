import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import VisitSlot from "../models/visitSlot.model.js";
import { errorHandler } from "../utils/error.js";

export const search = async (req,res,next) =>
{
    const { searchQuery } = req.query;
    try {
        let query = {};
        
        if (searchQuery) {
          query = {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { city: { $regex: searchQuery, $options: 'i' } },
              { pinCode: { $regex: searchQuery, $options: 'i' } }
            ]
          };
          const properties = await Listing.find(query);
           return res.json(properties);
        }
        else
        {
            res.json({message: 'Could not find'});
        }
    
        
      } catch (err) {
        console.log(searchQuery);
        console.error('Server error:', err);
        next(err);
        res.status(302).json({ message: 'Error fetching properties' });
      }
};

export const bookVisitSlot = async (req, res, next) => {
  const validBuyer = await User.findOne({_id: req.body.buyerId});
  const validSeller = await User.findOne({_id: req.body.sellerId});
  if (!validBuyer || !validSeller) return next(errorHandler(404, 'User Not Found!'));

  if (!req.body.date || req.body.date === '') return next(errorHandler(400, 'Date cannot be empty!'));

  if (!req.body.visitSlot || req.body.visitSlot === '') return next(errorHandler(400, 'Visit Slot cannot be empty!'));

  if (req.params.id !== req.user.id) return next(errorHandler(401, 'You can only book you own Visit Slots!'));

  try {
    const visitSlot = await VisitSlot.create(req.body);
    res.status(200).json(visitSlot);
  } catch (error) {
    next(error);
  }
};