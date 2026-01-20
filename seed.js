const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Issue = require('./models/Issue');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();
        // console.log('MongoDB Connected via config');

        // Clear Database
        await Issue.deleteMany({});
        console.log('Database Cleared');

        // Pending Issues
        const pendingIssues = [
            {
                title: "Deep Pothole near School",
                description: "A very deep pothole causing traffic slowdowns near the school entrance.",
                category: "Pothole",
                status: "Open",
                latitude: 6.9271,
                longitude: 79.8612,
                imageUrl: "/seed_images/pothole.png"
            },
            {
                title: "Garbage Pileup on Main Rd",
                description: "Large pile of uncollected garbage blocking the sidewalk.",
                category: "Garbage",
                status: "Open",
                latitude: 6.9319,
                longitude: 79.8478,
                imageUrl: "/seed_images/garbage.png"
            },
            {
                title: "Flooded Intersection",
                description: "Intersection completely flooded after heavy rain.",
                category: "Flood",
                status: "Open",
                latitude: 6.9000,
                longitude: 79.8700,
                imageUrl: "/seed_images/flood.png"
            },
            {
                title: "Broken Street Lamp",
                description: "Street lamp has been flickering and is now completely out.",
                category: "Street Light",
                status: "Open",
                latitude: 6.8900,
                longitude: 79.8800,
                imageUrl: "/seed_images/street_light.png"
            },
            {
                title: "Road Collapse Warning",
                description: "Part of the road edge is collapsing into the canal.",
                category: "Other",
                status: "Open",
                latitude: 6.9100,
                longitude: 79.8900,
                imageUrl: "/seed_images/collapse.png"
            }
        ];

        await Issue.insertMany(pendingIssues);
        console.log('Pending Issues Inserted');

        // Resolved Issues
        const resolvedIssues = [];
        const categories = ["Pothole", "Garbage", "Street Light", "Drainage"];
        const titles = ["Fixed Pothole at Borella", "Cleared Drain", "Repaired Street Lamp", "Removed Garbage Pile", "Road Patching Complete", "Drainage Unblocked", "New Street Light Installed", "Debris Cleared", "Sidewalk Repaired", "Manhole Cover Replaced"];

        for (let i = 0; i < 10; i++) {
            resolvedIssues.push({
                title: titles[i],
                description: `Resolved issue reported by community.`,
                category: categories[Math.floor(Math.random() * categories.length)],
                status: "Resolved",
                latitude: 6.9 + (Math.random() * 0.05 - 0.025),
                longitude: 79.85 + (Math.random() * 0.05 - 0.025),
                imageUrl: null,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)) // Random date within last 30 days
            });
        }

        await Issue.insertMany(resolvedIssues);
        console.log('Resolved History Inserted');

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
