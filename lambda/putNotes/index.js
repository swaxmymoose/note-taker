const AWS = require("aws-sdk");

exports.handler = function (event, context, callback) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
    TableName: "noteTable",
      Item: {
	id: 200,
	title: "Lambda Note Title",
	content: "Lambda note content"
      }
    }

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
}
