import Appointment from '../models/Appointment';
import {isEqual} from 'date-fns';

//Data Transfer Object
interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentRepository{
    private appointments: Appointment[]

    constructor(){
        this.appointments= [];
    }

    public find(date: Date): Appointment | null{
        const findAppointmentInSameDate= this.appointments.find(appointment  =>
             isEqual(date, appointment.date));
             
        return findAppointmentInSameDate || null;
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment{

        const appointment= new Appointment({provider, date});

        this.appointments.push(appointment);

        return appointment;
    }

    public all(): Appointment[]{
        return this.appointments;
    }

}

export default AppointmentRepository;