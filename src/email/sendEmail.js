import nodemailer from "nodemailer";

export const sendEmailService = async (
    { to,
        subject = "jop search app",
        textMessage = "",
        htmlMessage = "",
        attachments = [] } = {}
) => {
    // configuration Email
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "a.email2260@gmail.com",
            pass: "asllpvdzmutarqns",
        },
    });
    // message information to send 
    const info = await transporter.sendMail({
        from: `jop search app <a.email2260@gmail.com>`,
        to,
        subject,
        text: textMessage,
        html: htmlMessage,
        attachments,
    });
    return info
};