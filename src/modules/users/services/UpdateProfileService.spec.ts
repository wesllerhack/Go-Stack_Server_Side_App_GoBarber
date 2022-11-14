
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfile from '@modules/users/services/UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfile(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John you',
      email: 'johnyou@example.com',
    });

    expect(updatedUser.name).toBe('John you');
    expect(updatedUser.email).toBe('johnyou@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'teste',
      email: 'test@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'John dew',
      email: 'test@example.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John you',
      email: 'johndoe@example.com',
    })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
   
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John you',
      email: 'johnyou@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
   
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John you',
      email: 'johnyou@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password wit wrong old password', async () => {
   
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John you',
      email: 'johnyou@example.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
