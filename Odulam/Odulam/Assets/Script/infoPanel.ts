// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    count: number = 0;

    @property(cc.Sprite)
    infoSprite: cc.Sprite[] = [];

    sprteChage() {

        this.infoSprite[this.count].node.active = false;
        this.count++;
        if (this.count > 3) {
            this.count = 0;
        }
        this.infoSprite[this.count].node.active = true;

    }


}
