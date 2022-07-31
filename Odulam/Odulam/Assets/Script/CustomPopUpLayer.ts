const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;
   
    @property(cc.Label)
    dectitle: cc.Label = null;
    

    start () {

    }
    setTital(titlemsg) {
        this.title.string = titlemsg;
        
    }
    setDescription(DecsMsg) {
        this.dectitle.string = DecsMsg;

    }
    setButton(Button: number, tital: string) {
        
        if (Button >= 2) {
            
        } else if (Button <= 1) {
            
        }
        

    }


}
