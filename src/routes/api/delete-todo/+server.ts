import { connect, getDB } from '$db/mongo';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const client = await connect();
    const db = getDB();
    const collection = db.collection('todos');

    const { id }: { id: string } = await request.json();
    console.log("id---->", id);
    
    const find_todo_by_id = await collection.findOne({ _id: new ObjectId(id) });
    console.log("find_todo_by_id---->", find_todo_by_id);
    
    if (!find_todo_by_id) {
        return json({
            "error": "Todo not found :/ "
        });
    }

    await collection.deleteOne({ _id: new ObjectId(id) });
    return json({
        "message": "Deleted"
    });
}
