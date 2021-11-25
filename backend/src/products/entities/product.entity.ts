import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { Units } from "../../units/entities/units.entity";


@Entity()
@Unique("idx_products_", ["sku","name"])
export class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column({ nullable: true })
  code_bar: string;

  @Column({type : 'float'})
  current_existence: number;


  @Column({type : 'float'})
  reserved_quantity: number;

  @ManyToOne(() => Units, Units => Units.products)
  @JoinColumn({ name: 'purchase_unit_id' })
  unit_purchase: Units;

  @Column()
  purchase_unit_id: number

  @ManyToOne(() => Units, Units => Units.products)
  @JoinColumn({ name: 'sale_unit_id' })
  unit_sale: Units;

  @Column()
  sale_unit_id: number

  @Column({ nullable: true })
  product_parent_id: number

  @Column({ default: false })
  isdererivado: boolean


  /*@Column()
  bodega : string*/

  @Column({ default: true })
  status: boolean

  @Column()
  user_id: number

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