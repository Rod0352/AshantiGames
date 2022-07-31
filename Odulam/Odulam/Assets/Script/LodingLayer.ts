
const { ccclass, property } = cc._decorator;

@ccclass
export default class LodingLayer extends cc.Component {


    @property(cc.Sprite)
    loader: cc.Sprite = null;

    @property(cc.Label)
    label: cc.Label = null;


    start() {
        var run = cc.rotateBy(0.5, -360).repeatForever();
        this.loader.node.runAction(run);
        this.node.on('touchstart', function () {
            return false;
        });
    }
    ondestroy() {
        this.node.removeFromParent();
    }
}
