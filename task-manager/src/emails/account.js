const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) =>
{
    sgMail.send(
        {
            to: email,
            from: "daisukehashimoto39@gmail.com",
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
            from: "daisukehashimoto39@gmail.com",
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
//                 user: "daisukehashimoto39@gmail.com",
//                 pass: process.env.MAIL_PASSWORD
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
//             from: "daisukehashimoto39@gmail.com",
//             subject: "Thanks for joining in!",
//             text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
//         }
//     );
// }

// /*
//     Goal: Send email to user on cancelation

//     1. Setup a new function for sending an email on cancelation
//         - email and name as args
//     2. Include their name in the email and ask why they canceled
//     3. Call it just after the account is removed
//     4. Run the request and check your inbox!
// */
// const sendCancelationEmail = (email, name) =>
// {
//     const transporterObj = transporter();

//     transporterObj.sendMail(
//         {
//             to: email,
//             from: "daisukehashimoto39@gmail.com",
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