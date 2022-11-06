import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: Request ): Promise<User>{

    const checkUserExist = await this.usersRepository.findByEmail(email)

    if(checkUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;


  }

}

export default CreateUserService
