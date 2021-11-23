import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KindMovements {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    iduser: number

    @Column({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'delete_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    deleteAt: Date;
}