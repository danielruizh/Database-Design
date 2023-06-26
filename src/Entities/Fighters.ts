import {Entity,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
@Entity()
export class Fighters{
    
  @PrimaryGeneratedColumn()
  fighter_id: number;

  @Column()
  fristname: string;
  @Column()
  lastname: string;

  @Column()
  weight_class: string;

  @Column()
  nationality: string;

  @Column()
  team: string;

  @Column()
  gender: string;

  @Column({ type: 'date'})
  DOB: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2})
  weight: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date; 
}