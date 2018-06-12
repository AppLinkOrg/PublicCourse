// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';
import { MemberApi } from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.ticket_id=1;
    //options.ticket_buycount=3;
    super.onLoad(options);
    wx.hideShareMenu({
      
    })
  }
  onMyShow() {
    var that = this;
      var api = new ActivityApi();
      api.info({ id: this.Base.options.activity_id }, (info) => {
        this.Base.setMyData(info);
      });
      var memberApi = new MemberApi();
      memberApi.info({}, (memberinfo) => {
        if (memberinfo != null) {
          this.Base.setMyData({ memberinfo: memberinfo });
        }
      });
  }
  submitForm(e){
    console.log(e);
    var that=this;
    var json=e.detail.value;
    super.checkRealname(function () {
      if(json.company.trim()==""){
        that.Base.info("请输入公司名称");
        return;
      }
      if (json.position.trim() == "") {
        that.Base.info("请输入职位");
        return;
      }
      if (json.wechataccount.trim() == "") {
        that.Base.info("请输入微信号");
        return;
      }
      if (json.industry.trim() == "") {
        that.Base.info("请输入所在行业");
        return;
      }
      json.activity_ticket_level_id=that.Base.options.ticket_id;
      json.buycount=that.Base.options.ticket_buycount;
      var api = new ActivityApi();
      api.submitticket(json, (ret) => {
        if(ret.code==0){
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 1];  //当前界面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            order_id: ret.return
          });
          wx.navigateBack({});
        }else{
          that.Base.info(ret.return);
        }
      });

    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.submitForm = content.submitForm;
Page(body)