import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  TypeOrderStatus,
  TypePaymentStatus,
} from '@family-coffee/enums';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './customer';
import { OrderDetail } from './order-detail';
import { BaseEntity } from '../base-entity';

@Entity('orders', { schema: 'family_coffee_db' })
export class Order extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('datetime', { name: 'order_date', comment: 'Ngày đặt hàng' })
  orderDate: Date | undefined;

  @Column('enum', {
    name: 'status',
    comment: 'Trạng thái đơn hàng',
    enum: Object.values(ORDER_STATUS),
  })
  status: TypeOrderStatus | undefined;

  @Column('enum', {
    name: 'payment_status',
    comment: 'Trạng thái thanh toán',
    enum: Object.values(PAYMENT_STATUS),
  })
  paymentStatus: TypePaymentStatus | undefined;

  @Column('decimal', {
    name: 'total_amount',
    comment: 'Tổng số tiền của đơn hàng',
  })
  totalAmount: number | undefined;

  @Column('varchar', { name: 'customer_id', length: 36 })
  customerId: string;

  @ManyToOne(() => Customer, (user) => user.orders)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customer | undefined;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: Promise<OrderDetail[]> | undefined;
}
