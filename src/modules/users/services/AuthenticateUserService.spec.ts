import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';



describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const authenticate = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(authenticate).toHaveProperty('token');
  });

  // it('should not be able to create a new user with same email from another user', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

  //    await authenticateUser.execute({
  //     email: 'johndoe@example.com',
  //     password: '123456'
  //   });

  //   expect(authenticateUser.execute({
  //     email: 'johndoe@example.com',
  //     password: '123456'
  //   })).rejects.toBeInstanceOf(AppError);
  // });
});
