import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne} from "typeorm";
import {CentresModel} from "./CentresModel";
import {UserModel} from "./UserModel";

@Entity()
export class AppointmentsModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email:string;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    public appointmentSlot: Date

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => CentresModel, centres => centres.appointments)
    public centre: CentresModel;

    @ManyToOne(() => UserModel, users => users.appointments)
    public user: UserModel;

}
