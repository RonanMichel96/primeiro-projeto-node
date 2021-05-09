import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{

    public async execute({provider, date}:Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentsDate= startOfHour(date);

        const findAppointmentInSameDate= await appointmentsRepository.findByDate(appointmentsDate);

        if(findAppointmentInSameDate){
            throw Error ('This appointment is already booded');
        }
    
        const appointment= appointmentsRepository.create({
            provider,
            date: appointmentsDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;