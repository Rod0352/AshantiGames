import clickOnOkBtnTs from "./clickOnOkBtnTs";
import LodingLayer from "./LodingLayer";

const { ccclass, property } = cc._decorator;
let funcToCall = null;
let guestCallChange = null;
cc["TestImageData"] = function (msg: string) {
    console.log("Image test data" + msg);
    funcToCall(msg);
};
cc["guestUpdateCallBack"] = function (socialString: string) {
    console.log("social string update" + socialString);
    guestCallChange(socialString);
};
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
   @property(cc.Node)
    LevelPanel: cc.Node = null;
    @property(cc.Node)
    emailChangePenal: cc.Node = null;

    @property(cc.Node)
    passwordChangePenal: cc.Node = null;
    
 




    @property(cc.Sprite)
    choosePhotoProfileImage: cc.Sprite = null;

    @property(cc.Sprite)
    profilePanelProfileImage: cc.Sprite = null;

    @property(cc.Button)
    homeScreenProfilebtn: cc.Button = null;





    @property(cc.SpriteFrame)
    radioSpt: cc.SpriteFrame[] = [];

    @property(cc.Button)
    radiobtn: cc.Button[] = [];

    @property(cc.EditBox)
    nameEdit: cc.EditBox = null;

    @property(cc.Label)
    userName: cc.Label = null

    @property(cc.Label)
    userEmail: cc.Label = null;

    @property(cc.Label)
    changeEmail: cc.Label = null;

    @property(cc.Node)
    upperBg: cc.Node[] = [];

    @property(cc.Prefab)
    profileIconPre = null;

    @property(cc.Node)
    lowerBgHomeScreen: cc.Node = null;
    @property(cc.Sprite)
    bgHomeScreen: cc.Sprite = null;

    @property(cc.Node)
    odulam: cc.Node = null;


    @property(cc.EditBox)
    changeEmailConfirmEmail: cc.EditBox = null;
    @property(cc.EditBox)
    changeEmailEmail: cc.EditBox = null;
    @property(cc.EditBox)
    changePasswordOldPassword: cc.EditBox = null;
    @property(cc.EditBox)
    changePasswordNewPassword: cc.EditBox = null;
    @property(cc.EditBox)
    changePasswordConfirmPassword: cc.EditBox = null;


    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;

    @property(cc.Node)
    odulamObj: cc.Node = null;

    @property(cc.Sprite)
    odulamSprite: cc.Sprite = null;

    @property(cc.Sprite)
    odulamSprite2: cc.Sprite = null;
    @property(cc.Sprite)
    odulamSprite3: cc.Sprite = null;

    @property(cc.Prefab)
    errorPopUpPrefevb: cc.Prefab = null;

    @property(cc.Prefab)
    LoderPrefeb: cc.Prefab = null;
    // @property(cc.Node)
    // blurNode: cc.Node = null;

    push_noti: boolean = true;
    app_update: boolean = false;
    game_alert: boolean = true;
    isPhotoUploeded: boolean = false;
    isGuest: boolean = false;

    userDaitals: any;
    isfacebook: boolean = false;
    istwiter: boolean = false;
    isgoogle: boolean = false;

    v: cc.Vec2;
    v2: cc.Vec2;
    v3: cc.Vec2;

    fileName: string = "";
    serverSecurityKey: string = "";
    userToken: string = "";

    //--------------------------------Start---------------------------------------
    start() {

        console.log("Home panel active");

        var resultParse = cc.sys.localStorage.getItem("guest_user_data");
        var user_daitals = cc.sys.localStorage.getItem("user_daitals");
        var new_User_data = cc.sys.localStorage.getItem("new_User_data");

        if (resultParse != null) {
            var parseResult = JSON.parse(resultParse);
            this.userToken = "";
            this.isGuest = true;
            this.updateUserData(parseResult);
            this.userDaitals = parseResult;
        } else if (user_daitals != null) {
            this.isGuest = false;
            var parseResult = JSON.parse(user_daitals);
            this.updateUserData(parseResult);
            this.userToken = parseResult.user_token;
            this.userDaitals = parseResult;
        } else if (new_User_data != null) {
            this.isGuest = false;
            var parseResult = JSON.parse(new_User_data);
            this.updateUserData(parseResult);
            this.userToken = parseResult.user_token;
            this.userDaitals = parseResult;
        }
        // else if (forgot_password != null) {
        //     this.isGuest = false;
        //     var parseResult = JSON.parse(forgot_password);
        //     this.updateUserData(parseResult);
        //     this.userToken = parseResult.user_token;
        //     this.userDaitals = parseResult;
        // }

        var dataString = (typeof (this.userDaitals) == 'string') ? this.userDaitals : JSON.stringify(this.userDaitals);

        console.log("userDaitals = " + dataString);


        var FSize = cc.view.getFrameSize();
        let fScale = FSize.height / FSize.width;
        if (!(fScale >= 926 / 428)) {

            for (var i = 0; i < this.upperBg.length; i++) {

                this.upperBg[i].setPosition(0, this.upperBg[i].getPosition().y - 20);

            }

        }

        this.gamePenal.active = true;
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.LevelPanel.active = false;
        this.emailChangePenal.active = false;

        var move = cc.moveBy(0.18, cc.v2(200, 0));
        var move2 = cc.moveBy(0.18, cc.v2(-200, 0));
        var easeing = move.easing(cc.easeBackIn());
        var easeing1 = move2.easing(cc.easeBackOut());
        this.lowerBgHomeScreen.runAction(cc.sequence(easeing, easeing1));

        move = cc.moveBy(0.18, cc.v2(100, 0));
        move2 = cc.moveBy(0.18, cc.v2(-100, 0));
        easeing = move.easing(cc.easeBackIn());
        easeing1 = move2.easing(cc.easeBackOut());
        this.bgHomeScreen.node.runAction(cc.sequence(easeing, easeing1));

        // this.scrollview.node.on('scrolling', this.scrollviewHandler, this);
        var centerOdulam = this.odulamSprite.node;
        var leftOdulam = this.odulamSprite2.node;
        var rightOdulam = this.odulamSprite3.node;
        var odulamNode = this.odulamObj;


        this.v = odulamNode.getPosition();

        // this.v2 = self2.getPosition();
        // this.v3 = self3.getPosition();
        var _this = this;

        this.odulamObj.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            var x = event.touch.getLocationX();
            var y = event.touch.getLocationY();

            var pos = this.convertToNodeSpaceAR(cc.v2(x, y))
            console.log("sfdopfkopsdkf" + pos.x);



            var positionStart = event.touch.getStartLocation();
            var startPoint = this.convertToNodeSpaceAR(positionStart);
            var horizontalDistance = (pos.x - startPoint.x);

            if ((_this.v.x - Math.abs(horizontalDistance)) <= -280 || (_this.v.x + Math.abs(horizontalDistance)) >= 280) {

                return;
            }

            if (horizontalDistance <= 0) {
                odulamNode.setPosition(_this.v.x - Math.abs(horizontalDistance), odulamNode.getPosition().y);
                console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x - Math.abs(horizontalDistance)));


            } else if (horizontalDistance > 0) {
                odulamNode.setPosition(_this.v.x + Math.abs(horizontalDistance), odulamNode.getPosition().y);
                console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x + Math.abs(horizontalDistance)));

            }



            if (horizontalDistance <= 0) {

                var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

                centerOdulam.scale = Scale;

                var scaleX = 0.5 + Math.abs(Scale - 1);
                if (scaleX <= 1) {
                    rightOdulam.scale = scaleX;
                }
                leftOdulam.scale = Math.abs(0.5 - Scale);


            } else if (horizontalDistance > 0) {

                var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

                centerOdulam.scale = Scale;

                var scaleX = 0.5 + Math.abs(Scale - 1);
                if (scaleX <= 1) {
                    leftOdulam.scale = scaleX;

                }
                rightOdulam.scale = Math.abs(0.5 - Scale);
            }

        }, this.odulamSprite.node);

        this.odulamObj.on(cc.Node.EventType.TOUCH_END, function (event) {



            // var x = event.touch.getLocationX();
            // var y = event.touch.getLocationY();

            // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

            // console.log("index:" + pos.x + ", y: " + pos.y);
            centerOdulam.scale = 1;
            leftOdulam.scale = 0.5;
            rightOdulam.scale = 0.5;
            odulamNode.setPosition(0, odulamNode.getPosition().y);
            // self2.setPosition(_this.v2);
            // self3.setPosition(_this.v3);


            console.log("indexcancil end");

            // if (pos.x < 0) {

            //     console.log("left");
            //     // -261.584

            // } else if (pos.x > 0) {

            //     console.log("right");
            //     // 246.86

            // }


        }, this.odulamSprite.node);

        this.odulamObj.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {



            // var x = event.touch.getLocationX();
            // var y = event.touch.getLocationY();

            // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

            console.log("indexcancil");

            // self.setPosition(_this.v);
            // self2.setPosition(_this.v2);
            // self3.setPosition(_this.v3);
            centerOdulam.scale = 1;
            leftOdulam.scale = 0.5;
            rightOdulam.scale = 0.5;
            odulamNode.setPosition(0, odulamNode.getPosition().y);



            // if (pos.x < 0) {

            //     console.log("left");
            //     // -261.584

            // } else if (pos.x > 0) {

            //     console.log("right");
            //     // 246.86

            // }


        }, this.odulamSprite.node);

    }
    convertGuestIntoUser(msg) {
        var self = this;
        var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
        LoderPrefeb.setPosition(0, 0);
        this.node.addChild(LoderPrefeb);
        var user_datas = cc.sys.localStorage.getItem("user_daitals");
        var parseResult = JSON.parse(user_datas);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var strData = "class_name=Accounts\\User&purpose=updateUserProfile&user_token=" + parseResult.user_token + "&name=" + parseResult.name;
        xhr.send(strData);
        cc.log("Networking away hfng emaildfsd " + strData);
        xhr.onreadystatechange = function () {
            LoderPrefeb.getComponent(LodingLayer).ondestroy();
            cc.log("Networking away hfng email " + xhr.responseText);
            if (xhr.readyState == 4) {
                var response = xhr.responseText;
                var parseResponse = JSON.parse(response);
                console.log("sdfopkpfkopdkopfs  == " + parseResponse);

                if ((xhr.status >= 200 && xhr.status <= 207)) {
                    var httpStatus = xhr.statusText;
                    cc.log(httpStatus);
                    var parseResult = parseResponse.result;
                    var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                    cc.sys.localStorage.setItem("user_daitals", dataString);
                    cc.sys.localStorage.removeItem("new_User_data");
                    cc.sys.localStorage.removeItem("guest_user_data");
                    cc.sys.localStorage.removeItem("forgot_password");
                    cc.director.loadScene("GameScreen");
                } else {
                    var responseError = parseResponse.response;
                    var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                    errorPrefeb.setPosition(0, 0);
                    errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = responseError.title;
                    errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = responseError.message
                    self.node.addChild(errorPrefeb);

                }
            }
        }
    }

    updateUserData(parseResult) {

        // user_token": "X0C0K080Q00UA21M9H09",
        // "user_referral_id": "978-1083-5535",
        // "fb_id": "",
        // "tw_id": "",
        // "gp_id": "abcd00@gmail.com",
        // "device_id": "",
        // "device_token": "",
        // "name": "",
        // "email_id": "",
        // "profile_image": "",
        // "started_playing": "09/06/2022",
        // "score": "0",
        // "last_active": "2022-06-09 11:44:40",
        // "last_active_text": "just now",
        // "last_active_date": "2022-06-09",
        // "last_active_time_diff": "0"

        if (parseResult.name != "") {
            this.userName.string = parseResult.name.slice(0, 20);
            console.log("name = " + parseResult.name.slice(0, 10));

        }

        if (parseResult.email_id != "") {
            this.userEmail.string = parseResult.email_id;
            this.changeEmail.string = parseResult.email_id;
            console.log("email = " + parseResult.email_id);
        }

        if (parseResult.profile_image != "" && !this.isGuest) {
            console.log("profile_image = " + parseResult.profile_image);
            this.downloadProfileImage(parseResult.profile_image);
        } else if (parseResult.profile_image != "" && this.isGuest) {
            this.scheduleOnce(this.updateProfile, 0.50);
        }
        if (parseResult.fb_id != "") {
            this.isfacebook = true
        }
        if (parseResult.gp_id != "") {
            this.isgoogle = true

        }
        if (parseResult.tw_id != "") {
            this.istwiter = true

        }

        this.socialBtnManage(parseResult);
    }


    socialBtnManage(msg) {

        var email = this.userPenal.getChildByName("EMAIL_CBTN");
        var password = this.userPenal.getChildByName("PWORDBTN");
        var facebook = this.userPenal.getChildByName("socialNode").getChildByName("fbbtn");
        var twiter = this.userPenal.getChildByName("socialNode").getChildByName("twetbtn");
        var google = this.userPenal.getChildByName("socialNode").getChildByName("goglebtn");

        if (this.isfacebook && this.istwiter && this.isgoogle) {
            twiter.active = false;
            facebook.active = false;
            google.active = false;
            password.getComponent(cc.Button).enabled = false;
            this.userPenal.getChildByName("Line 3").active = false;
            this.userPenal.getChildByName("Line 3 copy").active = false;
            this.userPenal.getChildByName("label").active = false;

        } else if (this.isgoogle && this.isfacebook) {
            facebook.active = false;
            google.active = false;
            password.getComponent(cc.Button).enabled = false;
            // facebook.setPosition(-44, google.getPosition().y)
            twiter.setPosition(0, twiter.getPosition().y)

        } else if (this.isgoogle && this.istwiter) {
            twiter.active = false;
            google.active = false;
            password.getComponent(cc.Button).enabled = false;
            // facebook.setPosition(-44, google.getPosition().y)
            facebook.setPosition(0, twiter.getPosition().y)

        } else if (this.isfacebook && this.istwiter) {

            twiter.active = false;
            facebook.active = false;
            password.getComponent(cc.Button).enabled = false;
            // facebook.setPosition(-44, google.getPosition().y)
            google.setPosition(0, twiter.getPosition().y)

        } else if (this.isfacebook) {

            facebook.active = false;
            password.getComponent(cc.Button).enabled = false;
            twiter.setPosition(-44, twiter.getPosition().y)
            google.setPosition(31, google.getPosition().y)


        } else if (this.istwiter) {

            twiter.active = false;
            password.getComponent(cc.Button).enabled = false;
            twiter.setPosition(-44, twiter.getPosition().y)
            google.setPosition(31, google.getPosition().y)

        } else if (this.isgoogle) {

            google.active = false;
            password.getComponent(cc.Button).enabled = false;
            facebook.setPosition(-44, google.getPosition().y)
            twiter.setPosition(31, twiter.getPosition().y)

        }

        if (msg.email_id == "") {
            var lab = email.getChildByName("label");
            lab.getComponent(cc.Label).string = "ADD YOUR EMAIL"
        }
    }

    scrollviewHandler(scrollview) {

        var scrollviewNode = [];

        scrollviewNode[0] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("1");
        scrollviewNode[1] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("2");
        scrollviewNode[2] = scrollview.node.getChildByName("view").getChildByName("content").getChildByName("3");

        console.log("Current Target = " + scrollviewNode);


    }

    // callback(pageView) {
    //     // The parameter of the callback is the pageView component.
    //     // do whatever you want with pageView
    //     console.log("page turn");
    //     var currentpage = pageView.getCurrentPageIndex();

    //     // console.log("current PageView Index = " + currentpage + "   pos =  " + pageView.getPages().at(currentpage).getPosition().x);
    //     // console.log("current PageView Index convertToNodeSpaceAR = " + this.node.convertToNodeSpaceAR(cc.v2(pageView.getPages().at(currentpage).getPosition())));

    //     // if (pageView.getPages().at(currentpage).getPosition().x > pageView.getPages().at(currentpage).getPosition().x+1){

    //     // }
    //     // console.log("pageView index = " + currentpage + "   pos = " + pageView.getPages().at(currentpage).getParent().convertToWorldSpaceAR(pageView.getPages().at(currentpage).position));

    //     // var contect = pageView.getChildByName("view").getChildByName("content");



    //     for (var i = 0; i < pageView.getPages().length; i++) {
    //         var pos = pageView.getPages().at(i).getParent().convertToNodeSpaceAR(pageView.getPages().at(i).position);

    //         console.log("pageView index = " + currentpage + "   pos = i " + i + " -- " + pageView.getPages().at(i).getParent().getParent().getParent().getParent().convertToWorldSpaceAR(pos));

    //     }

    //     // pageView.setCurrentPageIndex(10);
    //     // pageView.getPages().at(10).setScale(1);

    // }
    // pageCallback(type, customEventData) {
    //     console.log("test");
    // }
    onLoad(): void {

        funcToCall = this.javaCallback.bind(this);
        guestCallChange = this.convertGuestIntoUser.bind(this);
    }

    //home manu fuction-----------------------------------------------------------
    onUserProfile() {
        this.userPenal.active = true;
        this.menuPenal.active = false;
    }
    onNameChange() {

        var name = this.nameEdit.string;
        var self = this;

        if (name == "") {
            return;
        } else if (name == self.userName.string || this.userToken == "") {

            this.userDaitals.name = name;

            if (this.userToken == "") {
                var dataString = (typeof (this.userDaitals) == 'string') ? this.userDaitals : JSON.stringify(this.userDaitals);
                cc.sys.localStorage.removeItem("guest_user_data");
                cc.sys.localStorage.setItem("guest_user_data", dataString);
            }

            self.userName.string = name.slice(0, 20);
            self.gamePenal.active = false;
            self.userPenal.active = true;
            self.menuPenal.active = false;
            self.LevelPanel.active = false;
            self.namePenal.active = false;

        } else {
            // class_name: Accounts\User
            // purpose: updateUserProfile
            // user_token: V7NH5DU1CW092R3BP6GF
            // name: abhi

            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            this.node.addChild(LoderPrefeb);

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\User&purpose=updateUserProfile&user_token=" + this.userToken + "&name=" + name;
            xhr.send(strData);

            cc.log("Networking away hfng emaildfsd " + strData);

            xhr.onreadystatechange = function () {

                LoderPrefeb.getComponent(LodingLayer).ondestroy();

                cc.log("Networking away hfng email " + xhr.responseText);
                if (xhr.readyState == 4) {

                    var response = xhr.responseText;
                    var parseResponse = JSON.parse(response);
                    console.log("sdfopkpfkopdkopfs  == " + parseResponse);

                    if ((xhr.status >= 200 && xhr.status <= 207)) {
                        var httpStatus = xhr.statusText;
                        cc.log(httpStatus);

                        var parseResult = parseResponse.result;
                        var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                        cc.sys.localStorage.setItem("user_daitals", dataString);
                        cc.sys.localStorage.removeItem("new_User_data");
                        cc.sys.localStorage.removeItem("guest_user_data");
                        cc.sys.localStorage.removeItem("forgot_password");


                        self.userName.string = name.slice(0, 20);
                        self.gamePenal.active = false;
                        self.userPenal.active = true;
                        self.menuPenal.active = false;
                        self.LevelPanel.active = false;
                        self.namePenal.active = false;

                    } else {

                        var responseError = parseResponse.response;
                        var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                        errorPrefeb.setPosition(0, 0);
                        errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = responseError.title;
                        errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = responseError.message
                        self.node.addChild(errorPrefeb);

                    }
                }
            }



        }
    }
    onMenu() {

        this.userPenal.active = false;
        this.menuPenal.active = true;
    }
    onPlay() {
        console.log("play ludoo game");
        // this.LoadingPanel.active = true;
        cc.director.loadScene("gameScene");
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

        if (this.isGuest) {
            return
        }

        console.log("email change");
        this.gamePenal.active = false;
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.LevelPanel.active = false;
        this.emailChangePenal.active = true;
        this.changeEmailEmail.string = "";
        this.changeEmailConfirmEmail.string = "";

    }
    onChgPword() {

        if (this.isGuest) {
            return
        }
        console.log("password change");
        this.gamePenal.active = false;
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.LevelPanel.active = false;
        this.passwordChangePenal.active = true;
        this.changePasswordOldPassword.string = "";
        this.changePasswordNewPassword.string = "";
        this.changePasswordConfirmPassword.string = "";

    }

    changePasswordAndEmail(event, customEventData) {

        var self = this;
        if (customEventData == 1) {
            //change password
            if ((this.changePasswordNewPassword.string != this.changePasswordConfirmPassword.string)) {

                var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                errorPrefeb.setPosition(0, 0);
                errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
                errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "Enter Same Password.";
                self.node.addChild(errorPrefeb);

            } else if ((this.changePasswordOldPassword.string != ""
                && this.changePasswordNewPassword.string != ""
                && this.changePasswordConfirmPassword.string != "")) {

                var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
                LoderPrefeb.setPosition(0, 0);
                this.node.addChild(LoderPrefeb);

                var xhr = cc.loader.getXMLHttpRequest();
                xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var strData = "class_name=Accounts\\User&purpose=updatePassword&user_token=" + this.userToken + "&old_password=" + this.changePasswordOldPassword.string + "&new_password=" + this.changePasswordNewPassword.string;
                xhr.send(strData);
                cc.log("Networking away hfng emaildfsd " + strData);

                xhr.onreadystatechange = function () {

                    LoderPrefeb.getComponent(LodingLayer).ondestroy();


                    cc.log("Networking away hfng email " + xhr.responseText);
                    if (xhr.readyState == 4) {

                        var response = xhr.responseText;
                        var parseResponse = JSON.parse(response);
                        console.log("sdfopkpfkopdkopfs  == " + parseResponse);

                        if ((parseResponse.statusCode >= 200 && parseResponse.statusCode <= 207)) {
                            var httpStatus = xhr.statusText;
                            cc.log(httpStatus);

                            self.gamePenal.active = false;
                            self.userPenal.active = true;
                            self.menuPenal.active = false;
                            self.LevelPanel.active = false;
                            self.passwordChangePenal.active = false;

                        } else {


                            var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                            errorPrefeb.setPosition(0, 0);
                            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = parseResponse.messageTitle;
                            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = parseResponse.message
                            self.node.addChild(errorPrefeb);

                        }
                    }
                }


            }
        } else if (customEventData == 2) {

            if ((this.changeEmailEmail.string != this.changeEmailConfirmEmail.string)) {
                var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                errorPrefeb.setPosition(0, 0);
                errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
                errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "Enter Same Email.";
                self.node.addChild(errorPrefeb);

            } else if ((this.changeEmailEmail.string != ""
                && this.changeEmailConfirmEmail.string != "")
                && (this.ValidateEmail(this.changeEmailEmail.string))) {

                var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
                LoderPrefeb.setPosition(0, 0);
                this.node.addChild(LoderPrefeb);

                //Email change 

                var xhr = cc.loader.getXMLHttpRequest();
                xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var strData = "class_name=Accounts\\User&purpose=updateEmail&user_token=" + this.userToken + "&new_email=" + this.changeEmailConfirmEmail.string;
                xhr.send(strData);
                cc.log("Networking away hfng emaildfsd " + strData);

                xhr.onreadystatechange = function () {
                    cc.log("Networking away hfng email " + xhr.responseText);
                    LoderPrefeb.getComponent(LodingLayer).ondestroy();
                    if (xhr.readyState == 4) {

                        if ((xhr.status >= 200 && xhr.status <= 207)) {

                            var httpStatus = xhr.statusText;
                            cc.log(httpStatus);
                            var response = xhr.responseText
                            var parseResponse = JSON.parse(response);
                            console.log("EmailChange");
                            self.gamePenal.active = false;
                            self.userPenal.active = true;
                            self.menuPenal.active = false;
                            self.LevelPanel.active = false;
                            self.emailChangePenal.active = false;

                            self.userEmail.string = self.changeEmailConfirmEmail.string;
                            self.changeEmail.string = self.changeEmailConfirmEmail.string;


                        } else {

                            var response = xhr.responseText;
                            var parseResponse = JSON.parse(response);
                            var responseError = parseResponse.response;
                            var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                            errorPrefeb.setPosition(0, 0);
                            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = responseError.title;
                            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = responseError.message
                            self.node.addChild(errorPrefeb);

                        }
                    }
                }


            } else {

                var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                errorPrefeb.setPosition(0, 0);
                errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
                errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "All field required.";
                self.node.addChild(errorPrefeb);

            }
        }


    }
    ValidateEmail(mail) {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        return regex.test(mail);
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
        console.log("cal toget i,age .... " + msg);

        this.fileName = msg;
        cc.sys.localStorage.setItem("UserPhoto", msg);
        var self = this;
        this.scheduleOnce(this.updateProfile, 0.50);
        if (!this.isGuest) {

            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            this.node.addChild(LoderPrefeb);

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\User&purpose=updateUserProfile&user_token=" + this.userToken + "&name=" + this.nameEdit.string;
            xhr.send(strData);

            cc.log("Networking away hfng emaildfsd " + strData);

            xhr.onreadystatechange = function () {
                LoderPrefeb.getComponent(LodingLayer).ondestroy();
                cc.log("Networking away hfng email " + xhr.responseText);
                if (xhr.readyState == 4) {
                    var response = xhr.responseText;
                    var parseResponse = JSON.parse(response);
                    console.log("sdfopkpfkopdkopfs  == " + parseResponse);
                    if ((xhr.status >= 200 && xhr.status <= 207)) {
                        var httpStatus = xhr.statusText;
                        cc.log(httpStatus);
                        var parseResult = parseResponse.result;
                        var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                        cc.sys.localStorage.setItem("user_daitals", dataString);
                        cc.sys.localStorage.removeItem("new_User_data");
                        cc.sys.localStorage.removeItem("guest_user_data");
                        cc.sys.localStorage.removeItem("forgot_password");
                    } else {
                        var responseError = parseResponse.response;
                        var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                        errorPrefeb.setPosition(0, 0);
                        errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = responseError.title;
                        errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = responseError.message
                        self.node.addChild(errorPrefeb);

                    }
                }
            }



        }
    }
    downloadProfileImage(imageUrl) {
        var _this = this;
        cc.loader.load(imageUrl, (err, tex) => {

            // this.picSprite.spriteFrame = new cc.SpriteFrame(tex);
            var sprite = new cc.SpriteFrame(tex);
            var floatXCal = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().width;
            var floatYCal = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().height;

            var node = new cc.Node();
            let spriteComponent = node.addComponent(cc.Sprite);
            spriteComponent.spriteFrame = new cc.SpriteFrame(tex);
            _this.choosePhotoProfileImage.node.removeAllChildren(true);

            console.log("child count ----  " + _this.choosePhotoProfileImage.node.childrenCount);

            _this.choosePhotoProfileImage.node.addChild(node, _this.choosePhotoProfileImage.node.childrenCount + 2, "node");
            if (floatXCal > floatYCal) {
                var sva = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().height / spriteComponent.spriteFrame.getOriginalSize().height;

                console.log(sva + "ifdjsiofjsiodjfsio");

                _this.choosePhotoProfileImage.node.setScale(sva);

            } else {
                var sva = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().width / spriteComponent.spriteFrame.getOriginalSize().width
                console.log(sva + "sdhuuifduifhsuidfhui");
                _this.choosePhotoProfileImage.node.setScale(sva);


            }
            floatXCal = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().width
            floatYCal = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().height
            _this.profilePanelProfileImage.spriteFrame = sprite
            if (floatXCal > floatYCal) {
                var sva = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

                console.log(sva + "ifdjsiofjsiodjfsio");

                _this.profilePanelProfileImage.node.setScale(sva);

            } else {
                var sva = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                console.log(sva + "sdhuuifduifhsuidfhui");
                _this.profilePanelProfileImage.node.setScale(sva);


            }

            _this.homeScreenProfilebtn.normalSprite = sprite
            _this.homeScreenProfilebtn.pressedSprite = sprite
            _this.homeScreenProfilebtn.hoverSprite = sprite

        });
    }
    updateProfile(dt) {

        var path = cc.sys.localStorage.getItem("UserPhoto");
        if (path == null) {
            return
        } else {
            this.fileName = path;
        }
        let imagepath = jsb.fileUtils.getWritablePath();
        let totalpath = imagepath + "Groups/" + this.fileName + ".png";
        console.log("file Name---- " + this.fileName);
        console.log("file Name " + totalpath);

        if (this.isGuest) {

            this.userDaitals.profile_image = totalpath;
            var dataString = (typeof (this.userDaitals) == 'string') ? this.userDaitals : JSON.stringify(this.userDaitals);
            cc.sys.localStorage.setItem("guest_user_data", dataString);
            cc.sys.localStorage.removeItem("new_User_data");
            cc.sys.localStorage.removeItem("user_daitals");

        }
        var _this = this;
        this.isPhotoUploeded = true;
        if (!jsb.fileUtils.isFileExist(totalpath)) {
            console.log("hfsidffiduifuidsfui");
            return;
        }
        var cb = function (err, res) {
            if (res instanceof cc.Texture2D) {
                var sprite = new cc.SpriteFrame(res);
                var floatXCal = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().width;
                var floatYCal = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().height;

                // var node = new cc.Node();
                // let spriteComponent = node.addComponent(cc.Sprite);
                // spriteComponent.spriteFrame = new cc.SpriteFrame(res);
                // _this.choosePhotoProfileImage.node.removeAllChildren(true);

                // console.log("child count ----  " + _this.choosePhotoProfileImage.node.childrenCount);

                // _this.choosePhotoProfileImage.node.addChild(node, _this.choosePhotoProfileImage.node.childrenCount + 2, "node");
                _this.choosePhotoProfileImage.spriteFrame=sprite;
                if (floatXCal > floatYCal) {
                    var sva = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height;

                    console.log(sva + "ifdjsiofjsiodjfsio");

                    _this.choosePhotoProfileImage.node.setScale(sva);

                } else {
                    var sva = _this.choosePhotoProfileImage.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                    console.log(sva + "sdhuuifduifhsuidfhui");
                    _this.choosePhotoProfileImage.node.setScale(sva);
                }
                floatXCal = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().width
                floatYCal = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().height
                _this.profilePanelProfileImage.spriteFrame = sprite
                if (floatXCal > floatYCal) {
                    var sva = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().height / sprite.getOriginalSize().height

                    console.log(sva + "ifdjsiofjsiodjfsio");

                    _this.profilePanelProfileImage.node.setScale(sva);

                } else {
                    var sva = _this.profilePanelProfileImage.spriteFrame.getOriginalSize().width / sprite.getOriginalSize().width
                    console.log(sva + "sdhuuifduifhsuidfhui");
                    _this.profilePanelProfileImage.node.setScale(sva);


                }

                _this.homeScreenProfilebtn.normalSprite = sprite
                _this.homeScreenProfilebtn.pressedSprite = sprite
                _this.homeScreenProfilebtn.hoverSprite = sprite




            }
            //  else if (res instanceof cc.SpriteFrame) {
            //     console.log("sdfg fg d fgfd g ...3333");
            //     // _this.choosePhotoProfileImage.spriteFrame.clear();
            //     _this.choosePhotoProfileImage.spriteFrame = res;
            // }
        };

        if (totalpath.indexOf(jsb.fileUtils.getWritablePath()) >= 0) {
            console.log("sdfg fg d fgfd g ....111 " + totalpath);
            cc.loader.load({ url: totalpath, type: 'png' }, cb);
        } else {
            cc.loader.loadRes(totalpath, cc.SpriteFrame, cb);
        }
    }

    onImageChange() {

        const self = this;
        let methodName = "callToOpenGallery";

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "(Ljava/lang/String;Z)V", this.userToken, this.isGuest);
            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBrowser", "(Ljava/lang/String;)V", banner.ClickUrl);
            // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "keepScreenOn", "(Z)V", keepOn);

        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("NativeEvent", "callToPickGalleryImage", this.userToken, this.isGuest);


        }


    }

    //menuPanel-----------------------------------------------------------------------------------

    onPrivacy() {
        console.log("privacy click");
        cc.sys.openURL("https://pages.flycricket.io/ashanti-mobile/privacy.html");

    }
    onAbout(event,customeInput) {
        console.log("onAbout click");
        if(customeInput==1){
            this.node.getChildByName("AboutPage").active=true;
        }else if(customeInput==2){
            this.node.getChildByName("AboutPage").active=false;
        }

    }

    onLiceases(event,customeInput) {
        console.log("onLiceases click");
        if(customeInput==1){
            this.node.getChildByName("Creditis&LisencesPage").active=true;
        }else if(customeInput==2){
            this.node.getChildByName("Creditis&LisencesPage").active=false;
        }
    }

    onM_S() {
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.namePenal.active = false;
        this.soundPenal.active = true;
    }

    onSmedia(event,customeInput) {

        if(customeInput==1){

            this.node.getChildByName("SocialMedia").active=true;

        }else if(customeInput==2){

            this.node.getChildByName("SocialMedia").active=false;

        }else if(customeInput==3){
            cc.sys.openURL("https://m.facebook.com/alkebulangaming");


        }else if(customeInput==4){

            cc.sys.openURL("https://www.instagram.com/alkebulan_gaming/");


        }else  if(customeInput==5){
            cc.sys.openURL("https://twitter.com/AlkebulanGaming?s=20");

        }
        


    }

    onTrems() {
        console.log("onCredits click");
        cc.sys.openURL("https://pages.flycricket.io/ashanti-mobile/terms.html");
    }

    onPlyBtn() {
        console.log("game type selection btn clicked")
        this.LevelPanel.active = true;

    }
    levelSelect(LevelPanel){
        console.log("level panel active");

      

       

        var FSize = cc.view.getFrameSize();
        let fScale = FSize.height / FSize.width;
        if (!(fScale >= 926 / 428)) {

            for (var i = 0; i < this.upperBg.length; i++) {

                this.upperBg[i].setPosition(0, this.upperBg[i].getPosition().y - 20);

            }

        }

        this.gamePenal.active = false;
        this.userPenal.active = false;
        this.menuPenal.active = false;
        this.LevelPanel.active = true;
        this.emailChangePenal.active = false;

        var move = cc.moveBy(0.18, cc.v2(200, 0));
        var move2 = cc.moveBy(0.18, cc.v2(-200, 0));
        var easeing = move.easing(cc.easeBackIn());
        var easeing1 = move2.easing(cc.easeBackOut());
        this.lowerBgHomeScreen.runAction(cc.sequence(easeing, easeing1));

        move = cc.moveBy(0.18, cc.v2(100, 0));
        move2 = cc.moveBy(0.18, cc.v2(-100, 0));
        easeing = move.easing(cc.easeBackIn());
        easeing1 = move2.easing(cc.easeBackOut());
        this.bgHomeScreen.node.runAction(cc.sequence(easeing, easeing1));

        this.scrollview.node.on('scrolling', this.scrollviewHandler, this);
        var centerOdulam = this.odulamSprite.node;
        var leftOdulam = this.odulamSprite2.node;
        var rightOdulam = this.odulamSprite3.node;
        var odulamNode = this.odulamObj;


        this.v = odulamNode.getPosition();

        // this.v2 = self2.getPosition();
        // this.v3 = self3.getPosition();
        var _this = this;

        this.odulamObj.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            var x = event.touch.getLocationX();
            var y = event.touch.getLocationY();

            var pos = this.convertToNodeSpaceAR(cc.v2(x, y))
            console.log("sfdopfkopsdkf" + pos.x);



            var positionStart = event.touch.getStartLocation();
            var startPoint = this.convertToNodeSpaceAR(positionStart);
            var horizontalDistance = (pos.x - startPoint.x);

            if ((_this.v.x - Math.abs(horizontalDistance)) <= -280 || (_this.v.x + Math.abs(horizontalDistance)) >= 280) {

                return;
            }

            if (horizontalDistance <= 0) {
                odulamNode.setPosition(_this.v.x - Math.abs(horizontalDistance), odulamNode.getPosition().y);
                console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x - Math.abs(horizontalDistance)));


            } else if (horizontalDistance > 0) {
                odulamNode.setPosition(_this.v.x + Math.abs(horizontalDistance), odulamNode.getPosition().y);
                console.log("_this.v.x - Math.abs(horizontalDistance)" + (_this.v.x + Math.abs(horizontalDistance)));

            }



            if (horizontalDistance <= 0) {

                var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

                centerOdulam.scale = Scale;

                var scaleX = 0.5 + Math.abs(Scale - 1);
                if (scaleX <= 1) {
                    rightOdulam.scale = scaleX;
                }
                leftOdulam.scale = Math.abs(0.5 - Scale);


            } else if (horizontalDistance > 0) {

                var Scale = Math.abs(213 / (213 + Math.abs((horizontalDistance))));

                centerOdulam.scale = Scale;

                var scaleX = 0.5 + Math.abs(Scale - 1);
                if (scaleX <= 1) {
                    leftOdulam.scale = scaleX;

                }
                rightOdulam.scale = Math.abs(0.5 - Scale);
            }

        }, this.odulamSprite.node);

        this.odulamObj.on(cc.Node.EventType.TOUCH_END, function (event) {



            // var x = event.touch.getLocationX();
            // var y = event.touch.getLocationY();

            // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

            // console.log("index:" + pos.x + ", y: " + pos.y);
            centerOdulam.scale = 1;
            leftOdulam.scale = 0.5;
            rightOdulam.scale = 0.5;
            odulamNode.setPosition(0, odulamNode.getPosition().y);
            // self2.setPosition(_this.v2);
            // self3.setPosition(_this.v3);


            console.log("indexcancil end");

            // if (pos.x < 0) {

            //     console.log("left");
            //     // -261.584

            // } else if (pos.x > 0) {

            //     console.log("right");
            //     // 246.86

            // }


        }, this.odulamSprite.node);

        this.odulamObj.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {



            // var x = event.touch.getLocationX();
            // var y = event.touch.getLocationY();

            // var pos = this.convertToNodeSpaceAR(cc.v2(x, y))

            console.log("indexcancil");

            // self.setPosition(_this.v);
            // self2.setPosition(_this.v2);
            // self3.setPosition(_this.v3);
            centerOdulam.scale = 1;
            leftOdulam.scale = 0.5;
            rightOdulam.scale = 0.5;
            odulamNode.setPosition(0, odulamNode.getPosition().y);



            // if (pos.x < 0) {

            //     console.log("left");
            //     // -261.584

            // } else if (pos.x > 0) {

            //     console.log("right");
            //     // 246.86

            // }


        }, this.odulamSprite.node);
    }
    //commen---------------------------------------------------------
    onCrose() {

        console.log("back to game choice btn clicked");

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
        } else if (this.LevelPanel.active == true) {
            console.log("Game choice panel active")

            this.LevelPanel.active = false;
            this.gamePenal.active = true;
            //this.blurNode.active= false;

        } else if (this.emailChangePenal.active == true) {

            this.gamePenal.active = false;
            this.userPenal.active = true;
            this.menuPenal.active = false;
            this.LevelPanel.active = false;
            this.emailChangePenal.active = false;

        } else if (this.passwordChangePenal.active == true) {

            this.gamePenal.active = false;
            this.userPenal.active = true;
            this.menuPenal.active = false;
            this.LevelPanel.active = false;
            this.passwordChangePenal.active = false;


        }

    }

    //social media login ----------------------------------------------

    onFacebookLogin() {

        console.log("facebook login");
        const self = this;
        let methodName = "callFacebookLogin";

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("NativeEvent", "callFacebookLogin", "");


        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }

    }
    onTweeterLogin() {

        console.log(" Tweet login ");
        const self = this;
        let methodName = "callTwiterLogin";

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("NativeEvent", methodName, "");


        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }


    }
    onGoogleLogin() {

        console.log("dsfjfhsdjfhsdfuifuiduifhsuidfsfishdhfffffffffffffffffffffffffffff");

        const self = this;
        let methodName = "callGoogleLogin";

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("NativeEvent", methodName, "");


        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }


    }


}
