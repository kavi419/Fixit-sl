const multer = require('multer');

// Configure storage
const storage = multer.memoryStorage();

// Initialize upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
});

module.exports = upload;
