import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product';
import { BaseEntity } from '../base-entity';

@Entity('categories', { schema: 'family_coffee_db' })
export class Category extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('nvarchar', { length: 255, comment: 'Tên danh mục' })
  name: string | undefined;

  @Column('int', {
    name: 'parent_id',
    nullable: true,
    comment:
      'ID danh mục cha (để hỗ trợ danh mục con, khóa ngoại tham chiếu đến chính bảng Categories)',
  })
  parentId: number | undefined;

  @OneToMany(() => Product, (product) => product.category)
  products: Promise<Product[]> | undefined;
}
