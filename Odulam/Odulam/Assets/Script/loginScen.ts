import clickOnOkBtnTs from "./clickOnOkBtnTs";
import LodingLayer from "./LodingLayer";

const { ccclass, property } = cc._decorator;
let type: number = 0;

// let onGoogleLoginfun = null;
cc["onLoginBy"] = function (msg: boolean) {

    // onGoogleLoginfun(msg);
};

@ccclass
export default class NewClass extends cc.Component {

    //---------------Otp/forgot password ------------------

    @property(cc.Node)
    signUpOption: cc.Node = null;

    @property(cc.Node)
    otpAndEmailPanel: cc.Node = null;

    @property(cc.Node)
    emailLoginPanel: cc.Node = null;

    @property(cc.Node)
    emailSingnUpPanel: cc.Node = null;

    @property(cc.Node)
    otpEnterPanel: cc.Node = null;

    @property(cc.Node)
    resetPasswordPanel: cc.Node = null;

    @property(cc.EditBox)
    LoginPanelEmail: cc.EditBox = null;

    @property(cc.EditBox)
    LoginPanelPassword: cc.EditBox = null;

    @property(cc.EditBox)
    signUpEmail: cc.EditBox = null;

    @property(cc.EditBox)
    signUpPassword: cc.EditBox = null;

    @property(cc.EditBox)
    confirmEmail: cc.EditBox = null;

    @property(cc.EditBox)
    ForgotPasswordEmail: cc.EditBox = null;

    @property(cc.EditBox)
    otpEditBox: cc.EditBox = null;
    @property(cc.EditBox)
    changePasswordNewPassword: cc.EditBox = null;
    @property(cc.EditBox)
    changePasswordConfirmPassword: cc.EditBox = null;

    @property(cc.Prefab)
    errorPopUpPrefevb: cc.Prefab = null;

    @property(cc.Prefab)
    LoderPrefeb: cc.Prefab = null;

    serverOtp: string = "";
    serverSecurityKey: string = "";

    start(): void {

        this.signUpOption.active = true;
        this.otpAndEmailPanel.active = false;
        this.emailLoginPanel.active = false;
        this.emailSingnUpPanel.active = false;
        this.otpEnterPanel.active = false;
        this.resetPasswordPanel.active = false;

    }
    onLoad(): void {
        //  onGoogleLoginfun = this.javaCallback.bind(this);
    }
    javaCallback(msg) {

        console.log("pdkfsodfosdkosfsokf+" + msg);
        cc.director.loadScene("GameScreen");

    }

    LoginPanelOptions(event, customEventData) {

        if (customEventData == 1) {
            this.signUpOption.active = false;
            this.otpAndEmailPanel.active = false;
            this.emailLoginPanel.active = true;
            this.emailSingnUpPanel.active = false;
        } else if (customEventData == 2) {
            this.signUpOption.active = false;
            this.otpAndEmailPanel.active = false;
            this.emailLoginPanel.active = false;
            this.emailSingnUpPanel.active = true;

        } else if (customEventData == 3) {
            cc.sys.openURL("https://www.google.com/");
        } else if (customEventData == 4) {
            this.signUpOption.active = false;
            this.otpAndEmailPanel.active = true;
            this.emailLoginPanel.active = false;
            this.emailSingnUpPanel.active = false;
        }
    }

    LoginWithEmail() {


        var email = this.LoginPanelEmail.string;
        if (this.LoginPanelEmail.string == "" || this.LoginPanelPassword.string == "") {
            console.log("enter password and email enter");
            var errorPrefeb = cc.instantiate(this.errorPopUpPrefevb);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
            this.node.addChild(errorPrefeb);

        } else if (this.ValidateEmail(email)) {

            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            // LoderPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
            // LoderPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
            this.node.addChild(LoderPrefeb);
            // self.LoderPrefeb.getComponent(LodingLayer).ondestroy();
            var xhr = cc.loader.getXMLHttpRequest();
            var self = this;
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\Auth&purpose=login&email_id=" + this.LoginPanelEmail.string + "&password=" + this.LoginPanelPassword.string;
            xhr.send(strData);
            xhr.onreadystatechange = function () {

                LoderPrefeb.getComponent(LodingLayer).ondestroy();

                console.log("Networking away hfng email " + xhr.responseText);
                if (xhr.readyState == 4) {
                    var response = xhr.responseText;
                    var parseResponse = JSON.parse(response);


                    console.log("ksfjdiopf===  " + parseResponse.statusCode);
                    if ((parseResponse.statusCode >= 200 && parseResponse.statusCode <= 207)) {


                        var parseResult = parseResponse.result;
                        var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                        cc.log("sadgafdfhsvdh " + dataString);
                        cc.sys.localStorage.setItem("user_daitals", dataString);
                        cc.sys.localStorage.removeItem("new_User_data");
                        cc.sys.localStorage.removeItem("guest_user_data");
                        cc.sys.localStorage.removeItem("forgot_password");
                        cc.log("sadgafdfhsvdh..... " + cc.sys.localStorage.getItem("user_daitals"));
                        cc.log("sadgafdfhsvdh..... " + dataString);
                        // cc.director.loadScene("GameScreen");
                        console.log("email is sdsdsdsd");
                        cc.director.loadScene("GameScreen");

                    } else if (parseResponse.statusCode == 400) {

                        var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
                        errorPrefeb.setPosition(0, 0);
                        errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = parseResponse.messageTitle;
                        errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = parseResponse.message;
                        self.node.addChild(errorPrefeb);

                    }
                }
            }
        }
    }
    SignUpWithEmail() {


        var self = this;
        var email = this.signUpEmail.string;
        if (this.signUpEmail.string == "" || this.signUpPassword.string == "" || this.confirmEmail.string == "") {

            var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "All field required.";
            self.node.addChild(errorPrefeb);

        } else if (this.confirmEmail.string != this.signUpPassword.string) {
            var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "Enter Same Password.";
            self.node.addChild(errorPrefeb);

        } else if (this.ValidateEmail(email)) {

            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            // LoderPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
            // LoderPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
            this.node.addChild(LoderPrefeb);
            // self.LoderPrefeb.getComponent(LodingLayer).ondestroy();

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\Auth&purpose=register&email_id=" + this.signUpEmail.string + "&password=" + this.signUpPassword.string;
            xhr.send(strData);

            xhr.onreadystatechange = function () {


                console.log("Networking away hfng email " + xhr.responseText);

                LoderPrefeb.getComponent(LodingLayer).ondestroy();
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    var httpStatus = xhr.statusText;
                    cc.log(httpStatus);
                    var response = xhr.responseText;
                    var parseResponse = JSON.parse(response);
                    var parseResult = parseResponse.result;
                    var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                    cc.log("sadgafdfhsvdh " + dataString);
                    cc.sys.localStorage.setItem("new_User_data", dataString);
                    cc.sys.localStorage.removeItem("user_daitals");
                    cc.sys.localStorage.removeItem("guest_user_data");
                    cc.sys.localStorage.removeItem("forgot_password");
                    // cc.sys.localStorage.setItem("user_referral_id", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("name", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("email_id", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("gender", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("profile_image", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("started_playing", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("score", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("last_active", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("last_active_text", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("last_active_date", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("last_active_time_diff", parseResponse.result.user_token);
                    // cc.sys.localStorage.setItem("user_token", parseResponse.result.user_token);
                    cc.log("sadgafdfhsvdh " + cc.sys.localStorage.getItem("new_User_data"));
                    // cc.director.loadScene("GameScreen");
                    console.log("email is sdsdsdsd");

                    // self.otpEditBox.string = "";
                    // self.otpEnterPanel.active = true;
                    cc.director.loadScene("GameScreen");

                }
            }

        }

    }
    ForgotEmail() {



        var self = this;
        var email = this.ForgotPasswordEmail.string;

        if (this.ValidateEmail(email)) {

            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            // LoderPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
            // LoderPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
            this.node.addChild(LoderPrefeb);
            // self.LoderPrefeb.getComponent(LodingLayer).ondestroy();

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\Auth&purpose=forget_password&email_id=" + this.ForgotPasswordEmail.string;
            xhr.send(strData);
            cc.log("Networking away hfng emaildfsd " + strData);
            xhr.onreadystatechange = function () {

                LoderPrefeb.getComponent(LodingLayer).ondestroy();

                cc.log("Networking away hfng email " + xhr.responseText);
                if (xhr.readyState == 4) {

                    if ((xhr.status >= 200 && xhr.status <= 207)) {

                        var httpStatus = xhr.statusText;
                        cc.log(httpStatus);
                        var response = xhr.responseText
                        var parseResponse = JSON.parse(response);
                        self.serverOtp = parseResponse.result.otp;

                        self.serverSecurityKey = parseResponse.result.security_key;
                        console.log("email is currect " + self.serverSecurityKey + "dfsdf " + self.serverOtp);
                        self.otpEditBox.string = "";
                        self.changePasswordNewPassword.string = "";
                        self.changePasswordConfirmPassword.string = "";
                        self.otpEnterPanel.active = true;



                    } else {

                        var response = xhr.responseText
                        var parseResponse = JSON.parse(response);
                        // var parseResult = parseResponse.result;
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

    // otpCheck() {

    //     console.log("otp   " + this.otpEditBox.string);
    //     if (this.otpEditBox.string == this.serverOtp) {
    //         this.otpEnterPanel.active = false;
    //         this.resetPasswordPanel.active = true;
    //     } else {
    //         console.log("email.....not correct   " + this.otpEditBox.string);

    //     }
    // }

    changePasswordAndEmail() {

        var self = this;

        if ((this.otpEditBox.string != this.serverOtp)) {
            var errorPrefeb = cc.instantiate(this.errorPopUpPrefevb);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Incorrect";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "otp is Incorrect.";
            this.node.addChild(errorPrefeb);
        } else if ((this.changePasswordNewPassword.string != this.changePasswordConfirmPassword.string)) {
            var errorPrefeb = cc.instantiate(self.errorPopUpPrefevb);
            errorPrefeb.setPosition(0, 0);
            errorPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "invalid";
            errorPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "Enter Same Password.";
            self.node.addChild(errorPrefeb);

        } else if ((this.otpEditBox.string != ""
            && this.changePasswordNewPassword.string != ""
            && this.changePasswordConfirmPassword.string != "")
            && (this.changePasswordNewPassword.string == this.changePasswordConfirmPassword.string)
            && (this.otpEditBox.string == this.serverOtp)) {


            var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
            LoderPrefeb.setPosition(0, 0);
            // LoderPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
            // LoderPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
            this.node.addChild(LoderPrefeb);
            // self.LoderPrefeb.getComponent(LodingLayer).ondestroy();

            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var strData = "class_name=Accounts\\Auth&purpose=reset_password&security_key=" + this.serverSecurityKey + "&otp_code=" + this.serverOtp + "&new_password=" + this.changePasswordNewPassword.string;
            xhr.send(strData);
            cc.log("Networking away hfng emaildfsd " + strData);

            xhr.onreadystatechange = function () {
                cc.log("Networking away hfng email " + xhr.responseText);

                LoderPrefeb.getComponent(LodingLayer).ondestroy();

                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    var httpStatus = xhr.statusText;
                    cc.log(httpStatus);
                    var response = xhr.responseText
                    var parseResponse = JSON.parse(response);
                    var parseResult = parseResponse.result;
                    self.otpEnterPanel.active = true;

                    var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                    cc.log("sadgafdfhsvdh " + dataString);
                    // cc.sys.localStorage.setItem("forgot_password", dataString);
                    // cc.sys.localStorage.removeItem("user_daitals");
                    // cc.sys.localStorage.removeItem("guest_user_data");
                    // cc.sys.localStorage.removeItem("new_User_data");
                    self.signUpOption.active = true;
                    self.otpAndEmailPanel.active = false;
                    self.emailLoginPanel.active = false;
                    self.emailSingnUpPanel.active = false;
                    self.otpEnterPanel.active = false;
                    self.resetPasswordPanel.active = false;



                    self.otpEditBox.string = "";
                    self.changePasswordNewPassword.string = "";
                    self.changePasswordConfirmPassword.string = "";
                    // cc.director.loadScene("GameScreen");

                    // self.signUpOption.active = false;
                    // self.otpAndEmailPanel.active = false;
                    // self.emailLoginPanel.active = true;
                    // self.emailSingnUpPanel.active = false;
                    // self.otpEnterPanel.active = false;
                    // self.resetPasswordPanel.active = false;
                }
            }



        }

    }
    BackBtnOptions(event, customEventData) {

        if (customEventData == 1) {
            this.signUpOption.active = true;
            this.otpAndEmailPanel.active = false;
            this.emailLoginPanel.active = false;
            this.emailSingnUpPanel.active = false;
            this.otpEnterPanel.active = false;
        } else if (customEventData == 2) {
            this.signUpOption.active = false;
            this.otpAndEmailPanel.active = false;
            this.emailLoginPanel.active = true;
            this.emailSingnUpPanel.active = false;
            this.otpEnterPanel.active = false;

        }
    }

    onLoginAsGuest() {

        var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
        LoderPrefeb.setPosition(0, 0);
        // LoderPrefeb.getComponent(clickOnOkBtnTs).tital_Lbl.string = "Invalide";
        // LoderPrefeb.getComponent(clickOnOkBtnTs).discription_Lbl.string = "userEmail or password not empty";
        this.node.addChild(LoderPrefeb);
        // self.LoderPrefeb.getComponent(LodingLayer).ondestroy();
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
        var data = {
            user_token: "",
            user_referral_id: "",
            fb_id: "",
            tw_id: "",
            gp_id: "",
            device_id: "",
            device_token: "",
            name: "",
            email_id: "",
            started_playing: "",
            score: "",
            profile_image: ""
        };

        var dataString = (typeof (data) == 'string') ? data : JSON.stringify(data);

        cc.sys.localStorage.setItem("guest_user_data", dataString);
        cc.sys.localStorage.removeItem("new_User_data");
        cc.sys.localStorage.removeItem("user_daitals");
        cc.sys.localStorage.removeItem("forgot_password");
        // cc.sys.localStorage.clear() 
        cc.director.loadScene("GameScreen");
        LoderPrefeb.getComponent(LodingLayer).ondestroy();

    }

    ValidateEmail(mail) {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        return regex.test(mail);
    }


    socialMediaCallback(msg) {

        var string = JSON.parse(msg);
        var self = this;

        var LoderPrefeb = cc.instantiate(this.LoderPrefeb);
        LoderPrefeb.setPosition(0, 0);
        this.node.addChild(LoderPrefeb);


        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        if (string.facebook) {

            var strData = "class_name=Accounts\\Auth&purpose=social_auth&=fb_id" + string.facebook;

        } else if (string.twiter) {

            var strData = "class_name=Accounts\\Auth&purpose=social_auth&=tw_id" + string.twiter;

        }

        xhr.send(strData);
        cc.log("Networking away hfng emaildfsd " + strData);
        xhr.onreadystatechange = function () {

            LoderPrefeb.getComponent(LodingLayer).ondestroy();

            cc.log("Networking away hfng email " + xhr.responseText);
            if (xhr.readyState == 4) {

                if ((xhr.status >= 200 && xhr.status <= 207)) {

                    var httpStatus = xhr.statusText;
                    cc.log(httpStatus);
                    var response = xhr.responseText
                    var parseResponse = JSON.parse(response);


                } else {

                    var response = xhr.responseText
                    var parseResponse = JSON.parse(response);
                    // var parseResult = parseResponse.result;
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

            jsb.reflection.callStaticMethod("NativeEvent", "callTwiterLogin", "");


        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }


    }
    onGoogleLogin() {

        console.log("Google Add active");

        const self = this;
        let methodName = "callGoogleLogin";

        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {

            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
        } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

            jsb.reflection.callStaticMethod("NativeEvent", "callGoogleLogin", "");


        } else {
            console.log("sdfjdfjgd gdnfng hfng......1 " + cc.sys.os);
        }


    }


}
