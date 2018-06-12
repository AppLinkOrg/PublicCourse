// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({totalamount:0.00,order_id:0});
    var api = new ActivityApi();
    api.info({ id: this.Base.options.id }, (info) => {
      for (var i = 0; i < info.ticketlevels.length; i++) {
        if (info.ticketlevels[i].status == 'A') {
          info.ticketlevels[i].selected == true;
        }
      }
      this.Base.setMyData(info);

    });
  }
  onMyShow() {
    var that = this;
    //if (super.onShow() == true) {
      var order_id = this.Base.getMyData().order_id;
      if(order_id>0){
        this.Base.setMyData({order_id:0});
        wx.navigateTo({
          url: '/pages/activityorder/activityorder?id='+order_id.toString(),
        })
      }
  }

  onShareAppMessage(options) {
    var data = this.Base.getMyData();
    return {
      title: data.title,
      imageUrl: data.uploadpath + "activity/" + data.cover,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    };
  }
  selectTicket(e){
    var id=e.currentTarget.id;
    var ticketlevels = this.Base.getMyData().ticketlevels;
    for (var i = 0; i < ticketlevels.length; i++) {
      if (id == ticketlevels[i].id){
        if (ticketlevels[i].status=='S'){
          //等
          return;
        }
      }
    }
    for (var i = 0; i < ticketlevels.length; i++) {
      ticketlevels[i].selected = id == ticketlevels[i].id;
    }

    this.Base.setMyData({ ticketlevels: ticketlevels });
    this.countamount();
  }
  updateBuycount(e){
    var id=e.currentTarget.id;
    var val=e.detail.value;
    val = Number(val);
    var ticketlevels = this.Base.getMyData().ticketlevels;
    for (var i = 0; i < ticketlevels.length; i++) {
      if (id == ticketlevels[i].id) {
        ticketlevels[i].buycount = val;
      }
    }
    this.Base.setMyData({ ticketlevels: ticketlevels });
    this.countamount();
  }
  countamount(){
    var ticketlevels = this.Base.getMyData().ticketlevels;
    var totalamount=0.00;
    for (var i = 0; i < ticketlevels.length; i++) {
      if (ticketlevels[i].selected == true) {
        console.log(ticketlevels[i].buycount);
        console.log(ticketlevels[i].price);
        totalamount = ticketlevels[i].buycount * ticketlevels[i].price;
      }
    }
    this.Base.setMyData({ totalamount: totalamount.toFixed(2) });
  }
  gotoInfo(){
    var ticketlevels = this.Base.getMyData().ticketlevels;
    var ticket_id = 0;
    var ticket_buycount = 0;
    for (var i = 0; i < ticketlevels.length; i++) {
      if (ticketlevels[i].selected == true) {
        ticket_id = ticketlevels[i].id;
        ticket_buycount = ticketlevels[i].buycount;
      }
    }
    var activity_id = this.Base.options.id;
    if(ticket_id==0||ticket_buycount==0){
      this.Base.info("请选择购票信息");
      return;
    }
    if (super.checkRealname(function(){
      wx.navigateTo({
        url: '/pages/activitybuyinfo/activitybuyinfo?activity_id=' + activity_id
        + "&ticket_id=" + ticket_id.toString()
        + "&ticket_buycount=" + ticket_buycount.toString(),
      }); 
    })){

      
    }
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.gotoBuy = content.gotoBuy;
body.onShareAppMessage = content.onShareAppMessage; 
body.selectTicket = content.selectTicket;
body.updateBuycount = content.updateBuycount; 
body.countamount = content.countamount;
body.gotoInfo = content.gotoInfo;
Page(body)