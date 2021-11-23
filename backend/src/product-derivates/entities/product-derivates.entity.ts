import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Units } from "../../units/entities/units.entity";
import { Products } from '../../products/entities/product.entity';

@Entity()
@Unique("idx_code_pro_der",["code"])
export class ProductsDerivates {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sku: string;

  @Column({ nullable : false })
  code: string;

  @Column()
  code_bar : string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description :string;

  @Column()
  existence : number;

  @Column()
  reservedquantity : number;

  @ManyToOne(() => Units, Units => Units.products)
  @JoinColumn({ name: 'unit_id' })
  unit: Units;

  @Column()
  unit_id : number


  /*@Column()
  bodega : string*/

  @Column({ default : true })
  status : boolean

  @Column()
  iduser : number

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
 

  @ManyToOne(() => Products, Products => Products.ProductsDerivates)
  @JoinColumn({ name: 'product_id' })
  Products: Products;

  @Column()
  product_id : number;

  @Column()
  quantityunit : number;
  
}