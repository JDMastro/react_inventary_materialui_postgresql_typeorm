import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Status } from "../../status/entities/status.entity";
import { Header } from "../../header/entities/header.entity";

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





    @ManyToOne(() => Status, Status => Status.KindMovements)
    @JoinColumn({ name: 'status_id' })
    Status: Status;

    @Column({ nullable : true })
    status_id: number

    @OneToMany(() => Header, Header => Header.KindMovements )
  Header: Header[];
}