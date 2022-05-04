exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: "Hello World!!!!",
        locked: false,
        test: "yes",
        alsotest: process.env.MONGODB_URI
    };
}