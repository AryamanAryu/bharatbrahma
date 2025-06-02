import express from 'express';
import { createItinerary } from '../controllers/itineraryController.js';
const router = express.Router();

router.post('/', createItinerary);

export default router;
