import { connect, getDB } from '$db/mongo';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from '@sveltejs/kit';

interface UpdateTodoPayload {
    id: string;
    title: string;
}

export const POST: RequestHandler = async ({ request }) => {
    const client = await connect();
    const db = getDB();
    const collection = db.collection('todos');

    const { id, title }: UpdateTodoPayload = await request.json();
    console.log("id---->", id);

    const find_todo_by_id = await collection.findOne({ "_id": new ObjectId(id) });
    console.log("find_todo_by_id---->", find_todo_by_id);
    
    if (!find_todo_by_id) {
        return json({
            "error": "Todo not found :/ "
        });
    }

    await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            title: title
        }
    });

    return json({
        "message": "Todo is updated",
        "id": id,
        "title": title
    });
};
