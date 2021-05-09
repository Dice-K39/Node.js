const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) =>
{
    sgMail.send(
        {
            to: email,
            from: process.env.GMAIL_ACCOUNT,
            subject: "Thanks for joining in!",
            text: `Welcome to the app, ${name}. Let me know how you get along with the app`
        }
    );
}

const sendCancelationEmail = (email, name) =>
{
    sgMail.send(
        {
            to: email,
            from: process.env.GMAIL_ACCOUNT,
            subject: "Sorry to see you go. . .",
            text: `Can you give me a reason that you are leaving ${name}?`
        }
    );
}

// const nodeMailer = require("nodemailer");

// const transporter = () =>
// {
//     return nodeMailer.createTransport(
//         {
//             service: "gmail",
//             auth: 
//             {
//                 user: process.env.GMAIL_ACCOUNT,
//                 pass: process.env.GMAIL_PASSWORD
//             }
//         }
//     );
// }

// const sendWelcomeEmail = (email, name) =>
// {
//     const transporterObj = transporter();

//     transporterObj.sendMail(
//         {
//             to: email,
//             from: process.env.GMAIL_ACCOUNT,
//             subject: "Thanks for joining in!",
//             text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
//         }
//     );
// }

// const sendCancelationEmail = (email, name) =>
// {
//     const transporterObj = transporter();

//     transporterObj.sendMail(
//         {
//             to: email,
//             from: process.env.GMAIL_ACCOUNT,
//             subject: "Reason for Cancelation",
//             text: `We are sorry to see you go. Please let us know the reason for your departure ${name}`
//         }
//     );
// }

module.exports =
{
    sendWelcomeEmail,
    sendCancelationEmail
}