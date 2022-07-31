// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    loadingPanel: cc.Node = null;

    @property(cc.Sprite)
    loding: cc.Sprite = null;

    @property(cc.Sprite)
    eyebool: cc.Sprite = null;

    @property(cc.Sprite)
    d: cc.Sprite = null;

    @property(cc.Sprite)
    u: cc.Sprite = null;

    @property(cc.Sprite)
    l: cc.Sprite = null;

    @property(cc.Sprite)
    o: cc.Sprite = null;

    @property(cc.Sprite)
    m: cc.Sprite = null;

    @property(cc.Sprite)
    b: cc.Sprite = null;

    start() {

        var lodingMove = cc.moveBy(0.5, cc.v2(0, 100));

        var rtate = cc.rotateBy(0.5, 360);
        var scale = cc.scaleTo(0.5, 0.155);
        var move1 = cc.moveTo(0.5, cc.v2(0, 0));
        let span = cc.spawn(rtate, scale, move1);



        var mm = this.m.node;
        var om = this.o.node;
        var lm = this.l.node;
        var um = this.u.node;
        var dm = this.d.node;
        var ldpanel = this.loadingPanel;


        var rtate2 = cc.rotateBy(0.5, 360);
        var move2 = cc.moveTo(0.5, cc.v2(cc.director.getWinSize().width, 0));
        let span2 = cc.spawn(rtate2, move2);

        var sq2 = cc.sequence(
            cc.moveTo(0.1, cc.v2(mm.getPosition())), cc.callFunc(function () {
                mm.active = true;
            }),
            cc.moveTo(0.1, cc.v2(om.getPosition())), cc.callFunc(function () {
                om.active = true;
            }),
            cc.moveTo(0.1, cc.v2(lm.getPosition())), cc.callFunc(function () {
                lm.active = true;
            }),
            cc.moveTo(0.1, cc.v2(um.getPosition())), cc.callFunc(function () {
                um.active = true;
            }),
            cc.moveTo(0.1, cc.v2(dm.getPosition())), cc.callFunc(function () {
                dm.active = true;
            }),
            cc.moveTo(0.1, cc.v2(this.b.node.getPosition())),
            cc.callFunc(function () {
                cc.director.loadScene("gameScene");
            })
        );

        var span3 = cc.spawn(cc.rotateBy(0.5, -720), sq2);
        var sq = cc.sequence(span, span2, span3);
        this.loding.node.runAction(lodingMove);
        this.eyebool.node.runAction(sq);




    }

}
