/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-2' });

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/forgot-password', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.post('/forgot-password', async (req, res) => {
  // Add your code here

  const { email, password } = req.body;

  var params = {
    Destination: {
      ToAddresses: [
        email,
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: "UTF-8",
          Data: `Password: ${password}`
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'CheckSkin Team(Forgot Password)'
      }
    },
    Source: 'to_maiwei@hotmail.com', /* required */
    ReplyToAddresses: [
      'to_maiwei@hotmail.com',
      /* more items */
    ]
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function (data) {
      console.log(data.MessageId);
      res.json({ success: 'post call succeed!', url: req.url, body: req.body, data: data.MessageId })
    }).catch(
      function (err) {
        console.error(err, err.stack);
        res.json({ success: 'post call failed!', url: err, body: err.stack })
      });

  // res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
