import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';
import { BaseEntity } from '../base-entity';

@Entity('order_detail', { schema: 'family_coffee_db' })
export class OrderDetail extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('int', { name: 'product_id', comment: 'ID sản phẩm' })
  productId: number | undefined;

  @Column('int', { name: 'quantity', comment: 'Số lượng sản phẩm' })
  quantity: number | undefined;

  @Column('int', { name: 'unit_price', comment: 'Giá sản phẩm (mỗi đơn vị)' })
  unitPrice: number | undefined;

  @Column('int', {
    name: 'subtotal',
    comment: 'Tổng giá của sản phẩm trong đơn hàng',
  })
  subtotal: number | undefined;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order | undefined;

  @OneToOne(() => Product)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product | undefined;
}
