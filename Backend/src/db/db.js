const mongoose = require('mongoose');

function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("❌ MONGODB_URI is missing!");
        process.exit(1);
    }

    mongoose.connect(uri)
        .then(() => console.log("✅ MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
}

module.exports = connectDB;
