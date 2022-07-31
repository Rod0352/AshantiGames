import game_User from "./game_User";
import gamePlay from "./gamePlay";
import game_pown from "./game_pown";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AI_CPU extends cc.Component {

  // case possibilitis 
  crossNormalGoldPriority: number = 2;
  crossInnerGoldPriority: number = 3;
  crossInnerPriority: number = 4;
  // normalMovePriority:number = 5;
  // openPawnPriority:number = 8;
  killPawnPriority: number = 9;
  innerCirlePriority: number = 10;
  normalGoldCirlclePriority: number = 11;
  innerGoldCirclePriority: number = 12;


  checkCpuPawn(currentPlayer, gameUsers: cc.Node[], diceNumber): cc.Node {

    var selectedPawn: cc.Node = null;
    //store all pawn situation priority count
    var pawn1PriorityCount = 0;
    var pawn2PriorityCount = 0;
    var pawn3PriorityCount = 0;
    var innerCicleIndex = currentPlayer.getComponent("game_User").circleOneEnterBlock.getComponent("Block").block_index;
    var normalGoldIndex = currentPlayer.getComponent("game_User").circleTwoEnterBlock.getComponent("Block").block_index;
    var innerGoldIndex = currentPlayer.getComponent("game_User").circleThreeEnterBlock.getComponent("Block").block_index;
    // current player current cpu info
    var currentUserInfo = currentPlayer.getComponent("game_User");
    // check all pown is at box
    if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == false &&
      currentUserInfo.pown[1].getComponent("game_pown").isOpen == false &&
      currentUserInfo.pown[2].getComponent("game_pown").isOpen == false) {
      var randVal = Math.floor(Math.random() * 3);
      return currentUserInfo.pown[randVal];
    }

    if (diceNumber < 6) {
      if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == true &&
        currentUserInfo.pown[1].getComponent("game_pown").isOpen == false &&
        currentUserInfo.pown[2].getComponent("game_pown").isOpen == false) {
        return currentUserInfo.pown[0];
      } else if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == false &&
        currentUserInfo.pown[1].getComponent("game_pown").isOpen == true &&
        currentUserInfo.pown[2].getComponent("game_pown").isOpen == false) {
        return currentUserInfo.pown[1];
      } else if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == false &&
        currentUserInfo.pown[1].getComponent("game_pown").isOpen == false &&
        currentUserInfo.pown[2].getComponent("game_pown").isOpen == true) {
        return currentUserInfo.pown[2];
      }


    }

    // all new pown is index
    var newPawnIndex;
    newPawnIndex = [0, 0, 0];
    for (var i = 0; i < 3; i++) {

      if ((!currentUserInfo.pown[i].getComponent("game_pown").isOpen) || (currentUserInfo.pown[i].getComponent("game_pown").isWin)) {
        continue;
      }
      var currentBlock = currentUserInfo.pown[i].getComponent("game_pown").currentBlock;
      if (currentUserInfo.pown[i].getComponent("game_pown").isOpen) {
        newPawnIndex[i] = currentBlock.getComponent("Block").block_index + diceNumber;
        if (newPawnIndex[i] >= 36) {
          newPawnIndex[i] = newPawnIndex[i] - (35 + 1);
        } else if (newPawnIndex[i] >= 60) {
          newPawnIndex[i] = newPawnIndex[i] - (59 + 1);
        } else if (newPawnIndex[i] >= 72) {
          newPawnIndex[i] = newPawnIndex[i] - (71 + 1);
        }
      } else {
        newPawnIndex[i] = 0;
      }
    }

    for (var i = 0; i < 3; i++) {
      var tempPawnIndex = 0;
      var isPawnKillAfterross: boolean = false;

      if ((!currentUserInfo.pown[i].getComponent("game_pown").isOpen) ||
        (currentUserInfo.pown[i].getComponent("game_pown").isWin)) {
        continue;
      }

      var currentBlock = currentUserInfo.pown[i].getComponent("game_pown").currentBlock;
      var panCurrentIndex = currentBlock.getComponent("Block").block_index;
      if (panCurrentIndex > 59) {
        continue;
      }
      // check pawn new updates position is at innercirlce index
      if (newPawnIndex[i] == innerCicleIndex) {
        tempPawnIndex = tempPawnIndex + this.innerCirlePriority;
      }
      // check pawn new updates position is at gold homw index
      if (newPawnIndex[i] == normalGoldIndex) {
        tempPawnIndex = tempPawnIndex + this.normalGoldCirlclePriority;
      }
      // check pawn new updates position is near eyes
      if (newPawnIndex[i] == innerGoldIndex) {
        tempPawnIndex = tempPawnIndex + this.innerGoldCirclePriority;
      }
      //kill pawn priority  after find kill check cross or not 
      for (var j = 0; j < 4; j++) {
        var tempPlayer = gameUsers[j];
        if ((currentPlayer.getComponent("game_User").userTag == j) ||
          (tempPlayer.getComponent("game_User").is_User_Win)) {
          continue;
        }
        for (var k = 0; k < 3; k++) {
          var tempUserInfo = tempPlayer.getComponent("game_User");
          var tempUserPawn = tempUserInfo.pown[k].getComponent("game_pown");
          if ((!tempUserPawn.isOpen) || (tempUserPawn.isWin)) {
            continue;
          }

          var userPawnCurrentIndex = tempUserPawn.currentBlock.getComponent("Block").block_index;
          if (userPawnCurrentIndex == newPawnIndex[i]) {
            if (currentUserInfo.userTag == 1) {
              if (((newPawnIndex[i] - panCurrentIndex) < 0) ||
                (innerGoldIndex > panCurrentIndex &&
                  innerGoldIndex < newPawnIndex[i]) ||
                (normalGoldIndex > panCurrentIndex &&
                  normalGoldIndex < newPawnIndex[i])) {
                tempPawnIndex = 0;
                isPawnKillAfterross = true;
              } else {
                tempPawnIndex = tempPawnIndex + this.killPawnPriority;
              }
            } else {
              if ((innerCicleIndex > panCurrentIndex &&
                innerCicleIndex < newPawnIndex[i]) ||
                (innerGoldIndex > panCurrentIndex &&
                  innerGoldIndex < newPawnIndex[i]) ||
                (normalGoldIndex > panCurrentIndex &&
                  normalGoldIndex < newPawnIndex[i])) {
                isPawnKillAfterross = true;
                tempPawnIndex = 0;
              } else {
                tempPawnIndex = tempPawnIndex + this.killPawnPriority;
              }
            }
          }
        }

      }
      //check pawn updated index cross innercirlce
      if (!isPawnKillAfterross) {
        if (currentUserInfo.userTag == 1) {
          if ((newPawnIndex[i] - panCurrentIndex) < 0) {
            tempPawnIndex = tempPawnIndex + this.crossInnerPriority;
          }
        } else {
          if (innerCicleIndex > panCurrentIndex &&
            innerCicleIndex < newPawnIndex[i]) {

            tempPawnIndex = tempPawnIndex + this.crossInnerPriority;

          }
        }
      }

      //check pawn updated index cross innerGoldcirlce
      if (innerGoldIndex > panCurrentIndex &&
        innerGoldIndex < newPawnIndex[i]) {
        tempPawnIndex = tempPawnIndex + this.crossInnerGoldPriority;
      }
      //check pawn updated index cross normalGoldcirlce
      if (normalGoldIndex > panCurrentIndex &&
        normalGoldIndex < newPawnIndex[i]) {
        tempPawnIndex = tempPawnIndex + this.crossNormalGoldPriority;
      }

      //store value in  pawnsCount
      if (i == 0) {
        if (isPawnKillAfterross) {
          pawn1PriorityCount = -1;

        } else {
          pawn1PriorityCount = pawn1PriorityCount + tempPawnIndex;

        }
      } else if (i == 1) {
        if (isPawnKillAfterross) {
          pawn2PriorityCount = -1;
        } else {
          pawn2PriorityCount = pawn2PriorityCount + tempPawnIndex;
        }
      } else if (i == 2) {
        if (isPawnKillAfterross) {
          pawn3PriorityCount = -1;
        } else {
          pawn3PriorityCount = pawn3PriorityCount + tempPawnIndex;
        }
      }

    }
    var openPawnrray = [];
    for (var i = 0; i < 3; i++) {
      if (currentUserInfo.pown[i].getComponent(game_pown).isOpen && !currentUserInfo.pown[i].getComponent(game_pown).isWin) {
        openPawnrray[i] = currentUserInfo.pown[i];
      }
    }
    // if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == false) {
    //   pawn1PriorityCount = -5;
    // }
    // if (currentUserInfo.pown[1].getComponent("game_pown").isOpen == false) {
    //   pawn2PriorityCount = -5;
    // }
    // if (currentUserInfo.pown[2].getComponent("game_pown").isOpen == false) {
    //   pawn3PriorityCount = -5;
    // }++

    if(currentUserInfo.pown[0].getComponent("game_pown").isWin){
      pawn1PriorityCount-=5;
    }
    if(currentUserInfo.pown[1].getComponent("game_pown").isWin){
      pawn2PriorityCount-=5;
    }
    if(currentUserInfo.pown[2].getComponent("game_pown").isWin){
      pawn3PriorityCount-=5;
    }
     
    var maxVal = Math.max(pawn1PriorityCount, pawn2PriorityCount, pawn3PriorityCount);
    if (maxVal < 9) {
      if (currentUserInfo.pown[0].getComponent("game_pown").isOpen == false && diceNumber == 6) {
        selectedPawn = currentUserInfo.pown[0];
      } else if (currentUserInfo.pown[1].getComponent("game_pown").isOpen == false && diceNumber == 6) {
        selectedPawn = currentUserInfo.pown[1];
      } else if (currentUserInfo.pown[2].getComponent("game_pown").isOpen == false && diceNumber == 6) {
        selectedPawn = currentUserInfo.pown[2];
      } else {
        var randVal = Math.floor(Math.random() * openPawnrray.length);

        selectedPawn = openPawnrray[randVal];
        
        
      //   if(selectedPawn.getComponent(game_pown).isWin ){
      //   while(true){

      //     if(!selectedPawn.getComponent(game_pown).isWin && selectedPawn.getComponent(game_pown).isOpen){
      //       break;
      //     }else{
      //       var randVal = Math.floor(Math.random() * openPawnrray.length);
      //       selectedPawn = openPawnrray[randVal];
      //     }
      //   }

      // }
    }


      //   if (maxVal < 0) {
      //   var randVal = Math.floor(Math.random() * openPawnrray.length);
      //   selectedPawn = openPawnrray[randVal];
      // } else if (pawn1PriorityCount < 0 && pawn2PriorityCount < 0 && pawn3PriorityCount >= 0) {
      //   selectedPawn = currentUserInfo.pown[2];
      // } else if (pawn1PriorityCount < 0 && pawn2PriorityCount >= 0 && pawn3PriorityCount < 0) {
      //   selectedPawn = currentUserInfo.pown[1];
      // } else if (pawn1PriorityCount < 0 && pawn2PriorityCount >= 0 && pawn3PriorityCount >= 0) {

      // } else if (pawn1PriorityCount >= 0 && pawn2PriorityCount < 0 && pawn3PriorityCount < 0) {

      // } else if (pawn1PriorityCount >= 0 && pawn2PriorityCount < 0 && pawn3PriorityCount >= 0) {

      // } else if (pawn1PriorityCount >= 0 && pawn2PriorityCount >= 0 && pawn3PriorityCount < 0) {

      // } else if (pawn1PriorityCount >= 0 && pawn2PriorityCount >= 0 && pawn3PriorityCount >= 0) {

      // }



      //   var maxVal2 = Math.max(pawn1PriorityCount, pawn2PriorityCount);

      //   var maxVal3 = Math.max(pawn1PriorityCount, pawn2PriorityCount);


      //   if (pawn1PriorityCount >= 0 && pawn2PriorityCount >= 0) {
      //     var maxVal1 = Math.max(pawn1PriorityCount, pawn2PriorityCount);
      //     if (maxVal1 == pawn1PriorityCount && currentUserInfo.pown[0].getComponent("game_pown").isOpen) {
      //       selectedPawn = currentUserInfo.pown[0];
      //     } else {
      //       selectedPawn = currentUserInfo.pown[1];
      //     }
      //   } else if (pawn2PriorityCount >= 0 && pawn3PriorityCount >= 0) {
      //     var randVal = Math.floor(Math.random() * 2) + 1;
      //     selectedPawn = currentUserInfo.pown[randVal];
      //   } else if (pawn1PriorityCount >= 0) {
      //     selectedPawn = currentUserInfo.pown[0];
      //   } else if (pawn2PriorityCount >= 0) {
      //     selectedPawn = currentUserInfo.pown[1];
      //   } else if (pawn3PriorityCount >= 0) {
      //     selectedPawn = currentUserInfo.pown[2];
      //   } else {
      //     var randVal = Math.floor(Math.random() * 3);
      //     selectedPawn = currentUserInfo.pown[randVal];
      //   }
      // }
    } else {
      if (maxVal == pawn1PriorityCount) {
        selectedPawn = currentUserInfo.pown[0];
      } else if (maxVal == pawn2PriorityCount) {
        selectedPawn = currentUserInfo.pown[1];
      } else if (maxVal == pawn3PriorityCount) {
        selectedPawn = currentUserInfo.pown[2];
      }
    }

    if(selectedPawn.getComponent(game_pown).isWin){
     
    }
    return selectedPawn;

  }

}
