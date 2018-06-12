// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { CourseApi } from '../../apis/course.api';

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

    var api = new CourseApi();
    api.categorylist({}, (categorylist) => {
      that.Base.setMyData({ categorylist });
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
Page(body)