import { Column, Entity } from 'typeorm';

@Entity('admin-account', { schema: 'family_coffee_db' })
export class AdminAccount {
  @Column('int', {
    primary: true,
    name: 'id',
    comment: 'Khoá chính từ bảng AdminAccount',
  })
  id: number | undefined;

  @Column('varchar', {
    name: 'email',
    length: 100,
    nullable: true,
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

  @Column('text', { name: 'address', comment: 'Địa chỉ của người dùng' })
  address: string | undefined;

  @Column('varchar', {
    name: 'phone_number',
    length: 20,
    comment: 'Số điện thoại của người dùng',
  })
  phoneNumber: string | undefined;

  @Column('varchar', {
    name: 'jwt_token',
    length: 255,
    nullable: true,
    comment: 'Lưu trữ token JWT cho mỗi người dùng',
  })
  jwtToken: string;

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
