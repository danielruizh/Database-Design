import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const MenssageTypes = new GraphQLObjectType({
    name:"Mensage",
    fields:{
        success: { type: GraphQLBoolean},
        menssage: { type: GraphQLString}
    }
})