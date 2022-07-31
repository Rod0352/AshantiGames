// import clickOnOkBtnTs from "./clickOnOkBtnTs";
// import LodingLayer from "./LodingLayer";

// const { ccclass, property } = cc._decorator;
// let funcToCall = null;
// let guestCallChange = null;
// cc["TestImageData"] = function (msg: string) {
//     console.log("Image test data" + msg);
//     funcToCall(msg);
// };

// @ccclass
// export default class LevelPanel extends cc.Component {

//     //home penal variable-----------------------------------------

   

  
//     @property(cc.Node)
//     upperBg: cc.Node[] = [];

 

//     @property(cc.Node)
//     lowerBgHomeScreen: cc.Node = null;
//     @property(cc.Sprite)
//     bgHomeScreen: cc.Sprite = null;

//     @property(cc.Node)
//     odulam: cc.Node = null;


    

//     @property(cc.ScrollView)
//     scrollview: cc.ScrollView = null;

//     @property(cc.Node)
//     odulamObj: cc.Node = null;

//     @property(cc.Sprite)
//     odulamSprite: cc.Sprite = null;

//     @property(cc.Sprite)
//     odulamSprite2: cc.Sprite = null;
//     @property(cc.Sprite)
//     odulamSprite3: cc.Sprite = null;

//     @property(cc.Prefab)
//     errorPopUpPrefevb: cc.Prefab = null;

//     @property(cc.Prefab)
//     LoderPrefeb: cc.Prefab = null;
//     // @property(cc.Node)
//     // blurNode: cc.Node = null;


//     v: cc.Vec2;
//     v2: cc.Vec2;
//     v3: cc.Vec2;

    
//     //--------------------------------Start---------------------------------------
//     start() {

//         console.log("Level panel active");

        
//         var FSize = cc.view.getFrameSize();
//         let fScale = FSize.height / FSize.width;
//         if (!(fScale >= 926 / 428)) {

//             for (var i = 0; i < this.upperBg.length; i++) {

//                 this.upperBg[i].setPosition(0, this.upperBg[i].getPosition().y - 20);

//             }

//         }

     
//         // this.LevelPanel.active = true;
       
//         var move = cc.moveBy(0.18, cc.v2(200, 0));
//         var move2 = cc.moveBy(0.18, cc.v2(-200, 0));
//         var easeing = move.easing(cc.easeBackIn());
//         var easeing1 = move2.easing(cc.easeBackOut());
//         this.lowerBgHomeScreen.runAction(cc.sequence(easeing, easeing1));

//         move = cc.moveBy(0.18, cc.v2(100, 0));
//         move2 = cc.moveBy(0.18, cc.v2(-100, 0));
//         easeing = move.easing(cc.easeBackIn());
//         easeing1 = move2.easing(cc.easeBackOut());
//         this.bgHomeScreen.node.runAction(cc.sequence(easeing, easeing1));

//         // this.scrollview.node.on('scrolling', this.scrollviewHandler, this);
//         var centerOdulam = this.odulamSprite.node;
//         var leftOdulam = this.odulamSprite2.node;
//         var rightOdulam = this.odulamSprite3.node;
//         var odulamNode = this.odulamObj;


//         this.v = odulamNode.getPosition();

//         // this.v2 = self2.getPosition();
//         // this.v3 = self3.getPosition();
//         var _this = this;

//         this.odulamObj.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

//             var x = event.touch.getLocationX();
//             var y = event.touch.getLocationY();

//             var pos = this.convertToNodeSpaceAR(cc.v2(x, y))
//             console.log("sfdopfkopsdkf" + pos.x);



//             var positionStart = event.touch.getStartLocation();
//             var startPoint = this.convertToNodeSpaceAR(positionStart);
//             var horizontalDistance = (pos.x - startPoint.x);

//             if ((_this.v.x - Math.abs(horizontalDistance)) <= -280 || (_this.v.x + Math.abs(horizontalDistance)) >= 280) {

//                 return;
//             }

//             if (horizontalDistance <= 0) {
//                 odulamNode.setPosition(_this.v.x - Math.abs(horizontalDistance), odulamNode.getPosition().y);
//                 console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x - Math.abs(horizontalDistance)));


//             } else if (horizontalDistance > 0) {
//                 odulamNode.setPosition(_this.v.x + Math.abs(horizontalDistance), odulamNode.getPosition().y);
//                 console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x + Math.abs(horizontalDistance)));

//             }



//             if (horizontalDistance <= 0) {

//                 var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

//                 centerOdulam.scale = Scale;

//                 var scaleX = 0.5 + Math.abs(Scale - 1);
//                 if (scaleX <= 1) {
//                     rightOdulam.scale = scaleX;
//                 }
//                 leftOdulam.scale = Math.abs(0.5 - Scale);


//             } else if (horizontalDistance > 0) {

//                 var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

//                 centerOdulam.scale = Scale;

//                 var scaleX = 0.5 + Math.abs(Scale - 1);
//                 if (scaleX <= 1) {
//                     leftOdulam.scale = scaleX;

//                 }
//                 rightOdulam.scale = Math.abs(0.5 - Scale);
//             }

//         }, this.odulamSprite.node);

//         this.odulamObj.on(cc.Node.EventType.TOUCH_END, function (event) {



//             // var x = event.touch.getLocationX();
//             // var y = event.touch.getLocationY();

//             // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

//             // console.log("index:" + pos.x + ", y: " + pos.y);
//             centerOdulam.scale = 1;
//             leftOdulam.scale = 0.5;
//             rightOdulam.scale = 0.5;
//             odulamNode.setPosition(0, odulamNode.getPosition().y);
//             // self2.setPosition(_this.v2);
//             // self3.setPosition(_this.v3);


//             console.log("indexcancil end");

//             // if (pos.x < 0) {

//             //     console.log("left");
//             //     // -261.584

//             // } else if (pos.x > 0) {

//             //     console.log("right");
//             //     // 246.86

//             // }


//         }, this.odulamSprite.node);

//         this.odulamObj.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {



//             // var x = event.touch.getLocationX();
//             // var y = event.touch.getLocationY();

//             // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

//             console.log("indexcancil");

//             // self.setPosition(_this.v);
//             // self2.setPosition(_this.v2);
//             // self3.setPosition(_this.v3);
//             centerOdulam.scale = 1;
//             leftOdulam.scale = 0.5;
//             rightOdulam.scale = 0.5;
//             odulamNode.setPosition(0, odulamNode.getPosition().y);



//             // if (pos.x < 0) {

//             //     console.log("left");
//             //     // -261.584

//             // } else if (pos.x > 0) {

//             //     console.log("right");
//             //     // 246.86

//             // }


//         }, this.odulamSprite.node);

//     }

//     scrollviewHandler(scrollview) {

//         var scrollviewNode = [];

//         scrollviewNode[0] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("1");
//         scrollviewNode[1] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("2");
//         scrollviewNode[2] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("3");

//         console.log("Current Target = " + scrollviewNode);


//     }


    
//     onPlay() {
//         console.log("play ludoo game");
//         // this.LoadingPanel.active = true;
//         cc.director.loadScene("gameScene");
//     }

//     //userPanel fuctions--------------------------------------------------------------

//     // onUseRadioBtn(event, customEventData) {

//     //     console.log(customEventData);
//     //     if (customEventData == 0) {

//     //         if (this.push_noti) {
//     //             this.push_noti = false;
//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

//     //         } else {
//     //             this.push_noti = true;
//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];
//     //         }


//     //     } else if (customEventData == 1) {
//     //         if (this.app_update) {
//     //             this.app_update = false;
//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

//     //         } else {
//     //             this.app_update = true;

//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];
//     //         }

//     //     } else if (customEventData == 2) {

//     //         if (this.game_alert) {
//     //             this.game_alert = false;
//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

//     //         } else {
//     //             this.game_alert = true;

//     //             this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
//     //             this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];

//     //         }
//     //     }

//     // }

   
   

   

//     // onPlyBtn() {
//     //     console.log("game type selection btn clicked")
//     //     this.LevelPanel.active = true;

//     // }
//     //commen---------------------------------------------------------
//     // onCrose() {

//     //     console.log("back to game choice btn clicked");

//     //     if (this.userPenal.active == true) {
//     //         this.userPenal.active = false;
//     //         this.gamePenal.active = true;
//     //         //this.blurNode.active= false;


//     //     } else if (this.menuPenal.active == true) {

//     //         this.menuPenal.active = false;
//     //         this.gamePenal.active = true;
//     //         //this.blurNode.active= false;

//     //     } else if (this.soundPenal.active == true) {
//     //         this.soundPenal.active = false;
//     //         //this.blurNode.active= true;
//     //         this.menuPenal.active = true;
//     //     } else if (this.namePenal.active == true) {
//     //         this.namePenal.active = false;
//     //         //this.blurNode.active= true;
//     //         this.userPenal.active = true;
//     //     } else if (this.LevelPanel.active == true) {
//     //         console.log("Game choice panel active")

//     //         this.LevelPanel.active = false;
//     //         this.gamePenal.active = true;
//     //         //this.blurNode.active= false;

//     //     } else if (this.emailChangePenal.active == true) {

//     //         this.gamePenal.active = false;
//     //         this.userPenal.active = true;
//     //         this.menuPenal.active = false;
//     //         this.LevelPanel.active = false;
//     //         this.emailChangePenal.active = false;

//     //     } else if (this.passwordChangePenal.active == true) {

//     //         this.gamePenal.active = false;
//     //         this.userPenal.active = true;
//     //         this.menuPenal.active = false;
//     //         this.LevelPanel.active = false;
//     //         this.passwordChangePenal.active = false;


//     //     }

//     // }


// }
