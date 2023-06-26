import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { RankingCalcuatefsType } from "../typeDefs/Ranking";
import { Fighters } from '../../Entities/Fighters';
import { AppDataSource } from "../../db";
import { Ranking } from "../../Entities/Ranking";
import { Fights } from "../../Entities/Fights";
import { Console, log } from "console";
import { FighterStats } from '../../Entities/FighterStats';
import { exit } from "process";

export const CALCULATE_RANKING = {
    type: RankingCalcuatefsType,
    args:{
        figths_id:{type: GraphQLID},
        fighter_id:{type: GraphQLID},
        type_fighter_win:{type: GraphQLString},
        position_fighter_win:{type: GraphQLInt},
        position_fighter_lost:{type: GraphQLInt}
    },
    async resolve(_:any,{figths_id,fighter_id,position_fighter_win,type_fighter_win,position_fighter_lost}:any){
        const Ranking1 = new Ranking();
        Ranking1.fighter =fighter_id;
        Ranking1.position=position_fighter_win;
        const exist = await AppDataSource.manager.find(Ranking,{loadRelationIds:true});

        const Stast1 = new FighterStats();
        Stast1.fight=figths_id;
        Stast1.fighter =fighter_id;
        Stast1.victory = true,
        Stast1.victory_type= type_fighter_win
        if(exist.length ===0){
             const resultWin = await AppDataSource.manager.save(Ranking1);
             const resultWin2 = await AppDataSource.manager.save(Stast1);
             const resultLost = await AppDataSource.manager.find(Fights,{loadRelationIds:true, where:{
                fight_id: figths_id
             }})
             for(const lost of resultLost){
                if(lost.fighter1!=fighter_id){
                    const Ranking2 = new Ranking();
                    Ranking2.fighter =lost.fighter1;
                    Ranking2.position=position_fighter_lost;
                    const resultLost = await AppDataSource.manager.save(Ranking2);
                    const Stast2 = new FighterStats();
                    Stast2.fight=figths_id;
                    Stast2.fighter =lost.fighter1;
                    Stast2.victory = false;
                    Stast2.victory_type= type_fighter_win;
                    const resultWin2 = await AppDataSource.manager.save(Stast2);
                }else{
                    const Ranking2 = new Ranking();
                    Ranking2.fighter =lost.fighter2;
                    Ranking2.position=position_fighter_lost;
                    const resultLost = await AppDataSource.manager.save(Ranking2);
                    const Stast2 = new FighterStats();
                    Stast2.fight=figths_id;
                    Stast2.fighter =lost.fighter2;
                    Stast2.victory = false;
                    Stast2.victory_type= type_fighter_win;
                    const resultWin2 = await AppDataSource.manager.save(Stast2);

                }
             }
            const fighterName = await AppDataSource.manager.findOne(Fighters,{where:{ fighter_id:fighter_id}});
             return {figth_id:figths_id, fighter_id:fighter_id, fighter_name: fighterName?.fristname +" "+ fighterName?.lastname, type_fighter_win:type_fighter_win, position_fighter_win: position_fighter_win,
             position_fighter_lost:position_fighter_lost};
         }else{
            for(const ran of exist){
                if(ran.fighter ==fighter_id){
                    const resultWin = await AppDataSource.manager.update(Ranking,ran.ranking_id,{
                        position:Ranking1.position
                    });
                    const resultLost = await AppDataSource.manager.find(Fights,{loadRelationIds:true, where:{
                        fight_id: figths_id
                     }})

                     const Stast2 = new FighterStats();
                     for(const lost of resultLost){
                        if(lost.fighter1!=fighter_id){
                            for(const los of exist){
                                if(los.fighter ==lost.fighter1){                                    
                                    const resultLost1 = await AppDataSource.manager.update(Ranking, los.ranking_id,{
                                        position:position_fighter_lost
                                    });
                                }
                            }
                                 
                            Stast2.fight=figths_id;
                            Stast2.fighter =lost.fighter1;
                            Stast2.victory = false;
                            Stast2.victory_type= type_fighter_win;
                        }else{
                            for(const los of exist){
                                if(los.fighter ==lost.fighter2){                                    
                                    const resultLost1 = await AppDataSource.manager.update(Ranking,los.ranking_id,{
                                        position:position_fighter_lost
                                    });
                                    console.log(resultLost1) 
                                }
                            }
                            Stast2.fight=figths_id;
                            Stast2.fighter =lost.fighter2;
                            Stast2.victory = false;
                            Stast2.victory_type= type_fighter_win;
                        }
                     }
                    const fighterStats = await AppDataSource.manager.find(FighterStats,{loadRelationIds:true});
                    let win = false,lost = false;

                    for( const stast of fighterStats){
                        if(stast.fighter==fighter_id && stast.fight == figths_id){
                            const resultWin2 = await AppDataSource.manager.update(FighterStats,stast.stats_id,{
                                victory:true
                            });
                            win = true
                        }
                        if(stast.fighter!=fighter_id && stast.fight == figths_id){
                            const resulLost = await AppDataSource.manager.update(FighterStats,stast.stats_id,{
                                victory:false
                            });
                            lost = true;
                        }
                    }
                    if(lost !=true && win !=true){
                        const resultWin2 = await AppDataSource.manager.save(Stast1);
                        console.log(resultWin2);
                        const resultLost2 = await AppDataSource.manager.save(Stast2);
                        console.log(resultLost2);
                    }
                    const fighterName = await AppDataSource.manager.findOne(Fighters,{where:{ fighter_id:fighter_id}});
                     return {figth_id:figths_id, fighter_id:fighter_id, fighter_name: fighterName?.fristname +" "+ fighterName?.lastname, type_fighter_win:type_fighter_win, position_fighter_win: position_fighter_win,
                     position_fighter_lost:position_fighter_lost};
                }
            }
            console.log('Hola');
            const resultWin = await AppDataSource.manager.save(Ranking1);
            const resultWin2 = await AppDataSource.manager.save(Stast1);
            const resultLost = await AppDataSource.manager.find(Fights,{loadRelationIds:true, where:{
                fight_id: figths_id
             }})
             for(const lost of resultLost){
                if(lost.fighter1!=fighter_id){
                    const Ranking2 = new Ranking();
                    Ranking2.fighter =lost.fighter1;
                    Ranking2.position=position_fighter_lost;
                    const resultLost = await AppDataSource.manager.save(Ranking2);
                    const Stast2 = new FighterStats();
                    Stast2.fight=figths_id;
                    Stast2.fighter =lost.fighter1;
                    Stast2.victory = false;
                    Stast2.victory_type= type_fighter_win;
                    const resultWin2 = await AppDataSource.manager.save(Stast2);
                }else{
                    const Ranking2 = new Ranking();
                    Ranking2.fighter =lost.fighter2;
                    Ranking2.position=position_fighter_lost;
                    const resultLost = await AppDataSource.manager.save(Ranking2);
                    const Stast2 = new FighterStats();
                    Stast2.fight=figths_id;
                    Stast2.fighter =lost.fighter2;
                    Stast2.victory = false;
                    Stast2.victory_type= type_fighter_win;
                    const resultWin2 = await AppDataSource.manager.save(Stast2);

                }
             }
             const fighterName = await AppDataSource.manager.findOne(Fighters,{where:{ fighter_id:fighter_id}});
             return {figth_id:figths_id, fighter_id:fighter_id, fighter_name: fighterName?.fristname +" "+ fighterName?.lastname, type_fighter_win:type_fighter_win, position_fighter_win: position_fighter_win,
             position_fighter_lost:position_fighter_lost};
         }
    }
}