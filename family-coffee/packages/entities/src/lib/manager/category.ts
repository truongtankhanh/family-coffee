import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product';

@Entity('categories', {schema: 'family_coffee_db'})
export class Category {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('nvarchar', {length: 255, comment: 'Tên danh mục'})
  name: string | undefined;

  @Column('int', {
    name: 'parent_id',
    nullable: true,
    comment:
      'ID danh mục cha (để hỗ trợ danh mục con, khóa ngoại tham chiếu đến chính bảng Categories)',
  })
  parentId: number | undefined;

  @OneToMany(() => Product, product => product.category)
  products: Promise<Product[]> | undefined;

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
