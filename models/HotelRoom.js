const mongoose = require('mongoose');

// Chaîne de connexion à MongoDB
const dbURI = "mongodb://localhost:27017/test-database";

// Fonction pour établir la connexion à MongoDB
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) { // Vérifie si la connexion est inactive
            await mongoose.connect(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } else {
            console.log('Already connected to MongoDB');
        }
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

// Schéma et modèle pour les chambres d'hôtel
const hotelRoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
});

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

module.exports = { HotelRoom, connectDB };
