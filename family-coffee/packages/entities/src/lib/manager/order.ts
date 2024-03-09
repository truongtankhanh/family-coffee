import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  TypeOrderStatus,
  TypePaymentStatus,
} from '@family-coffee/enums';
import {Customer} from './customer';
import {OrderDetail} from './order-detail';

@Entity('orders', {schema: 'family_coffee_db'})
export class Order {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('datetime', {name: 'order_date', comment: 'Ngày đặt hàng'})
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

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: Promise<OrderDetail[]> | undefined;

  @ManyToOne(() => Customer, user => user.orders)
  customer: Customer | undefined;

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
