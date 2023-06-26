import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const RankingCalcuatefsType = new GraphQLObjectType({
    name: "Rankings",
    fields:{
        figth_id:{type: GraphQLID},
        fighter_id:{type: GraphQLID},
        fighter_name:{type: GraphQLString},
        type_fighter_win:{type: GraphQLString},
        position_fighter_win:{type: GraphQLInt},
        position_fighter_lost:{type: GraphQLInt}
    }
})