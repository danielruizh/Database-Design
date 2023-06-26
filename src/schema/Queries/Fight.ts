import { GraphQLID, GraphQLList, parseType} from "graphql";
import { FightType } from "../typeDefs/Fight";
import { AppDataSource } from "../../db";
import { Fights } from "../../Entities/Fights";
import { Events } from '../../Entities/Events';
import { Fighters } from "../../Entities/Fighters";

export const GET_ALL_FIGHTS={
    type:GraphQLList(FightType),
    async resolve(){
        const result= await AppDataSource.manager.find(Fights,{
            select:{
                event:{
                    event_id:true,
                    name:true
                },
                fighter1:{
                    fighter_id:true,
                    fristname:true,
                    lastname:true,
                },
                fighter2:{
                    fighter_id:true,
                    fristname:true,
                    lastname:true,
                }

            },
            relations:{
                event:true,
                fighter1:true,
                fighter2:true
            }
        });
        const arr = new Array;
        result.forEach(r => {
            console.log(r.event.event_id)
            arr.push({fight_id:r.fight_id,
                event:r.event.event_id,
                event_name:r.event.name,
                fighter1: r.fighter1.fighter_id,
                fighter1_name: r.fighter1.fristname + " " + r.fighter1.lastname,
                fighter2: r.fighter2.fighter_id,
                fighter2_name: r.fighter2.fristname + " " + r.fighter2.lastname,

                
            });
        });
        return arr
    }
}
export const GET_FIGHT={
    type:FightType,
    args:{
        Fight_id: {type:GraphQLID}
    },
    async resolve(_:any,args:any){
        const result= await AppDataSource.manager.findOne(Fights,{
            select:{
                event:{
                    event_id:true,
                    name:true
                },
                fighter1:{
                    fighter_id:true,
                    fristname:true,
                    lastname:true,
                },
                fighter2:{
                    fighter_id:true,
                    fristname:true,
                    lastname:true,
                }

            },
            relations:{
                event:true,
                fighter1:true,
                fighter2:true
            },
            where:{
                fight_id:args.fight_id
            }
        });
        return {fight_id:result?.fight_id,
            event:result?.event.event_id,
            event_name:result?.event.name,
            fighter1: result?.fighter1.fighter_id,
            fighter1_name: result?.fighter1.fristname + " " + result?.fighter1.lastname,
            fighter2: result?.fighter2.fighter_id,
            fighter2_name: result?.fighter2.fristname + " " + result?.fighter2.lastname}
    }
}