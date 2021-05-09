//import {uuid} from 'uuidv4'; Não precisamos mais porque das definições de Entity
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('appointments')
class Appointment{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

    /**
    *Agora que definimos uma Entity não precisamos mais de construtor, pois ele é gerado de forma automática
    */
    /*constructor ({provider, date}:Omit<Appointment, 'id'>){
        this.id= uuid();
        this.provider= provider;
        this.date= date;
    }*/
}

export default Appointment;