const aws = require("aws-sdk");
const environment = process.env.APP_ENV || "local";
const dynamoDbClient = environment === "local" ? 
                       new aws.DynamoDB.DocumentClient({
                            region: 'localhost',
                            endpoint: 'http://localhost:8888'
                       }) : 
                       new aws.DynamoDB.DocumentClient(); 

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.APP_ENV || "local",
    notesTable: process.env.NOTES_TABLE || "dev-notes",
    dynamoDbClient,
    aws
};