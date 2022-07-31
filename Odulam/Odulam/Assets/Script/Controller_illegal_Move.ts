import Block from "./Block";
import chooseStatementTs from "./chooseStatementTs";
import gameBoard from "./gameBoard";
import gamePlay from "./gamePlay";
import game_pown from "./game_pown";
import Game_rule from "./Game_rule";
import game_User from "./game_User";
import LodingLayer from "./LodingLayer";

const { ccclass, property } = cc._decorator;
var poslistArr =
    [{ x: -81.2908535753686, y: -118.65327048807279 },
    { x: -61.888948042501426, y: -132.34873321715554 },
    { x: -36.78059970584977, y: -139.1964645816969 },
    { x: -11.672251369198108, y: -143.76161882472445 },
    { x: 12.29480840669666, y: -142.62033026396756 },
    { x: 35.12057962183451, y: -136.9138874601831 },
    { x: 62.51150507999995, y: -128.92486753488487 },
    { x: 84.19598773438094, y: -116.37069336655901 },
    { x: 100.17402758497747, y: -98.11007639444875 },
    { x: 116.15206743557394, y: -76.42559374006777 },
    { x: 128.7062416038998, y: -54.74111108568678 },
    { x: 137.83655008995493, y: -33.056628431305796 },
    { x: 142.4017043329825, y: -7.948280094654137 },
    { x: 143.54299289373938, y: 16.01877968124063 },
    { x: 138.97783865071182, y: 41.12712801789223 },
    { x: 132.13010728617047, y: 63.952899233030166 },
    { x: 118.43464455708772, y: 85.63738188741115 },
    { x: 103.59789326724814, y: 103.89799885952141 },
    { x: 83.05469917362404, y: 121.01732727087483 },
    { x: 62.51150507999995, y: 132.43021287844374 },
    { x: 37.40315674334832, y: 139.2779529503258 },
    { x: 12.29480840669666, y: 142.70181863259643 },
    { x: -12.813539929954999, y: 144.98439575411032 },
    { x: -36.78059970584977, y: 142.70181863259643 },
    { x: -60.747659481744535, y: 133.5715101465413 },
    { x: -82.43214213612549, y: 117.59347029594483 },
    { x: -99.5514705474789, y: 102.75671900610519 },
    { x: -115.52951039807542, y: 81.0722363517242 },
    { x: -129.22497312715814, y: 61.670330818856996 },
    { x: -138.35528161321326, y: 42.268425285989906 },
    { x: -145.20301297775464, y: 16.0187883885813 },
    { x: -145.20301297775464, y: -11.372137069584141 },
    { x: -140.63785873472705, y: -37.62177396699269 },
    { x: -133.7901273701857, y: -61.58883374288746 },
    { x: -118.95337608034609, y: -83.27331639726839 },
    { x: -102.97533622974959, y: -101.5339333693787 },
    { x: -69.04794942252997, y: -68.38598416527918 },
    { x: -82.74341215161269, y: -50.12536719316887 },
    { x: -93.01500919842474, y: -26.158307417274102 },
    { x: -97.58016344145231, y: 1.2326180408913388 },
    { x: -95.29758631993852, y: 25.199677816786107 },
    { x: -85.02598927312647, y: 46.88416047116709 },
    { x: -71.33052654404375, y: 66.2860660040343 },
    { x: -51.928621011176574, y: 84.54668297614455 },
    { x: -26.820272674524915, y: 93.67699146219968 },
    { x: -0.5706357771163653, y: 95.95956858371346 },
    { x: 23.396423998778403, y: 90.25312577992906 },
    { x: 47.36348377467317, y: 82.26410585463077 },
    { x: 69.04796642905416, y: 69.70993168630491 },
    { x: 82.74342915813685, y: 48.02544903192393 },
    { x: 91.87373764419198, y: 26.34096637754294 },
    { x: 95.29760332646265, y: 2.3739066016482298 },
    { x: 93.01502620494887, y: -21.593153174246538 },
    { x: 83.88471771889374, y: -44.418924389384415 },
    { x: 69.04796642905416, y: -66.1034070437654 },
    { x: 48.50477233543006, y: -80.94015833360498 },
    { x: 25.679001120292185, y: -91.21175538041706 },
    { x: 0.5706527836405257, y: -94.63562106268773 },
    { x: -25.678984113768024, y: -92.35304394117395 },
    { x: -49.64604388966279, y: -83.22273545511877 },
    { x: -43.67729923491248, y: -42.27585328848261 },
    { x: -17.170123950279645, y: -58.0673619686894 },
    { x: 13.848910957269425, y: -58.0673619686894 },
    { x: 41.484051147631305, y: -42.839835741347144 },
    { x: 56.71157737497356, y: -16.33266045671428 },
    { x: 53.89166511065093, y: 15.250356903699299 },
    { x: 42.61201605336038, y: 44.57744445265473 },
    { x: 13.284928504404888, y: 58.67700577426797 },
    { x: -17.170123950279645, y: 56.42107596280982 },
    { x: -42.54933432918341, y: 41.75753218833211 },
    { x: -58.3408430093902, y: 14.686374450834762 },
    { x: -57.212878103661154, y: -15.204695550985264 }];
@ccclass
export default class Controller_illegal_Move extends cc.Component {

    gameBoard: gameBoard;
    gamePlay: gamePlay;
    pown: any
    selectedPown = null;
    selectedPownPos = null;
    gameRule = new Game_rule();

    GamePlayBindFunction() {
        this.gamePlay = this.node.getComponent(gamePlay);
        this.pown = [];
        var self = this;
        for (let i = 0; i < 4; i++) {
            var tempUser = self.gamePlay.player[i];
            if (tempUser.active == true) {
                var tempUserScript = tempUser.getComponent(game_User);
                for (var j = 0; j < 3; j++) {
                    self.pown.push(tempUserScript.pown[j]);
                }
            }
        }
    }
    touchEnd() {
        var self = this;
        for (var i = 0; i < self.pown.length; i++) {
            var pown = self.pown[i];
            var pownScript = pown.getComponent(game_pown);

            if (pownScript.currentBlock == null && !pownScript.isWin) {
                var posX = pownScript.xPos;
                var posY = pownScript.yPos;
                pown.setPosition(posX, posY);
            } 
            else if(pownScript.isWin){

                var block = pownScript.eyeBlock;
                var pos = block.getPosition();
                pown.setPosition(pos);

            }
            else{
                var index = pownScript.currentBlock.getComponent(Block).block_index;
                pown.setPosition(poslistArr[index]);
            }

        }
    }

    start() {

        this.gameRule.tostart();

        this.GamePlayBindFunction();
        var self = this;

        this.node.getComponent(gamePlay).board.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            var cpu = self.node.getComponent(gamePlay).currentPlayer.getComponent(game_User).isCpu;

            if (!self.node.getComponent(gamePlay).illegalMove || !cpu) {
                return
            }

            var x = event.touch.getLocationX();
            var y = event.touch.getLocationY();

            var pos = this.convertToNodeSpaceAR(cc.v2(x, y));

            for (var i = 0; i < self.pown.length; i++) {

                var selectedPown = self.pown[i];
                self.selectedPownPos = selectedPown.getPosition();
                var a = new cc.Rect(selectedPown.getBoundingBox());
                var b = new cc.Vec2(pos.x, pos.y);

                if (a.contains(b)) {

                    selectedPown.setPosition(pos)
                    // self.checkBlock(selectedPown);
                    self.selectedPown = selectedPown;

                }

            }

        }, this.node.getComponent(gamePlay).board);

        this.node.getComponent(gamePlay).board.on(cc.Node.EventType.TOUCH_END, function (event) {

            if (self.selectedPown != null) {

                self.checkBlock(self.selectedPown);
                self.touchEnd();
                self.selectedPown = null;
            }

        }, this.node.getComponent(gamePlay).board);


        this.node.getComponent(gamePlay).board.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {

            if (self.selectedPown != null) {

                self.checkBlock(self.selectedPown);
                self.touchEnd();
                self.selectedPown = null;

            }


        }, this.node.getComponent(gamePlay).board);

    }

    onStampClick() {

        var move = this.node.getComponent(gamePlay).illegalMoveArr;

        if (move == null) {
            this.node.getComponent(gamePlay).illegalMoveArr = null;
            this.node.getComponent(gamePlay).illegalMove = true;
            this.node.getComponent(gamePlay).stampNode.active = false;
            this.node.getComponent(gamePlay).stampNode.getChildByName("red").active = false;
            this.node.getComponent(gamePlay).callToPlayerTurn();
            return;
        }else if (!move.card) {

            var selectedPown = move.pown;
            var userScript = selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
            if (move.previosBlock != null) {

                var index = move.previosBlock.getComponent(Block).block_index;
                selectedPown.setPosition(poslistArr[index]);
                selectedPown.getComponent(game_pown).currentBlock = this.node.getComponent(gamePlay).board.getComponent(gameBoard).board_block[index];
                var pownBlock1 = userScript.pown[0].getComponent(game_pown).currentBlock;
                var pownBlock2 = userScript.pown[1].getComponent(game_pown).currentBlock;
                var pownBlock3 = userScript.pown[2].getComponent(game_pown).currentBlock;
                var pownBlock = [0, 0, 0];
                if (pownBlock1 != null) {
                    pownBlock[0] = (pownBlock1.getComponent(Block).circleType)
                } if (pownBlock2 != null) {
                    pownBlock[1] = (pownBlock2.getComponent(Block).circleType)
                } if (pownBlock3 != null) {
                    pownBlock[2] = (pownBlock3.getComponent(Block).circleType)
                }
                userScript.iris_call = false;

                if (pownBlock[0] > 2 || pownBlock[1] > 2 || pownBlock[2] > 2) {
                    userScript.iris_call = true;
                }
            } else if(move.isWin && selectedPown.getComponent(game_pown).eyeBlock != null){
               
                var block = selectedPown.getComponent(game_pown).eyeBlock;
                var pos = block.getPosition();
                selectedPown.setPosition(pos);

            }else {

                var x = selectedPown.getComponent(game_pown).xPos;
                var y = selectedPown.getComponent(game_pown).yPos;

                selectedPown.setPosition(x, y);

                selectedPown.getComponent(game_pown).currentBlock = null;
                selectedPown.getComponent(game_pown).isOpen = false;

                if (!userScript.pown[0].getComponent(game_pown).isOpen && !userScript.pown[1].getComponent(game_pown).isOpen && !userScript.pown[2].getComponent(game_pown).isOpen) {
                    userScript.isOpen = false;
                    userScript.iris_call = false;
                }


            }
        }else if (move.card) {

            while (true) {
                if (move.rongStatement == null) {
                    break;
                } else {
                    var previosMove = move.rongStatement;


                    if (move.chosinCard == "Send this card to the Golden Ring" ||
                        move.chosinCard == "Send this pawn to the Golden Ring!") {

                        move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).iris_call = false;

                    } else if (move.chosinCard == "2 turn in a row ") {

                        var pawnScript = move.selectedPown.getComponent(game_pown);
                        pawnScript.twoTurnInRow = false;


                    } else if (move.chosinCard == "Immune from being knocked out rest of the game( 1 pawn only) ") {
                        var pawnScript = move.selectedPown.getComponent(game_pown);
                        move.selectedPown.getChildByName("Ellipse 23").active=false;
                        pawnScript.Immune = false;

                    } else if (move.chosinCard == "Any Opponent pawn that lands on your color in the 2nd ring will be eleminated.(Until one of your pawns reaches the golden Ring") {

                        this.gameBoard.colorProperty.pop();

                    } else if (move.chosinCard == "The next 3 6's your roll will not work.") {
                        var userScript = move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
                        userScript.notWorkDicsNumber = false;
                        userScript.numberTimesDicsNotwork = 0;
                    }

                    move.Node.removeFromParent();

                    var cardIndex = move.cardIndex;
                    if (this.gamePlay.gameCardRule != null) {
                        this.gamePlay.gameCardRule.splice(cardIndex, 1);
                    }

                    move = null;
                    move = previosMove;
                }
            }

            if (move.orignalCard == move.chosinCard) {
                
            } else {

                var allPownObj = move.allPownObj;
                for (var i = 0; i < allPownObj.length; i++) {


                    var currentIndex = allPownObj[i];
                    var currentPown = currentIndex.pown;
                    var block = currentIndex.block;

                    if (block == null && !currentPown.getComponent(game_pown).isWin) {

                        var xPos = currentPown.getComponent(game_pown).xPos;
                        var yPos = currentPown.getComponent(game_pown).yPos;
                        currentPown.getComponent(game_pown).currentBlock = null;
                        currentPown.getComponent(game_pown).isOpen = false;
                        currentPown.setPosition(xPos, yPos);

                    } else if (currentPown.getComponent(game_pown).isWin) {

                        var block = currentPown.getComponent(game_pown).eyeBlock;
                        var pos = block.getPosition();
                        currentPown.setPosition(pos);
                    } else {

                        var index = block.getComponent(Block).block_index;
                        currentPown.getComponent(game_pown).currentBlock = block;
                        currentPown.getComponent(game_pown).isOpen = true;
                        currentPown.setPosition(poslistArr[index].x, poslistArr[index].y);
                    }

                }

                this.gameBoard = null;
                this.gameBoard = this.node.getComponent(gamePlay).board.getComponent(gameBoard);
                this.gamePlay = this.node.getComponent(gamePlay);

                if (move.chosinCard == "Advance 5 spaces" ||
                    move.chosinCard == "Advance to the next black space" ||
                    move.chosinCard == "Advance 10 spaces" ||
                    move.chosinCard == "Advance 15 spaces" ||
                    move.chosinCard == "Move Back 3 Spaces." ||
                    move.chosinCard == "Move Back 5 Spaces. " ||
                    move.chosinCard == "Advance this pawn 7 spaces" ||
                    move.chosinCard == "Send this card to the Golden Ring" ||
                    move.chosinCard == "Send this pawn to the Golden Ring!") {

                    var selectedPown = move.selectedPown;
                    var block = move.selectedPownBlock;
                    if (block != null) {
                        var index = block.getComponent(Block).block_index;
                        selectedPown.getComponent(game_pown).currentBlock = block;
                        selectedPown.getComponent(game_pown).isOpen = true;

                        if (move.chosinCard == "Send this card to the Golden Ring" ||
                            move.chosinCard == "Send this pawn to the Golden Ring!") {

                            selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).iris_call = false;

                        }

                        selectedPown.setPosition(poslistArr[index].x, poslistArr[index].y);

                    }


                } else if (move.chosinCard == "Bring all pawns out the Bay ") {

                    var pown = [];
                    pown[0] = move.pown1;
                    pown[1] = move.pown2;
                    pown[2] = move.pown3;
                    var userScript = move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
                    for (var i = 0; i < pown.length; i++) {
                        if (pown[i] != null && !userScript.pown[i].getComponent(game_pown).isWin) {
                            var index = pown[i].getComponent(Block).block_index;
                            userScript.pown[i].getComponent(game_pown).currentBlock = pown[i];
                            userScript.pown[i].getComponent(game_pown).isOpen = true;
                            userScript.pown[i].setPosition(poslistArr[index].x, poslistArr[index].y);
                        } else if (userScript.pown[i].getComponent(game_pown).isWin) {
                            var block = userScript.pown[i].getComponent(game_pown).eyeBlock;
                            var pos = block.getPosition();
                            userScript.pown[i].setPosition(pos);
                        } else {
                            var xPos = userScript.pown[i].getComponent(game_pown).xPos;
                            var yPos = userScript.pown[i].getComponent(game_pown).yPos;
                            userScript.pown[i].getComponent(game_pown).currentBlock = null;
                            userScript.pown[i].getComponent(game_pown).isOpen = false;
                            userScript.pown[i].setPosition(xPos, yPos);
                        }
                    }
                } else if (move.chosinCard == "2 turn in a row ") {

                    var pawnScript = move.selectedPown.getComponent(game_pown);
                    pawnScript.twoTurnInRow = false;


                } else if (move.chosinCard == "Immune from being knocked out rest of the game( 1 pawn only) ") {
                    var pawnScript = move.selectedPown.getComponent(game_pown);
                    move.selectedPown.getChildByName("Ellipse 23").active=false;
                    pawnScript.Immune = false;

                } else if (move.chosinCard == "Any Opponent pawn that lands on your color in the 2nd ring will be eleminated.(Until one of your pawns reaches the golden Ring") {

                    this.gameBoard.colorProperty.pop();

                } else if (move.chosinCard == "The next 3 6's your roll will not work.") {
                    var userScript = move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
                    userScript.notWorkDicsNumber = false;
                    userScript.numberTimesDicsNotwork = 0;
                }

                var tag = move.tag;
                var cardNumber = tag.replace("rule", "");
                cardNumber = parseInt(cardNumber) - 1;
                if (move.cardColor == "black") {

                    this.gameBoard.blackCardstatement(cardNumber, true, move.selectedPown);

                } else if (move.cardColor == "teal") {

                    this.gameBoard.tealCardstatement(cardNumber, true, move.selectedPown);

                }

                move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                if (tag == "rule11" || (tag == "rule7" && move.cardColor == "black") || tag == "rule8" || (tag == "rule4" && move.cardColor == "teal")) {

                    var cardIndex = move.cardIndex;
                    if (this.gamePlay.gameCardRule != null) {

                        this.gamePlay.gameCardRule[cardIndex].long = true;
                        this.gamePlay.gameCardRule[cardIndex].active = true;
                        this.gamePlay.gameCardRule[cardIndex].reluTag = tag;
                        if (tag == "rule11") {
                            this.gamePlay.gameCardRule[cardIndex].pown = false;
                        }
                    }

                } else {

                    var cardIndex = move.cardIndex;
                    if (this.gamePlay.gameCardRule != null) {

                        this.gamePlay.gameCardRule[cardIndex].long = false;
                        this.gamePlay.gameCardRule[cardIndex].active = false;

                    }

                }

                if (move.selectedPown != null) {
                    var script = move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
                    console.log("color : " + script.color + " user Open = " + script.isOpen + "  pown 1= " + script.pown[0].getComponent(game_pown).isOpen + "pown 2 = " + script.pown[1].getComponent(game_pown).isOpen + "pown 2 = " + script.pown[2].getComponent(game_pown).isOpen);

                }




                // { type: "card", orignalCard: this.orignalCard, chosinCard: this.chosinCard,
                // selectedPown: this.selectedPown, selectedPownBlock: block,
                // color: this.selectedPown.getComponent(game_pown).color, pownIndex: pownTag, 
                // card: true, cardIndex: card.length - 1, Node: this.node, 
                // pown1: pown1, pown2: pown2, pown3: pown3

                // if (move.orignalCard == "Advance 5 spaces"/*black*/) {


                //     this.gameBoard.playOnMode(move.selectedPown, 5, true);
                //     

                //  }
                // else if (move.orignalCard == "Advance to the next black space"/*black*/) {

                //     this.gameBoard.blackCardstatement(1,true,move.selectedPown);
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                //  }
                // else if (move.orignalCard == "Advance 10 spaces"/*black*/) {
                //     this.gameBoard.playOnMode(move.selectedPown, 10, true);
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Advance 15 spaces"/*black*/) {
                //     this.gameBoard.playOnMode(move.selectedPown, 15, true);
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Move Back 3 Spaces."/*teal*/) {

                //     this.gameBoard.tealCardstatement(6,true,move.selectedPown);
                //     // var block_index = move.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
                //     // var Type = move.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

                //     // if (Type == 1) {

                //     //     if (block_index - 3 < 0) {

                //     //         var Block1 = block_index - 3;
                //     //         console.log("block_index : " + block_index + " circleType : " + Block1 + " block_index-3 = " + (block_index - 3));
                //     //         Block1 = 36 - Math.abs(Block1);
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[Block1])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock = this.gameBoard.board_block[Block1];

                //     //     } else {

                //     //         var Block1 = block_index - 3;
                //     //         console.log("block_index : " + block_index + " circleType : " + Block1 + " block_index-3 = " + (block_index - 3));
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[Block1])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock = this.gameBoard.board_block[Block1];

                //     //     }
                //     // } else if (Type == 2) {

                //     //     if (block_index - 3 < 36) {

                //     //         var block1 = block_index - 3;
                //     //         block1 = block1 - 35;
                //     //         block1 = 60 - Math.abs(block1);
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block1])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock = this.gameBoard.board_block[block1];

                //     //     } else {

                //     //         var block1 = block_index - 3;
                //     //         console.log("block_index : " + block_index + " circleType : " + block1 + " block_index-3 = " + (block_index - 3));
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block1])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock = this.gameBoard.board_block[block1];

                //     //     }
                //     // }

                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Move Back 5 Spaces."/*teal*/) {

                //     this.gameBoard.tealCardstatement(8,true,move.selectedPown);
                //     // var block_index = move.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
                //     // var Type = move.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

                //     // if (Type == 1) {

                //     //     if (block_index - 5 < 0) {

                //     //         var block2 = block_index - 5;
                //     //         block2 = 36 - Math.abs(block2);
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block2])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock = this.gameBoard.board_block[block2];

                //     //     } else {

                //     //         var block2 = block_index - 5;
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block2])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock =  this.gameBoard.board_block[block2];

                //     //     }

                //     // } else if (Type == 2) {

                //     //     if (block_index - 5 < 36) {

                //     //         var block2 = block_index - 5;
                //     //         block2 = block2 - 35;
                //     //         block2 = 60 - Math.abs(block2);
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block2])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock =  this.gameBoard.board_block[block2];

                //     //     } else {

                //     //         var block2 = block_index - 5;
                //     //         move.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block2])));
                //     //         move.selectedPown.getComponent("game_pown").currentBlock =  this.gameBoard.board_block[block2];
                //     //     }
                //     // }
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Advance this pawn 7 spaces"/*teal*/) {

                //     this.gameBoard.playOnMode(move.selectedPown, 7, true);
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Send this card to the Golden Ring"/*black*/ ||
                //     move.orignalCard == "Send this pawn to the Golden Ring!"/*teal*/) {

                //         var eyePos = move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleThreeEnterBlock;
                //         move.selectedPown.getComponent("game_pown").currentBlock = eyePos;
                //         move.selectedPown.getComponent("game_pown").twoTurnInRow = false;
                //         move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").iris_call = true;
                //     move.selectedPown.runAction(cc.moveTo(2, cc.v2(eyePos.getPosition())));
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "Bring all pawns out the Bay "/*black*/) {

                //     // for (var i = 0; i < 3; i++) {

                //     //     var pownNode = move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[i];
                //     //     var open = pownNode.getComponent("game_pown").isOpen;

                //     //     if (!open) {

                //     //         var circle = pownNode.getComponent("game_pown").currentUser.getComponent("game_User").circleOneEnterBlock;
                //     //         var index = circle.getComponent("Block").block_index;
                //     //         pownNode.runAction(cc.moveTo(1, cc.v2(poslistArr[index])));
                //     //         pownNode.getComponent("game_pown").isOpen = true;
                //     //         pownNode.getComponent("game_pown").currentBlock = circle;

                //     //     }

                //     // }

                //     this.gameBoard.blackCardstatement(5, true,move.selectedPown);
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                // }
                // else if (move.orignalCard == "2 turn in a row " /*black*/
                //     || move.orignalCard == "This pawn MUST go around twice!"/*teal*/) {
                //     move.selectedPown.getComponent("game_pown").twoTurnInRow = true;
                //     move.selectedPown.getComponent("game_pown").gameRule.push("2 turn in a row");
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;

                //     var cardIndex = move.cardIndex;
                //     if (this.gamePlay.gameCardRule!=null) {
                //         this.gamePlay.gameCardRule[cardIndex].long = true;
                //         this.gamePlay.gameCardRule[cardIndex].active = true;
                //     }
                // }
                // else if (move.orignalCard == "Immune from being knocked out rest of the game( 1 pawn only) "/*black*/) {
                //     move.selectedPown.getComponent("game_pown").Immune = true;
                //     move.selectedPown.getComponent("game_pown").gameRule.push("Immune from nock out");
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;

                //     var cardIndex = move.cardIndex;
                //     if (this.gamePlay.gameCardRule!=null) {
                //         this.gamePlay.gameCardRule[cardIndex].long = true;
                //         this.gamePlay.gameCardRule[cardIndex].active = true;
                //     }

                // }
                // else if (move.orignalCard == "Any Opponent pawn that lands on your color in the 2nd ring will be eleminated.(Until one of your pawns reaches the golden Ring"/*black*/) {

                //     // var Type = move.selectedPown.getComponent(game_pown).currentBlock.getComponent("Block").circleType;
                //     // var setColor = move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").color;
                //     // console.log("selectedPawn colorProperty color= " + setColor + " circleType = " + Type);
                //     // if (Type == 1) {

                //     //     this.gameBoard.eliminetOnColorCircleOne = true;
                //     //     this.gameBoard.colorProperty.push({ color: setColor, circleType: 1 });
                //     //     move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).cardCircleOneColorEliminatin = true;


                //     // } else if (Type == 2) {

                //     //     this.gameBoard.eliminetOnColorCircleTwo = true;
                //     //     this.gameBoard.colorProperty.push({ color: setColor, circleType: 2 });
                //     //     move.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).cardCircleTwoColorEliminatin = true;

                //     // }

                //     // console.log("colorProperty = " + this.gameBoard.colorProperty);
                //     // // this.gameBoard.eliminetOnColorfun(this.gameBoard.colorProperty)
                //     // move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;
                //     this.gameBoard.blackCardstatement(10, true,move.selectedPown);

                //     var cardIndex = move.cardIndex;
                //     if (this.gamePlay.gameCardRule != null) {

                //         this.gamePlay.gameCardRule[cardIndex].long = true;
                //         this.gamePlay.gameCardRule[cardIndex].active = true;

                //     }

                // }
                // else if (move.orignalCard == "The next 3 6's your roll will not work."/*teal*/) {
                //      move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").notWorkDicsNumber = true;
                //     move.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").numberTimesDicsNotwork = 3;
                //     move.Node.getComponent(chooseStatementTs).choose_label.string = move.orignalCard;

                //     var cardIndex = move.cardIndex;
                //     if (this.gamePlay.gameCardRule!=null) {
                //         this.gamePlay.gameCardRule[cardIndex].long = true;
                //         this.gamePlay.gameCardRule[cardIndex].active = true;
                //     }

                // }
                // else if (move.orignalCard == "Send this pawn back to your bay "/*teal*/) {
                //     this.gameBoard.tealCardstatement(0, true, move.selectedPown);
                // }
                // else if (move.orignalCard == "Send ALL Golden Ring pawns back to your Bay"/*teal*/) {
                //     this.gameBoard.tealCardstatement(4, true, move.selectedPown);
                // }
                // else if (move.orignalCard == "Send this pawn to your Bay and the player to the left of you gets to bring their pawn out."/*teal*/) {
                //     this.gameBoard.tealCardstatement(5, true, move.selectedPown);
                // }
                // else if (move.orignalCard == "Advance to the next teal space."/*teal*/) {
                //     this.gameBoard.tealCardstatement(7, true, move.selectedPown);
                // }
                // else if (move.orignalCard == "Send ALL your pawns back to your Bay"/*teal*/) {
                //     this.gameBoard.tealCardstatement(9, true, move.selectedPown);
                // }
            }

        }
        this.node.getComponent(gamePlay).illegalMoveArr = null;
        this.node.getComponent(gamePlay).illegalMove = true;
        this.node.getComponent(gamePlay).stampNode.active = false;
        this.node.getComponent(gamePlay).stampNode.getChildByName("red").active = false;
        this.node.getComponent(gamePlay).callToPlayerTurn();

    }

    checkBlock(selectedPown) {

        var boardScript = this.node.getComponent(gamePlay).board.getComponent(gameBoard);
        var illegal = false;

        for (var n = 0; n < boardScript.board_block.length; n++) {

            var currentBlock;
            currentBlock = boardScript.board_block[n];
            var a = new cc.Rect(currentBlock.getBoundingBox());
            var pos = selectedPown.getPosition();
            var b = new cc.Vec2(pos.x, pos.y);

            if (a.contains(b)) {

                var PownBlock = selectedPown.getComponent(game_pown).currentBlock;

                if(boardScript.board_block[n] == PownBlock){
                    continue;
                }
                this.node.getComponent(gamePlay).illegalMove = false
                selectedPown.setPosition(poslistArr[n]);
  


                var isWin = selectedPown.getComponent(game_pown).isWin;            
                selectedPown.getComponent(game_pown).isWin=false;
                var circcletype = boardScript.board_block[n].getComponent(Block).circleType;
                if (PownBlock == null) {

                    selectedPown.getComponent(game_pown).isOpen = true;
                    selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).isOpen = true;
                    selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).iris_call = false;

                }
                if (circcletype == 3) {
                    selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).iris_call = true;
                }

                selectedPown.getComponent(game_pown).currentBlock = boardScript.board_block[n];
                var color = selectedPown.getComponent(game_pown).color;
                var pawnTag = selectedPown.getComponent(game_pown).pawnTag;
                this.node.getComponent(gamePlay).illegalMoveArr = { type: "position",isWin:isWin, currentIndex: n, previosBlock: PownBlock, pown: selectedPown, color: color, pownIndex: pawnTag, card: false };
                console.log("dfsuuuuuu" + n);
                illegal = true;
                break;
            }

        }

        if (!illegal) {

            var block = selectedPown.getComponent(game_pown).currentBlock;
            if (block == null) {
                var x = selectedPown.getComponent(game_pown).xPos;
                var y = selectedPown.getComponent(game_pown).yPos;
                selectedPown.setPosition(x, y);

            } else {
                var currentBlockIndex = block.getComponent(Block).block_index;
                selectedPown.setPosition(poslistArr[currentBlockIndex])
            }

        }

    }

}
