import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique("idx_settings",["key"])
export class Settings {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    key: string;

    @Column()
    value: string;
    
}

