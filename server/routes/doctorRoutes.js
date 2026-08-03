import express from 'express';
import { approveDoctor, createDoctor, deleteDoctor, getDoctorById, getDoctors, listPendingDoctors, updateDoctor } from '../controllers/doctorController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/pending', protect, authorizeRoles('admin'), listPendingDoctors);
router.get('/:id', getDoctorById);
router.post('/', protect, authorizeRoles('doctor', 'admin'), createDoctor);
router.put('/:id', protect, updateDoctor);
router.delete('/:id', protect, deleteDoctor);
router.put('/:id/approve', protect, authorizeRoles('admin'), approveDoctor);

export default router;
