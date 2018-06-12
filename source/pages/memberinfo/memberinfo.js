// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { ContentApi } from "../../apis/content.api";
import { MemberApi } from "../../apis/member.api";
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
    var memberApi = new MemberApi();
    memberApi.info({}, (memberinfo) => {
      if (memberinfo != null) {
        this.Base.setMyData({ memberinfo: memberinfo });
      }
    });
  }
  changePlayinback(e) {
    var v = e.detail.value ? "Y" : "N";
    var memberApi = new MemberApi();
    memberApi.setvalue({ field: "playinback", playinback: v });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.changePlayinback = content.changePlayinback;
Page(body)