const mongoose = require('mongoose');
const { HotelRoom, connectDB } = require('../models/HotelRoom');

describe('Hotel Room GET API Tests', () => {
    // Connecter à MongoDB avant tous les tests
    beforeAll(async () => {
        await connectDB();
        await HotelRoom.deleteMany(); // Nettoyer la collection avant les tests
    });

    // Nettoyage de la collection après chaque test
    afterEach(async () => {
        await HotelRoom.deleteMany();
    });

    // Fermer la connexion après tous les tests
    afterAll(async () => {
        await mongoose.connection.close();
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
                roomNumber: 'NaN', // Mauvais type pour roomNumber
                roomType: 'Single',
                pricePerNight: 100,
            });
            await room.save();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test('should create a new room where roomNumber already exists in DB (unhappy path)', async () => {
        const room1 = new HotelRoom({
            roomNumber: 101,
            roomType: 'Single',
            pricePerNight: 100,
        });

        await room1.save();

        try {
            const room2 = new HotelRoom({
                roomNumber: 101, // Même numéro de chambre
                roomType: 'Double',
                pricePerNight: 150,
            });
            await room2.save();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
