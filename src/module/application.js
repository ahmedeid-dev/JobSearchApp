import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Application from '../models/Application';
import cloudinary from '../config/cloudinary';
import { Router } from 'express';
import multer from 'multer';

const router = Router();

// Configure multer storage to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'resumes',
        format: async (req, file) => 'pdf',
        public_id: (req, file) => file.originalname.split('.')[0]
    }
});

const upload = multer({ storage: storage });

// Route to handle application submission
router.post('/apply', upload.single('userResume'), async (req, res) => {
    try {
        const { jobId, userId, userTechSkills, userSoftSkills } = req.body;
        const userResume = req.file.path; // URL of the uploaded file

        const newApplication = new Application({
            jobId,
            userId,
            userTechSkills: JSON.parse(userTechSkills),
            userSoftSkills: JSON.parse(userSoftSkills),
            userResume
        });

        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit application', error: error.message });
    }
});

// Export the router
export default router;
