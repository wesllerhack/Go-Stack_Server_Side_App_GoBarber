import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

  })
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2022, 4, 10, 13),
      user_id: '1233321',
      provider_id: '3213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3213');
  });

  it('should not be able to create two appointments in the same time', async () => {

    const appointmentDate = new Date(2022 , 12 , 6, 17 );

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123321',
      provider_id: '3213',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123321',
      provider_id: '3213',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 11),
        user_id: '123321',
        provider_id: '32131',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 10, 13),
        user_id: 'user_id',
        provider_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
