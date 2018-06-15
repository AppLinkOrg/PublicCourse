// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
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
    var currenttab = this.Base.getMyData().currenttab;
    var activityapi=new ActivityApi();
    switch (currenttab) {
      case 0: 
        activityapi.ticketorderlist({status:"3"},(list)=>{
          this.Base.setMyData({ list1:list});
        });
      
       break;
      case 1:

        activityapi.ticketorderlist({ status: "2" }, (list) => {
          this.Base.setMyData({ list2: list });
        });

        break;
      case 2:
        activityapi.ticketorderlist({ status: "1" }, (list) => {
          this.Base.setMyData({ list3: list });
        });
        break;
      case 3:
        activityapi.ticketorderlist({ status: "4" }, (list) => {
          this.Base.setMyData({ list4: list });
        });
        break;
      case 4: 
        
        activityapi.ticketorderlist({ }, (list) => {
          this.Base.setMyData({ list5: list });
        });
        break;
    }
  }
  loadprocess() {
    var api = new ActivityApi();
    api.list({});
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
body.loaddata = content.loaddata;
Page(body)