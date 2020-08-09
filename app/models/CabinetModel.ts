import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne} from "typeorm";

import {UserModel} from "./UserModel";
import {BadgesModel} from "./BadgesModel";

@Entity()
export class CabinetModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    public badgeEarned: Date

    @ManyToOne(() => UserModel, users => users.cabinetBadge)
    public user: UserModel;

    @ManyToOne(() => BadgesModel, users => users.badgeInCabinet)
    public badge: BadgesModel;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

}
