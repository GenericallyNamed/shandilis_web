exports.handler = async function (event, context) {
    console.log("hello");
    console.log(process.env.MONGODB_URI);
    return {
        statusCode: 200,
        body: "Hello World!!!!",
        locked: false,
        test: "yes",
        alsotest: process.env.MONGODB_URI
    };
}