const mongoose = require('mongoose');
const { HotelRoom, connectDB } = require('../models/HotelRoom');

describe('Hotel Room GET API Tests', () => {
    // Connecter à MongoDB avant tous les tests
    beforeAll(async () => {
        await connectDB(); // Établit la connexion
        await HotelRoom.deleteMany(); // Supprime toutes les données existantes
    });

    // Nettoyer la collection après chaque test
    afterEach(async () => {
        await HotelRoom.deleteMany(); // Nettoyer après chaque test
    });

    // Fermer la connexion après tous les tests
    afterAll(async () => {
        await mongoose.connection.close(); // Ferme la connexion
    });

    test('should create a new room (happy path)', async () => {
        const room = new HotelRoom({
            roomNumber: 101,
            roomType: 'Single',
            pricePerNight: 100,
        });

        const savedRoom = await room.save();
        expect(savedRoom.roomNumber).toBe(101);
        expect(savedRoom.roomType).toBe('Single');
    });

    test('create a room with wrong info', async () => {
        try {
            const room = new HotelRoom({
                roomNumber: 'Invalid', // Mauvais type
                roomType: 'Single',
                pricePerNight: 100,
            });
            await room.save();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test('should not create a room where roomNumber already exists', async () => {
        const room1 = new HotelRoom({
            roomNumber: 101,
            roomType: 'Single',
            pricePerNight: 100,
        });
        await room1.save();

        try {
            const room2 = new HotelRoom({
                roomNumber: 101, // Même numéro
                roomType: 'Double',
                pricePerNight: 150,
            });
            await room2.save();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
