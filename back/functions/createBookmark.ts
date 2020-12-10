const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Task from './type';

async function createBookmark(task: Task) {
    const params = {
        TableName: process.env.BOOKMARK_TABLE,
        Item: task
    }
    try {
        await docClient.put(params).promise();
        return task;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default createBookmark;