import gameBoard from "./gameBoard";
import gamePlay from "./gamePlay";
import game_pown from "./game_pown";

const { ccclass, property } = cc._decorator;

@ccclass
export default class game_User extends cc.Component {


    //creator variable      
    @property
    id: number = 0;

    @property(cc.Node)
    pown: cc.Node[] = [];

    @property
    color: string = ""

    @property
    eyeIndex: string = "";

    @property(cc.Node)
    userProfile: cc.Node = null;

    @property
    userTag: number = 0;
    @property
    isCpu: boolean = false;

    // begin position of user
    @property(cc.Node)
    circleOneEnterBlock: cc.Node = null;
    @property(cc.Node)
    circleTwoEnterBlock: cc.Node = null;
    @property(cc.Node)
    circleThreeEnterBlock: cc.Node = null;


    // eye position of user
    @property(cc.Node)
    eyeOneEnterBlock: cc.Node = null;
    @property(cc.Node)
    eyeTwoEnterBlock: cc.Node = null;
    @property(cc.Node)
    eyeThreeEnterBlock: cc.Node = null;



    //conditional variable

    isOpen: boolean = false;
    is_User_Win: boolean = false;


    //other game variable

    numOpen: number;
    dics: number = 0;
    game_play: gamePlay;
    board = new gameBoard();
    point: number = 0;


    //iris call variable
    iris_call_is_count: boolean = true;
    iris_call: boolean = false;
    stamp: boolean = false;


    //game card rule variable
    cardCircleOneColorEliminatin: boolean = false;
    cardCircleTwoColorEliminatin: boolean = false;
    notWorkDicsNumber: boolean = false;
    numberTimesDicsNotwork: number = 0;


    illagal_Move_count:number=5;

    userName: string = "CPU";
    //start function of game User
    protected start(): void {
        for (var i = 0; i < 3; i++) {
            this.pown[i].getComponent(cc.Button).enabled = false;
        }
    }

    //bind function for game play
    setGamePlay(_gamePlay) {
        this.game_play = _gamePlay;
    }

    //pown enable function
    movePown(dicsN) {

        this.dics = dicsN;
        if (dicsN == 6) {

            for (var i = 0; i < 3; i++) {

                if (!this.pown[i].getComponent("game_pown").isWin) {
                    this.pown[i].getComponent(cc.Button).enabled = true;
                    console.log("poskodfkpsodkpfoposodfkop pown is enable " + i);

                }

            }

        } else {

            for (var i = 0; i < 3; i++) {
                if (this.pown[i].getComponent("game_pown").isOpen && !this.pown[i].getComponent("game_pown").isWin) {

                    this.pown[i].getComponent(cc.Button).enabled = true;
                    console.log("poskodfkpsodkpfoposodfkop pown is enable " + i + "      pskpofdkposkpo dics nomber = " + this.dics);

                }
            }
        }

    }
    //pown selection function
    onChose(event, customEventData) {

        this.game_play.disableLayer.active = true;
        for (var i = 0; i < 3; i++) {
            this.pown[i].getComponent(cc.Button).enabled = false;
        }
        var pown = this.pown[customEventData];
        console.log("pawn is move noumber - " + customEventData);

        var index = this.circleOneEnterBlock.getComponent("Block").block_index;
        if (pown.getComponent("game_pown").isOpen) {
            console.log("pownIsOpen");
            this.game_play.board.getComponent("gameBoard").playOnMode(pown, this.dics, false);
        } else if (this.dics == 6) {
            this.isOpen = true;
            console.log("pownIsGoingToOpen");
            pown.getComponent("game_pown").isOpen = true;
            this.game_play.board.getComponent("gameBoard").getToStartPown(pown, this.circleOneEnterBlock);
        }


    }

    //iris call userProfile
    onUserProfileClick(event, customeInput) {
        console.log("psmdmpfpmfpsdmfposmpfodmpso");

        if (customeInput == 1) {
            this.userProfile.active = true;

            if (this.iris_call && this.isCpu) {
                this.userProfile.getChildByName("iris_call_btn").active = true;
            } else {
                this.userProfile.getChildByName("iris_call_btn").active = false;
            }

            if (this.isCpu) {
                this.userProfile.getChildByName("stamp_node").active = true;
            }else{
                this.userProfile.getChildByName("stamp_node").active = false;
            }

            if (this.isCpu) {
                var lbl = this.userProfile.getChildByName("name_lbl");
                lbl.getComponent(cc.Label).string = "CPU" + (this.id);
            } else {
                var lbl = this.userProfile.getChildByName("name_lbl");
                lbl.getComponent(cc.Label).string = this.game_play.userName.string;
            }

        } else if (customeInput == 2) {
            this.userProfile.active = false;
        }


    }


}
