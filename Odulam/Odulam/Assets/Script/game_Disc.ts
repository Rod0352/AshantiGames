const { ccclass, property } = cc._decorator;

@ccclass
export default class game_Disc extends cc.Component {

    // total dics call
    @property(cc.Sprite)
    sdics: cc.Sprite = null;

    public startAnimetion(callbacks, touch) {

        var dicsNumber: number;
        var dicsSprite = this.sdics;

        //rendom number for dics
        dicsNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        var animetion = dicsSprite.getComponent(cc.Animation);

        //animetion
        // var sq = cc.sequence(cc.callFunc(function () {
        animetion.play("disc");
        // });
        // dicsSprite.node.runAction(sq);

        //returning number for dics click
        callbacks(dicsNumber);

    }

}
