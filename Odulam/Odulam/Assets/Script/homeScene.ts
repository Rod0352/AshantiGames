const { ccclass, property } = cc._decorator;
// let funcToCall = null;
// cc["TestImageData"] = function (msg: string) {

//     funcToCall(msg);
// };


@ccclass
export default class HomePanel extends cc.Component {


    //home penal variable-----------------------------------------
    @property(cc.Node)
    gamePenal: cc.Node = null;

    @property(cc.Node)
    namePenal: cc.Node = null;

    @property(cc.Node)
    userPenal: cc.Node = null;

    @property(cc.Node)
    menuPenal: cc.Node = null;

    @property(cc.Node)
    soundPenal: cc.Node = null;

    @property(cc.Sprite)
    userPhoto: cc.Sprite = null;

    @property(cc.Sprite)
    userPhoto1: cc.Sprite = null;

    @property(cc.Button)
    userPhotobtn: cc.Button = null;


    @property(cc.Node)
    LevelPanel: cc.Node = null;

    @property(cc.Node)
    LoadingPanel: cc.Node = null;

    @property(cc.SpriteFrame)
    radioSpt: cc.SpriteFrame[] = [];

    @property(cc.Button)
    radiobtn: cc.Button[] = [];

    @property(cc.EditBox)
    nameEdit: cc.EditBox = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Node)
    upperBg: cc.Node[] = [];

    // @property(cc.Node)
    // blurNode: cc.Node = null;

    push_noti: boolean = true;
    app_update: boolean = false;
    game_alert: boolean = true;
    isPhotoUploeded: boolean = false;

    //--------------------------------Start---------------------------------------
    start() {
            console.log("Im here");
        var FSize = cc.view.getFrameSize();
        let fScale = FSize.height / FSize.width;
        if (fScale >= 926 / 428) { // 2340/1080比较长的手机 ，顶高

            console.log("pskmffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");


        } else {
            for (var i = 0; i < this.upperBg.length; i++) {

                this.upperBg[i].setPosition(0, this.upperBg[i].getPosition().y - 20);

            }

        }



        this.gamePenal.active = true;
        this.userPenal.active = false;
        this.menuPenal.active = false;


        this.LevelPanel.active = false;


    }
    onLoad(): void {
        const funcToCall = this.javaCallback.bind(this);
    }

    //home manu fuction-----------------------------------------------------------
    onUserProfile() {

        this.userPenal.active = true;
        //this.blurNode.active= true;
        this.menuPenal.active = false;

    }
    onNameChange() {

        var name = this.nameEdit.string;

        if (name.length == 0) {
            return;
        } else {
            this.userName.string = name;
            this.gamePenal.active = true;
            this.userPenal.active = false;
            this.menuPenal.active = false;
            this.LevelPanel.active = false;
            this.namePenal.active = false;
        }




    }
    onMenu() {

        this.userPenal.active = false;
        //this.blurNode.active= true;
        this.menuPenal.active = true;
    }
    onPlay() {
        console.log("play ludoo game");
        this.LoadingPanel.active = true;
    }

    //userPanel fuctions--------------------------------------------------------------

    onUseRadioBtn(event, customEventData) {

        console.log(customEventData);
        if (customEventData == 0) {

            if (this.push_noti) {
                this.push_noti = false;
                this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

            } else {
                this.push_noti = true;
                this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];
            }


        } else if (customEventData == 1) {
            if (this.app_update) {
                this.app_update = false;
                this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

            } else {
                this.app_update = true;

                this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];
            }

        } else if (customEventData == 2) {

            if (this.game_alert) {
                this.game_alert = false;
                this.radiobtn[customEventData].normalSprite = this.radioSpt[0];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[0];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[0];

            } else {
                this.game_alert = true;

                this.radiobtn[customEventData].normalSprite = this.radioSpt[1];
                this.radiobtn[customEventData].pressedSprite = this.radioSpt[1];
                this.radiobtn[customEventData].hoverSprite = this.radioSpt[1];

            }
        }

    }

    onChgEmail() {
        console.log("email change");


    }
    onChgPword() {
        console.log("password change");

    }
    onEdit() {
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.namePenal.active = true;
        //this.blurNode.active= true;
        this.nameEdit.string = this.userName.string;
        this.namePenal.getChildByName("closebtn").active = true;
        this.namePenal.getChildByName("upperbg").getChildByName("bckbtn").active = true;

    }
    javaCallback(msg) {

        this.scheduleOnce(this.updateProfile, 0.50);

    } updateProfile() {
        let imagepath = jsb.fileUtils.getWritablePath();
        let totalpath = imagepath + "Groups/GroupDp.png";
        var _this = this;
        this.isPhotoUploeded = true;
        if (!jsb.fileUtils.isFileExist(totalpath)) {
            console.log("hfsidffiduifuidsfui");
            return;
        }
        var cb = function (err, res) {
            if (res instanceof cc.Texture2D) {



                var sprite = new cc.SpriteFrame(res);

                var floatXCal = _this.userPhoto.spriteFrame.getOriginalSize().width
                var floatYCal = _this.userPhoto.spriteFrame.getOriginalSize().height
                _this.userPhoto.spriteFrame = sprite

                if (floatXCal > floatYCal) {
                    var sva = _this.userPhoto.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

                    console.log(sva + "ifdjsiofjsiodjfsio");

                    _this.userPhoto.node.setScale(sva);

                } else {
                    var sva = _this.userPhoto.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                    console.log(sva + "sdhuuifduifhsuidfhui");
                    _this.userPhoto.node.setScale(sva);


                }




                floatXCal = _this.userPhoto1.spriteFrame.getOriginalSize().width
                floatYCal = _this.userPhoto1.spriteFrame.getOriginalSize().height
                _this.userPhoto1.spriteFrame = sprite
                if (floatXCal > floatYCal) {
                    var sva = _this.userPhoto1.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

                    console.log(sva + "ifdjsiofjsiodjfsio");

                    _this.userPhoto1.node.setScale(sva);

                } else {
                    var sva = _this.userPhoto1.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                    console.log(sva + "sdhuuifduifhsuidfhui");
                    _this.userPhoto1.node.setScale(sva);


                }

                _this.userPhotobtn.normalSprite = sprite
                _this.userPhotobtn.pressedSprite = sprite
                _this.userPhotobtn.hoverSprite = sprite




            } else if (res instanceof cc.SpriteFrame) {
                console.log("sdfg fg d fgfd g ...3333");
                // _this.userPhoto.spriteFrame.clear();
                _this.userPhoto.spriteFrame = res;
            }
        };
        if (totalpath.indexOf(jsb.fileUtils.getWritablePath()) >= 0) {
            console.log("sdfg fg d fgfd g ....111 " + totalpath);
            cc.loader.load({ url: totalpath, type: 'png' }, cb);
        } else {
            cc.loader.loadRes(totalpath, cc.SpriteFrame, cb);
        }
    }
    // callbaskfun(num: number) {
    //     console.log(num);
    // }

    // onDiscClick() {
    //     var nn = new game_Disc();
    //     startAnimetion(this.callbaskfun);
    // }

    onImageChange() {

        const self = this;
        let methodName = "callToOpenGallery";


        console.log("dsfjfhsdjfhsdfuifuiduifhsuidfsfishdhfffffffffffffffffffffffffffff");


        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }


    }

    //menuPenal-----------------------------------------------------------------------------------

    onPrivacy() {
        console.log("privacy click");


    }
    onAbout() {
        console.log("onAbout click");

    }

    onLiceases() {
        console.log("onLiceases click");

    }

    onM_S() {
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.namePenal.active = false;
        this.soundPenal.active = true;
    }

    onSmedia() {
        console.log("onSmedia click");


    }

    onCredits() {
        console.log("onCredits click");

    }

    onPlyBtn() {
        console.log("Hey level panel here");
        this.LevelPanel.active = true;

    }


    //commen---------------------------------------------------------
    onCrose() {

        console.log("Where am i");

        if (this.userPenal.active == true) {
            this.userPenal.active = false;
            this.gamePenal.active = true;
            //this.blurNode.active= false;


        } else if (this.menuPenal.active == true) {

            this.menuPenal.active = false;
            this.gamePenal.active = true;
            //this.blurNode.active= false;

        } else if (this.soundPenal.active == true) {
            this.soundPenal.active = false;
            //this.blurNode.active= true;
            this.menuPenal.active = true;
        } else if (this.namePenal.active == true) {
            this.namePenal.active = false;
            //this.blurNode.active= true;
            this.userPenal.active = true;
        } else if (this.LoadingPanel.active == true) {
            console.log("homescene TS file btm")
            this.LoadingPanel.active = false;
            this.LevelPanel.active = true;
        } else if (this.LevelPanel.active == true) {

            this.LevelPanel.active = false;
            this.gamePenal.active = true;
            //this.blurNode.active= false;

        }

    }

}
