import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user_accounts', {schema: 'family_coffee_db'})
export class UserAccount {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('nvarchar', {
    name: 'username',
    length: 255,
    comment: 'Tên đăng nhập của người dùng',
  })
  userName: string | undefined;

  @Column('varchar', {
    name: 'email',
    length: 100,
    comment: 'Địa chỉ email của người dùng',
  })
  email: string | undefined;

  @Column('varchar', {
    name: 'password',
    length: 50,
    comment: 'Mật khẩu được mã hóa của người dùng',
  })
  password: string | undefined;

  @Column('nvarchar', {
    name: 'full_name',
    length: 255,
    comment: 'Họ và tên của người dùng',
  })
  fullName: string | undefined;

  @Column('text', {name: 'address', comment: 'Địa chỉ của người dùng'})
  address: string | undefined;

  @Column('varchar', {
    name: 'phone_number',
    length: 20,
    comment: 'Số điện thoại của người dùng',
  })
  phoneNumber: string | undefined;

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
