import { MongoClient } from 'mongodb';
import { MONGO_DB_URI } from '$env/static/private';
import { dev } from '$app/environment';

//const client = new MongoClient(dev ? 'mongodb://localhost:27017/todos' : MONGO_DB_URI);
const client = new MongoClient(MONGO_DB_URI); // OPS Put your IP in MongoDB website list


export async function connect() {
    try {
      await client.connect();
      console.log('Connected successfully to DB');
      return client;
    } catch (err) {
      console.error('Failed to connect to DB', err);
      throw err; 
    }
  }

export async function disconnect() {
  await client.close();
}

export function getDB() {
  return client.db("svelteapp_db"); // (Add database name)

}