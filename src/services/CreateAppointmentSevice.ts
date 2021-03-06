import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{

    public async execute({provider_id, date}:Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentsDate= startOfHour(date);

        const findAppointmentInSameDate= await appointmentsRepository.findByDate(appointmentsDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }
    
        const appointment= appointmentsRepository.create({
            provider_id,
            date: appointmentsDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;