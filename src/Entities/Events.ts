import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Fights } from "./Fights";


@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    event_id: number;
  
    @Column()
    name: string;
  
    @Column()
    location: string;
  
    @Column({ type: 'date'})
    date: Date; 

    @OneToMany(() => Fights, (fights) => fights.event)
    fight: Fights[];
  }