import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movements } from "../../movements/entities/movements.entity";

@Entity()
export class KindMovements {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    user_id: number

    @Column({ default: false })
    provider: boolean

    @Column({ default: false })
    entry: boolean

    @Column({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)"})
    updateAt: Date;

    @Column({ name: 'delete_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    deleteAt: Date;


    @ManyToOne(() => Movements, movements => movements.kindMovements)
    movements: Movements[];
}