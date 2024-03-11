import { v4 as uuidv4 } from 'uuid';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('feedback', { schema: 'family_coffee_db' })
export class Feedback extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('nvarchar', {
    name: 'customer_name',
    length: 255,
    comment: 'Tên khách hàng gửi phản hồi',
  })
  customerName: string | undefined;

  @Column('text', { name: 'message', comment: 'Nội dung phản hồi' })
  message: string | undefined;
}
