import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  TypePamentMethod,
  TypePaymentStatus,
} from '@family-coffee/enums';
import {Order} from './order';

@Entity('payments', {schema: 'family_coffee_db'})
export class Payment {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('int', {
    name: 'order_id',
    comment:
      'ID đơn hàng liên quan đến thanh toán (khóa ngoại kết nối đến bảng Orders)',
  })
  orderId: number | undefined;

  @Column('enum', {
    name: 'payment_method',
    comment: 'Phương thức thanh toán',
    enum: Object.values(PAYMENT_METHOD),
  })
  paymentMethod: TypePamentMethod | undefined;

  @Column('float', {name: 'amount', comment: 'Số tiền thanh toán'})
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
  @JoinColumn([{name: 'order_id', referencedColumnName: 'id'}])
  order: Order | undefined;

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
