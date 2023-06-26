import {GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql'
import { FightType } from './Fight';

export const FighterType = new GraphQLObjectType({
    name: 'Fighter',
    fields: {
        fighter_id:{type:GraphQLID},
        fristname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        weight_class:{type: GraphQLString},
        nationality: {type: GraphQLString},
        team: {type: GraphQLString},
        gender:{type: GraphQLString},
        DOB:{type: GraphQLString},
        height:{type: GraphQLFloat},
        weight:{type: GraphQLFloat},
    }
});
export const FighterinfoType = new GraphQLObjectType({
    name: 'FighterInfo',
    fields: {
        name: {type: GraphQLString},
        weight_class:{type: GraphQLString},
        nationality: {type: GraphQLString},
        team: {type: GraphQLString},
        gender:{type: GraphQLString},
        DOB:{type: GraphQLString},
        height:{type: GraphQLFloat},
        weight:{type: GraphQLFloat},
        WINS:{type: GraphQLInt},
        KOTKO_Wins:{type: GraphQLInt},
        SUBMISSIONS_Wins:{type: GraphQLInt},
        DECISIONS_Wins:{type: GraphQLInt},
        LOSSES:{type:GraphQLInt},
        KOTKO_LOSSES:{type: GraphQLInt},
        SUBMISSIONS_LOSSES:{type: GraphQLInt},
        DECISIONS_LOSSES:{type: GraphQLInt},
        
    }
});