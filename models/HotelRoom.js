const mongoose = require('mongoose');

const dbURI = "mongodb://localhost:27017/test-database";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 0) { // Vérifie l'état de la connexion
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

// Définir le schéma et le modèle après s'être connecté
const hotelRoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
});

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

module.exports = { HotelRoom, connectDB };
