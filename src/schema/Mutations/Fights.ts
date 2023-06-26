import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType } from "graphql";
import { FightType } from "../typeDefs/Fight";
import { Fights } from "../../Entities/Fights";
import { AppDataSource } from "../../db";
import { Events } from '../../Entities/Events';
import { Fighters } from "../../Entities/Fighters";
import { MenssageTypes } from "../typeDefs/Menssage";

export const CREATE_FIGHT={
    type:FightType,
    args:{
        event: {type:GraphQLID},
        fighter1: {type:GraphQLID},
        fighter2: {type:GraphQLID}
    },
    async resolve(_:any,args:any){
        const {event,fighter1,fighter2} =args;
        const Event = await AppDataSource.manager.findOne(Events,{where:{ event_id: event}});
        const Fighter1 = await AppDataSource.manager.findOne(Fighters,{where:{ fighter_id:fighter1}});
        const Fighter2 = await AppDataSource.manager.findOne(Fighters,{where:{ fighter_id:fighter2}});
        const fight = new Fights();
        fight.event = event;
        fight.fighter1 =fighter1;
        fight.fighter2 =fighter2;
        console.log(Event);
        const result = await AppDataSource.manager.save(fight);
        return{...args,fight_id:result.fight_id,event_name:Event?.name, fighter1_name: Fighter1?.fristname +' '+Fighter1?.lastname,fighter2_name:Fighter2?.fristname +' '+Fighter2?.lastname};
    }
}
export const DELETE_FIGHT={
    type:GraphQLBoolean,
    args:{
        id: {type:GraphQLID}
    },
    async resolve(_:any,{id}:any){
        const result = await AppDataSource.manager.delete(Fights, id);
        if(result.affected === 1) return true;
        return false;
    }
}
export const UPDATE_FIGHT={
    type:MenssageTypes,
    args:{
        id: {type:GraphQLID},
        input:{type: new GraphQLInputObjectType({
            name: 'fight',
            fields:{
                event: {type:GraphQLID},
                fighter1: {type:GraphQLID},
                fighter2: {type:GraphQLID}
            }
        })}
    },
    async resolve(_:any,{id, input}:any){
        const consult = await AppDataSource.manager.findOne(Fights,{where:{fight_id: id}});
        if(!consult) return {
            success: false,
            menssage:"Fight not found"
        }
        const result = await AppDataSource.manager.update(Fights, id,
            {
                event: input.event,
                fighter1: input.fighter1,
                fighter2: input.fighter2
            });
        if(result.affected===0) return {
            success: false,
            menssage:"Fight update failed"
        };
        return{
            success: true,
            menssage:"Fight updated successfully"
        }
    }
}