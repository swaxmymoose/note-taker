const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    let { id } = event.pathParameters;
    id = Number(id);
    const params = {
      TableName: "noteTable",
      Key: {
        id: id,
      }
    };

    try {
      const data = await docClient.delete(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 204;
    } catch (err) {
      responseBody = "Unable to delete note data: " + err;
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
