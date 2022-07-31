// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    @property
    block_index: number = 0;

    @property
    block_color: string = "";

    @property
    isBlack: boolean = false;

    @property
    isTeal: boolean = false;

    @property
    isBegin: boolean = false;

    @property
    isEye: boolean = false;


    isEyeFull: boolean = false;
    

    circleType: number = 0;

    block_pown: cc.Node[] = [];



}
