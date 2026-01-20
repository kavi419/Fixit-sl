const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Check if admin exists
        let admin = await User.findOne({ username: 'admin' });
        if (admin) {
            console.log('Admin already exists');
            process.exit();
        }

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        admin = new User({
            username: 'admin',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin Created: username=admin, password=admin123');
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
