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
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '3213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3213');
  });

  it('should not be able to create two appointments in the same time', async () => {

    const appointmentDate = new Date(2022 , 10 , 6, 17 );

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '3213',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '3213',
    })).rejects.toBeInstanceOf(AppError);
  });
});
