const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    const { id, title, content} = JSON.parse(event.body);
    const params = {
      TableName: "noteTable",
      Item: {
	id: id,
	title: title,
	content: content
      }
    }

    try {
      const data = await docClient.put(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 201;
    } catch (err) {
      responseBody = "Unable to put note data";
      statusCode = 403;
    }
    
    const response = {
      statusCode: statusCode,
      headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
      },
      body: responseBody
    }
    
    return response;
   
}
