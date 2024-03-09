import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity('order_detail', { schema: 'family_coffee_db' })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number | undefined;

  @Column('int', { name: 'product_id', comment: 'ID sản phẩm' })
  productId: number | undefined;

  @Column('int', { name: 'quantity', comment: 'Số lượng sản phẩm' })
  quantity: number | undefined;

  @Column('int', { name: 'unit_price', comment: 'Giá sản phẩm (mỗi đơn vị)' })
  unitPrice: number | undefined;

  @Column('int', { name: 'subtotal', comment: "Tổng giá của sản phẩm trong đơn hàng" })
  subtotal: number | undefined;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order | undefined;

  @OneToOne(() => Product)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product | undefined;

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
