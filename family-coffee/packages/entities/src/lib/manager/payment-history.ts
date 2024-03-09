import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Payment} from './payment';

@Entity('payment_history', {schema: 'family_coffee_db'})
export class PaymentHistory {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('int', {
    name: 'payment_id',
    comment: 'ID thanh toán (khóa ngoại kết nối đến bảng Payments)',
  })
  paymentId: number | undefined;

  @Column('text', {
    name: 'description',
    comment: 'Mô tả chi tiết về thanh toán',
  })
  description: string | undefined;

  @OneToOne(() => Payment)
  @JoinColumn([{name: 'payment_id', referencedColumnName: 'id'}])
  payment: Payment | undefined;

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
