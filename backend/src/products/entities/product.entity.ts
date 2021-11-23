import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { Units } from "../../units/entities/units.entity";

import { ProductsDerivates } from "../../product-derivates/entities/product-derivates.entity";

@Entity()
@Unique("idx_code",["code"])
export class Products {
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

  @OneToMany(()=> ProductsDerivates, ProductsDerivates => ProductsDerivates.Products )
  ProductsDerivates: ProductsDerivates[];
  
}