import { inject, injectable } from 'tsyringe'
import path from 'path';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPassowordEmailService
 {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists');
    }

    const { token } = await this.usersTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }
    })
   }
}

export default SendForgotPassowordEmailService;

