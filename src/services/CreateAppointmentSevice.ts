import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    private appointmentRepository: AppointmentRepository;

    /**
     * Dependency Inversion (SOLID)
     */

    constructor(appointmentRepository: AppointmentRepository){
        this.appointmentRepository= appointmentRepository;
    }

    public execute({provider, date}:Request): Appointment {

        const appointmentsDate= startOfHour(date);

        const findAppointmentInSameDate= this.appointmentRepository.find(appointmentsDate);

        if(findAppointmentInSameDate){
            throw Error ('This appointment is already booded');
        }
    
        const appointment= this.appointmentRepository.create({
            provider,
            date: appointmentsDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;