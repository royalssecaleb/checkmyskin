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
const mailcomposer = require('mailcomposer')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	res.header("Access-Control-Allow-Credentials", "true")
	next()
});


/**********************
 * Example get method *
 **********************/

app.get('/patient-sendmail', async function (req, res) {
	// Add your code here
	// res.json({ success: 'get call succeed!', url: req.url });
	let sendPromise;
	var htmlToSend = `<html><head><link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' /><link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' /><meta charset="utf-8"><title>RECEIPT</title></head><body style="width: 900px; margin: 0 auto"><div style="margin-top: 30px; width: 100%;"><div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"><h1 style="font-family:'Poppins'; font-size: 50px;">RECEIPT</h1><div style="display: flex; flex-direction: row;"><img src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/logo.png' alt='logo' width='35px' height='35px' style="margin-right: 10px;" /><label style='font-family:"Poppins"; font-style:normal; font-weight:300; font-size:28px; line-height:36px; color: #081131;'>check</label><label style='font-family:"Poppins"; font-style:normal; font-weight:900; font-size:28px; line-height:36px; color: #576B62;'>myskin</label></p></div></div><div style="display: flex; flex-direction: row; align-items: center;"><label style="font-family:'Inter'; font-weight:bold; width: 50px; font-size: 20px;">NO:</label><p style="margin: 0 5px; font-size: 20px;">payment_id</p></div><div style="display: flex; flex-direction: row; align-items: center; margin-top: 10px; font-size: 20px;"><label style="font-family:'Inter'; font-weight:bold; width: 50px; font-size: 20px;">Date:</label><p style="margin: 0 5px;">{date}</p></div><div style="display: flex; flex-direction: row; align-items: center; margin-top: 100px; font-family:'Inter'; font-size: 25px;"><label>BILL TO:</label><p style="margin: 0 10px;">{email}</p></div><div style="font-family:'Inter'; margin-top: 70px;"><table style="width: 100%; border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px"><tr><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">ITEM</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">QTY</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">UNIT PRICE</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">TOTAl(AUD)</th></tr><tr><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">{text}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">{qty}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">{amount}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">{total_paid}</th></tr></table></div><div style="font-family:'Inter'; font-size: 20px; margin-top: 50px; text-align: end;"><p>TOTAL PAID: {total_paid}</p></div><div style="margin-top: 100px;"><p style="font-family:'Inter'; font-weight:bold; font-size: 30px;">Thank You for Your Support!</p></div></div></body></html>`;
	const base64Image = new Buffer.from(htmlToSend);
	const content = "data:application/pdf;base64" + base64Image;
	const mail = mailcomposer({
		from: 'no-reply@checkmyskin.net',
		replyTo: 'no-reply@checkmyskin.net',
		to: 's.olga68763@gmail.com',
		subject: 'CheckSkin',
		html: `<html><head><link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></head><body><div style='background: linear-gradient(180deg, #d9e6e0 0%, rgba(196, 196, 196, 0) 100%);'><center><p style='padding-top: 50px; margin: inherit; display: inline-flex;'><img src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/logo.png' alt='logo' width='32px' height='32px' /><label style='font-family:"Poppins"; font-style:normal; font-weight:300; font-size:24px; line-height:36px; color: #081131;'>check</label><label style='font-family:"Poppins"; font-style:normal; font-weight:900; font-size:24px; line-height:36px; color: #576B62;'>myskin</label></p><div style='width: 800px;height: 495px;background: #F1EDE7;margin-top: 50px;'><img style='margin-top: 20px; margin-left: 80px;' src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/home1.png' alt='home' width='720px' height='475px' /></div><p style='font-family: "Inter";font-style: normal;font-weight: 400;font-size: 18px;line-height: 32px;text-align: center;color: #5A7386; padding-top: 30px;'>Hi, thank you for your inquiry! Your personal code is:</p><div style='background: #F9F9F9;border-radius: 16px; width: max-content;'><p style='font-family: "Poppins";font-style: normal;font-weight: 700;font-size: 32px;line-height: 48px;text-align: center;color: #576B62; padding: 25px 50px;'>usercode</p></div><div style='display: grid; width: 800px; height: 224px; font-family: "Inter"; font-style: normal;font-weight: 400;font-size: 18px;line-height: 32px;color: #5A7386; text-align: start;'>email_content<label style='margin-top: 30px;'>Best regards,</label><label>CheckMySkin team.</label></div><div style='margin: 50px auto;'><a style='padding: 16px 24px; background: #576B62; color: #FFFFFF;border-radius: 6px; cursor: pointer; margin-right: 20px; text-decoration: none;' href='http://localhost:3000/check-status' target='_blank'>Check Status</a><a style='padding: 16px 24px; background: #FFFFFF; color: #576B62;border-radius: 6px; cursor: pointer; border: 1px solid #576B62; text-decoration: none;' href=http://localhost:3000 target='_blank'>Visit CheckMySkin</a></div><div style='padding-top: 1px;'></div></center></div></body></html>`,
		attachments: [
			{
				filename: 'recept.pdf',
				content: content
			},
		],
	});
	return new Promise((resolve, reject) => {

		mail.build((err, message) => {
			if (err) {
				reject(`Error sending raw email: ${err}`);
			}

			sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendRawEmail({ RawMessage: { Data: message } }).promise();
		});
		resolve(sendPromise);
	});
});

app.get('/patient-sendmail/*', function (req, res) {
	// Add your code here
	res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/patient-sendmail', function (req, res) {
	// Add your code here
	const { email, usercode, url, amount, date, payment_id, status, payment } = req.body;
	const text = status === "mole" ? "Dermatologist Mole Check" : "Dermatologist Rash Check";
	const checkout_email_content = "<label>You can use this code to check the status of your inquiry from <b>Check Status</b> menu. The process usually takes 2-5 days. We will refund your payment if the quality or your photo is not sufficient for diagnosis. Thank you for using our service, and let's prevent skin cancer together.</label>";
	const refund_email_content = `<div><p>Unfortunately, the picture quality of your photo is not sufficient for diagnosis. We have refunded the full amount to you. Please check the attached Receipt.</p><p style="margin-top: 20px">Please resend a photo with higher resolution if you want to check again.</p></div>`;
	const email_content = payment === "checkout" ? checkout_email_content : refund_email_content;
	const qty = payment === "checkout" ? 1 : -1;
	const total_paid = payment === "checkout" ? amount : -amount;

	let sendPromise;
	var htmlToSend = `<html><head><link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' /><link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' /><meta charset="utf-8"><title>RECEIPT</title></head><body style="width: 900px; margin: 0 auto"><div style="margin-top: 30px; width: 100%;"><div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"><h1 style="font-family:'Poppins'; font-size: 50px;">RECEIPT</h1><div style="display: flex; flex-direction: row;"><img src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/logo.png' alt='logo' width='35px' height='35px' style="margin-right: 10px;" /><label style='font-family:"Poppins"; font-style:normal; font-weight:300; font-size:28px; line-height:36px; color: #081131;'>check</label><label style='font-family:"Poppins"; font-style:normal; font-weight:900; font-size:28px; line-height:36px; color: #576B62;'>myskin</label></p></div></div><div style="display: flex; flex-direction: row; align-items: center;"><label style="font-family:'Inter'; font-weight:bold; width: 50px; font-size: 20px;">NO:</label><p style="margin: 0 5px; font-size: 20px;">${payment_id}</p></div><div style="display: flex; flex-direction: row; align-items: center; margin-top: 10px; font-size: 20px;"><label style="font-family:'Inter'; font-weight:bold; width: 50px; font-size: 20px;">Date:</label><p style="margin: 0 5px;">${date}</p></div><div style="display: flex; flex-direction: row; align-items: center; margin-top: 100px; font-family:'Inter'; font-size: 25px;"><label>BILL TO:</label><p style="margin: 0 10px;">${email}</p></div><div style="font-family:'Inter'; margin-top: 70px;"><table style="width: 100%; border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px"><tr><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">ITEM</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">QTY</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">UNIT PRICE</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">TOTAl(AUD)</th></tr><tr><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${text}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${qty}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${amount}</th><th style="border: 1px solid black; border-collapse: collapse; padding: 5px;">${total_paid}</th></tr></table></div><div style="font-family:'Inter'; font-size: 20px; margin-top: 50px; text-align: end;"><p>TOTAL PAID: ${total_paid}</p></div><div style="margin-top: 100px;"><p style="font-family:'Inter'; font-weight:bold; font-size: 30px;">Thank You for Your Support!</p></div></div></body></html>`;
	const mail = mailcomposer({
		from: 'no-reply@checkmyskin.net',
		replyTo: 'no-reply@checkmyskin.net',
		to: email,
		subject: 'CheckSkin',
		html: `<html><head><link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></head><body><div style='background: linear-gradient(180deg, #d9e6e0 0%, rgba(196, 196, 196, 0) 100%);'><center><p style='padding-top: 50px; margin: inherit; display: inline-flex;'><img src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/logo.png' alt='logo' width='32px' height='32px' /><label style='font-family:"Poppins"; font-style:normal; font-weight:300; font-size:24px; line-height:36px; color: #081131;'>check</label><label style='font-family:"Poppins"; font-style:normal; font-weight:900; font-size:24px; line-height:36px; color: #576B62;'>myskin</label></p><div style='width: 800px;height: 495px;background: #F1EDE7;margin-top: 50px;'><img style='margin-top: 20px; margin-left: 80px;' src='https://checkmyskin387e451492f04eec97f03df505b5e155193618-staging.s3.ap-southeast-2.amazonaws.com/public/home1.png' alt='home' width='720px' height='475px' /></div><p style='font-family: "Inter";font-style: normal;font-weight: 400;font-size: 18px;line-height: 32px;text-align: center;color: #5A7386; padding-top: 30px;'>Hi, thank you for your inquiry! Your personal code is:</p><div style='background: #F9F9F9;border-radius: 16px; width: max-content;'><p style='font-family: "Poppins";font-style: normal;font-weight: 700;font-size: 32px;line-height: 48px;text-align: center;color: #576B62; padding: 25px 50px;'>${usercode}</p></div><div style='display: grid; width: 800px; height: 224px; font-family: "Inter"; font-style: normal;font-weight: 400;font-size: 18px;line-height: 32px;color: #5A7386; text-align: start;'>${email_content}<label style='margin-top: 30px;'>Best regards,</label><label>CheckMySkin team.</label></div><div style='margin: 50px auto;'><a style='padding: 16px 24px; background: #576B62; color: #FFFFFF;border-radius: 6px; cursor: pointer; margin-right: 20px; text-decoration: none;' href='${url}/check-status' target='_blank'>Check Status</a><a style='padding: 16px 24px; background: #FFFFFF; color: #576B62;border-radius: 6px; cursor: pointer; border: 1px solid #576B62; text-decoration: none;' href=${url} target='_blank'>Visit CheckMySkin</a></div><div style='padding-top: 1px;'></div></center></div></body></html>`,
		attachments: [
			{
				filename: 'invoice.html',
				contentType: 'text/html; charset=utf-8',
				content: htmlToSend,
			},
		],
	});

	return new Promise((resolve, reject) => {

		mail.build((err, message) => {
			if (err) {
				reject(`Error sending raw email: ${err}`);
			}

			sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendRawEmail({ RawMessage: { Data: message } }).promise();
		});
		resolve(sendPromise);
	});

});

app.post('/patient-sendmail/*', function (req, res) {
	// Add your code here
	res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/patient-sendmail', function (req, res) {
	// Add your code here
	res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/patient-sendmail/*', function (req, res) {
	// Add your code here
	res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/patient-sendmail', function (req, res) {
	// Add your code here
	res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/patient-sendmail/*', function (req, res) {
	// Add your code here
	res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
	console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
