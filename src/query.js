import connect, {sql} from '@databases/expo';
import * as SQLite from 'expo-sqlite';

const db = connect('currency-lover');
const ready = db.tx(function* (tx) {
    yield tx.query(sql`
        CREATE TABLE  if not exists schema_version (version INT NOT NULL);
    `);
    const versionRecord = yield tx.query(sql`
        SELECT version FROM schema_version;
    `);
    const version = (
        versionRecord.length
            ? versionRecord[0].version : 0
    );
    // if (version < 1) {
        yield tx.query(sql`
            CREATE TABLE if not exists alarms (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                baseCur TEXT NOT NULL,
                targetCur TEXT NOT NULL,
                targetRate TEXT NOT NULL,
                isDone BOOLEAN NOT NULL
            );
        `);
    // }
});

const query_getAllAlarm = async () => {
    return (await db.query(sql`
        SELECT * FROM alarms;
    `)) || undefined;
}
const query_insertAlarm = async (inputBase, inputTarget, inputRate) => {
    await db.query(sql`
        INSERT INTO alarms (baseCur, targetCur, targetRate, isDone) values (${inputBase}, ${inputTarget}, ${inputRate}, 0);
    `);
};
const query_deleteAllAlarm = async () => {
    await db.query(sql`
        DELETE FROM alarms;
    `);
};
export {query_getAllAlarm, query_insertAlarm, query_deleteAllAlarm};