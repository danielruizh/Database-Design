import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fighters } from "./Fighters";
import { Fights } from "./Fights";

@Entity()
export class FighterStats {
  @PrimaryGeneratedColumn()
  stats_id: number;

  @ManyToOne(() => Fighters)
  @JoinColumn()
  fighter: Fighters;

  @Column()
  victory: boolean;
  @Column()
  victory_type: string;

  @ManyToOne(() => Fights)
  @JoinColumn()
  fight: Fights;
}