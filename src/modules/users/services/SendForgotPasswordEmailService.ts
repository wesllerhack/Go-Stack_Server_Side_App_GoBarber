import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/Users';

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

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists');
    }

    await this.userTokensRepository.generate(user.id);
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha')
   }
}

export default SendForgotPassowordEmailService;

