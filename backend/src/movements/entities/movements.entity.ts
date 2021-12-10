import { Products } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
//import { Person } from "../../person/entities/person.entity";
import { Header } from "../../header/entities/header.entity";
import { Status } from "../../status/entities/status.entity";


@Entity()
export class Movements {
  @PrimaryGeneratedColumn('increment')
  id: number;

  

  /*@ManyToOne(() => Person, Person => Person.movements)
  @JoinColumn({ name: 'personOrProvider_id' })
  Person: Person;

  @Column()
  personOrProvider_id : number*/

  @ManyToOne(() => Products, Products => Products.movements)
  @JoinColumn({ name: 'product_id' })
  Products: Products;

  @Column()
  product_id : number

  @Column({type : 'float'})
  quantity: number;

  @Column({type : 'float'})
  totalPurchasePrice: number;

  @Column({type : 'float'})
  unitPrice: number;

  @ManyToOne(() => Header, Header => Header.Movements)
  @JoinColumn({ name: 'header_id' })
  Header: Header;

  @Column()
  header_id : number

  @Column({type : 'float'})
  quantity_returned: number;




  @ManyToOne(() => Status, Status => Status.Movements)
    @JoinColumn({ name: 'status_id' })
    Status: Status;

    @Column({ nullable: true })
    status_id: number


 
}