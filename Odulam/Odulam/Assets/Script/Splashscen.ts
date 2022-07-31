
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressbar: cc.ProgressBar = null;


    @property
    text: string = 'hello';
    time: number = 5;

    count: number = 0;

    @property(cc.Mask)
    mask: cc.Mask = null;

    @property(cc.Sprite)
    maskLogo: cc.Sprite = null;

    @property(cc.Sprite)
    arcade_Logo: cc.Sprite = null;

    @property(cc.Sprite)
    smoll_logo: cc.Sprite = null;

    @property(cc.AudioSource)
    Intro: cc.AudioSource=null;
    AudioSource: any;

    start() {

        this.schedule(this.scenChange, 0.0001);

    };

    playAudio(){
        this.AudioSource.play();
    };

scenChange(dt) {
    this.count++;
    let n = this.count / 90;
    this.progressbar.progress = n;
    var self = this;
    if (this.count == 100) {

        let n = this.progressbar.node;
        var sp1 = cc.sequence(cc.fadeTo(0.4, 255), cc.callFunc(function () {
            n.active = false;
        }))

        var ar = this.smoll_logo;
        var arcade = this.arcade_Logo;
        var scale = cc.scaleTo(0.3, 0.255, 0.307);
        var move = cc.moveTo(0.3, cc.v2(ar.node.getPosition()));
        var sp = cc.spawn(scale, move);
        var sq = cc.sequence(sp1, sp,
            cc.callFunc(function () {
                arcade.node.runAction(cc.fadeTo(0.3, 255));
            }),
            cc.delayTime(1),
            cc.callFunc(function () {
                console.log("sdfs dfsdfsjd fs df sdfsd  ");

                // this.unschedule(this.scenChange);
                var user_daitals = cc.sys.localStorage.getItem("user_daitals");
                var new_User_data = cc.sys.localStorage.getItem("new_User_data");
                var resultParse = cc.sys.localStorage.getItem("guest_user_data");

                if (resultParse != null || user_daitals != null ||
                    new_User_data != null) {
                    cc.director.loadScene("GameScreen");
                    // cc.director
                } else {
                    cc.director.loadScene("LoginScene");
                }

                this.const = 0;


            }));

        this.maskLogo.node.runAction(sq);

    }

}
    


}
