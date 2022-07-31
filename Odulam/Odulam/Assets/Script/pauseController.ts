// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import gamePlay from "./gamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class pauseController extends cc.Component {

    @property(cc.Label)
    lblCount: cc.Label = null;


    @property(cc.Label)
    lblDesc: cc.Label = null;

    @property(cc.Animation)
    eyeAnimation: cc.Animation = null;


    count: number = 30;
    possCount = 2;

    CountDownChange(dt) {
        this.count--;
        this.lblCount.string = "" + this.count;
        if (this.count <= 0) {

            this.unschedule(this.CountDownChange);
            this.getComponent(cc.Animation).stop("pause_clip");
            this.node.getParent().active = false;
            var node = this.node.getParent().getParent();
            var script = node.getComponent(gamePlay);
            script.gamePause = false;
            if (script.currentPlayer.getComponent("game_User").isCpu) {
                script.dicsMove();
            }
        }
    }

    onClickResumeButton(arr) {
        if (arr) {
            this.count = 30;
            this.unschedule(this.CountDownChange);
            console.log("pfpgggggggggggggggggggggggggggggggggggg");

            this.getComponent(cc.Animation).stop("pause_clip");
            // this.node.active = false;
        } else if (!arr) {

            this.getComponent(cc.Animation).play("pause_clip");
            this.schedule(this.CountDownChange, 1);
            this.count = 30;
            this.lblCount.string = "" + this.count;
            this.possCount--;
            var str="(" + this.possCount + ")";
            this.lblDesc.string = str.replace(" ","");

            if (this.possCount < 0) {
                console.log("no more poss");
                this.unschedule(this.CountDownChange);
                this.getComponent(cc.Animation).stop("pause_clip");
                this.node.getParent().active = false;
                var script = this.node.getParent().getParent().getComponent(gamePlay);
                script.gamePause = false;
                if (script.currentPlayer.getComponent("game_User").isCpu) {
                    script.dicsMove();
                }
            }
        }

    }

    // update (dt) {}
}
