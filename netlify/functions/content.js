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
    // cachedDb = client.db(DB_NAME);
    console.log("NOTE OUTPUT HERE");
    console.log(cachedDb);
    console.log("returning...");
    return cachedDb;
};

const queryDatabase = async (db) => {
    console.log("creating content object . . .");
    const content = await db.collection("content").find({}).toArray();
    console.log("content collection::");
    console.log(db.collection("content"));
    console.log(await db.collection("content").find({}));
    console.log("content object created");
    console.log("contents of CONTENT");
    console.log(content);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    };
};

module.exports.handler = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // console.log("MONGODB_URI = " + MONGODB_URI);
    const db = await connectToDatabase(MONGODB_URI);
    console.log("connected to DB");
    console.log("QUERYING...");
    return queryDatabase(db);
};