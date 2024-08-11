import { connect, getDB } from '$db/mongo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';

interface Todo {
    _id?: ObjectId;
    title: string;
    createdAt: Date;
}

export const POST: RequestHandler = async ({ request }) => {

    // Connect to the database
    const client = await connect();
    const db = getDB();
    const collection = db.collection<Todo>('todos');

    // Get data from the request
    const { title }: { title: string } = await request.json(); // Assume the request has a "title" field
    console.log("title----->", title);

    // Insert the new todo item into the collection
    const todo = await collection.insertOne({ title, createdAt: new Date() });
    const find_todo = await collection.findOne({ _id: todo.insertedId });

    // Close the database connection
    await client.close();

    return json(find_todo);
}
