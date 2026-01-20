const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Issue = require('./models/Issue');

dotenv.config();

const landLocations = [
    { lat: 6.9271, lng: 79.8612, name: "Maradana" },
    { lat: 6.9044, lng: 79.8540, name: "Kollupitiya (Inland)" },
    { lat: 6.9117, lng: 79.8646, name: "Town Hall" },
    { lat: 6.8969, lng: 79.8760, name: "Thimbirigasyaya" },
    { lat: 6.8742, lng: 79.8606, name: "Wellawatte" },
    { lat: 6.8833, lng: 79.8833, name: "Nugegoda" },
    { lat: 6.9167, lng: 79.8473, name: "Pettah" },
    { lat: 6.9333, lng: 79.8667, name: "Borella" },
    { lat: 6.9000, lng: 79.9000, name: "Battaramulla" },
    { lat: 6.8500, lng: 79.8800, name: "Dehiwala" }
];

const seedData = async () => {
    try {
        await connectDB();
        // console.log('MongoDB Connected via config');

        // Clear Database
        await Issue.deleteMany({});
        console.log('Database Cleared');

        // Pending Issues
        const pendingImages = [
            "/seed_images/pothole.png",
            "/seed_images/garbage.png",
            "/seed_images/flood.png",
            "/seed_images/street_light.png",
            "/seed_images/collapse.png"
        ];

        const pendingTitles = [
            "Deep Pothole near School",
            "Garbage Pileup on Main Rd",
            "Flooded Intersection",
            "Broken Street Lamp",
            "Road Collapse Warning"
        ];

        const pendingCategories = ["Pothole", "Garbage", "Flood", "Street Light", "Other"];
        const pendingDescriptions = [
            "A very deep pothole causing traffic slowdowns near the school entrance.",
            "Large pile of uncollected garbage blocking the sidewalk.",
            "Intersection completely flooded after heavy rain.",
            "Street lamp has been flickering and is now completely out.",
            "Part of the road edge is collapsing into the canal."
        ];

        const pendingIssues = [];
        for (let i = 0; i < 5; i++) {
            const loc = landLocations[i];
            pendingIssues.push({
                title: pendingTitles[i],
                description: pendingDescriptions[i],
                category: pendingCategories[i],
                status: "Open",
                latitude: loc.lat,
                longitude: loc.lng,
                imageUrl: pendingImages[i]
            });
        }

        await Issue.insertMany(pendingIssues);
        console.log('Pending Issues Inserted');

        // Resolved Issues
        const resolvedIssues = [];
        const categories = ["Pothole", "Garbage", "Street Light", "Drainage"];
        const titles = ["Fixed Pothole at Borella", "Cleared Drain", "Repaired Street Lamp", "Removed Garbage Pile", "Road Patching Complete", "Drainage Unblocked", "New Street Light Installed", "Debris Cleared", "Sidewalk Repaired", "Manhole Cover Replaced"];

        for (let i = 0; i < 10; i++) {
            // Use modulo to cycle through locations safely
            const loc = landLocations[i % landLocations.length];

            resolvedIssues.push({
                title: titles[i],
                description: `Resolved issue reported by community in ${loc.name}.`,
                category: categories[Math.floor(Math.random() * categories.length)],
                status: "Resolved",
                latitude: loc.lat,
                longitude: loc.lng,
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
