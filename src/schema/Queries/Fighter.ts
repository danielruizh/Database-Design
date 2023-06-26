import { GraphQLID, GraphQLList} from "graphql";
import { Fighters } from "../../Entities/Fighters";
import { AppDataSource } from "../../db";
import { FighterType, FighterinfoType } from "../typeDefs/Fighter";
import { FighterStats} from '../../Entities/FighterStats';
import { GET_FIGHT } from "./Fight";

export const GET_ALL_FIGHTERS={
    type: GraphQLList(FighterType),
    async resolve(){
        return await AppDataSource.manager.find(Fighters);

    }
    
}
export const GET_FIGHTER={
    type: FighterType,
    args:{
        Fighter_id: {type:GraphQLID}
    },
    async resolve(_:any,args:any){
        return await AppDataSource.manager.findOne(Fighters,{where:{fighter_id:args.Fighter_id}});

    }
    
}
export const GET_INFO_FIGHTER={
    type: FighterinfoType,
    args:{
        Fighter_id: {type:GraphQLID}
    },
    async resolve(_:any,{Fighter_id}:any){
        const fighter= await AppDataSource.manager.findOne(Fighters,{where:{fighter_id:Fighter_id}});
        const fighterStats = await AppDataSource.manager.find(FighterStats,{loadRelationIds:true});
        let WIN=0, LOST =0, KO_win =0,SUBMISSIONS_win =0,DECISIONS_win=0,KO_lost =0,SUBMISSIONS_lost =0,DECISIONS_lost=0;
        for (const stas of fighterStats){
            if(stas.fighter == Fighter_id && stas.victory ===true){
                WIN++;
                if(stas.victory_type =="knockouts"){
                        KO_win++;
                }else if(stas.victory_type =="SUBMISSIONS"){
                    SUBMISSIONS_win++;
                }else if(stas.victory_type =="DECISIONS"){
                    DECISIONS_win++;
                }
            }
            if(stas.fighter == Fighter_id && stas.victory ==false){
                LOST++;
                if(stas.victory_type =="knockouts"){
                    KO_lost++;
                }else if(stas.victory_type =="SUBMISSIONS"){
                    SUBMISSIONS_lost++;
                }else if(stas.victory_type =="DECISIONS"){
                    DECISIONS_lost++;
                }
            }
        }
        const event = GET_FIGHTER;
        console.log(event);
        return {name:fighter?.fristname+" "+fighter?.lastname,...fighter,
        WINS:WIN,
        KOTKO_Wins:KO_win,
        SUBMISSIONS_Wins:SUBMISSIONS_win,
        DECISIONS_Wins:DECISIONS_win,
        LOSSES:LOST,
        KOTKO_LOSSES:KO_lost,
        SUBMISSIONS_LOSSES:SUBMISSIONS_lost,
        DECISIONS_LOSSES:DECISIONS_lost,
    };

    }
    
}