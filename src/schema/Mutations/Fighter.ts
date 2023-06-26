import {GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInputObjectType, GraphQLString} from 'graphql';
import { Fighters } from '../../Entities/Fighters';
import { AppDataSource } from '../../db';
import { FighterType } from '../typeDefs/Fighter';
import { MenssageTypes } from '../typeDefs/Menssage';

export const CREATE_FIGHTERS={
    type: FighterType,
    args:{
        fristname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        weight_class:{type: GraphQLString},
        nationality: {type: GraphQLString},
        team: {type: GraphQLString},
        gender:{type: GraphQLString},
        DOB:{type: GraphQLString},
        height:{type: GraphQLFloat},
        weight:{type: GraphQLFloat}

    },
    async resolve(_:any, args: any){
        const {fristname,lastname,weight_class,nationality,team,gender,DOB,height,weight}=args;
        
        const fighters = new Fighters()
        fighters.fristname =fristname;
        fighters.lastname =lastname;
        fighters.weight_class =weight_class;
        fighters.nationality =nationality;
        fighters.team =team;
        fighters.gender =gender;
        fighters.DOB =DOB;
        fighters.height =height;
        fighters.weight =weight;
        const result = await AppDataSource.manager.save(fighters)
        return {...args,fighter_id:result.fighter_id};
    }
}
export const DELETE_FIGHTERS={
    type: GraphQLBoolean,
    args:{
        id:{type: GraphQLID}
    },
    async resolve(_:any, {id}: any){
        
        const result = await AppDataSource.manager.delete(Fighters, id);
        if(result.affected===1) return true;
        return false;
    }
}
export const UPDATE_FIGHTERS={
    type: MenssageTypes,
    args:{
        id:{type: GraphQLID},
        input:{type:new  GraphQLInputObjectType({
            name:'fighters',
            fields:{
                fristname: {type: GraphQLString},
                lastname: {type: GraphQLString},
                weight_class:{type: GraphQLString},
                nationality: {type: GraphQLString},
                team: {type: GraphQLString},
                gender:{type: GraphQLString},
                DOB:{type: GraphQLString},
                height:{type: GraphQLFloat},
                weight:{type: GraphQLFloat}
            }
        })}
    },
    async resolve(_:any, {id,input}: any){
        const consult = await AppDataSource.manager.findOne(Fighters,{where:{fighter_id: id}});
        if(!consult) return {
            success: false,
            menssage:"Fighter not found"
        }
        const result = await AppDataSource.manager.update(Fighters, id,
            {lastname:input.lastname,
            fristname: input.fristname,
            weight_class:input.weight_class,
            nationality:input.nationality,
            team:input.team,
            gender:input.gender,
            DOB:input.dob,
            height:input.height,
            weight:input.weight
        });
        if(result.affected===0) return {
            success: false,
            menssage:"Fighter update failed"
        };
        return{
            success: true,
            menssage:"Fighter updated successfully"
        }
    }
}