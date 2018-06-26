// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CourseApi } from "../../apis/course.api.js";
import { ActivityApi } from "../../apis/activity.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ currenttab: 0 });
  }
  onMyShow() {
    var that = this;
    this.loaddata();
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
    this.loaddata();
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
    this.loaddata();
  }
  loaddata() {
    var currenttab=this.Base.getMyData().currenttab;
    switch(currenttab){
      case 0: this.Base.loadhot(); break;
      case 1: this.Base.loadactivity();break;
      case 2: this.Base.loadinst();break;
      
      break;
    }
  }
  loadhot(){
    var that = this;
    var courseapi = new CourseApi();
    courseapi.list({inhome:"Y","type":"1"}, (videolist) => {
      that.setMyData({ videolist: videolist });
    });
  }
  loadlive() {
    var that = this;
    var courseapi = new CourseApi();
    courseapi.list({ inhome: "Y", "type": "1" }, (livelist) => {
      that.setMyData({ livelist: livelist });
    });
  }
  loadactivity() {
    var that = this;
    var api = new ActivityApi();
    api.list({ inhome: "Y" }, (activitylist) => {
      that.setMyData({ activitylist: activitylist });
    });
  }
  loadinst(){

    var that = this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (indexbanner) => {
      that.setMyData({ indexbanner: indexbanner });
    });
    instapi.info({}, (info) => {
      that.setMyData({ info: info });
    });
    instapi.aboutuslist({ inhome: "Y" }, (aboutuslist) => {
      that.setMyData({ aboutuslist: aboutuslist });
    });
    instapi.newslist({ inhome: "Y" }, (newslist) => {
      that.setMyData({ newslist: newslist });
    });
    instapi.servicelist({ inhome: "Y" }, (servicelist) => {
      that.setMyData({ servicelist: servicelist });
    });
    instapi.productlist({ inhome: "Y" }, (productlist) => {
      that.setMyData({ productlist: productlist });
    });
  }
  gotoSearch(){
    wx.switchTab({
      url: '/pages/search/search',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab; 
body.loaddata = content.loaddata; 
body.loadinst = content.loadinst; 
body.loadhot = content.loadhot; 
body.livelist = content.livelist;
body.loadactivity = content.loadactivity;
body.gotoSearch = content.gotoSearch;
Page(body)