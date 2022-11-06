import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate( date: Date ): Promise<Appointment | undefined> {
    const findAppointments = this.appointments.find(
      appointments => isEqual(appointments.date, date),
    );

    return findAppointments;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = new Appointment();

    Object.assign(appointments, { id: uuid(), date, provider_id })

    this.appointments.push(appointments);

    return appointments;
  }

}
export default AppointmentsRepository
