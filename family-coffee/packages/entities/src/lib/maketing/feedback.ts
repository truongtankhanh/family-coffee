import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('feedback', {schema: 'family_coffee_db'})
export class Feedback {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('nvarchar', {
    name: 'customer_name',
    length: 255,
    comment: 'Tên khách hàng gửi phản hồi',
  })
  customerName: string | undefined;

  @Column('text', {name: 'message', comment: 'Nội dung phản hồi'})
  message: string | undefined;

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
