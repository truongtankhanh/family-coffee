import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Payment } from './payment';
import { BaseEntity } from '../base-entity';

@Entity('payment_history', { schema: 'family_coffee_db' })
export class PaymentHistory extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

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
  @JoinColumn([{ name: 'payment_id', referencedColumnName: 'id' }])
  payment: Payment | undefined;
}
