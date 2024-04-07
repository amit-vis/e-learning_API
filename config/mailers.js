
const nodemailer = require('nodemailer');
require('dotenv').config();

// setip the transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS_KEY
    }
})

// send the mail from transporter 
const sendMail = async (subject, to, template) => {
    try {
        const Mailcontent = await transporter.sendMail({
            from: `E-Learning <${process.env.USER}>`,
            to: to,
            subject: subject,
            html: template
        })
        return Mailcontent
    } catch (error) {
        console.error("Error in sending the mail", error);
        throw error
    }
}

// template for Enrollenment mail notification
module.exports.EnrollenmentNotify = async (userEmail, userName, courseTitle) => {
    const subject = 'Enrollenment Confirmation!!';
    const content = `<div>
        <img src="https://i.pinimg.com/736x/46/b8/59/46b859188fcedf524746e395e52d6279.jpg" alt="e-learning" width="150"/>
        <p>Hello ${userName},</p>
            <p>Thank You registring with <b>${courseTitle}</b>. We are exited to have you as a new member of our community
            .</p>
            <p>
            Regards,
            <br/>
            E-Learning</p>
        </div>`;

    try {
        const data = await sendMail(subject, userEmail, content);
        return { success: true, message: "Email sent successfully.", data: data };
    } catch (error) {
        return { success: false, message: "Failed to send email.", error: error.message };
    }
}

// template for new User registration mail notification
module.exports.RegistartionNoty = async (userName, userEmail) => {
    try {
        const subject = "Registartion Confirmation!!";
        const content = `<div>
        <img src="https://i.pinimg.com/736x/46/b8/59/46b859188fcedf524746e395e52d6279.jpg" alt="e-learning" width="250"/>
        <p>Hello ${userName},</p>
            <p> You Have Registered SccessFully in the E-Learning Course
            .</p>
            <p>
            Regards,
            <br/>
            E-Learning</p>
        </div>`;
        const data = await sendMail(subject, userEmail, content);
        return { success: true, message: "Email sent successfully.", data: data };

    } catch (error) {
        return { success: false, message: "Failed to send email.", error: error.message };
    }
}

// template for send the token to the user
module.exports.resetPassword = async (userName, userEmail, token) => {
    try {
        const subject = 'Reset Password!!';
        const content = `<div>
        <img src="https://apps.uk/wp-content/uploads/2022/03/password-reset.png" alt="e-learning" width="250"/>
        <p>Hello ${userName},</p>
            <p>Kindly use the below mentioned token for reset your password.
                <br/>
                token = <b>${token}.</b>
            .</p>
            <p>
            Regards,
            <br/>
            E-Learning</p>
        </div>`;
        const data = await sendMail(subject, userEmail, content);
        return { success: true, message: "Email sent successfully.", data: data };
    } catch (error) {
        return { success: false, message: "Failed to send email.", error: error.message };
    }
}