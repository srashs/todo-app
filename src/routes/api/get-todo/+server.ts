import { connect, getDB } from '$db/mongo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';

interface Todo {
    _id: ObjectId;
    title: string;
    createdAt: Date;
}

export const GET: RequestHandler = async () => {

    const client = await connect();
    const db = getDB();
    const collection = db.collection<Todo>('todos');

    // Fetch all todos from the collection
    const todos = await collection.find({}).toArray();

    return json(todos);
};
