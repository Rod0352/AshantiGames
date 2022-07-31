// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Controller_illegal_Move from "./Controller_illegal_Move";
import gameBoard from "./gameBoard";
import game_pown from "./game_pown";
import Game_rule from "./Game_rule";
import game_User from "./game_User";

const { ccclass, property } = cc._decorator;

@ccclass
export default class chooseStatementTs extends cc.Component {

    @property(cc.Node)
    chooseStatementNode: cc.Node = null;
    @property(cc.Node)
    selectStatementTealNode: cc.Node = null;
    @property(cc.Label)
    choose_label: cc.Label = null;
    @property(cc.Button)
    real_button: cc.Button = null;
    @property(cc.Button)
    choose_button: cc.Button = null;
    @property(cc.Label)
    select_label: cc.Label = null;
    @property(cc.Label)
    select_label2: cc.Label = null;
    @property(cc.Label)
    select_label3: cc.Label = null;
    @property(cc.Button)
    select_button1: cc.Button = null;
    @property(cc.Button)
    select_button2: cc.Button = null;
    @property(cc.Button)
    select_button3: cc.Button = null;
    @property(cc.Label)
    timer_label: cc.Label = null;
    @property(cc.Sprite)
    timer_image: cc.Sprite = null;

    @property(cc.Node)
    selectStatementBlackNode: cc.Node = null;

    @property(cc.Node)
    blackNodeChoiseStat: cc.Node[] = [];

    @property(cc.Button)
    blackTealCardBtn: cc.Button = null;

    @property(cc.Button)
    blackCardBtn: cc.Button = null;

    @property(cc.Button)
    disableBtn: cc.Button = null;


    @property(cc.SpriteFrame)
    spriteFrame_Black: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spriteFrame_Teal: cc.SpriteFrame = null;

    longTimeBlackRules: string[] = ["rule7", "rule8", "rule11"];
    longTimeTealRules: string[] = ["rule4", "rule11"];

    currentCardType: string = "";
    isCpuTurn: boolean = false;
    currentRuleType: string = "";
    currentRule: string = "";

    progressTime: cc.ProgressBar = null;

    clickRealHandler = null;
    chooseStetementHandler = null;
    selectButtonHandler1 = null;
    selectButtonHandler2 = null;
    selectButtonHandler3 = null;

    index: number = 1;
    // LIFE-CYCLE CALLBACKS:
    countDown: number = 10;
    randomCpuNumber: number = 0;
    gameRuleObj = new Game_rule();
    gameBoard: gameBoard = null;
    selectedPown: cc.Node = null;
    rendomly: any;

    chosinCard: string = "";
    orignalCard: string = "";
    viseVersa: boolean = false;
    teg: "";
    chose_real_Statment: boolean = true;
    userscript:any;


    tostart() {

        var FSize = cc.view.getFrameSize();
        let fScale = FSize.height / FSize.width;

        if (fScale >= 926 / 428) {

        } else {

            // this.node.setPosition(0, this.node.getPosition().y - 35);

        }


        this.progressTime = this.timer_image.getComponent(cc.ProgressBar);
        this.schedule(this.onTimerChange, 1);

        this.gameRuleObj.tostart();
        this.clickRealHandler = new cc.Component.EventHandler();
        this.clickRealHandler.target = this.chooseStatementNode.parent; // This node is the node to which your event handler code component belongs
        this.clickRealHandler.component = "chooseStatementTs";// This is the code file name
        this.clickRealHandler.handler = "onClickChooseStatement";
        this.clickRealHandler.customEventData = "foobar";
        this.choose_button.node.getComponent(cc.Button).clickEvents.push(this.clickRealHandler);

        this.chooseStetementHandler = new cc.Component.EventHandler();
        this.chooseStetementHandler.target = this.chooseStatementNode.parent; // This node is the node to which your event handler code component belongs
        this.chooseStetementHandler.component = "chooseStatementTs";// This is the code file name
        this.chooseStetementHandler.handler = "onClickRealStatement";
        this.chooseStetementHandler.customEventData = "foobar";
        this.real_button.node.getComponent(cc.Button).clickEvents.push(this.chooseStetementHandler);

        this.selectButtonHandler1 = new cc.Component.EventHandler();
        this.selectButtonHandler1.target = this.chooseStatementNode.parent; // This node is the node to which your event handler code component belongs
        this.selectButtonHandler1.component = "chooseStatementTs";// This is the code file name
        this.selectButtonHandler1.handler = "onClickSelectStatementOne";
        this.selectButtonHandler1.customEventData = "foobar";
        this.select_button1.node.getComponent(cc.Button).clickEvents.push(this.selectButtonHandler1);

        this.selectButtonHandler2 = new cc.Component.EventHandler();
        this.selectButtonHandler2.target = this.chooseStatementNode.parent; // This node is the node to which your event handler code component belongs
        this.selectButtonHandler2.component = "chooseStatementTs";// This is the code file name
        this.selectButtonHandler2.handler = "onClickSelectStatementTwo";
        this.selectButtonHandler2.customEventData = "foobar";
        this.select_button2.node.getComponent(cc.Button).clickEvents.push(this.selectButtonHandler2);

        this.selectButtonHandler3 = new cc.Component.EventHandler();
        this.selectButtonHandler3.target = this.chooseStatementNode.parent; // This node is the node to which your event handler code component belongs
        this.selectButtonHandler3.component = "chooseStatementTs";// This is the code file name
        this.selectButtonHandler3.handler = "onClickSelectStatementThree";
        this.selectButtonHandler3.customEventData = "foobar";
        this.select_button3.node.getComponent(cc.Button).clickEvents.push(this.selectButtonHandler3);

    }

    callToShowCards(cardType) {
        this.currentCardType = cardType;

        this.rendomly = [];
        this.tostart();
        if (cardType == "black") {
            var cardBlackRandom = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_blackBlockList, null);
            this.choose_label.string = this.gameRuleObj.r_blackBlockList[cardBlackRandom].rule_msg;
            this.clickRealHandler.customEventData = this.gameRuleObj.r_blackBlockList[cardBlackRandom].rule_num;
            this.orignalCard = this.gameRuleObj.r_blackBlockList[cardBlackRandom].rule_msg;
            this.viseVersa = this.gameRuleObj.r_blackBlockList[cardBlackRandom].vise;
            this.teg = this.gameRuleObj.r_blackBlockList[cardBlackRandom].rule_num;

            var cardRandom1 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_blackcardchoise, this.orignalCard);
            this.select_label.string = this.gameRuleObj.r_blackcardchoise[cardRandom1].rule_msg;
            this.selectButtonHandler1.customEventData = this.gameRuleObj.r_blackcardchoise[cardRandom1].rule_num;

            var cardRandom2 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_blackcardchoise, this.orignalCard);
            this.select_label2.string = this.gameRuleObj.r_blackcardchoise[cardRandom2].rule_msg;
            this.selectButtonHandler2.customEventData = this.gameRuleObj.r_blackcardchoise[cardRandom2].rule_num;

            var cardRandom3 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_blackcardchoise, this.orignalCard);
            this.select_label3.string = this.gameRuleObj.r_blackcardchoise[cardRandom3].rule_msg;
            this.selectButtonHandler3.customEventData = this.gameRuleObj.r_blackcardchoise[cardRandom3].rule_num;

        } else if (cardType == "teal") {

            var cardBlackRandom = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_tealBlockList, null);
            this.choose_label.string = this.gameRuleObj.r_tealBlockList[cardBlackRandom].rule_msg;
            this.clickRealHandler.customEventData = this.gameRuleObj.r_tealBlockList[cardBlackRandom].rule_num;
            this.orignalCard = this.gameRuleObj.r_tealBlockList[cardBlackRandom].rule_msg;
            this.viseVersa = this.gameRuleObj.r_tealBlockList[cardBlackRandom].vise;
            this.teg = this.gameRuleObj.r_tealBlockList[cardBlackRandom].rule_num;

            var cardRandom1 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_tealcardchoise, this.orignalCard);
            this.select_label.string = this.gameRuleObj.r_tealcardchoise[cardRandom1].rule_msg;
            this.selectButtonHandler1.customEventData = this.gameRuleObj.r_tealcardchoise[cardRandom1].rule_num;

            var cardRandom2 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_tealcardchoise, this.orignalCard);
            this.select_label2.string = this.gameRuleObj.r_tealcardchoise[cardRandom2].rule_msg;
            this.selectButtonHandler2.customEventData = this.gameRuleObj.r_tealcardchoise[cardRandom2].rule_num;

            var cardRandom3 = this.findCardRandomNumber(this.rendomly, this.gameRuleObj.r_tealcardchoise, this.orignalCard);
            this.select_label3.string = this.gameRuleObj.r_tealcardchoise[cardRandom3].rule_msg;
            this.selectButtonHandler3.customEventData = this.gameRuleObj.r_tealcardchoise[cardRandom3].rule_num;

        }

    }
    callToTurnCpu(isCpu) {
        this.isCpuTurn = isCpu;
        if (this.isCpuTurn) {
            this.randomCpuNumber = Math.floor(Math.random() * 10);
            console.log("sdfbsd fsd f df d  " + this.randomCpuNumber);

            this.selectStatementTealNode.active = false;
            this.chooseStatementNode.active = true;
            if (this.currentCardType == "black") {

                this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("black").active = true;

            } else if (this.currentCardType == "teal") {

                this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("teal").active = true;

            }

            // this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("challange").active = true;
            this.choose_button.node.active = false;
            this.real_button.node.active = false;
            this.choose_label.node.active = false;
        }
    }

    findCardRandomNumber(rendomly, array, choiseStatement): number {

        var cardRandomNumber = 0;

        cardRandomNumber = Math.floor(Math.random() * array.length);
        while (rendomly.includes(array[cardRandomNumber].rule_msg)) {
            cardRandomNumber = Math.floor(Math.random() * array.length);
        }

        // if (choiseStatement != null) {
        //     var string = true;

        //     while (string) {
        //         var str=array[cardRandomNumber]
        //         if (choiseStatement==str.rule_msg && !rendomly.includes(cardRandomNumber)) {
        //             string = false;
        //             break;
        //         }else {
        //             cardRandomNumber = Math.floor(Math.random() * array.length);
        //         }

        //     }

        rendomly.push(array[cardRandomNumber].rule_msg);
        // }
        return cardRandomNumber;
    }
    returnTagObj(_gameBoard, selectedPown) {
        this.gameBoard = _gameBoard;
        this.selectedPown = selectedPown;
    }

    shufflerule(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    onChallange() {


        if(this.userscript.illagal_Move_count<=0){
            return;
        }
        this.userscript.illagal_Move_count--;
        var label=this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("challange").getChildByName("numberOfChallange");
        label.getComponent(cc.Label).string=""+this.userscript.illagal_Move_count;

        this.gameBoard.game_play.getComponent(Controller_illegal_Move).onStampClick();

    }

    onTimerChange(dt) {
        this.timer_label.string = "" + this.countDown;
        this.countDown = this.countDown - 1;
        var progressCount = this.progressTime.progress;
        progressCount = progressCount - 0.10;
        if (this.isCpuTurn) {
            if (this.countDown <= this.randomCpuNumber) {
                this.selectStatementTealNode.active = false;
                this.chooseStatementNode.active = true;
                this.choose_button.node.active = false;
                this.real_button.node.active = false;

                this.unschedule(this.onTimerChange);
                this.removingChild(this.clickRealHandler.customEventData);
            }
        } else {
            if (progressCount < 0) {
                this.unschedule(this.onTimerChange);

            }
        }
        this.progressTime.progress = progressCount;

    }
    onClickRealStatement(event, customEventData) {
        console.log("dfknsd fs df sdf  sd sd");
        // this.unschedule(this.onTimerChange);
        // this.selectStatementNode.active = true;
        // this.chooseStatementNode.active = false;
        // this.callToShowCards("black");
        this.unschedule(this.onTimerChange);
        console.log("dfknsd fs df sdf  sd sd.............11. " + this.clickRealHandler.customEventData);

        this.selectStatementTealNode.active = false;
        this.chooseStatementNode.active = true;
        this.choose_button.node.active = false;
        this.real_button.node.active = false;
        this.choose_label.string = this.choose_label.string;
        this.chosinCard = this.choose_label.string;
        this.chose_real_Statment = true;
        //this.teg = customEventData;
        if(this.viseVersa){
            this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("vicsVesa").active=true;
        }

        this.removingChild(this.clickRealHandler.customEventData)

    }

    onClickChooseStatement(event, customEventData) {
        console.log("dfknsd fs df sdf  sd sd..............");
        this.unschedule(this.onTimerChange);
        this.selectStatementTealNode.active = true;
        this.chooseStatementNode.active = false;


    }
    onClickSelectStatementOne(event, customEventData) {
        console.log("dfknsd fs df sdf  sd sd.............11.");
        this.selectStatementTealNode.active = false;
        this.chooseStatementNode.active = true;
        this.choose_button.node.active = false;
        this.real_button.node.active = false;
        this.choose_label.string = this.select_label.string;
        this.chosinCard = this.select_label.string;

        //this.teg = customEventData;
        this.chose_real_Statment = false;
        this.removingChild(customEventData)



    }

    removingChild(tag) {

        var self = this;
        var logTimeCard = false;



        var id = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).id;
        var posVal = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).eyeIndex;
        var script = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User);
        var pownTag = this.selectedPown.getComponent(game_pown).pawnTag;
        var block = this.selectedPown.getComponent(game_pown).currentBlock;

        var pown1 = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).pown[0].getComponent(game_pown).currentBlock;
        var pown2 = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).pown[1].getComponent(game_pown).currentBlock;
        var pown3 = this.selectedPown.getComponent(game_pown).currentUser.getComponent(game_User).pown[2].getComponent(game_pown).currentBlock;

        this.userscript=script;
        var currentUser=this.selectedPown.getComponent(game_pown).currentUser;
        id--;
        var card = this.gameBoard.game_play.gameCardRule;
        var pos = posVal.split(",");
        var posX = parseInt(pos[0]);
        var posY = parseInt(pos[1]);

        console.log("length of cardRule = " + this.gameBoard.game_play.gameCardRule.length);



        var count = 0;
        for (var i = 0; i < card.length; i++) {
            if (card[i].userId == id) {
                count++;
            }
        }

        for (var i = 1; i <= count; i++) {

            if (script.color == "red" || script.color == "yellow") {
                posX += 69;
            } else if (script.color == "green" || script.color == "blue") {
                posX -= 69;
            }
        }



        if ((this.longTimeTealRules.includes(tag) && this.currentCardType == "teal") || (this.longTimeBlackRules.includes(tag) && this.currentCardType == "black")) {
            if (tag == "rule11") {
                card.push({ userColor: this.selectedPown.getComponent(game_pown).color, userId: id, Node: this.node, cardType: this.currentCardType, reluTag: tag, pownTag: pownTag, pown: false, active: true, long: true, currentUser:currentUser });
            } else {
                card.push({ userColor: this.selectedPown.getComponent(game_pown).color, userId: id, Node: this.node, cardType: this.currentCardType, reluTag: tag, pownTag: pownTag, pown: true, active: true, long: true, currentUser:currentUser  });
            }

        } else {

            card.push({ userColor: this.selectedPown.getComponent(game_pown).color, userId: id, Node: this.node, cardType: this.currentCardType, reluTag: tag, pownTag: pownTag, pown: true, active: false, long: false , currentUser:currentUser });

        }


        if (this.currentCardType == "black") {

            this.blackCardBtn.node.setPosition(posX, posY);
            this.blackCardBtn.node.active = true;
            this.node.zIndex = 0;
            logTimeCard = true;

        } else if (this.currentCardType = "teal") {

            this.blackTealCardBtn.node.setPosition(posX, posY);
            this.blackTealCardBtn.node.active = true;
            this.node.zIndex = 0;
            logTimeCard = true;

        }


        var allPownObj = this.returnPownObj();
        var rongStatement = null;
        if (this.gameBoard.game_play.illegalMoveArr != null) {
            rongStatement = this.gameBoard.game_play.illegalMoveArr;
        }

        if (!this.chose_real_Statment || this.gameBoard.game_play.illegalMoveArr != null) {
            if (tag == "rule11" || tag == "rule7" || tag == "rule8" || tag == "rule4") {
                this.gameBoard.game_play.illegalMoveArr = { rongStatement: rongStatement, type: "card", tag: this.teg, cardColor: this.currentCardType, orignalCard: this.orignalCard, chosinCard: this.chosinCard, allPownObj: allPownObj, selectedPown: this.selectedPown, selectedPownBlock: block, color: this.selectedPown.getComponent(game_pown).color, pownIndex: pownTag, card: true, cardIndex: card.length - 1, Node: this.node, pown1: pown1, pown2: pown2, pown3: pown3, long: true , currentUser:currentUser};
            } else {
                this.gameBoard.game_play.illegalMoveArr = { rongStatement: rongStatement, type: "card", tag: this.teg, cardColor: this.currentCardType, orignalCard: this.orignalCard, chosinCard: this.chosinCard, allPownObj: allPownObj, selectedPown: this.selectedPown, selectedPownBlock: block, color: this.selectedPown.getComponent(game_pown).color, pownIndex: pownTag, card: true, cardIndex: card.length - 1, Node: this.node, pown1: pown1, pown2: pown2, pown3: pown3, long: false , currentUser:currentUser};
            }

        }


        console.log("chosin :  " + this.chosinCard + " orignalCard: " + this.orignalCard);

        if (this.isCpuTurn) {

            var self = this;
            this.choose_label.node.active = true;
            this.chooseStatementNode.runAction(cc.sequence(cc.scaleTo(0.2, 0, 1), cc.callFunc(function () {
                self.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("black").active = false;
                self.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("teal").active = false;
                // self.node.setPosition(0, self.node.getPosition().y - 50);

            }), cc.scaleTo(0.2, 1, 1), cc.delayTime(2), cc.callFunc(function () {
                if (logTimeCard) {
                    self.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("vicsVesa").active=false;
                    self.chooseStatementNode.active = false;
                } else {
                    self.node.removeFromParent();
                }

                self.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("challange").active = true;
                self.gameBoard.returnTagFromBlackTealCard(tag, self.currentCardType);
                self.timer_label.node.active = false;
                self.timer_image.node.active = false;
                self.progressTime.node.active = false;
            })))
        } else {
            this.choose_label.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                if (logTimeCard) {
                    self.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("vicsVesa").active=false;
                    self.chooseStatementNode.active = false;
                } else {
                    self.node.removeFromParent();
                }
                self.gameBoard.returnTagFromBlackTealCard(tag, self.currentCardType);

                self.timer_label.node.active = false;
                self.timer_image.node.active = false;
                self.progressTime.node.active = false;
            })))
        }


    }
    returnPownObj() {

        var pownObjArr = [];
        for (var i = 0; i < 4; i++) {
            var userScript = this.gameBoard.game_play.player[i].getComponent(game_User);
            var userObj = this.gameBoard.game_play.player[i];
            if (!userObj.active) {
                continue;
            }

            for (var j = 0; j < 3; j++) {
                var block = userScript.pown[j].getComponent(game_pown).currentBlock;
                pownObjArr.push({ pown: userScript.pown[j], block: block });

            }
        }

        return pownObjArr;
    }
    onClickSelectStatementTwo(event, customEventData) {
        console.log("dfknsd fs df sdf  sd sd.............22.");
        this.selectStatementTealNode.active = false;
        this.chooseStatementNode.active = true;
        this.choose_button.node.active = false;
        this.real_button.node.active = false;
        this.choose_label.string = this.select_label2.string;
        this.chosinCard = this.select_label2.string;
        this.chose_real_Statment = false;
        // this.teg = customEventData;
        this.removingChild(customEventData)



    }
    onClickSelectStatementThree(event, customEventData) {
        console.log("dfknsd fs df sdf  sd sd............33..");
        this.selectStatementTealNode.active = false;
        this.chooseStatementNode.active = true;
        this.choose_button.node.active = false;
        this.real_button.node.active = false;
        this.choose_label.string = this.select_label3.string;
        this.chosinCard = this.select_label3.string;
        this.chose_real_Statment = false;
        //  this.teg = customEventData;
        this.removingChild(customEventData)
    }

    onClickSelectStatementBlack(event, customEventData) {



    }

    onClickOfBlckOrTealCard(event, customeInput) {

        if (customeInput == 1) {
            if(this.userscript.illagal_Move_count>0){
                var label=this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("challange").getChildByName("numberOfChallange");
                label.getComponent(cc.Label).string=""+this.userscript.illagal_Move_count;
            }else{
                this.chooseStatementNode.getChildByName("tealBlackRuleBg").getChildByName("challange").active = false;
            }
            this.chooseStatementNode.active = true;
            this.disableBtn.node.active = true;
        } else if (customeInput == 2) {
            this.chooseStatementNode.active = false;
            this.disableBtn.node.active = false;
        }

    }




    // update (dt) {}
}
