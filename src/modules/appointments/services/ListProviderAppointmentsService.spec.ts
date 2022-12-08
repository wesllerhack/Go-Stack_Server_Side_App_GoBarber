import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;


describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
  })
  it('should be able to list the appointments on a specific day', async () => {

    const appointment1 = await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2022, 11, 25, 14, 0, 0)
    });

    const appointment2 = await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2022, 11, 25, 15, 0, 0)
    });

    const appointments = await listProviderAppointments.execute({
        provider_id: 'provider',
        year: 2022,
        month: 12,
        day: 25,
    });

    expect(appointments).toEqual([
        appointment1, appointment2
    ]);
  });
});
