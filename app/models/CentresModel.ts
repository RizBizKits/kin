import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne} from "typeorm";

import {AppointmentsModel} from "./AppointmentsModel";


@Entity()
export class CentresModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("varchar",{length:255, nullable: true})
    public centreName:string;

    @Column()
    public houseNumber: string;

    @Column()
    public streetName: string;

    @Column()
    public town: string;

    @Column()
    public postcode: string;

    @Column("varchar", {length:255, nullable:true})
    public contactNumber: string;

    @Column("varchar", {length:255, nullable:true})
    public email: string;

    @Column("varchar", {length:255, nullable:true})
    public websiteURL: string;

    @OneToMany(() => AppointmentsModel, appointment => appointment.centre)
    public appointments: AppointmentsModel[];

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

}
