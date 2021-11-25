import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Products } from "../../products/entities/product.entity";

@Entity()
export class Units {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(()=> Products, Products => Products.unit_purchase )
  products: Products[];

}