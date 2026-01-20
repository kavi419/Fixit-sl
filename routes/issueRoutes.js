const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// @route   POST api/issues/report
// @desc    Report a new issue with image upload
// @access  Public
router.post('/report', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, latitude, longitude } = req.body;
        let imageUrl = '';

        // Upload image to Cloudinary if it exists
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "fixit-sl",
            });
            imageUrl = result.secure_url;
        }

        // Create new issue
        const newIssue = new Issue({
            title,
            description,
            category,
            imageUrl,
            latitude,
            longitude,
        });

        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/issues
// @desc    Get all issues
// @access  Public
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });
        res.json(issues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route   PUT api/issues/:id/status
// @desc    Update issue status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        let issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        issue.status = status;
        await issue.save();

        res.json(issue);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
