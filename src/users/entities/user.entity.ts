import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// user table
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
