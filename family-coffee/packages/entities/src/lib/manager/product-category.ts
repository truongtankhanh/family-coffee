import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Product} from './product';
import {Category} from './category';

@Entity('product_category', {schema: 'family_coffee_db'})
export class ProductCategory {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

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
  @JoinColumn([{name: 'product_id', referencedColumnName: 'id'}])
  product: Product | undefined;

  @OneToOne(() => Category)
  @JoinColumn([{name: 'category_id', referencedColumnName: 'id'}])
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
