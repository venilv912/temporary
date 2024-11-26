import express from 'express';
import {bookVisitSlot, search} from '../controllers/property.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',search);
router.post('/book-visit-slot/:id', verifyToken, bookVisitSlot);

export default router;
