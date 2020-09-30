import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, Generated} from "typeorm";

import { RankingsModel } from './RankingsModel';
import {AppointmentsModel} from "./AppointmentsModel";
import {CabinetModel} from "./CabinetModel";
const bcrypt  = require('bcryptjs');

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true, nullable: true})
    public email:string;

    @Column("varchar",{length:255, nullable: true})
    public firstName: string;

    @Column("varchar",{length:255, nullable: true})
    public lastName: string;

    @Column("varchar",{length:255, nullable: true})
    public password: string;

    @Column({ unique: true, nullable: true})
    @Length(4, 100)
    public username: string;

    @Column({nullable: true})
    public dob: Date

    @Column({ nullable: true, default: 20})
    public points: number;

    @Column({nullable: true})
    public bloodType: string;

    @Column({nullable: true})
    public houseNumber: string;

    @Column({nullable: true})
    public streetName: string;

    @Column({nullable: true})
    public town: string;

    @Column({nullable: true})
    public postcode: string;

    @Column({nullable: true})
    public badgeCounter: number;

    @Column({nullable: true})
    public isReferred: boolean;

    @Column({nullable: true})
    @CreateDateColumn()
    public createdAt: Date;

    @OneToOne(() => RankingsModel, rankings => rankings.user)
    public rankings: RankingsModel;

    @OneToMany(() => AppointmentsModel, appointment => appointment.user)
    public appointments: AppointmentsModel[];

    @OneToMany(() => CabinetModel, cabinetBadge => cabinetBadge.user)
    public cabinetBadge: CabinetModel[];

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }


    public validateHashedPass(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password); // true
    }




}
