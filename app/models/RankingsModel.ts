import { IsNotEmpty, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { UserModel } from './UserModel';


@Entity()
export class RankingsModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public date: Date;

    @OneToOne(() => UserModel, user => user.rankings)
    @JoinColumn()
    public user: UserModel;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

}
