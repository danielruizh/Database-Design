import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Fighters } from "./Fighters";
import { join } from "path";

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  ranking_id: number;
  @ManyToOne(() => Fighters)
  fighter: Fighters;
  
  @Column()
  position: number;
}