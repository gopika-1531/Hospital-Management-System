import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
