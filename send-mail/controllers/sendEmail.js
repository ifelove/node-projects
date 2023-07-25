const nodemailer = require("nodemailer");
//const SibApiV3Sdk = require("sendinblue-api");
var SibApiV3Sdk = require("sib-api-v3-sdk");
//const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
  //const sendEmail = async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ana.lebsack40@ethereal.email",
      pass: "9Hc1dJNRTrWYSfw4y2",
    },
  });

  let info = await transporter.sendMail({
    from: '"lightHub" <harwedarife@yahoo.com>',
    to: "ifel1939@gmail.com",
    subject: "Hello",
    html: "<h2>Sending new mail now</h2>",
  });

  res.json(info);
};

//using SendinBlue
//initializing sendbluein clieny;
//
const apiKey = process.env.SENDINBLUE_API; //OUR_SENDINBLUE_API_KEY
//const defaultClient = SibApiV3Sdk.ApiClient.instance;
var defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = apiKey;
//Sending an Email: Use the initialized client to send emails:
// Function to send an email
async function sendEmailSendInBlue() {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Sending Mail Using SendInBlue";
  sendSmtpEmail.htmlContent = "<h2>Sending new mail now</h2>";
  sendSmtpEmail.sender = { name: " Ifelove", email: " ifel1939@gmail.com" };
  sendSmtpEmail.to = [{ email: "azeez4511@gmail.com" }];

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully. Response:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}


//sending mail using MAILCHIMP
const mailchimp = require('@mailchimp/mailchimp_marketing');

// Set your Mailchimp API key and server prefix (e.g., 'us1', 'eu1', etc.)
const apiKey1 = process.env.MAILCHIMP_API_KEY;
const server = "us21"; // e.g., 'us1'

// Initialize the Mailchimp API client
mailchimp.setConfig({
  apiKey: apiKey,
  server: server,
});

// Function to send an email
async function sendEmail() {
  try {
    const response = await mailchimp.messages.send({
      message: {
        subject: "New mail",
        html: "<h2>New email></h2>",
        from_email: "ifel1939@gmail.com",
        from_name: Ifeoluwa,
        to: [{ email: "harwedarife@yahoo.con" }],
      },
    });

    console.log('Email sent successfully. Response:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


/** 

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'learncode@mail.com', // Change to your recipient
    from: 'learncodetutorial@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const info = await sgMail.send(msg);
  res.json(info);
};
*/

module.exports = sendEmail;
