import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const EventType = new GraphQLObjectType({
    name:'Event',
    fields:{
        event_id:{type:GraphQLID},
        name:{type: GraphQLString},
        location:{type: GraphQLString},
        date:{type: GraphQLString}
    }
});