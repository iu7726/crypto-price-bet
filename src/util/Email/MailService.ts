import { MailService as SendGridMailService } from '@sendgrid/mail';
import moment from 'moment';
import { missedOneDay } from './Messages/MissedOneDay';
import { missedSevenDay } from './Messages/MissedSevenDay';
import { missedThreeDay } from './Messages/MissedThreeDay';
import { resultDay } from './Messages/ResultDay';

export interface MailContent {
  type: string;
  value: string;
}


export default class MailService {
  private client: SendGridMailService;

  constructor() {
    this.client = new SendGridMailService();
    this.client.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  private defaultHeader(email: string) {
    return {
      personalizations: [
        {
          to: [
            {
              email: 'no-reply@example.com'
            }
          ],
          bcc: email
        }
      ],
      from: {
        email: 'cs@example.com',
        name: 'Name'
      }
    };
  }

  private multipleHeader(emails: Array<string>) {
    return {
      personalizations: [
        {
          to: [{
            email: 'no-reply@example.com'
          }],
          bcc: emails.map((email: string) => {
            return {
              email: email
            }
          })
        }
      ],
      from: {
        email: 'cs@example.com',
        name: 'Name'
      }
    };
  }

  // default
  async sendEmail(to: string, subject: string, content: MailContent) {
    try {
      await this.client.send({
        ...this.defaultHeader(to),
        subject: subject,
        content: [content]
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // with reservation. insert past hour => send now. sednAt: UTC
  async sendEmailWithReservation(to: string, subject: string, content: MailContent, sendAt: number) {
    try {
      await this.client.send({
        ...this.defaultHeader(to),
        subject: subject,
        content: [content],
        sendAt
      });
      console.log(`🎃 Complete send email : ${to}`)
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendEmailWithoutUnsubscribe(to: Array<string>, subject: string, content: MailContent, sendAt: number) {
    try {
      await this.client.send({
        ...this.multipleHeader(to),
        subject: subject,
        content: [content],
        sendAt
      });
      console.log(`🎃 Complete send email : ${to}`)
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const sendWithUnsubscribe = async (users: string[], type: number, targetDate?: string) => {
  const mailType = [
    { title: '[OG] You missed a day 😬 ! It’s okay, you still got ⏰ time!', content: missedOneDay() },
    { title: '[OG] The Crypto Whisperer: You missed 3 days in a row, whisperer!', content: missedThreeDay() },
    { title: '[OG] The Crypto Whisperer: You missed 7 days in a row 😭!', content: missedSevenDay() },
    { title: `[OG] The Crypto Whisperer: 🎉 Results from ${targetDate ?? moment().add(-2, 'days').format('MMM DD')} are in!`, content: resultDay(targetDate ?? moment().add(-2, 'days').format('MMM DD')) }
  ];
  if (mailType.length <= type) return false;

  const content: MailContent = {
    type: 'text/html',
    value: mailType[type].content
  };

  let count: number = 0;
  let failCount: number = 0;
  for (let i = 0; i < users.length; i++) {
    const email = users[i];

    console.log(`-------------------------------------------------------------------`)
    console.log(`👺 [Start] send email : ${email}`)

    const mailService = new MailService();
    const result = await mailService.sendEmailWithReservation(email, mailType[type].title, content, 0);
    if (!result) {
      failCount++;
      console.log(`📧 Fail: ${email}`)
    }
    count++;
    console.log(`📧 [Sent] email count: ${count}`)
  }
  console.log(`Success Count: ${count}`);
  console.log(`Fail Count: ${failCount}`);
}

export const sendWithoutUnsubscribe = async (users: string[], type: number, targetDate?: string) => {

  const mailType = [
    { title: '[OG] You missed a day 😬 ! It’s okay, you still got ⏰ time!', content: missedOneDay() },
    { title: '[OG] The Crypto Whisperer: You missed 3 days in a row, whisperer!', content: missedThreeDay() },
    { title: '[OG] The Crypto Whisperer: You missed 7 days in a row 😭!', content: missedSevenDay() },
    { title: `[OG] The Crypto Whisperer: 🎉 Results from ${targetDate ?? moment().add(-2, 'days').format('MMM DD')} are in!`, content: resultDay(targetDate ?? moment().add(-2, 'days').format('MMM DD')) }
  ];
  if (mailType.length <= type) return false;

  // Change html path
  const content: MailContent = {
    type: 'text/html',
    value: mailType[type].content
  };

  console.log(`-------------------------------------------------------------------`)
  console.log(`👺 [Start] send email user count : ${users.length}`)
  // 2023-03-31 23:00 1680271200
  const userCount = users.length;
  for (let i = 0; i < (userCount / 999); i++) {
    const targetUsers = users.slice((1000 * i), (1000 * i) + 999);

    const mailService = new MailService();
    const result = await mailService.sendEmailWithoutUnsubscribe(targetUsers, mailType[type].title, content, 0);
    if (!result) {
      console.log(`📧 ${i}: Fail`)
    }
  }


  console.log(`Success`);
}