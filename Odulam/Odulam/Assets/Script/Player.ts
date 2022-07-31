// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

var color;


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Button)
    Dics: cc.Button = null;

    @property
    text: string = 'hello';


    start() {
        var color;
        var userid;
        this.crateComponent();


    }

    rendom() {
        var rotate = cc.rotateBy(0.5, 360); 
        var nn = this.Dics;
        var sq = cc.sequence(rotate, cc.callFunc(function () {
            
            var nam = Math.floor(Math.random() * 6) + 1;
            this.nn.string = "" + nam;
            console.log(nam);
            
        }));
        this.Dics.node.runAction(rotate);
        
       

    }




    crateComponent() {
        var userWinToken = -1;
        var userOutToken = -1;


    }
    // update (dt) {}
}
