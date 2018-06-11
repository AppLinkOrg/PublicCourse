// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({ productcatlist: [], productlist: [], selectcat:0 });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var productcatlist = this.Base.getMyData().productcatlist;
    if(productcatlist.length==0){
      
      instapi.productcatlist({}, (productcatlist) => {
        that.Base.setMyData({ productcatlist: productcatlist
        , selectcat: productcatlist[0].id
          , productlist: productcatlist[0].productlist
         });
        });
    }
  }
  changeCat(e){
    var index=e.currentTarget.id;
    var productcatlist = this.Base.getMyData().productcatlist;
    this.Base.setMyData({
      selectcat: productcatlist[index].id
      , productlist: productcatlist[index].productlist
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCat = content.changeCat;

Page(body)