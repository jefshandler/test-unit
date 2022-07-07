  
import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4a436015aaad0b",
    pass: "1199f2d1a87a41"
  }
});
  
  export class NodemailerMailAdapter implements MailAdapter {
    async sendMain({ subject, body }: SendMailData): Promise<void> {
        await transport.sendMail({
            from: 'ShandlerTech feedget <oi@feedget.com>',
            to: 'ShandlerTech <shandler@gmail.com>',
            subject,
            html: body,
        });
    }

}