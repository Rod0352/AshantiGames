import AI_CPU from "./AI_CPU";
import gamePlay from "./gamePlay";
import game_Disc from "./game_Disc";
import game_pown from "./game_pown";
import game_User from "./game_User";

const { ccclass, property } = cc._decorator;

@ccclass
export default class iris_Call extends cc.Component {

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    opponentName: cc.Label = null;

    @property(cc.Label)
    dicsNumberLbl: cc.Label = null;


    @property(cc.SpriteFrame)
    dicsSprite: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    dicsSelectionSprite: cc.Sprite = null

    counter: number = 0;

    @property(cc.Node)
    iris_call_logo_panel: cc.Node = null;

    @property(cc.Node)
    dicsNumber_Selection: cc.Node = null;

    @property(cc.Node)
    dicsNumber_Result: cc.Node = null;

    @property(cc.Node)
    splace: cc.Node = null;

    @property(cc.Button)
    dicBtn: cc.Button = null;


    opponentDicsNumber: number = 0;
    chalangerDicsNumber: number = 0;

    opponent: cc.Node = null;
    challenger: cc.Node = null;
    gamePlay: gamePlay;

    dicsNumber: any;


    toStart(current_User, opponent_User, _gamePlay) {

        //iris call start
        this.dicsNumber = [0];
        this.challenger = current_User;
        this.opponent = opponent_User;
        this.gamePlay = _gamePlay;
        this.dicBtn.enabled = true;
        this.splace.active = true;
        var self = this;

        var userName = this.dicsNumber_Result.getChildByName("bg").getChildByName("userName");
        userName.getComponent(cc.Label).string="JOHN";
        var userName = this.dicsNumber_Result.getChildByName("bg").getChildByName("opponentName");
        userName.getComponent(cc.Label).string="JOHN";

        var split = _gamePlay.userName.string;
        var name = split.split(" ");

        if (!current_User.getComponent(game_User).isCpu) {
            var userName = this.dicsNumber_Result.getChildByName("bg").getChildByName("userName");
            userName.getComponent(cc.Label).string = name[0];
            var userName1 = this.dicsNumber_Result.getChildByName("bg").getChildByName("yourTurnLayer").getChildByName("user").getChildByName("name");
            userName1.getComponent(cc.Label).string =  name[0];
        } else  if(!opponent_User.getComponent(game_User).isCpu){
            var userName = this.dicsNumber_Result.getChildByName("bg").getChildByName("opponentName");
            userName.getComponent(cc.Label).string = name[0];
            var userName1 = this.dicsNumber_Result.getChildByName("bg").getChildByName("yourTurnLayer").getChildByName("user").getChildByName("name");
            userName1.getComponent(cc.Label).string = opponent_User.getComponent(game_User).color;
        }

       

        this.iris_call_logo_panel.active = true;

        if (this.challenger.getComponent(game_User).isCpu) {
            this.dicBtn.enabled = false;
        }
        //checking user or cpu 

        this.iris_call_logo_panel.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {

            if (self.challenger.getComponent("game_User").isCpu && self.opponent.getComponent("game_User").isCpu) {

                self.iris_call_logo_panel.active = false;
                self.dicBtn.enabled = false;
                self.selectedDics();

            } else {
                self.dicsNumber_Selection.active = true;
                self.iris_call_logo_panel.active = false;
            }


        })));



    }

    selectionDicsNumber(ecebtm, customeInput) {

        //selecting dics number

        if (customeInput == 1) {
            this.counter++;
            if (this.counter > 5) {
                this.counter = 0;
            }
            this.dicsSelectionSprite.spriteFrame = this.dicsSprite[this.counter];
        } else if (customeInput == 2) {
            this.counter--;
            if (this.counter < 0) {
                this.counter = 5;
            }
            this.dicsSelectionSprite.spriteFrame = this.dicsSprite[this.counter];
        }

        var selectedNumber = this.counter + 1;
        this.dicsNumber.pop();
        this.dicsNumber.push(selectedNumber);


    }

    selectedDics() {

        this.dicsNumber_Selection.active = false;
        this.iris_call_logo_panel.active = false;
        this.dicsNumber_Result.active = true;

        if (this.opponent.getComponent("game_User").isCpu) {

            while (true) {

                this.opponentDicsNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                if (this.dicsNumber.length > 0) {
                    if (!this.dicsNumber.includes(this.opponentDicsNumber)) {
                        this.dicsNumber.push(this.opponentDicsNumber);
                        break;
                    }

                }
            }
            dics = this.dicsNumber_Result.getChildByName("bg").getChildByName("opoonentSelectedDics");
            dics.getComponent(cc.Sprite).spriteFrame = this.dicsSprite[this.opponentDicsNumber - 1];

        } else {

            this.opponentDicsNumber = this.counter + 1;
            dics = this.dicsNumber_Result.getChildByName("bg").getChildByName("opoonentSelectedDics");
            dics.getComponent(cc.Sprite).spriteFrame = this.dicsSprite[this.opponentDicsNumber - 1];

        }

        if (this.challenger.getComponent("game_User").isCpu) {

            while (true) {
                this.chalangerDicsNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                if (this.dicsNumber.length > 0) {

                    if (!this.dicsNumber.includes(this.chalangerDicsNumber)) {
                        this.dicsNumber.push(this.chalangerDicsNumber);
                        break;
                    }

                }
            }

            var dics = this.dicsNumber_Result.getChildByName("bg").getChildByName("userDics");
            dics.getComponent(cc.Sprite).spriteFrame = this.dicsSprite[this.chalangerDicsNumber - 1];

        } else {

            this.chalangerDicsNumber = this.counter + 1;
            var dics = this.dicsNumber_Result.getChildByName("bg").getChildByName("userDics");
            dics.getComponent(cc.Sprite).spriteFrame = this.dicsSprite[this.chalangerDicsNumber - 1];

        }

        var self = this;
        if ((this.challenger.getComponent("game_User").isCpu && this.opponent.getComponent("game_User").isCpu) || (this.challenger.getComponent("game_User").isCpu && !this.opponent.getComponent("game_User").isCpu)) {
            this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                self.onDicsClick();
            })));
        }

    }

    dicsNumberCheck(dicsNumber) {

        //checking winner 

        console.log("opponent dics Number  = " + this.opponentDicsNumber);
        console.log("Player dics Number  = " + this.chalangerDicsNumber);
        console.log("click dics Number  = " + dicsNumber);

        var win = false;

        if (dicsNumber == this.chalangerDicsNumber && dicsNumber != this.opponentDicsNumber) {

            // if chalanger player wins
            console.log(" if chalanger player wins");

            win = true;
            var pown;

            var thiredCircle = this.challenger.getComponent("game_User").circleThreeEnterBlock;
            this.opponent.getComponent("game_User").iris_call = false;
            this.challenger.getComponent("game_User").iris_call = true;

            var pos = thiredCircle.getPosition();

            for (var i = 0; i < 3; i++) {

                //chalanger player pown pos

                var circleType;
                pown = this.challenger.getComponent("game_User").pown[i];
                var isWin = pown.getComponent(game_pown).isWin;
                
                if (pown.getComponent("game_pown").currentBlock == null) {
                    pown.getComponent("game_pown").isOpen = true;
                    circleType = 0;

                } else {
                    circleType = pown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;
                }

                if (circleType != 3 && !isWin) {
                    pown.runAction(cc.moveTo(1, cc.v2(pos)));
                    pown.getComponent("game_pown").currentBlock = thiredCircle;
                    pown.getComponent("game_pown").twoTurnInRow = false;
                    pown.getComponent("game_pown").Immune = false;
                }



                //opponent game pown poss
                var opPown = this.opponent.getComponent("game_User").pown[i];

                var posx = opPown.getComponent("game_pown").xPos;
                var posy = opPown.getComponent("game_pown").yPos;

                opPown.getComponent("game_pown").currentBlock = null;
                opPown.getComponent("game_pown").isWin = false;
                opPown.getComponent("game_pown").isOpen = false;
                opPown.getComponent("game_pown").twoTurnInRow = false;
                opPown.getComponent("game_pown").Immune = false;

                opPown.runAction(cc.moveTo(1, cc.v2(posx, posy)));

            }

        } else if (dicsNumber == this.opponentDicsNumber && dicsNumber != this.chalangerDicsNumber) {
            console.log("opponent Player wins");

            //opponent Player wins


            var pown;
            win = true;

            var thiredCircle = this.opponent.getComponent("game_User").circleThreeEnterBlock;

            this.challenger.getComponent("game_User").iris_call = false;
            this.opponent.getComponent("game_User").iris_call = true;

            var pos = thiredCircle.getPosition();

            for (var i = 0; i < 3; i++) {


                pown = this.opponent.getComponent("game_User").pown[i];
                var circleType;
                var isWin = pown.getComponent(game_pown).isWin;
                if (pown.getComponent("game_pown").currentBlock == null) {

                    pown.getComponent("game_pown").isOpen = true;
                    circleType = 0;

                } else {

                    circleType = pown.getComponent("game_pown").currentBlock.getComponent("Block").circleType;

                }

                if (circleType != 3 && !isWin) {
                    pown.runAction(cc.moveTo(1, cc.v2(pos)));
                    pown.getComponent("game_pown").currentBlock = thiredCircle;
                    pown.getComponent("game_pown").twoTurnInRow = false;
                    pown.getComponent("game_pown").Immune = false;
                }


                //chalnger player loss pown poss
                var opPown = this.challenger.getComponent("game_User").pown[i];

                var posx = opPown.getComponent("game_pown").xPos;
                var posy = opPown.getComponent("game_pown").yPos;

                opPown.getComponent("game_pown").currentBlock = null;
                opPown.getComponent("game_pown").isWin = false;
                opPown.getComponent("game_pown").isOpen = false;
                opPown.getComponent("game_pown").twoTurnInRow = false;
                opPown.getComponent("game_pown").Immune = false;

                opPown.runAction(cc.moveTo(1, cc.v2(posx, posy)));


            }
        }

        if (win) {
            this.dicsNumber_Result.active = false;
            this.gamePlay.returnCurrentUser(this.challenger);
        } else {

            var self = this;
            this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {

                self.onDicsClick();

            })))

        }


    }
    onDicsClick() {

        // dics selection 

        var self = this;
        this.splace.active = false;
        this.dicBtn.enabled = false;

        this.dicsNumberLbl.node.setPosition(2.923, -243.267);

        var call = function (dicsNum) {

            var spr = self.dicsSprite[dicsNum - 1];
            var lbl = self.gamePlay.dicsNumberLbl;
            ;
            var diss = self.gamePlay.dics;
            var spwm = cc.spawn(cc.delayTime(1.4), cc.moveTo(1.4, cc.v2(lbl.node.getPosition().x, lbl.node.getPosition().y + 20)))
            var sq = cc.sequence(spwm, cc.callFunc(function () {
                lbl.string = '' + dicsNum;
                lbl.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                    lbl.string = '';
                    self.dicsNumberCheck(dicsNum);
                })));

                diss.spriteFrame = spr;

            }))
            self.dicsNumberLbl.node.runAction(sq);
        }

        this.node.getComponent("game_Disc").startAnimetion(call, true);

    }


}
