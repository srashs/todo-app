import type { RequestHandler } from '@sveltejs/kit';
import { getDB } from '$db/mongo'; // Se till att vägen till din mongo.ts fil är korrekt
import type { dataFromUser } from '$db/collections/data';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const db = getDB();
        const collection = db.collection<dataFromUser>('data');

        const data: dataFromUser = await request.json();
        data.createdAt = new Date();
        data.updatedAt = new Date();
        
        const result = await collection.insertOne(data);

        return json({
            success: true,
            id: result.insertedId,
        }, {
            status: 201
        });

    } catch (error) {
        console.error('Error saving data:', error);
        return json({
            success: false,
            error: 'Failed to save data'
        }, {
            status: 500
        });
    }
};
