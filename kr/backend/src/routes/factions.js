import express from 'express';
import {
  getFactions,
  getFactionById,
  createFaction,
  updateFaction,
  deleteFaction,
} from '../controllers/factions.js';
// import { validateFaction } from '../middleware/validation.js';
// import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// // GET all factions
// router.get('/', asyncHandler(getFactions));

// // GET faction by ID
// router.get('/:id', asyncHandler(getFactionById));

// // POST create faction
// router.post('/', validateFaction, asyncHandler(createFaction));

// // PUT update faction
// router.put('/:id', validateFaction, asyncHandler(updateFaction));

// // DELETE faction
// router.delete('/:id', asyncHandler(deleteFaction));

export default router;
