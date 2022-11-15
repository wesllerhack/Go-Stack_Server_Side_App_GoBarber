import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate( date: Date ): Promise<Appointment | undefined> {
    const findAppointments = this.appointments.find(
      appointments => isEqual(appointments.date, date),
    );

    return findAppointments;
  }

  public async fintAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
 
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id && 
                      getMonth(appointment.date)+1 === month &&
                      getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
 
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id && 
                      getDate(appointment.date) === day &&
                      getMonth(appointment.date)+1 === month &&
                      getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = new Appointment();

    Object.assign(appointments, { id: uuid(), date, provider_id, user_id })

    this.appointments.push(appointments);

    return appointments;
  }

}
export default AppointmentsRepository
