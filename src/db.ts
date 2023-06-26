import {DataSource} from "typeorm";
import { Fighters } from "./Entities/Fighters";
import { Fights } from './Entities/Fights';
import { FighterStats } from "./Entities/FighterStats";
import { Events } from "./Entities/Events";
import { Ranking } from "./Entities/Ranking";
export const AppDataSource = new DataSource({
    type:'postgres',
    host: "localhost",
    username:"postgres",
    password:"ROOT",
    port:5432,
    database:'Ejercicio1',
    entities:[Fighters,Events,Fights,FighterStats,Ranking],
    synchronize:true,
    logging:true

});