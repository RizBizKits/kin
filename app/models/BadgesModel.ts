import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne} from "typeorm";

import {CabinetModel} from "./CabinetModel";

@Entity()
export class BadgesModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    public badgeEarned: Date

    @OneToMany(() => CabinetModel, cabinet => cabinet.badge)
    public badgeInCabinet: CabinetModel[];

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

}
