import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './category';
import { BaseEntity } from '../base-entity';

@Entity('products', { schema: 'family_coffee_db' })
export class Product extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('text', { comment: 'Tên sản phẩm' })
  name: string | undefined;

  @Column('text', { comment: 'Mô tả sản phẩm' })
  description: string | undefined;

  @Column('float', { comment: 'Giá sản phẩm' })
  price: number | undefined;

  @Column('varchar', { name: 'category_id', length: 36 })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category | undefined;
}
