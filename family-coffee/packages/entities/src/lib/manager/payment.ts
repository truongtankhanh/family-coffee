import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  TypePamentMethod,
  TypePaymentStatus,
} from '@family-coffee/enums';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './order';
import { BaseEntity } from '../base-entity';

@Entity('payments', { schema: 'family_coffee_db' })
export class Payment extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('varchar', {
    name: 'order_id',
    length: 36,
    comment:
      'ID đơn hàng liên quan đến thanh toán (khóa ngoại kết nối đến bảng Orders)',
  })
  orderId: string | undefined;

  @Column('enum', {
    name: 'payment_method',
    comment: 'Phương thức thanh toán',
    enum: Object.values(PAYMENT_METHOD),
  })
  paymentMethod: TypePamentMethod | undefined;

  @Column('float', { name: 'amount', comment: 'Số tiền thanh toán' })
  amount: number | undefined;

  @Column('datetime', {
    name: 'payment_date',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Ngày và thời điểm thanh toán',
  })
  paymentDate: Date | undefined;

  @Column('enum', {
    name: 'status',
    comment: 'Trạng thái thanh toán',
    enum: Object.values(PAYMENT_STATUS),
  })
  status: TypePaymentStatus | undefined;

  @OneToOne(() => Order)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order | undefined;
}
