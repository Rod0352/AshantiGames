const { ccclass, property } = cc._decorator;
let callBackSocialmedia = null;
cc["socialCallData"] = function (socialString: string) {
    console.log("sjndkaf df sd fd fg fdg dfgj dfg ....333.11 " + socialString);
    callBackSocialmedia(socialString);
};
@ccclass
export default class NewClass extends cc.Component {

    start() {
        console.log("sjndkaf df sd fd fg fdg dfgj dfg ");
        callBackSocialmedia = this.callFromsocialMedia.bind(this);
    }
    callFromsocialMedia(socialString: string) {
        console.log("sjndkaf df sd fd fg fdg dfgj dfg ....2 " + socialString);
        var splitString = socialString.split("#");
        var socialId = splitString[0];
        var socialMediaType = splitString[1];
        console.log("sjndkaf df sd fd fg fdg dfgj dfg ....2 " + splitString + " dfsdf " + socialId + " sddad " + socialMediaType);

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log("sjndkaf df sd fd fg fdg dfgj dfg ....2 " + splitString + " dfsdf " + socialId + " sddad " + socialMediaType);

        var isguest = cc.sys.localStorage.getItem("guest_user_data");
        var user_daitals = cc.sys.localStorage.getItem("user_daitals");
        if (isguest != null || user_daitals == null) {
            var strData = "class_name=Accounts\\Auth&purpose=social_auth&" + socialMediaType + "=" + socialId;
        } else {
            var parseResult = JSON.parse(user_daitals);
            var userToken = parseResult.user_token;
            var strData = "class_name=Accounts\\Auth&purpose=socialConnect&user_token=" + userToken + "&" + socialMediaType + "=" + socialId;
        }
        console.log("Networking away hfng emaildfsd " + strData);

        xhr.send(strData);
        console.log("Networking away hfng emaildfsd " + strData);
        xhr.onreadystatechange = function () {
            console.log("Networking away hfng email " + xhr.responseText);
            // LoderPrefeb.getComponent(LodingLayer).ondestroy();
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                cc.log(httpStatus);
                var response = xhr.responseText
                var parseResponse = JSON.parse(response);
                var parseResult = parseResponse.result;
                var dataString = (typeof (parseResult) == 'string') ? parseResult : JSON.stringify(parseResult);
                if (isguest != null) {
                    var parseGuest = JSON.parse(isguest);
                    const self = this;
                    let methodName = "updateGuestProfile";

                    if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                        console.log("update data..................");

                        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "()V");
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", methodName, "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", parseResult.user_token, parseGuest.name, parseGuest.profile_image, parseGuest.score);
                        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBrowser", "(Ljava/lang/String;)V", banner.ClickUrl);
                        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "keepScreenOn", "(Z)V", keepOn);

                    } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {

                        // jsb.reflection.callStaticMethod("NativeEvent", "callToPickGalleryImage", this.userToken, this.isGuest);

                    }
                } else {
                    cc.sys.localStorage.setItem("user_daitals", dataString);
                    cc.sys.localStorage.removeItem("new_User_data");
                    cc.sys.localStorage.removeItem("guest_user_data");
                    cc.director.loadScene("GameScreen");
                }

            }
        }
    }

}
