import Block from "./Block";
import chooseStatementTs from "./chooseStatementTs";
import Controller_illegal_Move from "./Controller_illegal_Move";
import gamePlay from "./gamePlay";
import game_Disc from "./game_Disc";
import game_pown from "./game_pown";
import game_User from "./game_User";

const { ccclass, property } = cc._decorator;


//postion or game bord block
var poslistArr =
    [
    { x: -81.2908535753686,         y: -118.65327048807279 },
    { x: -61.888948042501426,       y: -132.34873321715554 },
    { x: -36.78059970584977,        y: -139.1964645816969 },
    { x: -11.672251369198108,       y: -143.76161882472445 },
    { x: 12.29480840669666,         y: -142.62033026396756 },
    { x: 35.12057962183451,         y: -136.9138874601831 },
    { x: 62.51150507999995,         y: -128.92486753488487 },
    { x: 84.19598773438094,         y: -116.37069336655901 },
    { x: 100.17402758497747,        y: -98.11007639444875 },
    { x: 116.15206743557394,        y: -76.42559374006777 },
    { x: 128.7062416038998,         y: -54.74111108568678 },
    { x: 137.83655008995493,        y: -33.056628431305796 },
    { x: 142.4017043329825,         y: -7.948280094654137 },
    { x: 143.54299289373938,        y: 16.01877968124063 },
    { x: 138.97783865071182,        y: 41.12712801789223 },
    { x: 132.13010728617047,        y: 63.952899233030166 },
    { x: 118.43464455708772,        y: 85.63738188741115 },
    { x: 103.59789326724814,        y: 103.89799885952141 },
    { x: 83.05469917362404,         y: 121.01732727087483 },
    { x: 62.51150507999995,         y: 132.43021287844374 },
    { x: 37.40315674334832,         y: 139.2779529503258 },
    { x: 12.29480840669666,         y: 142.70181863259643 },
    { x: -12.813539929954999,       y: 144.98439575411032 },
    { x: -36.78059970584977,        y: 142.70181863259643 },
    { x: -60.747659481744535,       y: 133.5715101465413 },
    { x: -82.43214213612549,        y: 117.59347029594483 },
    { x: -99.5514705474789,         y: 102.75671900610519 },
    { x: -115.52951039807542,       y: 81.0722363517242 },
    { x: -129.22497312715814,       y: 61.670330818856996 },
    { x: -138.35528161321326,       y: 42.268425285989906 },
    { x: -145.20301297775464,       y: 16.0187883885813 },
    { x: -145.20301297775464,       y: -11.372137069584141 },
    { x: -140.63785873472705,       y: -37.62177396699269 },
    { x: -133.7901273701857,        y: -61.58883374288746 },
    { x: -118.95337608034609,       y: -83.27331639726839 },
    { x: -102.97533622974959,       y: -101.5339333693787 },
    { x: -69.04794942252997,        y: -68.38598416527918 },
    { x: -82.74341215161269,        y: -50.12536719316887 },
    { x: -93.01500919842474,        y: -26.158307417274102 },
    { x: -97.58016344145231,        y: 1.2326180408913388 },
    { x: -95.29758631993852,        y: 25.199677816786107 },
    { x: -85.02598927312647,        y: 46.88416047116709 },
    { x: -71.33052654404375,        y: 66.2860660040343 },
    { x: -51.928621011176574,       y: 84.54668297614455 },
    { x: -26.820272674524915,       y: 93.67699146219968 },
    { x: -0.5706357771163653,       y: 95.95956858371346 },
    { x: 23.396423998778403,        y: 90.25312577992906 },
    { x: 47.36348377467317,         y: 82.26410585463077 },
    { x: 69.04796642905416,         y: 69.70993168630491 },
    { x: 82.74342915813685,         y: 48.02544903192393 },
    { x: 91.87373764419198,         y: 26.34096637754294 },
    { x: 95.29760332646265,         y: 2.3739066016482298 },
    { x: 93.01502620494887,         y: -21.593153174246538 },
    { x: 83.88471771889374,         y: -44.418924389384415 },
    { x: 69.04796642905416,         y: -66.1034070437654 },
    { x: 48.50477233543006,         y: -80.94015833360498 },
    { x: 25.679001120292185,        y: -91.21175538041706 },
    { x: 0.5706527836405257,        y: -94.63562106268773 },
    { x: -25.678984113768024,       y: -92.35304394117395 },
    { x: -49.64604388966279,        y: -83.22273545511877 },
    { x: -43.67729923491248,        y: -42.27585328848261 },
    { x: -17.170123950279645,       y: -58.0673619686894 },
    { x: 13.848910957269425,        y: -58.0673619686894 },
    { x: 41.484051147631305,        y: -42.839835741347144 },
    { x: 56.71157737497356,         y: -16.33266045671428 },
    { x: 53.89166511065093,         y: 15.250356903699299 },
    { x: 42.61201605336038,         y: 44.57744445265473 },
    { x: 13.284928504404888,        y: 58.67700577426797 },
    { x: -17.170123950279645,       y: 56.42107596280982 },
    { x: -42.54933432918341,        y: 41.75753218833211 },
    { x: -58.3408430093902,         y: 14.686374450834762 },
    { x: -57.212878103661154,       y: -15.204695550985264 }
];
     
@ccclass
export default class gameBoard extends cc.Component {

    //variable declaretion
    //block array
    @property(cc.Node)
    board_block: cc.Node[] = [];

    //black teal card prefab
    @property(cc.Prefab)
    blackAndTeal: cc.Prefab = null;

    // game class variable
    game_play: gamePlay;
    callToGame = null;
    selectedPown: cc.Node = null;

    // game variable for color elemination
    gamePownObj = null;
    colorProperty = [];
    eliminetOnColorCircleOne: boolean = false;
    eliminetOnColorCircleTwo: boolean = false;


    // start function
    start() {

        console.log("fpp0oskdfp0osk0ofop  == "+poslistArr.length);
        
        for (var i = 0; i < this.board_block.length; i++) {
            this.board_block[i].active = false;

            if (i <= 35) {
                this.board_block[i].getComponent("Block").circleType = 1;
                this.board_block[i].getComponent("Block").color;


            } else if (i > 35 && i <= 59) {

                this.board_block[i].getComponent("Block").circleType = 2;


            } else if (i > 59 && i <= 71) {

                this.board_block[i].getComponent("Block").circleType = 3;

            } else {
                this.board_block[i].getComponent("Block").circleType = 4;

            }
            this.board_block[i].setContentSize(100, 100);

        }


    }


    ///////////////////////////////////// GAME BOARD BIND AND CALLBACK FUNCTION /////////////////////////////////////////
    //callback function
    callbackTogamePly(callback) {
        this.callToGame = callback;
    }
    //bind function
    setGamePlay(_gamePlay) {
        this.game_play = _gamePlay;
        // this.getPownObj();
    }
    //assigning pown obj variable for farthar yous
    getPownObj() {
        var pownObjArr = [];
        for (var i = 0; i < 4; i++) {
            var userScript = this.game_play.player[i].getComponent(game_User);
            var userObj = this.game_play.player[i];
            if (!userObj.active) {
                continue;
            }
            for (var j = 0; j < 3; j++) {
                pownObjArr.push(userScript.pown[j]);
            }
        }
        this.gamePownObj = pownObjArr;
    }


    ///////////////////////////////////// GAME POWN MOVE AND OPEN FUNCTION /////////////////////////////////////////
    // open opem function
    getToStartPown(pown, startIndex) {

        startIndex.active = true;
        var sr = startIndex;
        var index = startIndex.getComponent("Block").block_index;
        var _this = this;
        var pos = poslistArr[index]
        // var pos = this.posArr(this.board_block[index].getPosition(), 1);
        pown.getComponent("game_pown").currentBlock = startIndex;

        pown.runAction(cc.sequence(cc.moveTo(0.5, cc.v2(pos.x, pos.y)), cc.callFunc(function () {
            _this.PownObjPosition(pown);
        }), cc.callFunc(function () {
            sr.active = false;
            _this.callToGame(pown);

        })))


    }
    //pown move function
    playOnMode(selectedPawn, diceNumber, pownShuldNotReturn) {

        // Pown MoveMaint by dics Number
        console.log("Dics Number = " + diceNumber);

        var _this = this;

        // selectedPawn.getComponent("game_pown").currentBlock.active = true;
        var currentBlock = selectedPawn.getComponent("game_pown").currentBlock.getComponent("Block").block_index;

        var totalVal = 0;
        totalVal = currentBlock + parseInt(diceNumber);

        console.log("old current block  " + currentBlock);

        //possiton calculation  
        if (currentBlock <= 35 && totalVal >= 36) {

            totalVal = totalVal - 36;

        } else if (currentBlock <= 59 && totalVal >= 60) {

            totalVal = totalVal - 59;
            totalVal += 35;

        } else if (currentBlock <= 71 && totalVal >= 72) {

            totalVal = totalVal - 71;
            totalVal += 59;

        }

        var pos = [];
        // position for cardinalSplineTo
        if (currentBlock <= 35 && totalVal < currentBlock) {

            for (var i = 0; i <= 35 - currentBlock; i++) {

                var posi = poslistArr[currentBlock + i];
                pos.push(posi);

            }
            for (var i = 0; i <= totalVal; i++) {

                var posi = poslistArr[i];
                pos.push(posi);

            }

        } else if (currentBlock <= 59 && totalVal < currentBlock) {

            var index = 59;
            if (59 - currentBlock == 0) {

                index++;

            }
            for (var i = 0; i <= index - currentBlock; i++) {

                var poos = poslistArr[currentBlock + i];
                pos.push(poos);

            }
            for (var i = 36; i <= totalVal; i++) {

                var poos = poslistArr[i]
                pos.push(poos);

            }

        } else if (currentBlock <= 71 && totalVal < currentBlock) {

            var index = 71;
            if (71 - currentBlock == 0) {

                index++;

            }
            for (var i = 0; i <= index - currentBlock; i++) {

                var poos = poslistArr[currentBlock + i]
                pos.push(poos);

            }
            for (var i = 60; i <= totalVal; i++) {

                var poos = poslistArr[i]
                pos.push(poos);

            }
        } else {

            for (var i = 0; i <= diceNumber; i++) {

                var poos = poslistArr[currentBlock + i]
                pos.push(poos);

            }
        }

        //next block setup
        var block = this.board_block[totalVal];
        block.active = true;

        var slw = selectedPawn;
        selectedPawn.getComponent("game_pown").currentBlock = block;

        // checking if there  teal or black card 
        var isTeal = block.getComponent("Block").isTeal;
        var isBlack = block.getComponent("Block").isBlack;

        console.log("new current block  " + block.getComponent("Block").block_index);
        console.log("cardinal pos   "  + pos);

        // cardinalSplineTo or sequence function
        var cradinalSpline = cc.cardinalSplineTo(diceNumber / 5, pos, 0);
        selectedPawn.runAction(cc.sequence(cradinalSpline, cc.callFunc(function () {
            _this.PownObjPosition(slw);
            _this.board_block[totalVal].active = false;
            slw.getComponent("game_pown").currentBlock.action = false;

            // checking for next circle or not 
            _this.goToNextLevel(slw, totalVal, isTeal, isBlack, pownShuldNotReturn);

        })));



    }
    //next circle or golden eye or black teal 
    goToNextLevel(selectedPown, totalVal, isTeal, isBlack, pownShuldNotReturn) {

        var circleOne = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleOneEnterBlock.getComponent("Block").block_index;
        var circleTwo = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleTwoEnterBlock.getComponent("Block").block_index;
        var circletype = selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;


        if (circleOne == totalVal) {

            if (!selectedPown.getComponent("game_pown").twoTurnInRow) {

                var secondCircle = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleTwoEnterBlock;
                var userClass = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User");

                var secondCircleIndex = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleTwoEnterBlock.getComponent("Block").block_index;

                var pos = poslistArr[secondCircleIndex];
                selectedPown.runAction(cc.moveTo(0.5, cc.v2(pos)));
                selectedPown.getComponent("game_pown").currentBlock = secondCircle;

                userClass.cardCircleOneColorEliminatin = false;
                // this.CardRuleState(selectedPown);

            } else {

                selectedPown.getComponent("game_pown").twoTurnInRow = false;
                // this.CardRuleState(selectedPown);
            }

        } else if (circleTwo == totalVal) {

            if (!selectedPown.getComponent("game_pown").twoTurnInRow) {

                var thiredCircle = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleThreeEnterBlock;
                var poss = thiredCircle.getPosition();
                var userClass = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User");
                selectedPown.runAction(cc.moveTo(0.5, cc.v2(poss)));

                selectedPown.getComponent("game_pown").currentBlock = thiredCircle;

                selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").iris_call = true;
                selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").stamp = true;

                userClass.cardCircleTwoColorEliminatin = false;
                // this.CardRuleState(selectedPown);

            } else {

                selectedPown.getComponent("game_pown").twoTurnInRow = false;
                // this.CardRuleState(selectedPown);

            }
        } else if (circletype == 3) {

            var eyeOne = [];

            var currentBlock = selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
            var userScript = selectedPown.getComponent("game_pown").currentUser.getComponent(game_User);
            eyeOne[0] = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").eyeOneEnterBlock;
            eyeOne[1] = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").eyeTwoEnterBlock;
            eyeOne[2] = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").eyeThreeEnterBlock;

            for (var i = 0; i < eyeOne.length; i++) {

                var index = eyeOne[i].getComponent("Block").block_index;

                if (index == currentBlock /* && !eyeOne[i].getComponent("Block").isEyeFull*/) {

                    var eyePos = eyeOne[i].getPosition();
                    // eyeOne[i].getComponent("Block").isEyeFull = true;

                    // this.CardRuleState(selectedPown);
                    eyeOne[i].active = true;
                    var eye = eyeOne[i];
                    selectedPown.runAction(cc.sequence(cc.moveTo(1, cc.v2(eyePos)), cc.delayTime(2), cc.callFunc(function () {
                        eye.active = false;
                    })));
                    selectedPown.getComponent("game_pown").isWin = true;
                    selectedPown.getComponent("game_pown").currentBlock = null;
                    selectedPown.getComponent("game_pown").eyeBlock = eyeOne[i];

                    selectedPown.getComponent("game_pown").Immune = false;
                    selectedPown.getChildByName("Ellipse 23").active=false;

                    //player score increes

                    var score = parseInt(this.game_play.userScore.string);
                    score++;
                    this.game_play.userScore.string = "" + score;

                    var pownBlock1 = userScript.pown[0].getComponent(game_pown).currentBlock;
                    var pownBlock2 = userScript.pown[1].getComponent(game_pown).currentBlock;
                    var pownBlock3 = userScript.pown[2].getComponent(game_pown).currentBlock;

                    var pownBlock = [0, 0, 0];
                    if (pownBlock1 != null) {
                        pownBlock[0] = (pownBlock1.getComponent(Block).block_index)
                    } if (pownBlock2 != null) {
                        pownBlock[1] = (pownBlock2.getComponent(Block).block_index)
                    } if (pownBlock3 != null) {
                        pownBlock[2] = (pownBlock3.getComponent(Block).block_index)
                    }

                    if ((pownBlock[0] < 59) && (pownBlock[1] < 59) && (pownBlock[2] < 59)) {
                        userScript.iris_call = false;
                    }

                    if (userScript.pown[0].getComponent(game_pown).isWin && userScript.pown[1].getComponent(game_pown).isWin && userScript.pown[2].getComponent(game_pown).isWin) {
                        userScript.is_User_Win = true;
                    }

                    break;

                }
            }


        }

        if (pownShuldNotReturn) {
            return;
        }
        var sedbackPown = true;
        var blck_Teal = false;
        this.selectedPown = selectedPown;

        var isCpu = selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isCpu;

        if (isTeal) {/*isTeal*/

            var blackAndTeal = cc.instantiate(this.blackAndTeal);
            blackAndTeal.getComponent(chooseStatementTs).callToShowCards("teal");
            blackAndTeal.getComponent("chooseStatementTs").returnTagObj(this, selectedPown);
            sedbackPown = false;
            blck_Teal = true;

            if (isCpu) {

                blackAndTeal.getComponent("chooseStatementTs").callToTurnCpu(true);

            }

            this.game_play.node.getChildByName("game_bord_panel").addChild(blackAndTeal, 551);

        } else if (isBlack) {/*isBlack*/

            var blackAndTeal = cc.instantiate(this.blackAndTeal);
            blackAndTeal.getComponent("chooseStatementTs").callToShowCards("black");
            blackAndTeal.getComponent("chooseStatementTs").returnTagObj(this, selectedPown);
            blck_Teal = true;
            sedbackPown = false;

            if (isCpu) {

                blackAndTeal.getComponent("chooseStatementTs").callToTurnCpu(true);

            }

            this.game_play.node.getChildByName("game_bord_panel").addChild(blackAndTeal, 551);

        }


        if (this.colorProperty.length > 0 && !pownShuldNotReturn) {
            if (this.eliminetOnColorCircleOne || this.eliminetOnColorCircleTwo) {
                this.eliminetOnColorfun(this.colorProperty);
            }
        }

        if (this.game_play.gameCardRule.length > 0) {

            this.CardRuleState(false);

        }

        if (sedbackPown) {

            this.callToGame(selectedPown);


        }


    }
    //pown position setUp
    PownObjPosition(selectedPawn) {
        for (var n = 0; n < 3; n++) {

            var pown1 = selectedPawn.getComponent("game_pown").currentUser.getComponent("game_User").pown[n];
            var currentPown = selectedPawn.getComponent("game_pown");
            var NewPown = pown1.getComponent(game_pown);

            var tag = NewPown.pawnTag;

            if (pown1 == selectedPawn || NewPown.currentBlock == null) {

            } else if (currentPown.currentBlock == NewPown.currentBlock) {

                var width = selectedPawn.getPosition().x / 30;
                var height = selectedPawn.getPosition().y / 30;
                width=Math.abs(width);
                height=Math.abs(height);
                selectedPawn.setPosition(selectedPawn.getPosition().x - width, selectedPawn.getPosition().y - height); 
            }
        }

    }


    /////////////////////////////// BLACK AND TEAL CARD /////////////////////////////////////////////////

    // return function for game black or teal card
    returnTagFromBlackTealCard(tag, cardType) {

        console.log("tag = " + tag + " cardType = " + cardType);

        tag = tag.replace("rule", "");

        if (cardType == "black") {

            this.blackCardstatement(parseInt(tag) - 1, false, null);

        } else if (cardType == "teal") {

            this.tealCardstatement(parseInt(tag) - 1, false, null);

        }

    }
    // teal card action function 
    tealCardstatement(returnTag, sendingPownbackToGamePlay, selectedPown) {

        console.log("returnTag = " + returnTag);

        var goBackToPlay = true;
        var time = 1;
        var send = false;
        if (selectedPown != null) {
            this.selectedPown = selectedPown
            send = true;
        }
        if (returnTag == 0) {
            //Send this pown back to your bay

            var pown1 = this.selectedPown;
            pown1.getComponent("game_pown").isWin = false;
            pown1.getComponent("game_pown").twoTurnInRow = false;
            pown1.getComponent("game_pown").Immune = false;
            this.selectedPown.getChildByName("Ellipse 23").active=false;
            pown1.getComponent("game_pown").isOpen = false;
            pown1.getComponent("game_pown").currentBlock = null;
            var posX = pown1.getComponent("game_pown").xPos;
            var posY = pown1.getComponent("game_pown").yPos;
            pown1.runAction(cc.moveTo(1, cc.v2(posX, posY)));

            time = 1;

            var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[0].getComponent("game_pown");
            var pown3 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[1].getComponent("game_pown");
            var pown4 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[2].getComponent("game_pown");
            if (!pown2.isOpen && !pown3.isOpen && !pown4.isOpen) {

                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

            }


            console.log(" Send this pown back to your bay   " + returnTag);

        } else if (returnTag == 1) {

            //Send this pown to the Golden Ring!

            var eyePos = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleThreeEnterBlock;

            this.selectedPown.getComponent("game_pown").currentBlock = eyePos;
            this.selectedPown.getComponent("game_pown").twoTurnInRow = false;
            this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").iris_call = true;
            this.selectedPown.runAction(cc.moveTo(2, cc.v2(eyePos.getPosition())));
            time = 2;
            console.log("jaddu on teal  :- Send this pown to the Golden Ring! " + returnTag);


        } else if (returnTag == 2) {

            //Advance this pown 7 spaces

            this.playOnMode(this.selectedPown, 7, send);

            goBackToPlay = false;
            console.log("jaddu on teal  :- Advance this pown 7 spaces " + returnTag);


        } else if (returnTag == 3) {
            console.log("jaddu on teal  :- This pown MUST go around twice! " + returnTag);

            //This pown MUST go around twice!

            this.selectedPown.getComponent("game_pown").twoTurnInRow = true;
            this.selectedPown.getComponent("game_pown").gameRule.push("This pown MUST go around twice!");


        } else if (returnTag == 4) {

            console.log("jaddu on teal  :- Send ALL Golden Ring powns back to your Bay " + returnTag);

            //Send ALL Golden Ring powns back to your Bay

            for (var i = 0; i < 3; i++) {

                var pown = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[i];

                var circleType = 4;
                if (pown.getComponent("game_pown").currentBlock != null) {

                    circleType = pown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

                }

                if (circleType == 3) {

                    pown.getComponent("game_pown").isWin = false;
                    pown.getComponent("game_pown").isOpen = false;
                    pown.getComponent("game_pown").twoTurnInRow = false;
                    pown.getComponent("game_pown").Immune = false;
                    pown.getChildByName("Ellipse 23").active=false;

                    var posX = pown.getComponent("game_pown").xPos;
                    var posY = pown.getComponent("game_pown").yPos;

                    pown.runAction(cc.moveTo(1, cc.v2(posX, posY)));

                }

            }

            time = 2;
            this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;

            var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[0].getComponent("game_pown");
            var pown3 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[1].getComponent("game_pown");
            var pown4 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[2].getComponent("game_pown");
            if (!pown2.isOpen && !pown3.isOpen && !pown4.isOpen) {

                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

            }



        } else if (returnTag == 5) {

            console.log("jaddu on teal  :- Send this pown to your Bay and the player to the left of you gets to bring their pown out. " + returnTag);

            //Send this pown to your Bay and the player to the left of you gets to bring their pown out.

            var pown1 = this.selectedPown;

            pown1.getComponent("game_pown").isWin = false;
            pown1.getComponent("game_pown").isOpen = false;
            pown1.getComponent("game_pown").twoTurnInRow = false;
            pown1.getComponent("game_pown").Immune = false;
            this.selectedPown.getChildByName("Ellipse 23").active=false;

            var posX = pown1.getComponent("game_pown").xPos;
            var posY = pown1.getComponent("game_pown").yPos;
            pown1.getComponent("game_pown").currentBlock = null;
            pown1.runAction(cc.moveTo(1, cc.v2(posX, posY)));
            time = 2;

            var current_User = this.selectedPown.getComponent("game_pown").currentUser;
            var tag = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").id;
            count = 0;
            tag--;

            while (true) {
                tag++;
                count++;

                if (tag > 3) {
                    tag = 0;
                }

                var whileBreak = false;
                var userTrun = this.game_play.player[tag];
                var script = userTrun.getComponent(game_User);
                var startIndex = script.circleOneEnterBlock.getComponent(Block).block_index;
                if (userTrun != current_User && userTrun.active) {

                    if (!script.pown[0].getComponent(game_pown).isOpen) {

                        script.pown[0].runAction(cc.moveTo(0.5, cc.v2(poslistArr[startIndex])));
                        script.isOpen = true;
                        script.pown[0].getComponent(game_pown).currentBlock = script.circleOneEnterBlock;
                        script.pown[0].getComponent(game_pown).isOpen = true;
                        whileBreak = true;

                    } else if (!script.pown[1].getComponent(game_pown).isOpen) {

                        script.pown[1].runAction(cc.moveTo(0.5, cc.v2(poslistArr[startIndex])));
                        whileBreak = true;
                        script.pown[1].getComponent(game_pown).isOpen = true;
                        script.pown[1].getComponent(game_pown).currentBlock = script.circleOneEnterBlock;
                        script.isOpen = true;

                    } else if (!script.pown[2].getComponent(game_pown).isOpen) {

                        script.pown[2].runAction(cc.moveTo(0.5, cc.v2(poslistArr[startIndex])));
                        whileBreak = true;
                        script.pown[2].getComponent(game_pown).isOpen = true;
                        script.pown[2].getComponent(game_pown).currentBlock = script.circleOneEnterBlock;
                        script.isOpen = true;

                    }


                }

                if (count == 3 || whileBreak) {
                    break
                }
            }

            var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[0].getComponent("game_pown");
            var pown3 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[1].getComponent("game_pown");
            var pown4 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[2].getComponent("game_pown");
            if (!pown2.isOpen && !pown3.isOpen && !pown4.isOpen) {

                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

            }


        } else if (returnTag == 6) {

            console.log("jaddu on teal  :- Move Back 3 Spaces. " + returnTag);

            //Move Back 3 Spaces.

            if (this.selectedPown.getComponent("game_pown").currentBlock == null) {
                console.log("Erroorr aa gyii");
            }
            var block_index = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
            var Type = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

            if (Type == 1) {

                if (block_index - 3 < 0) {

                    var block = block_index - 3;
                    console.log("block_index : " + block_index + " circleType : " + block + " block_index-3 = " + (block_index - 3));
                    block = 36 - Math.abs(block);
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                } else {

                    var block = block_index - 3;
                    console.log("block_index : " + block_index + " circleType : " + block + " block_index-3 = " + (block_index - 3));
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                }
            } else if (Type == 2) {

                if (block_index - 3 < 36) {

                    var block = block_index - 3;
                    block = block - 35;
                    block = 60 - Math.abs(block);
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                } else {

                    var block = block_index - 3;
                    console.log("block_index : " + block_index + " circleType : " + block + " block_index-3 = " + (block_index - 3));
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                }
            }

        } else if (returnTag == 7) {

            // Advance to next teal space.

            var block_index = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
            var count = 1;
            var diceNumber = 1;

            while (true) {

                if ((block_index + count) >= 36) {

                    block_index = 0;
                    count = 0;
                }
                var isTeal = this.board_block[block_index + count].getComponent("Block").isTeal;

                if (isTeal) {

                    break;

                } else {

                    count++;
                    diceNumber++;

                }

            }
            this.playOnMode(this.selectedPown, diceNumber, send);
            goBackToPlay = false;

            console.log("jaddu on teal  :- Advance to next teal space. " + returnTag);

        } else if (returnTag == 8) {
            //Move Back 5 Spaces. 

            console.log("jaddu on teal  :- Move Back 5 Spaces.  " + returnTag);

            var block_index = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
            var Type = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

            if (Type == 1) {

                if (block_index - 5 < 0) {

                    var block = block_index - 5;
                    block = 36 - Math.abs(block);
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                } else {

                    var block = block_index - 5;
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                }

            } else if (Type == 2) {

                if (block_index - 5 < 36) {

                    var block = block_index - 5;
                    block = block - 35;
                    block = 60 - Math.abs(block);
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];

                } else {

                    var block = block_index - 5;
                    this.selectedPown.runAction(cc.moveTo(1.5, cc.v2(poslistArr[block])));
                    this.selectedPown.getComponent("game_pown").currentBlock = this.board_block[block];
                }
            }
            time = 2;

            console.log("this.board_block[block] := " + this.board_block[block]);


        } else if (returnTag == 9) {

            //Send ALL your powns back to your Bay

            console.log("jaddu on teal  :- Send ALL your powns back to your Bay " + returnTag);

            
            for (var i = 0; i < 3; i++) {

                var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[i];
                this.selectedPown.getComponent("game_pown").currentUser.getComponent(game_User).isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;
                var open = pown2.getComponent("game_pown").isOpen;


                if (open) {

                    pown2.getComponent("game_pown").isWin = false;
                    pown2.getComponent("game_pown").isOpen = false;
                    pown2.getComponent("game_pown").twoTurnInRow = false;
                    pown2.getComponent("game_pown").Immune = false;
                    pown2.getChildByName("Ellipse 23").active=false;

                    pown2.getComponent("game_pown").currentBlock = null;

                    var posX = pown2.getComponent("game_pown").xPos;
                    var posY = pown2.getComponent("game_pown").yPos;
                    pown2.runAction(cc.moveTo(1, cc.v2(posX, posY)));

                }

                time = 2;

            }
            // for(var i=0;i<)


        } else if (returnTag == 10) {
            //The next 3 6's your roll will not work.
            console.log("jaddu on teal  :-The next 3 6's your roll will not work. " + returnTag);

            this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").notWorkDicsNumber = true;
            this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").numberTimesDicsNotwork = 3;
            // this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).gameRule.push("The next 3 6's your roll will not work")

        }

        if (sendingPownbackToGamePlay) {
            this.selectedPown = null;
            return;
        }
        if (goBackToPlay) {

            var self = this;
            this.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
                self.callToGame(self.selectedPown);

            })));

        }

        this.selectedPown = null;
        this.CardRuleState(false);
    }
    // black card action function 
    blackCardstatement(returnTag, sendingPownbackToGamePlay, selectedPown) {

        var goBackToPlay = true;
        var time = 1;
        var send = false;
        if (selectedPown != null) {
            this.selectedPown = selectedPown
            send = true;
        }
        if (returnTag == 0) {
            //Advance 5 spaces

            console.log("jaddu on black  :- Advance 5 spaces " + returnTag);

            this.playOnMode(this.selectedPown, 5, send);

            goBackToPlay = false;

        } else if (returnTag == 1) {

            //Advance the next black space
            console.log("jaddu on black  :- Advance the next black space " + returnTag);

            var block_index = this.selectedPown.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
            var count = 1;
            var diceNumber = 1;

            while (true) {

                if ((block_index + count) >= 36) {

                    block_index = 0;
                    count = 0;
                }

                var black = this.board_block[block_index + count].getComponent("Block").isBlack;

                if (black) {

                    break;

                } else {

                    count++;
                    diceNumber++;
                }

            }


            this.playOnMode(this.selectedPown, diceNumber, send);
            goBackToPlay = false;


        } else if (returnTag == 2) {
            //Advance 10 spaces
            console.log("jaddu on black  :- Advance 10 spaces " + returnTag);

            this.playOnMode(this.selectedPown, 10, send);

            goBackToPlay = false;

        } else if (returnTag == 3) {
            //Advance 15 spaces
            console.log("jaddu on black  :- Advance 15 spaces " + returnTag);

            this.playOnMode(this.selectedPown, 15, send);
            goBackToPlay = false;

        } else if (returnTag == 4) {

            //Send this card to the Golden Ring
            console.log("jaddu on black  :- Send this card to the Golden Ring " + returnTag);

            var eyePos = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").circleThreeEnterBlock;
            this.selectedPown.getComponent("game_pown").currentBlock = eyePos;
            this.selectedPown.getComponent("game_pown").twoTurnInRow = false;
            this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").iris_call = true;
            this.selectedPown.runAction(cc.moveTo(2, cc.v2(eyePos.getPosition())));
            time += 2;

        } else if (returnTag == 5) {

            //Bring all pown out the Bay 
            console.log("jaddu on black  :- Bring all pown out the Bay  " + returnTag);

            for (var i = 0; i < 3; i++) {

                var pown = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[i];
                var open = pown.getComponent("game_pown").isOpen;

                if (!open) {

                    var circle = pown.getComponent("game_pown").currentUser.getComponent("game_User").circleOneEnterBlock;
                    var index = circle.getComponent("Block").block_index;
                    pown.runAction(cc.moveTo(1, cc.v2(poslistArr[index])));
                    pown.getComponent("game_pown").isOpen = true;
                    pown.getComponent("game_pown").currentBlock = circle;

                }

            }
            time + 1;

        } else if (returnTag == 6) {
            // 2 turn in a row 
            console.log("jaddu on black  :- 2 turn in a row  " + returnTag);

            this.selectedPown.getComponent("game_pown").twoTurnInRow = true;
            this.selectedPown.getComponent("game_pown").gameRule.push("2 turn in a row");

        } else if (returnTag == 7) {
            //Immune from being knocked out rest of the game( 1 pown only) 
            console.log("jaddu on black  :- Immune from being knocked out rest of the game( 1 pown only) " + returnTag);

            this.selectedPown.getComponent("game_pown").Immune = true;
            this.selectedPown.getChildByName("Ellipse 23").active=true;
            this.selectedPown.getComponent("game_pown").gameRule.push("Immune from nock out");
        } else if (returnTag == 8) {

            //Bring one of your pown from ODOLUM's Eye to your Bay 
            console.log("jaddu on black  :- Bring one of your pown from ODOLUM's Eye to your Bay " + returnTag);

            for (var i = 0; i < 3; i++) {

                var pown = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[i];
                var isWin = pown.getComponent("game_pown").isWin;

                if (isWin) {

                    pown.getComponent("game_pown").isWin = false;
                    pown.getComponent("game_pown").isOpen = false;
                    pown.getComponent("game_pown").twoTurnInRow = false;
                    pown.getComponent("game_pown").Immune = false;
                    pown.getChildByName("Ellipse 23").active=false;

                    pown.getComponent("game_pown").currentBlock = null;

                    var posX = pown.getComponent("game_pown").xPos;
                    var posY = pown.getComponent("game_pown").yPos;

                    pown.runAction(cc.moveTo(1, cc.v2(posX, posY)));
                    break;

                }

            }
            time + 1;

            var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[0].getComponent("game_pown");
            var pown3 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[1].getComponent("game_pown");
            var pown4 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[2].getComponent("game_pown");

            if (!pown2.isOpen && !pown3.isOpen && !pown4.isOpen) {

                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

            }

        } else if (returnTag == 9) {

            //Send this pown back to your Bay
            console.log("jaddu on black  :-  Send this pown back to your Bay " + returnTag);

            var pown1 = this.selectedPown;

            pown1.getComponent("game_pown").isWin = false;
            pown1.getComponent("game_pown").isOpen = false;
            pown1.getComponent("game_pown").twoTurnInRow = false;
            pown1.getComponent("game_pown").Immune = false;
            this.selectedPown.getChildByName("Ellipse 23").active=false;

            var posX = pown1.getComponent("game_pown").xPos;
            var posY = pown1.getComponent("game_pown").yPos;

            pown1.runAction(cc.moveTo(1, cc.v2(posX, posY)));


            var pown2 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[0].getComponent("game_pown");
            var pown3 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[1].getComponent("game_pown");
            var pown4 = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").pown[2].getComponent("game_pown");

            if (!pown2.isOpen && !pown3.isOpen && !pown4.isOpen) {

                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").isOpen = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

            }
            time + 1;

        } else if (returnTag == 10) {

            // Any Opponent pown that lands on your color in the 2nd ring will be eleminated.(Until one of your powns reaches the golden Ring 
            console.log("jaddu on black  :- Any Opponent pown that lands on your color in the 2nd ring will be eleminated.(Until one of your powns reaches the golden Ring " + returnTag);

            var Type = this.selectedPown.getComponent(game_pown).currentBlock.getComponent("Block").circleType;
            var setColor = this.selectedPown.getComponent("game_pown").currentUser.getComponent("game_User").color;
            console.log("selectedPawn colorProperty color= " + setColor + " circleType = " + Type);
            if (Type == 1) {

                this.eliminetOnColorCircleOne = true;
                this.colorProperty.push({ color: setColor, circleType: 1 });
                this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).cardCircleOneColorEliminatin = true;


            } else if (Type == 2) {

                this.eliminetOnColorCircleTwo = true;
                this.colorProperty.push({ color: setColor, circleType: 2 });
                this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).cardCircleTwoColorEliminatin = true;

            }

            console.log("colorProperty = " + this.colorProperty);
            this.eliminetOnColorfun(this.colorProperty)

            time += 1;


        }


        if (sendingPownbackToGamePlay) {
            this.selectedPown = null;
            return;
        }

        if (goBackToPlay) {

            var self = this;
            this.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
                self.callToGame(self.selectedPown);

            })));

        }

        this.selectedPown = null;
        this.CardRuleState(false);

    }
    //color elemination function
    eliminetOnColorfun(color) {

        for (var z = 0; z < color.length; z++) {

            console.log("this color = " + color[z].color);

            for (var i = 0; i < 4; i++) {

                var selectedPlayr = this.game_play.player[i];
                var Color = color[z].color;
                var CircleType = color[z].circleType;

                var pown0 = selectedPlayr.getComponent("game_User").pown[0].getComponent(game_pown);
                var pown1 = selectedPlayr.getComponent("game_User").pown[1].getComponent(game_pown);
                var pown2 = selectedPlayr.getComponent("game_User").pown[2].getComponent(game_pown);

                if (selectedPlayr.getComponent("game_User").color != Color) {

                    for (var j = 0; j < 3; j++) {

                        var pown = selectedPlayr.getComponent("game_User").pown[j];
                        var circleType = 4;

                        if (pown.getComponent("game_pown").currentBlock != null) {

                            circleType = pown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

                        }

                        if (this.eliminetOnColorCircleOne && circleType == CircleType) {

                            var block_color = pown.getComponent("game_pown").currentBlock.getComponent("Block").block_color;
                            var immune = pown.getComponent("game_pown").Immune;
                            if (block_color == Color && !immune) {

                                var posX = pown.getComponent("game_pown").xPos;
                                var posY = pown.getComponent("game_pown").yPos;
                                pown.runAction(cc.moveTo(1, cc.v2(posX, posY)))
                                pown.getComponent("game_pown").isOpen = false;
                                pown.getComponent("game_pown").currentBlock = null;
                            }

                        }

                        if (this.eliminetOnColorCircleTwo && circleType == CircleType) {
                            var block_color = pown.getComponent("game_pown").currentBlock.getComponent("Block").block_color;
                            var immune = pown.getComponent("game_pown").Immune;

                            if (block_color == Color && !immune) {
                                var posX = pown.getComponent("game_pown").xPos;
                                var posY = pown.getComponent("game_pown").yPos;
                                pown.runAction(cc.moveTo(1, cc.v2(posX, posY)))
                                pown.getComponent("game_pown").isOpen = false;
                                pown.getComponent("game_pown").currentBlock = null;
                            }

                        }


                    }

                    if (!pown0.isOpen && !pown1.isOpen && !pown2.isOpen) {
                        selectedPlayr.getComponent(game_User).cardCircleOneColorEliminatin = false;
                        selectedPlayr.getComponent(game_User).cardCircleTwoColorEliminatin = false;
                        selectedPlayr.getComponent(game_User).isOpen = false;
                    }
                }



            }

        }


    }
    // black and teal card postion function
    CardRuleState(nord) {

        console.log("this length of game Rule Card = " + this.game_play.gameCardRule.length);
        var changeCardPos = false;
        var card = this.game_play.gameCardRule;
        if(card.length==0){
            return;
        }

        for (var n = 0; n < this.game_play.player.length; n++) {

            var userCardObj = [];
            var splice = [];
            var userObj = this.game_play.player[n];
            var script = userObj.getComponent(game_User);

            if (userObj.active == false) {
                continue;
            }
            var cardlength = card.length;
            console.log("cardlength "+cardlength);
            
            for (var i = 0; i < cardlength; i++) {

                console.log("card rule = " + card[i].reluTag);


                var oneCard = card[i];

                if (oneCard.userId == (script.id - 1)) {

                    userCardObj.push(oneCard);

                    var currentUser = oneCard.Node.getComponent(chooseStatementTs).index;
                    if (!oneCard.long && currentUser == 0){
                        oneCard.Node.removeFromParent();
                        changeCardPos = true;
                        splice.push(i);
                        userCardObj.pop();

                    }else if (oneCard.pown) {
                        for (var j = 0; j < 3; j++) {

                            var pown = script.pown[j].getComponent(game_pown);

                            if (oneCard.pownTag == pown.pawnTag) {

                                if (oneCard.reluTag == "rule4" && oneCard.cardType == "teal") {
                                    if (!pown.twoTurnInRow) {
                                        oneCard.Node.removeFromParent();
                                        changeCardPos = true;
                                        splice.push(i);
                                        userCardObj.pop();

                                    }
                                }else if (oneCard.reluTag == "rule7" && oneCard.cardType == "black") {

                                    if (!pown.twoTurnInRow) {

                                        oneCard.Node.removeFromParent();
                                        changeCardPos = true;
                                        splice.push(i);
                                        userCardObj.pop();
                                    }

                                }else if (oneCard.reluTag == "rule8" && oneCard.cardType == "black") {

                                    if (!pown.Immune) {

                                        oneCard.Node.removeFromParent();
                                        changeCardPos = true;
                                        splice.push(i);
                                        userCardObj.pop();

                                    }
                                }
                            }

                        }
                    } else if (!oneCard.pown) {

                        if (oneCard.reluTag == "rule11" && oneCard.cardType == "teal") {

                            if (!script.notWorkDicsNumber) {

                                oneCard.Node.removeFromParent();
                                changeCardPos = true;
                                splice.push(i);
                                userCardObj.pop();

                            }

                        }else if (oneCard.reluTag == "rule11" && oneCard.cardType == "black") {

                            var userColor = script.color;
                            var pownBlock1 = script.pown[0].getComponent(game_pown).currentBlock;
                            var pownBlock2 = script.pown[1].getComponent(game_pown).currentBlock;
                            var pownBlock3 = script.pown[2].getComponent(game_pown).currentBlock;
                            var pownBlock = [0, 0, 0];
                            if (pownBlock1 != null) {
                                pownBlock[0] = (pownBlock1.getComponent(Block).circleType)
                            } if (pownBlock2 != null) {
                                pownBlock[1] = (pownBlock2.getComponent(Block).circleType)
                            } if (pownBlock3 != null) {
                                pownBlock[2] = (pownBlock3.getComponent(Block).circleType)
                            }
                            for (var k = 0; k < this.colorProperty.length; k++) {


                                console.log("this color = " + this.colorProperty[k].color);

                                if ((this.colorProperty[k].color == userColor && this.colorProperty[k].circleType == 1 && !script.cardCircleOneColorEliminatin) || (pownBlock[0] > 1 || pownBlock[1] > 1 || pownBlock[2] > 1)) {

                                    oneCard.Node.removeFromParent();
                                    this.colorProperty.splice(k, 1);
                                    changeCardPos = true;
                                    splice.push(i);
                                    userCardObj.pop();
                                } else if ((this.colorProperty[k].color == userColor && this.colorProperty[k].circleType == 2 && !script.cardCircleTwoColorEliminatin) || (pownBlock[0] > 2 || pownBlock[1] > 2 || pownBlock[2] > 2)) {

                                    oneCard.Node.removeFromParent();
                                    this.colorProperty.splice(k, 1);
                                    changeCardPos = true;
                                    splice.push(i);
                                    userCardObj.pop();
                                }

                            }

                        }

                    }

                }

            }
            console.log("splice length = " + splice.length);
            if (splice.length > 0) {
                for (var r = 0; r < splice.length; r++) {
                    console.log("this. card remove  = "+ splice[r]);
                    
                    card.splice(splice[r], 1);
                }
            }

            for (var l = 0; l < userCardObj.length; l++) {

                var cardOne = userCardObj[l];
                var blackTealbtn = cardOne.Node.getComponent(chooseStatementTs).blackTealCardBtn;
                console.log(" userCardObj.length == " + userCardObj.length);

                var pos = script.eyeIndex.split(",");
                var posX = parseInt(pos[0]);
                var posY = parseInt(pos[1]);
                var posPlus = (69 * l);


                console.log("this.posX == " + posX + " posY = " + posY + "  adddposs " + posPlus);

                if (script.color == "red" || script.color == "yellow") {

                    blackTealbtn.node.setPosition(posX + posPlus, posY);

                } else if (script.color == "green" || script.color == "blue") {

                    blackTealbtn.node.setPosition(posX - posPlus, posY);

                }
            }

        }

    }


}