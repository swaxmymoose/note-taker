const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    const params = {
        TableName: "noteTable",
        ProjectionExpression: "title, content",
    }

    try {
        const data = await docClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (err) {
        responseBody = "Unable to get notes data";
        statusCode = 403;
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }
    
    return response;
}
