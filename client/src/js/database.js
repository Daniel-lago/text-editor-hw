import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('Post into db');
    const connectDb = await openDB('jate', 1);
    const tx = connectDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({id: 1, content: content});
    console.log('Data saved', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('Get from Db');
    const connectDb = await openDB('jate', 1);
    const tx = connectDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.get(1);
    console.log('Result', result);
    return result;
}

initdb();