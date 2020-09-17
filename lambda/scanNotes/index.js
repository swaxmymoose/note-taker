const AWS = require("aws-sdk");

exports.handler = function (event, context, callback) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "noteTable",
        ProjectionExpression: "title, content",
    }

    console.log("Scanning Notes table.");
    docClient.scan(params, onScan);
    
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the notes
            console.log("Scan succeeded.");
            data.Items.forEach(function(note) {
                console.log(note.title, note.content);     
            });
            
            // continue scanning if we have more notes, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }   
        }
    }
}
