const mongoose = require('mongoose');

// Connects to MongoDB Atlas using the MONGO_URI env var. Fails fast on a bad
// connection string so misconfiguration surfaces at boot, not on first query.
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
