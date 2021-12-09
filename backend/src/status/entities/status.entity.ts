import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { Movements } from "../../movements/entities/movements.entity";


@Entity()
@Unique("idx_status",["code"])
export class Status {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    code: string;

    @OneToMany(() => KindMovements, KindMovements => KindMovements.Status)
    KindMovements: KindMovements[];

    @OneToMany(() => Movements, Movements => Movements.Status)
    Movements: Movements[];
}

