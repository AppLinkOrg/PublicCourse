// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { LivemeetingApi } from '../../apis/livemeeting.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    super.onShow();

    var livemeetingapi = new LivemeetingApi();
    livemeetingapi.viewlist({},(list)=>{
      that.Base.setMyData({list:list});
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
Page(body)