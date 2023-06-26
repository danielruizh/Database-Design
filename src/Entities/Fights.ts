import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./Events";
import { Fighters } from './Fighters';
@Entity()
export class Fights {
  @PrimaryGeneratedColumn()
  fight_id: number;

  @ManyToOne(() => Events, (event) => event.fight)
  @JoinColumn({name:'event_ id'})
  event: Events;

  @ManyToOne(() => Fighters)
  @JoinColumn()
  fighter1: Fighters;

  @ManyToOne(() => Fighters)
  @JoinColumn()
  fighter2: Fighters;
}