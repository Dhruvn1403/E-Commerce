const nodeMailer = require("nodemailer");

module.exports = sendEmail = async(options) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: "",
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

