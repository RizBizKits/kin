import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, Generated} from "typeorm";

@Entity()
export class ArticlesModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true, nullable: true})
    public articleName:string;

    @Column("varchar",{length:255, nullable: true})
    public articleDesc: string;

    @Column("varchar",{length:255, nullable: true})
    public articleURL: string;

    @Column({nullable: true})
    @CreateDateColumn()
    public createdAt: Date;

}
