//import nodemailer, { ses } from 'nodemailer/lib/ses-transport';
import { injectable, inject } from 'tsyringe';
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
    //private client: Transporter;

    constructor (
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) { }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    console.log('funfou');
  }
}
