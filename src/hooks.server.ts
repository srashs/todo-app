// src/hooks.server.ts (SvelteKit fil) //AMO
import { building } from '$app/environment';
import { connect, disconnect } from '$db/mongo';

if (!building) {
    connect().then(() => {
        console.log('MongoDB started');
      })
      .catch((e) => {
        console.error('MongoDB failed to start');
        console.error(e);
      });
  }

  
export function handle({ event, resolve }) {
    return resolve(event);
}

export function handleError({ error, event }) {
    console.error('Error:', error);
}

process.on('SIGINT', disconnect);
