import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const FightType = new GraphQLObjectType({
    name:"Fights",
    fields:{
        fight_id:{type:GraphQLID},
        event: {type:GraphQLID},
        event_name: {type:GraphQLString},
        fighter1: {type:GraphQLID},
        fighter1_name: {type:GraphQLString},
        fighter2: {type:GraphQLID},
        fighter2_name: {type:GraphQLString},
    }
})