import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne} from "typeorm";
import {CentresModel} from "./CentresModel";
import {UserModel} from "./UserModel";
import moment from "moment";

@Entity()
export class AppointmentsModel {

    @PrimaryGeneratedColumn()
    public id: number;
    //
    // @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: true})
    // public appointmentSlot: Date;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: true})
    public appointmentSlot: Date;

    @Column({default: null, nullable: true})
    public isBooked: boolean;

    @ManyToOne(() => CentresModel, centres => centres.appointments)
    public centre: CentresModel;

    @ManyToOne(() => UserModel, users => users.appointments)
    public user: UserModel;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;
    //
    // public formatDateTime() {
    //     // this.appointmentSlot = bcrypt.hashSync(this.password, 10);
    //     this.appointmentSlot = moment(this.appointmentSlot).format('YYYY-MM-DD h:mm:ss a')
    //
    // }

}
