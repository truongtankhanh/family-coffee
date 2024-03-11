import { v4 as uuidv4 } from 'uuid';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('restaurant', { schema: 'family_coffee_db' })
export class Restaurant extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('text', { name: 'description', comment: 'Mô tả về quán' })
  description: string | undefined;

  @Column('text', { name: 'address', comment: 'Địa chỉ quán' })
  address: string | undefined;

  @Column('varchar', {
    name: 'phone_number',
    length: 20,
    comment: 'Số điện thoại quán',
  })
  phoneNumber: string | undefined;

  @Column('varchar', {
    name: 'email',
    length: 100,
    comment: 'Địa chỉ email liên hệ',
  })
  email: string | undefined;

  @Column('varchar', {
    name: 'working_hours',
    length: 35,
    comment: 'Giờ mở cửa và đóng cửa của quán',
  })
  workingHours: string | undefined;
}
