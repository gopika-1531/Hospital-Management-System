import express from 'express';
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

export default router;
