import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import { EventType } from "../typeDefs/Event";
import { Events } from "../../Entities/Events";
import { AppDataSource } from "../../db";
import { MenssageTypes } from "../typeDefs/Menssage";

export const CREATE_EVENT ={
    type: EventType,
    args:{
        name:{type: GraphQLString},
        location:{type: GraphQLString},
        date:{type: GraphQLString}
    },
    async resolve(_:any,args:any){
        const {name,location,date} = args;
        const event = new Events();
        event.name = name;
        event.location = location;
        event.date = date;
        const result= await AppDataSource.manager.save(event);
        return {...args,event_id:result.event_id};
    }
}
export const DELETE_EVENT ={
    type: GraphQLBoolean,
    args:{
        id: {type:GraphQLID}
    },
    async resolve(_:any,{id}:any){
        const result = await AppDataSource.manager.delete(Events, id);
        if(result.affected===1) return true;
        return false
    }
}
export const UPDATE_EVENT ={
    type: MenssageTypes,
    args:{
        id: {type:GraphQLID},
        input:{type: new GraphQLInputObjectType({
            name:"event",
            fields: {
                name:{type: GraphQLString},
                location:{type: GraphQLString},
                date:{type: GraphQLString}
            }
        })}
    },
    async resolve(_:any,{id,input}:any){
        const consult = await AppDataSource.manager.findOne(Events,{where:{event_id: id}});
        if(!consult) return {
            success: false,
            menssage:"Event not found"
        }
        const result = await AppDataSource.manager.update(Events, id,
            {
                name:input.name,
                location:input.location,
                date:input.date
            });
        if(result.affected===0) return {
            success: false,
            menssage:"Event update failed"
        };
        return{
            success: true,
            menssage:"Event updated successfully"
        }
    }
}