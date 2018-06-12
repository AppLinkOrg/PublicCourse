// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';
import { WechatApi } from "../../apis/wechat.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id = 4;
    this.Base.Page = this;
    super.onLoad(options);
    
    wx.hideShareMenu({
      
    })
  }
  onMyShow() {
    var that = this;
      var api=new ActivityApi();
      api.ticketorder({ id: that.Base.options.id},(order)=>{
        this.Base.setMyData(order);
      });
  }

  gotoBuy(){
    var that = this;
    var wechatApi = new WechatApi();
    console.log(this.Base.options.id);
    wechatApi.prepay({ id: this.Base.options.id }, function (data) {
      if (data.code == 0) {
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'success': function (res) {
            console.log("payment success");
            console.log(res);
            wx.navigateTo({
              url: '/pages/success/success',
            })
          },
          'fail': function (res) {
            console.log("payment fail");
            console.log(res);
            that.Base.error(res.err_desc);
          }
        })
      } else {
        that.Base.error(data.result);
      }
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.gotoBuy = content.gotoBuy;
Page(body)