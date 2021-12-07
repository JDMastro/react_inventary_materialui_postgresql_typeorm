import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { Movements } from "../../movements/entities/movements.entity";


@Entity()
export class Status {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => KindMovements, KindMovements => KindMovements.Status)
    KindMovements: KindMovements[];

    @OneToMany(() => Movements, Movements => Movements.Status)
    Movements: Movements[];
}

