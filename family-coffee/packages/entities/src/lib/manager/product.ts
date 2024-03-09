import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './category';

@Entity('products', {schema: 'family_coffee_db'})
export class Product {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('text', {comment: 'Tên sản phẩm'})
  name: string | undefined;

  @Column('text', {comment: 'Mô tả sản phẩm'})
  description: string | undefined;

  @Column('float', {comment: 'Giá sản phẩm'})
  price: number | undefined;

  @ManyToOne(() => Category, category => category.products)
  category: Category | undefined;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | undefined;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | undefined;
}
