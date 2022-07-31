import game_Disc from "./game_Disc";
import game_User from "./game_User";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {


    //call to glow pown perticular user
    currentPlayerUpdateCall(currentPlayer, diceNumber: number) {

        var currentUserInfo = currentPlayer.getComponent("game_User");
        let isOpenDice = false;
        if(diceNumber < 6){
            for (var i = 0; i < 3; i++) {
                if (currentUserInfo.pown[i].getComponent("game_pown").isOpen) {
                    isOpenDice = true;
                    break;
                }
            }
        }
        if(isOpenDice){
            currentUserInfo.glowPawnCall(diceNumber);
        }

    }

    // update (dt) {}
}
