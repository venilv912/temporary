import express from 'express';
import { deleteUser, getUser, getUserListings, getUserPendingVisitors, getUserVisitsSlots, test, updateUser, updateVisitSlot } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/get/:id', getUser);
router.get('/visit-slots/:id', verifyToken, getUserVisitsSlots);
router.get('/pending-visitors/:id', verifyToken, getUserPendingVisitors);
router.post('/update-visit-slot/:id', verifyToken, updateVisitSlot);

export default router;
