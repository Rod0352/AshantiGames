import AI_CPU from "./AI_CPU";
import chooseStatementTs from "./chooseStatementTs";
import clickOnOkBtnTs from "./clickOnOkBtnTs";
import Controller_illegal_Move from "./Controller_illegal_Move";
import gameBoard from "./gameBoard";
import GameController from "./GameController";
import game_cell from "./game_cell";
import game_Disc from "./game_Disc";
import game_pown from "./game_pown";
import game_User from "./game_User";
import HomePanel from "./HomePanel";
import iris_Call from "./iris_Call";
import pauseController from "./pauseController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gamePlay extends cc.Component {

    //game user variable
    @property(cc.Node)
    player: cc.Node[] = [];
    @property(cc.Label)
    NumberOfplayer: cc.Label = null;

    //dics node variable
    @property(cc.SpriteFrame)
    spr: cc.SpriteFrame[] = [];
    @property(cc.SpriteFrame)
    dicsBg: cc.SpriteFrame[] = [];
    @property(cc.Sprite)
    dics: cc.Sprite = null;
    @property(cc.Sprite)
    dicsBgNode: cc.Sprite = null;
    @property(cc.Label)
    dicsNumberLbl: cc.Label = null;

    //lavel related variable
    @property(cc.Button)
    playerbtn: cc.Button[] = [];
    @property(cc.Button)
    Level: cc.Button[] = [];
    @property(cc.Sprite)
    tik: cc.Sprite[] = [];

    //another screen of game play
    @property(cc.Node)
    possScreen: cc.Node = null;
    @property(cc.Node)
    exitScreen: cc.Node = null;
    @property(cc.Node)
    cpuSelection: cc.Node = null;
    @property(cc.Node)
    infoPanel: cc.Node = null;

    //gamePlay related variable
    @property(cc.Node)
    board: cc.Node = null;
    @property(cc.Node)
    current_User: cc.Node = null;
    @property(cc.Button)
    dicsBtn: cc.Button = null;
    @property(cc.Node)
    disableLayer: cc.Node = null;
    @property(cc.Node)
    gameUpperBg: cc.Node = null;
    @property(cc.Node)
    stampNode: cc.Node = null;

    //UserPhotoSet
    @property(cc.Sprite)
    userPhoto: cc.Sprite = null;
    @property(cc.Label)
    userName: cc.Label = null;
    @property(cc.Label)
    userScore: cc.Label = null;

    @property(cc.Prefab)
    customPop: cc.Prefab = null;

    userToken: any;
    isGuest: boolean = false;

    //gamePlay controler variable
    currentPlayer: cc.Node = null;
    playerTurnCount: number = 0;
    numberOfPlayer: number = 2;
    winUserList: cc.Node[] = [];
    isRepeatUser: boolean = false;
    levelNumber: number = 1;
    gamePause: boolean = false;
    irisCall: boolean = false;

    pown = [];
    illegalMove: boolean = true;
    pauseControl: number = 2;

    //other Class of game
    gameConroll = new GameController();
    iris_Obj = new iris_Call();
    AI_CPU = new AI_CPU()
    illegalController: Controller_illegal_Move;    

    gameCardRule = [];
    illegalMoveArr = null;

    //index of game
    firstCircleCount: number = 35;
    secondCircleCount: number = 59;
    thirdCircleCount: number = 71;

    sortTurmCard:boolean=false;
    dicsEnable:boolean=true;
    
    illegal_Move_count:number=15;

    //gameStartFuntion
    start() {


        this.userName.string = "Shiv";
        this.GetUserDaitals();
        var FSize = cc.view.getFrameSize();
        let fScale = FSize.height / FSize.width;

        if (fScale >= 926 / 428) {

        } else {

            // this.gameUpperBg.setPosition(0, this.gameUpperBg.getPosition().y - 20);
            // this.board.setPosition(0, this.board.getPosition().y - 20);

        }


        this.callToPlayerTurn();

        for (var i = 0; i < this.player.length; i++) {
            // this.player[i].getComponent("game_User").isCpu = true;
            this.player[i].getComponent("game_User").setGamePlay(this);
        }

        this.board.getComponent("gameBoard").callbackTogamePly((pawnObj) => {
            this.gameBordPown(pawnObj);
            this.dicsEnable=true;
        });

        this.board.getComponent("gameBoard").setGamePlay(this);
        this.player[0].getComponent("game_User").isCpu = false;
        this.dicsBtn.enabled = true;
        // for (let i = 0; i < 4; i++) {
        //     var tempUser = this.player[i];
        //     if (tempUser.active == true) {
        //         var tempUserScript = tempUser.getComponent(game_User);
        //         for (var j = 0; j < 3; j++) {
        //             this.pown.push(tempUserScript.pown[j]);
        //         }
        //     }
        // }
        // var self = this;

        // this.board.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

        //     var x = event.touch.getLocationX();
        //     var y = event.touch.getLocationY();
        //     var pos = this.convertToNodeSpaceAR(cc.v2(x, y));
        //     var pos1 = this.convertToNodeSpaceAR(cc.v2(x, y));


        //     for (var i = 0; i < self.pown.length; i++) {
        //         var selectedPown = self.pown[i];

        //         var a = new cc.Rect(selectedPown.getBoundingBox());
        //         // var b = new cc.Rect(0, 0, pos.x, pos.y);
        //         var b = new cc.Vec2(pos.x, pos.y);
        //         // a.contains(b);// true
        //         // true;
        //         if (a.contains(b)) {
        //             console.log("spodfkkposkfposdkpfoosdkpfoskp");
        //             selectedPown.setPosition(pos)
        //         }
        //     }

        // }, this.board);
        // illegal.pownCollection();


        // var ccount = 0;
        // var self = this.board;
        // var _this = this;

        // this.board.on('touchstart', function (event) {

        //     var x = event.touch.getLocationX();
        //     var y = event.touch.getLocationY();
        //     var pos = this.convertToNodeSpaceAR(cc.v2(x, y))
        //     var node = new cc.Node;
        //     var spr = node.addComponent(cc.Sprite);
        //     spr.node.setScale(0.03);
        //     spr.spriteFrame = _this.dicssprt;
        //     spr.node.setPosition(pos);
        //     // node.addComponent(Sprite);
        //     self.addChild(node, 500);
        //     console.log("index:" + ccount + ",x:" + pos.x + ", y: " + pos.y);
        //     ccount++


        // }, this.board);


        // var pown;
        // var i = 0;
        // for (var i = 0; i < 4; i++) {
        //     pown = this.player[i].getComponent("game_User").pown[0];
        //     var thiredCircle = this.player[i].getComponent(game_User).circleThreeEnterBlock;
        //     pown.runAction(cc.moveTo(1, cc.v2(thiredCircle.getPosition())))
        //     pown.getComponent(game_pown).currentBlock = thiredCircle;
        //     // pown.getComponent("game_pown").eyeBlock = thiredCircle;
        //     pown.getComponent("game_pown").isOpen = true;
        //     pown.getComponent("game_pown").isWin = true;
        //     this.player[i].getComponent("game_User").isOpen = true;
        //     this.player[i].getComponent("game_User").iris_call = true;
        //     this.player[i].getComponent("game_User").stamp = true;
        // }

        // pown = this.player[0].getComponent("game_User").pown[0];
        // var thiredCircle = this.board.getComponent("gameBoard").board_block[60];
        // pown.runAction(cc.moveTo(1, cc.v2(thiredCircle.getPosition())))
        // pown.getComponent("game_pown").currentBlock = thiredCircle;
        // pown.getComponent("game_pown").isOpen = true;
        // this.player[0].getComponent("game_User").isOpen = true;
        // this.player[0].getComponent("game_User").iris_call = true;

        // pown = this.player[1].getComponent("game_User").pown[0];
        // var thiredCircle = this.board.getComponent("gameBoard").board_block[65];
        // pown.runAction(cc.moveTo(1, cc.v2(thiredCircle.getPosition())))
        // pown.getComponent("game_pown").currentBlock = thiredCircle;
        // pown.getComponent("game_pown").isOpen = true;
        // this.player[1].getComponent("game_User").isOpen = true;
        // this.player[1].getComponent("game_User").iris_call = true;

        // this.gameBordPown();
        // this.currentPlayer = this.player[0];


    }

    ///////////////////////////////sat game daitails//////////////////////////////////////////////////////////////
    //setting user Diattals
    GetUserDaitals() {

        var resultParse = cc.sys.localStorage.getItem("guest_user_data");
        var user_daitals = cc.sys.localStorage.getItem("user_daitals");
        var new_User_data = cc.sys.localStorage.getItem("new_User_data");

        if (resultParse != null) {
            var parseResult = JSON.parse(resultParse);
            this.userToken = "";
            this.isGuest = true;
            this.updateUserData(parseResult);
            // this.userDaitals = parseResult;
        } else if (user_daitals != null) {
            this.isGuest = false;
            var parseResult = JSON.parse(user_daitals);
            this.updateUserData(parseResult);
            this.userToken = parseResult.user_token;
            // this.userDaitals = parseResult;
        } else if (new_User_data != null) {
            this.isGuest = false;
            var parseResult = JSON.parse(new_User_data);
            this.updateUserData(parseResult);
            this.userToken = parseResult.user_token;
            // this.userDaitals = parseResult;
        }
    }
    updateUserData(parseResult) {

        if (parseResult.name != "") {
            this.userName.string = parseResult.name.slice(0, 20);
            console.log("name = " + parseResult.name.slice(0, 10));


        }
        if (parseResult.score != "") {
            this.userScore.string = parseResult.score;
        }

        if (parseResult.profile_image != "" && !this.isGuest) {
            console.log("profile_image = " + parseResult.profile_image);
            this.downloadProfileImage(parseResult.profile_image);
        } else if (parseResult.profile_image != "" && this.isGuest) {
            this.scheduleOnce(this.updateProfile, 0.50);
        }
    }
    updateProfile(dt) {
        var path = cc.sys.localStorage.getItem("UserPhoto");
        if (path == null) {
            return
        } else {
            var fileName = path;
        }

        let imagepath = jsb.fileUtils.getWritablePath();
        let totalpath = imagepath + "Groups/" + fileName + ".png";
        console.log("file Name---- " + fileName);
        console.log("file Name " + totalpath);
        var _this = this;

        var cb = function (err, res) {
            if (res instanceof cc.Texture2D) {
                var sprite = new cc.SpriteFrame(res);
                var floatXCal = _this.userPhoto.spriteFrame.getOriginalSize().width;
                var floatYCal = _this.userPhoto.spriteFrame.getOriginalSize().height;

                // var node = new cc.Node();
                // let spriteComponent = node.addComponent(cc.Sprite);
                // spriteComponent.spriteFrame = new cc.SpriteFrame(res);
                // _this.userPhoto.node.removeAllChildren(true);

                // console.log("child count ----  " + _this.userPhoto.node.childrenCount);

                // _this.userPhoto.node.addChild(node, _this.userPhoto.node.childrenCount + 2, "node");
                _this.userPhoto.spriteFrame=sprite;
                if (floatXCal > floatYCal) {
                    var sva = _this.userPhoto.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height;
                   
                    console.log(sva + "ifdjsiofjsiodjfsio");

                    _this.userPhoto.node.setScale(sva);

                } else {
                    var sva = _this.userPhoto.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                    console.log(sva + "sdhuuifduifhsuidfhui");
                    _this.userPhoto.node.setScale(sva);


                }
                // floatXCal = _this.userPhoto1.spriteFrame.getOriginalSize().width
                // floatYCal = _this.userPhoto1.spriteFrame.getOriginalSize().height
                // _this.userPhoto1.spriteFrame = sprite
                // if (floatXCal > floatYCal) {
                //     var sva = _this.userPhoto1.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

                //     console.log(sva + "ifdjsiofjsiodjfsio");

                //     _this.userPhoto1.node.setScale(sva);

                // } else {
                //     var sva = _this.userPhoto1.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                //     console.log(sva + "sdhuuifduifhsuidfhui");
                //     _this.userPhoto1.node.setScale(sva);


                // }

                // _this.userPhotobtn.normalSprite = sprite
                // _this.userPhotobtn.pressedSprite = sprite
                // _this.userPhotobtn.hoverSprite = sprite




            }
            //  else if (res instanceof cc.SpriteFrame) {
            //     console.log("sdfg fg d fgfd g ...3333");
            //     // _this.userPhoto.spriteFrame.clear();
            //     _this.userPhoto.spriteFrame = res;
            // }
        };
        if (totalpath.indexOf(jsb.fileUtils.getWritablePath()) >= 0) {
            console.log("sdfg fg d fgfd g ....111 " + totalpath);
            cc.loader.load({ url: totalpath, type: 'png' }, cb);
        } else {
            cc.loader.loadRes(totalpath, cc.SpriteFrame, cb);
        }
    }
    downloadProfileImage(imageUrl) {
        var _this = this;
        if (imageUrl == null) {
            return;
        }
        cc.loader.load(imageUrl, (err, tex) => {

            // this.picSprite.spriteFrame = new cc.SpriteFrame(tex);
            var sprite = new cc.SpriteFrame(tex);
            var floatXCal = _this.userPhoto.spriteFrame.getOriginalSize().width;
            var floatYCal = _this.userPhoto.spriteFrame.getOriginalSize().height;

            var node = new cc.Node();
            let spriteComponent = node.addComponent(cc.Sprite);
            spriteComponent.spriteFrame = new cc.SpriteFrame(tex);
            _this.userPhoto.node.removeAllChildren(true);

            console.log("child count ----  " + _this.userPhoto.node.childrenCount);

            _this.userPhoto.node.addChild(node, _this.userPhoto.node.childrenCount + 2, "node");
            if (floatXCal > floatYCal) {
                var sva = _this.userPhoto.spriteFrame.getOriginalSize().height / spriteComponent.spriteFrame.getOriginalSize().height;

                console.log(sva + "ifdjsiofjsiodjfsio");

                _this.userPhoto.node.setScale(sva);

            } else {
                var sva = _this.userPhoto.spriteFrame.getOriginalSize().width / spriteComponent.spriteFrame.getOriginalSize().width
                console.log(sva + "sdhuuifduifhsuidfhui");
                _this.userPhoto.node.setScale(sva);


            }
            // floatXCal = _this.userPhoto1.spriteFrame.getOriginalSize().width
            // floatYCal = _this.userPhoto1.spriteFrame.getOriginalSize().height
            // _this.userPhoto1.spriteFrame = sprite
            // if (floatXCal > floatYCal) {
            //     var sva = _this.userPhoto1.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

            //     console.log(sva + "ifdjsiofjsiodjfsio");

            //     _this.userPhoto1.node.setScale(sva);

            // } else {
            //     var sva = _this.userPhoto1.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
            //     console.log(sva + "sdhuuifduifhsuidfhui");
            //     _this.userPhoto1.node.setScale(sva);


            // }

            // _this.userPhotobtn.normalSprite = sprite
            // _this.userPhotobtn.pressedSprite = sprite
            // _this.userPhotobtn.hoverSprite = sprite

        });
    }



    ///////////////////////////////User Selection position //////////////////////////////////////////////////////////////
    //  user turn selection function
    callToPlayerTurn() {

        if (this.irisCall) {
            return;
        }

        var illegal = Math.floor(Math.random() * (100));
        if (illegal <= this.levelNumber) {


        if (this.illegalMoveArr != null && this.illegal_Move_count>=0) {

            this.illegal_Move_count--;
            var self = this;
            this.stampNode.active = true;
            this.stampNode.getChildByName("red").active = true;

            this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                self.node.getComponent(Controller_illegal_Move).onStampClick();
            })))

            return;
        }

        } else {

            this.illegalMove = true;
            this.illegalMoveArr = null;

        }

        if(this.gameCardRule.length>0){
            this.board.getComponent(gameBoard).CardRuleState(null);
        }

    

        if (this.currentPlayer == null) {

            this.currentPlayer = this.player[0];

        } else if (this.isRepeatUser == false) {


            if (this.playerTurnCount < this.player.length - 1) {

                this.playerTurnCount++;

                this.currentPlayer = this.player[this.playerTurnCount];

            } else if (this.playerTurnCount + 1 >= this.player.length) {

                this.currentPlayer = this.player[0];
                this.playerTurnCount = 0;
                for (var i = 0; i < this.gameCardRule.length; i++) {

                    var card = this.gameCardRule[i];
                    if (card.Node != null && !card.long) {
                        this.gameCardRule[i].Node.getComponent(chooseStatementTs).index = 0;
                    }
                }


            }

        }

        if (this.currentPlayer.getComponent("game_User").isCpu) {

            this.disableLayer.active = true;

        } else {
            this.current_User.active = true;
            this.disableLayer.active = false;

        }




        var irisCall = Math.floor(Math.random() * (100));
        var isTrue = false;
        if (irisCall <= this.levelNumber) {

            isTrue = true;

        }

        var dics = this.dicsBgNode;
        var playerCount = this.playerTurnCount;

        var dicsbgg = this.dicsBg;



        if (this.currentPlayer.active == false || this.currentPlayer.getComponent("game_User").is_User_Win == true) {

            if (this.playerTurnCount < this.player.length - 1) {

                this.playerTurnCount++;
                this.callToPlayerTurn();

            } else {

                this.playerTurnCount = -1;
                this.callToPlayerTurn();

            }
            return;
        }

        dics.spriteFrame = dicsbgg[playerCount];
        var _this = this;
        this.dicsBgNode.node.runAction(cc.sequence(cc.delayTime(1),
            cc.callFunc(function () {

                _this.dicsBtn.enabled = true;

                if (_this.currentPlayer.getComponent("game_User").isCpu && _this.currentPlayer.active != false
                    && _this.currentPlayer.getComponent("game_User").is_User_Win != true) {

                    if (isTrue) {

                        _this.iris_call_by_cpu(_this.currentPlayer);

                    } else {

                        _this.dicsBtn.enabled = false;
                        _this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                            _this.dicsMove();
                        })));

                    }

                }

            })));

    }
    //dics click functio it return dics number for user 
    dicsMove() {

        //poss and iris call conditon check
        if (this.gamePause || this.irisCall || !this.dicsEnable) {
            return;
        }


        //variable declar
        var _this = this;
        this.dicsBtn.enabled = false;
        this.dicsEnable=false;

        //call back function game_disc ccclass
        var fun = function callbFun(num: number) {

            // variable declar
            var lbl = _this.dicsNumberLbl;
            var diss = _this.dics;
            var spr = _this.spr;

            if (_this.gamePause || _this.irisCall) {
                return;
            }

            if (_this.selectedDicsNumber != 0) {
                num = _this.selectedDicsNumber;
                _this.selectedDicsNumber = 0;
            }


            // sequence for dics animation
            var sq = cc.sequence(cc.delayTime(1.4),
                cc.callFunc(function () {
                    diss.spriteFrame = spr[num - 1];
                    lbl.string = '' + num;
                }), cc.moveTo(1, cc.v2(lbl.node.getPosition().x, lbl.node.getPosition().y + 20)),
                cc.callFunc(function () {

                    lbl.string = '';
                    var tag = true;
                    // card condition 3,6 not work
                    if (_this.currentPlayer.getComponent("game_User").notWorkDicsNumber && num == 6) {

                        _this.currentPlayer.getComponent("game_User").numberTimesDicsNotwork = _this.currentPlayer.getComponent("game_User").numberTimesDicsNotwork - 1;
                        tag = false;

                        if (_this.currentPlayer.getComponent("game_User").numberTimesDicsNotwork == 0) {
                            _this.currentPlayer.getComponent("game_User").notWorkDicsNumber = false
                            _this.board.getComponent(gameBoard).CardRuleState(false);
                        }
                    }


                    //get game pown 
                    var pown1 = _this.currentPlayer.getComponent("game_User").pown[0].getComponent("game_pown");
                    var pown2 = _this.currentPlayer.getComponent("game_User").pown[1].getComponent("game_pown");
                    var pown3 = _this.currentPlayer.getComponent("game_User").pown[2].getComponent("game_pown");
                    var currentScript = _this.currentPlayer.getComponent("game_User");
                    console.log("PlayeTurn name  " + currentScript.color + " Dics Number " + num);

                    //condition for user pown is open or not for dicsNumber 
                    if ((((pown1.isOpen && !pown1.isWin) || (pown2.isOpen && !pown2.isWin) || (pown3.isOpen && !pown3.isWin) || num == 6) && (tag)) && !currentScript.is_User_Win) {

                        //checking user is cpu 
                        if (_this.currentPlayer.getComponent("game_User").isCpu) {

                            //calling ai_cpu class for pown 
                            var pown = _this.AI_CPU.checkCpuPawn(_this.currentPlayer, _this.player, num);

                            //check pown is open not 
                            if (pown.getComponent("game_pown").isOpen && !pown.getComponent("game_pown").isWin) {
                                //pown is open
                                console.log("Cpu Pown Is Going");

                                _this.board.getComponent("gameBoard").playOnMode(pown, num, false);


                            } else if ((!pown.getComponent("game_pown").isOpen) && num == 6) {

                                //pown is in bay
                                console.log("Cpu Pown Is Going Open");

                                var startpoint = _this.currentPlayer.getComponent("game_User").circleOneEnterBlock;
                                _this.board.getComponent("gameBoard").getToStartPown(pown, startpoint);
                                _this.currentPlayer.getComponent("game_User").isOpen = true;
                                pown.getComponent("game_pown").isOpen = true;

                            }
                        } else {

                            //calling game_User function for user pown to move
                            console.log("PlayeTurn is Not Cpu ");
                            _this.currentPlayer.getComponent(game_User).movePown(num);

                        }
                    } else {
                        // user is not open 
                        console.log("Player is Not open");
                        _this.callToPlayerTurn();
                        _this.dicsEnable=true;
                    }
                }));



            _this.dicsNumberLbl.node.runAction(sq);
            _this.isRepeatUser = false;
            // repeat user turn 
            if (num == 6) {
                _this.isRepeatUser = true;
            }

        }

        this.dicsNumberLbl.node.setPosition(2.923, -243.267);
        //calling function of game_Disc class
        this.node.getComponent("game_Disc").startAnimetion(fun, true);

    }
    // pown eleminetion function game
    gameBordPown(pownObj) {

        if (pownObj == null) {
            this.callToPlayerTurn();
            return;
        }

        if (pownObj.getComponent("game_pown").isWin) {
            this.callToPlayerTurn();
            return;
        }

        var currentPlayer = pownObj.getComponent("game_pown").currentUser;
        var currentIndex;
        if (pownObj.getComponent("game_pown").currentBlock != null) {
            currentIndex = pownObj.getComponent("game_pown").currentBlock.getComponent("Block").block_index;
        }

        for (var i = 0; i < 4; i++) {

            var tempUser = this.player[i];
            if (currentPlayer == tempUser) {

            } else {

                var pown1 = [];
                pown1[0] = tempUser.getComponent("game_User").pown[0];
                pown1[1] = tempUser.getComponent("game_User").pown[1];
                pown1[2] = tempUser.getComponent("game_User").pown[2];

                for (var k = 0; k < 3; k++) {


                    if (pown1[k].getComponent("game_pown").isOpen == false || pown1[k].getComponent("game_pown").currentBlock == null) {
                        continue;
                    }
                    var playerIndex = pown1[k].getComponent("game_pown").currentBlock.getComponent("Block").block_index;
                    var Immune = pown1[k].getComponent("game_pown").Immune;

                    if (playerIndex == currentIndex && !Immune) {

                        if (playerIndex > 59) {
                            console.log("Last Circle ");

                        } else if (playerIndex > 35 && playerIndex <= 59) {

                            console.log("Second Circle");
                            var circleOne = pown1[k].getComponent("game_pown").currentUser.getComponent("game_User").circleOneEnterBlock;
                            var pos = circleOne.getPosition();
                            pown1[k].getComponent("game_pown").currentBlock = circleOne;
                            pown1[k].runAction(cc.sequence(cc.delayTime(1), cc.moveTo(0.5, cc.v2(pos))));

                        } else if (playerIndex <= 35) {

                            console.log("First Circle ");
                            var posx = pown1[k].getComponent("game_pown").xPos;
                            var posy = pown1[k].getComponent("game_pown").yPos;
                            pown1[k].getComponent("game_pown").isOpen = false;
                            if (!pown1[0].getComponent("game_pown").isOpen && !pown1[1].getComponent("game_pown").isOpen && !pown1[2].getComponent("game_pown").isOpen) {

                                tempUser.getComponent("game_User").isOpen = false;
                                tempUser.getComponent("game_User").cardCircleOneColorEliminatin = false;
                                tempUser.getComponent("game_User").cardCircleTwoColorEliminatin = false;

                            }
                            pown1[k].getComponent("game_pown").currentBlock = null;
                            pown1[k].runAction(cc.sequence(cc.delayTime(1), cc.moveTo(0.5, cc.v2(posx, posy))));
                        }

                    }
                }

            }
        }
        this.callToPlayerTurn();
    }


    /////////////////////////////////////////// Other funtion //////////////////////////////////////////
    isUserTurn() {
        this.disableLayer.active = false;
        this.current_User.active = false;
        this.dicsMove();
    }
    //dics number selection function
    selectedDicsNumber: number = 0;
    userSelectedDicsNumber(event, customeInput) {
        this.selectedDicsNumber = customeInput;
    }

    /////////////////////////////////////////////////// IRISCALL RALATED FUNCTIONS //////////////////////////////////////////////////////
    //User Iris call fun
    Iris_call_fuction(event, customeInput) {

        if (this.currentPlayer.getComponent("game_User").iris_call_is_count) {

            this.node.getComponent("iris_Call").toStart(this.currentPlayer, this.player[customeInput], this);
            console.log("player color = " + this.currentPlayer.getComponent("game_User").color);
            console.log("opponent color = " + this.player[customeInput].getComponent("game_User").color);

            this.dicsBtn.enabled = false;
            this.player[customeInput].getComponent("game_User").userProfile.active = false;
            this.disableLayer.active = true;
            this.irisCall = true;
            this.currentPlayer.getComponent("game_User").iris_call_is_count = false;

        }

    }
    //Iris call fun by cpu
    iris_call_by_cpu(play) {


        if (play.getComponent("game_User").iris_call_is_count) {

            var rendom = Math.floor(Math.random() * 3);

            for (var i = 0; i < 4; i++) {

                var tempUser = this.player[i];
                var temp = true;

                if (play == tempUser || tempUser.active == false) {

                } else {

                    if (tempUser.getComponent(game_User).iris_call) {

                        console.log("player color = " + play.getComponent("game_User").color);
                        console.log("opponent color = " + tempUser.getComponent("game_User").color);

                        temp = false;
                        this.node.getComponent("iris_Call").toStart(play, tempUser, this);
                        this.disableLayer.active = true;
                        this.irisCall = true;
                        this.dicsBtn.enabled = false;
                        play.getComponent("game_User").iris_call_is_count = false;
                        break;

                    }

                }

                if (i == 3 && temp) {

                    this.dicsMove();

                }

            }

        } else {
            this.dicsMove();
        }
    }
    //iri call return User
    returnCurrentUser(User) {

        this.irisCall = false;

        if (User.getComponent("game_User").isCpu) {

            this.dicsMove();

        } else {

            this.disableLayer.active = false;
            this.dicsBtn.enabled = true;

        }
    }


    ///////////////////////////////////////////////* cpuSelection and ExitGamePanel or infoPanel and possScreen ralated function *////////////////////////////////////////////////////////////
    //Number of Player and cpuSelection Screen controler
    CpuSelection(event, customInput) {

        if (customInput == 1) {

            if (this.numberOfPlayer > 1) {
                this.playerbtn[0].enabled = true;
                var sp = this.playerbtn[0].pressedSprite;
                this.playerbtn[0].normalSprite = sp;
                this.playerbtn[1].enabled = true;
                var sp = this.playerbtn[1].pressedSprite;
                this.playerbtn[1].normalSprite = sp;
                this.numberOfPlayer--;
                this.NumberOfplayer.string = "" + this.numberOfPlayer;
            }

            if (this.numberOfPlayer == 2) {
                this.playerbtn[0].enabled = false;
                var disable = this.playerbtn[0].disabledSprite;
                this.playerbtn[0].normalSprite = disable;
            }

        } else if (customInput == 2) {

            if (this.numberOfPlayer < 5) {
                this.playerbtn[0].enabled = true;
                var sp = this.playerbtn[0].pressedSprite;
                this.playerbtn[0].normalSprite = sp;
                this.playerbtn[1].enabled = true;
                var sp = this.playerbtn[1].pressedSprite;
                this.playerbtn[1].normalSprite = sp;
                this.numberOfPlayer++;
                this.NumberOfplayer.string = "" + this.numberOfPlayer;
            }

            if (this.numberOfPlayer == 4) {
                this.playerbtn[1].enabled = false;
                var disable = this.playerbtn[1].disabledSprite;
                this.playerbtn[1].normalSprite = disable;
            }

        }



    }
    //game selection controler for number of player and mode of game
    gameLavelSelection(event, customeInput) {

        for (var i = 0; i < 3; i++) {
            this.levelNumber = i + 1;
            if (i == customeInput) {
                this.tik[customeInput].node.active = true;
                var hour = this.Level[customeInput].hoverSprite;
                this.Level[customeInput].normalSprite = hour;
                this.Level[customeInput].pressedSprite = hour;
                if (customeInput == 2) {
                    this.Level[customeInput].node.setScale(0.93, 0.8);
                }
            } else {
                this.tik[i].node.active = false;
                var hour = this.Level[i].disabledSprite;
                this.Level[i].normalSprite = hour;
                this.Level[i].pressedSprite = hour;
                if (i == 2) {
                    this.Level[i].node.setScale(1);
                }
            }

        }
    }
    //exit screen controler for game
    exitGame() {

        cc.director.loadScene("GameScreen").valueOf();
        // new HomePanel().LevelPanel.active = true;

    }
    //poss controler function
    possController(event, customeInput) {

        if (this.pauseControl == 0 && customeInput == 1) {
            var errorPrefeb = cc.instantiate(this.customPop);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Pause";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "No more pause left.";
            this.node.addChild(errorPrefeb);
        } else if (customeInput == 1) {
            this.pauseControl--;
            this.possScreen.active = true;
            this.gamePause = true;
            this.possScreen.getChildByName("pause_layer").getComponent(pauseController).onClickResumeButton(false);
            console.log("sfdsssssdddddddddddddddddddddddddddddddddd");

        } else {
            this.possScreen.active = false;
            this.possScreen.getChildByName("pause_layer").getComponent(pauseController).onClickResumeButton(true);
            this.gamePause = false;
            if (this.currentPlayer.getComponent("game_User").isCpu) {
                this.dicsMove();
            }

        }

    }
    //other funtion 
    HomebtnClick(event, customeInput) {
        if (customeInput == 1)
            this.exitScreen.active = true;
        else
            this.exitScreen.active = false;
    }
    // info panel controler funtion
    infobtnclick(event, customeInput) {
        if (customeInput == 1)
            this.infoPanel.active = true;
        else
            this.infoPanel.active = false;
    }
    //other funtion 
    gameRemove(event, current) {
        if (current == 1) {
            this.current_User.active = false;
        }

    }
    //Start btn function of game selection 
    gameStart() {
        this.cpuSelection.active = false;
        console.log("level" + this.levelNumber + " number of player " + this.numberOfPlayer);

        if (this.levelNumber == 1) {
            this.levelNumber = 10;
        } else if (this.levelNumber == 2) {
            this.levelNumber = 30;
        } else if (this.levelNumber == 3) {
            this.levelNumber = 50;
        }
        for (var i = 0; i < 4; i++) {
            if (i < this.numberOfPlayer) {
                this.player[i].active = true;
            } else {
                this.player[i].active = false;
                for (var n = 0; n < 3; n++) {
                    this.player[i].getComponent("game_User").pown[n].active = false;
                }
                // this.AI_CPU
            }
        }
        this.illegal_Move_count = 5*this.numberOfPlayer;
        // this.numberOfPlayer;
    }

}
