// testmongo.mjs
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function connectToMongo() {
    try {
        // Make sure the connection string is defined
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }

        console.log('Attempting to connect to MongoDB...');
        const client = new MongoClient(uri);
        await client.connect();

        console.log('Connected successfully to MongoDB');

        // Test the connection with a simple operation
        const db = client.db('test');
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        await client.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

connectToMongo();