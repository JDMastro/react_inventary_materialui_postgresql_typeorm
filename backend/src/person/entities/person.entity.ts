import { Movements } from 'src/movements/entities/movements.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { Header } from "../../header/entities/header.entity";

@Entity()
@Unique("idx_person",["phone","idnumber"])
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Kindidentity, Kindidentity => Kindidentity.Person)
  @JoinColumn({ name: 'kind_id' })
  Kindidentity: Kindidentity;

  @Column()
  kind_id : number

  @Column()
  idnumber : number

  @Column()
  name : string

  @Column({ nullable : true })
  second_name : string

  @Column()
  first_surname : string

  @Column()
  second_surname : string

  @Column()
  fullname : string

  @Column()
  address : string

  @Column({ width : 10, type:"numeric" })
  phone : number

  @Column({ nullable : false })
  contact : string

  @Column({ default : false })
  provider : boolean

  @Column({ default : true })
  status : boolean

  @Column()
  user_id : number

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


  /*@ManyToOne(() => Movements, movements => movements.Person)
  movements: Movements[];*/


  @OneToMany(() => Header, Header => Header.Person)
  Headers: Header[];

}

