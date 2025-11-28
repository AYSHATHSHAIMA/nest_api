import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn('uuid')
id: string;


  @Column()
  name: string;

  @Column('int')
  cost: number;

  @Column('int', { default: 0 })
  capacity: number;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: false })
  is_booked: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
