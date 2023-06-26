import express from "express";
import {graphqlHTTP} from 'express-graphql';
import{schema}from'./schema';
const app = express();

app.use('/', graphqlHTTP({
    graphiql: true,
    schema
}));
export default app;