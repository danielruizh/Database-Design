import "reflect-metadata"
import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import {CREATE_FIGHTERS, DELETE_FIGHTERS, UPDATE_FIGHTERS} from './Mutations/Fighter'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./Mutations/Event";
import { CREATE_FIGHT, DELETE_FIGHT, UPDATE_FIGHT } from "./Mutations/Fights";
import { GET_ALL_FIGHTERS, GET_FIGHTER, GET_INFO_FIGHTER } from "./Queries/Fighter";
import { GET_ALL_EVENTS, GET_EVENT } from "./Queries/Event";
import { GET_ALL_FIGHTS, GET_FIGHT } from "./Queries/Fight";
import { CALCULATE_RANKING } from "./Mutations/Ranking";
const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields:{
        getAllFighters: GET_ALL_FIGHTERS,
        getAllEvent: GET_ALL_EVENTS,
        getAllFights: GET_ALL_FIGHTS,
        getFighter: GET_FIGHTER,
        getFighterInfo: GET_INFO_FIGHTER,
        getEvent: GET_EVENT,
        getFight: GET_FIGHT,
    }
});

const Mutations = new GraphQLObjectType({
    name: 'mutations',
    fields:{
        createFighters: CREATE_FIGHTERS,
        deleteFighters: DELETE_FIGHTERS,
        updateFighters: UPDATE_FIGHTERS,
        createEvent: CREATE_EVENT,
        deleteEvent: DELETE_EVENT,
        updateEvent: UPDATE_EVENT,
        createFights:CREATE_FIGHT,
        deleteFights:DELETE_FIGHT,
        updateFights:UPDATE_FIGHT,
        calculateRanking:CALCULATE_RANKING,

    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});