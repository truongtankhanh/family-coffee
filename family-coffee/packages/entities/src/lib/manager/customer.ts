import {Column, Entity, OneToMany} from 'typeorm';
import {Order} from './order';

@Entity('customers', {schema: 'family_coffee_db'})
export class Customer {
  @Column('int', {
    primary: true,
    name: 'id',
    comment: 'Khoá chính từ bảng Customer',
  })
  id: number | undefined;

  @Column('nvarchar', {length: 255, comment: 'Tên khách hàng'})
  name: string | undefined;

  @Column('varchar', {
    length: 20,
    name: 'phone_number',
    comment: 'Số điện thoại khách hàng',
  })
  phoneNumber: string | undefined;

  @OneToMany(() => Order, order => order.customer)
  orders: Promise<Order[]> | undefined;

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
