// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game_rule extends cc.Component {

    r_blackBlockList = [];
    r_tealBlockList = [];
    r_tealcardchoise = [];
    r_blackcardchoise = [];

    tostart() {
        
        this.r_blackBlockList = [{ rule_num: "rule1", rule_msg: "Advance 5 spaces" ,vise:false },//
        { rule_num: "rule2", rule_msg: "Advance to the next black space", vise:false},//
        { rule_num: "rule3", rule_msg: "Advance 10 spaces" ,vise:false},//
        { rule_num: "rule4", rule_msg: "Advance 15 spaces" ,vise:false},//
        { rule_num: "rule5", rule_msg: "Send this card to the Golden Ring",vise:false },//
        { rule_num: "rule6", rule_msg: "Bring all pawns out the Bay " ,vise:false},//
        { rule_num: "rule7", rule_msg: "2 turn in a row " ,vise:false},//
        { rule_num: "rule8", rule_msg: "Immune from being knocked out rest of the game( 1 pawn only) " ,vise:false},//
        { rule_num: "rule9", rule_msg: "Bring one of your pawn from ODOLUM's Eye to your Bay " ,vise:true},// vics versa
        { rule_num: "rule10", rule_msg: "Send this pawn back to your Bay" ,vise:true},// vise versa card
        { rule_num: "rule11", rule_msg: "Any Opponent pawn that lands on your color in the 2nd ring will be eleminated.(Until one of your pawns reaches the golden Ring" ,vise:false}];//


        this.r_tealBlockList = [{ rule_num: "rule1", rule_msg: "Send this pawn back to your bay " ,vise:false},//
        { rule_num: "rule2", rule_msg: "Send this pawn to the Golden Ring!" ,vise:true},//vise versa
        { rule_num: "rule3", rule_msg: "Advance this pawn 7 spaces" ,vise:true},//vise versa
        { rule_num: "rule4", rule_msg: "This pawn MUST go around twice!" ,vise:false},//
        { rule_num: "rule5", rule_msg: "Send ALL Golden Ring pawns back to your Bay" ,vise:false},//
        { rule_num: "rule6", rule_msg: "Send this pawn to your Bay and the player to the left of you gets to bring their pawn out." , vise:false},//
        { rule_num: "rule7", rule_msg: "Move Back 3 Spaces." , vise:false},//
        { rule_num: "rule8", rule_msg: "Advance to the next teal space." ,vise:false},//
        { rule_num: "rule9", rule_msg: "Move Back 5 Spaces. " ,vise:false},//
        { rule_num: "rule10", rule_msg: "Send ALL your pawns back to your Bay" ,vise:false},//
        { rule_num: "rule11", rule_msg: "The next 3 6's your roll will not work." ,vise:false}];//
        
       this.r_tealcardchoise=  [{ rule_num: "rule7", rule_msg: "Move Back 3 Spaces.", vise: false },//
        { rule_num: "rule9", rule_msg: "Move Back 5 Spaces. ", vise: false },//
        { rule_num: "rule11", rule_msg: "The next 3 6's your roll will not work.", vise: false },//
        { rule_num: "rule2", rule_msg: "Send this pawn to the Golden Ring!" ,vise:true},//vise versa
        { rule_num: "rule3", rule_msg: "Advance this pawn 7 spaces", vise: true }];//vise versa
        

        this.r_blackcardchoise = [{ rule_num: "rule1", rule_msg: "Advance 5 spaces" ,vise:false },//
        { rule_num: "rule2", rule_msg: "Advance to the next black space", vise:false},//
        { rule_num: "rule3", rule_msg: "Advance 10 spaces" ,vise:false},//
        { rule_num: "rule4", rule_msg: "Advance 15 spaces" ,vise:false},//
        { rule_num: "rule5", rule_msg: "Send this card to the Golden Ring",vise:false },//
        { rule_num: "rule6", rule_msg: "Bring all pawns out the Bay " ,vise:false},//
        { rule_num: "rule7", rule_msg: "2 turn in a row " ,vise:false},//
        { rule_num: "rule8", rule_msg: "Immune from being knocked out rest of the game( 1 pawn only) ", vise: false },//
        { rule_num: "rule11", rule_msg: "Any Opponent pawn that lands on your color in the 2nd ring will be eleminated.(Until one of your pawns reaches the golden Ring" ,vise:false}];//
    }    

}    
