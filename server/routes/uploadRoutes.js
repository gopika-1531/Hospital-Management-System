import express from 'express';
import { handleUpload, upload } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, upload, handleUpload);

export default router;
