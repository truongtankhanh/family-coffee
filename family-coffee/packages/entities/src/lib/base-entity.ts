import { Column, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string | undefined;

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
