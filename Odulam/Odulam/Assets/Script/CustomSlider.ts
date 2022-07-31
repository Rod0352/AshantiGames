// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {




    @property(cc.ProgressBar)
    bar: cc.ProgressBar = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.AudioSource)
    gameAudio: cc.AudioSource = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.musicSlider();
    }

    updateSlider() {
        var a = 10;
        a = 20;

        this.bar.progress = this.slider.progress;

    }
    musicSlider() {

        this.bar.progress = this.slider.progress;
        var parsent = this.slider.progress;
        this.gameAudio.volume = parsent;
    }

    // update (dt) {}
}
