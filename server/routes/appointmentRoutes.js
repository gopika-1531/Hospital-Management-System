import express from 'express';
import { createAppointment, deleteAppointment, getAdminStats, getAppointments, updateAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAppointments);
router.get('/admin/stats', protect, authorizeRoles('admin'), getAdminStats);
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);

export default router;
