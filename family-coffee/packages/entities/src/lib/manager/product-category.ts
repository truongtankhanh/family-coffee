import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product';
import { Category } from './category';
import { BaseEntity } from '../base-entity';

@Entity('product_category', { schema: 'family_coffee_db' })
export class ProductCategory extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('int', {
    name: 'product_id',
    comment: 'ID sản phẩm (khóa ngoại kết nối đến bảng Products)',
  })
  productId: number | undefined;

  @Column('int', {
    name: 'category_id',
    comment: 'ID danh mục sản phẩm (khóa ngoại kết nối đến bảng Categories)',
  })
  categoryId: number | undefined;

  @OneToOne(() => Product)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product | undefined;

  @OneToOne(() => Category)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category | undefined;
}
