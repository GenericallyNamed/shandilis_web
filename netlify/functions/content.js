const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'WEBSITE';

let cachedDb = null;

const connectToDatabase = async (uri) => {
    if(cachedDb) return cachedDb;

    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
    });

    cachedDb = client.db(DB_NAME);
    console.log("NOTE OUTPUT HERE");
    console.log(cachedDb);

    return cachedDb;
};

const queryDatabase = async (db) => {
    const content = await db.collection("content").find({}).toArray();
  
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        console.log("contents of CONTENT");
        console.log(content);
        body: JSON.stringify(content),
    };
};

module.exports.handler = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // console.log("MONGODB_URI = " + MONGODB_URI);
    const db = await connectToDatabase(MONGODB_URI);
    return queryDatabase(db);
};