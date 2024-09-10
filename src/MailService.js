import nodemailer from 'nodemailer';

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'OpenMusic Project',
            to: targetEmail,
            subject: 'Ekspor Songs',
            text: 'Berikut adalah lagu-lagu yang Anda inginkan.',
            attachments: [
                {
                    filename: 'songs.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

export default MailSender;