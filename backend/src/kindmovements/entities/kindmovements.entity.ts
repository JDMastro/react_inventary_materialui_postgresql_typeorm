import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movements } from "../../movements/entities/movements.entity";
import { Status } from "../../status/entities/status.entity";

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
    input: boolean

    @Column({ default: false })
    output: boolean

    @Column({ default: false })
    return: boolean

    @Column({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
    updateAt: Date;

    @Column({ name: 'delete_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    deleteAt: Date;


    @ManyToOne(() => Movements, movements => movements.kindMovements)
    movements: Movements[];




    @ManyToOne(() => Status, Status => Status.KindMovements)
    @JoinColumn({ name: 'status_id' })
    Status: Status;

    @Column()
    status_id: number
}