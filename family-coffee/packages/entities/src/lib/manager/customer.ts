import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, OneToMany } from 'typeorm';
import { Order } from './order';
import { BaseEntity } from '../base-entity';

@Entity('customers', { schema: 'family_coffee_db' })
export class Customer extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('nvarchar', { length: 255, comment: 'Tên khách hàng' })
  name: string | undefined;

  @Column('varchar', {
    length: 20,
    name: 'phone_number',
    comment: 'Số điện thoại khách hàng',
  })
  phoneNumber: string | undefined;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Promise<Order[]> | undefined;
}
