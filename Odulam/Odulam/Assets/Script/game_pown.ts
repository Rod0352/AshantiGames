const { ccclass, property } = cc._decorator;

@ccclass
export default class game_pown extends cc.Component {
    //creator variable
    @property
    pawnTag: number = 0;

    @property
    color: string = "";

    @property(cc.Node)
    currentUser: cc.Node = null;

    // bay position of pown

    @property
    xPos: number = 0;

    @property
    yPos: number = 0;

    //current positon or block of pown 

    currentBlock: cc.Node = null;

    byePos = cc.v2(this.xPos, this.yPos);

    eyeBlock: cc.Node = null;

    //conditinal variable

    isOpen: boolean = false;
    isWin: boolean = false;

    //card rule variable

    gameRule = [];
    twoTurnInRow: boolean = false;
    Immune: boolean = false;
    start() {

    }

}
