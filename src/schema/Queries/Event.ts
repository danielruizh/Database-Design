import { GraphQLID, GraphQLList } from "graphql";
import { EventType } from "../typeDefs/Event";
import { AppDataSource } from "../../db";
import { Events } from "../../Entities/Events";

export const GET_ALL_EVENTS={
    type:GraphQLList(EventType),
    async resolve(){
        return await AppDataSource.manager.find(Events);
    }
}
export const GET_EVENT={
    type:EventType,
    args:{
        Event_id: {type:GraphQLID}
    },
    async resolve(_:any,args:any){
        return await AppDataSource.manager.findOne(Events,{where:{event_id:args.Event_id}});
    }
}