// any entity in Nestjs should extend BaseEntity

import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

/*
This decorator is used to mark classes that will be an entity (table or document depend on database type).
Database schema will be created for all classes decorated with it,
and Repository can be retrieved and used for it.
*/
// FIX: 20220712 postgres table not created
@Entity() // @Entity(your-table-name)
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn({
    // primary key
    comment: 'the quiz unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;
}
