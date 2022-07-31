// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        const parms = {
            email_id: "shivanigarg188@gmail.com",
            password: "12121",
            class_name: "Accounts\\Auth",
            purpose: "login"
        }
        var email = "shivanigarg188@gmail.com";

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://games.assertinfotech.com/odulum/service_api/api.php", false);
        // xhr.open("POST", "http://pokerdate.in/up/poker/apis_v2/api.php", true);
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7456');
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        var strData = "class_name=Accounts\\Auth&purpose=login&email_id=" + email + "&password=12121";
        console.log("fhbsdfsd f sd df d function " + parms);
        var data = JSON.stringify(parms);
        xhr.send(strData);
        xhr.onreadystatechange = function () {
            cc.log("Networking away hfng email " + xhr.response);

            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                cc.log(httpStatus);

                var response = xhr.responseText;
                cc.log(response);
            }
        }




    },

    // update (dt) {},
});
