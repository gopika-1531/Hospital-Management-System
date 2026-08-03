import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Report from '../models/Report.js';

const router = express.Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { patient: req.user._id };
    const reports = await Report.find(query).populate('doctor', 'name');
    res.json({ success: true, reports });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const report = await Report.create({ ...req.body, patient: req.user._id });
    res.status(201).json({ success: true, report });
  } catch (error) {
    next(error);
  }
});

export default router;
