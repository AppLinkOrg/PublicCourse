// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CourseApi } from "../../apis/course.api.js";
import { MemberApi } from '../../apis/member.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=1;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({ currenttab: 0, currentrtmp: 0, comments: [], infullscreen: false, currentrtmpurl: "", inplay: true,playcode:0,info:null,currentvideo:null });
    var that=this;
  }
  onMyShow() {
    var that = this;
    
    var liveapi = new CourseApi();
      liveapi.info({id:this.Base.options.id},(ret)=>{
        this.Base.options.id=ret.id;
        this.Base.setMyData({info:ret});
        
        liveplayer=wx.createLivePlayerContext("liveplayer", this);
        if(ret.videos!=undefined){
          this.Base.setMyData({ currentvideo: ret.videos[0] });
        }

        videoContext = wx.createVideoContext('myVideo');
        
      });
      var memberApi =new MemberApi();
      memberApi.info({},(memberinfo)=>{
        if(memberinfo!=null){
          this.Base.setMyData({ memberinfo: memberinfo });
        }
      });

      liveapi.commentlist({ course_id: that.Base.options.id }, (ret) => {
        
        that.Base.setMyData({ viewcount: ret.viewcount, upcount: ret.upcount, commentcount: ret.commentcount, comments: ret.commentlist });
      });
    
  }
  changeCurrentTab(e){
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id});
  }
  focusus(){
   /* var info=this.Base.getMyData().info;
    wx.navigateTo({
      url: '../webview/webview?url='+JSON.stringify(info.flowurl),
    })*/
  }
  sendComment(e){
    console.log(e);
    if(e.detail.value.comment.trim()==""){
      wx.showToast({
        title: '不能发空消息',
      })
      return;
    } 
    var comment = e.detail.value.comment.trim();
    var that=this;
    this.Base.setMyData({ comment: "" });
    var liveapi = new CourseApi();
    liveapi.comment({ course_id: this.Base.options.id, comment: comment }, (ret) => {
      if(ret.code==0){
        wx.showToast({
          title: '发送成功'
        });

        var liveapi=new CourseApi();
        liveapi.commentlist({ course_id: that.Base.options.id }, (ret) => {

          that.Base.setMyData({ viewcount: ret.viewcount, upcount: ret.upcount, commentcount: ret.commentcount, comments: ret.commentlist });
        });
      }
    });
  }
  changeCurrentrtmp(e){
    this.Base.setMyData({ currentrtmp: e.detail.current });
  }
  sendNotify(e){
    var formid = e.detail.formId;
    var liveapi = new CourseApi();
    liveapi.sendnotify({ course_id: this.Base.options.id, formid: formid }, (ret) => {
      if(ret.code==0){
        var info = this.Base.getMyData().info;
        info.notifyme = true;
        this.Base.setMyData({ info: info });
      }
    });
  }
  onShareAppMessage(options){
    var data=this.Base.getMyData();
    var info=data.info;
    return {
      title: info.title,
      path:"/pages/course/course?id="+this.Base.options.id,
      imageUrl: data.uploadpath + "course/" + info.sharecover,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  upThis(){
    var data = this.Base.getMyData();
    var info = data.info;
    if(info.uped==true){
      return;
    }
    info.uped=true;
    
    this.Base.setMyData({info:info});
    var liveapi = new CourseApi();
    liveapi.up({ course_id: this.Base.options.id}, (ret) => {
      
    },false);
  }
  changeToFullScreen(){
    //console.log(liveplayer);
    var infullscreen = this.Base.getMyData().infullscreen;
    if(infullscreen){
      liveplayer.exitFullScreen();
    }else{
      liveplayer.requestFullScreen({ direction: 90 });
    }
  }

  bindfullscreenchange(e){
    this.Base.setMyData({ infullscreen: e.detail.fullScreen});
  }

  playLive(e){
    var id=Number(e.currentTarget.id);
    console.log(id);
    var currentrtmpurl = this.Base.getMyData().info.rtmps[id];

    this.Base.setMyData({ currentrtmp: id, currentrtmpurl: currentrtmpurl });
  }



  bindstatechange(e){

    var playcode = this.Base.getMyData().playcode;
    if (playcode != e.detail.code){
      
    }
    this.Base.setMyData({  playcode: e.detail.code });
  }
  changePlayStatus() {
    
    var inplay = this.Base.getMyData().inplay;
    if (inplay) {
      liveplayer.stop();
      this.Base.setMyData({ inplay: false });
    } else {
      liveplayer.play();
      this.Base.setMyData({ inplay: true });
    }
  }
  playVideo(e) {
    if(videoContext!=null){
      console.log("stop");
      videoContext.pause();
    }
    var idx=e.currentTarget.id;
    var info=this.Base.getMyData().info;
    var videos=info.videos;
    this.Base.setMyData({ currentvideo: videos[idx] });
  }
  favorite(){
    var that=this;
    var info = this.Base.getMyData().info;
    var liveapi = new CourseApi();
    liveapi.favorite({ course_id: this.Base.options.id }, (ret) => {
      info.favorited = !info.favorited;
      this.Base.setMyData({ info: info });
    });
    
  }

  onUnload() {
    clearInterval(commenttimer);
  }
  playOtherVideo(e){
    var id=e.currentTarget.id;
    console.log(this.Base.options);
    this.Base.options.id=id;
    this.onMyShow();
  }
}



var videoContext = null;


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab; 
body.gotoFlowurl = content.gotoFlowurl; 
body.sendComment = content.sendComment;
body.changeCurrentrtmp = content.changeCurrentrtmp; 
body.sendNotify = content.sendNotify; 
body.focusus = content.focusus; 
body.changeToFullScreen = content.changeToFullScreen;
body.playLive = content.playLive;

var liveplayer=null;
//打开这个隐藏就会听不见
//body.onHide = content.onHide;
body.onShareAppMessage = content.onShareAppMessage; 
body.upThis = content.upThis; 
body.bindfullscreenchange = content.bindfullscreenchange; 
body.bindstatechange = content.bindstatechange; 
body.changePlayStatus = content.changePlayStatus;
body.playVideo = content.playVideo; 
body.favorite = content.favorite; 
body.onUnload = content.onUnload;
body.playOtherVideo = content.playOtherVideo;

var commenttimer=null;

Page(body)