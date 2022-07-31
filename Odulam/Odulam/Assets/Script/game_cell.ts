
const {ccclass, property} = cc._decorator;

@ccclass
export default class game_cell extends cc.Component {


    row: number;
    colom: number;
    color: string;
    positon: number[];
    
}
