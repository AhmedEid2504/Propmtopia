import mongoose from 'mongoose'

let isConnected = false; // Database connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState === mongoose.ConnectionStates.connected;
        console.log('New database connection established');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

