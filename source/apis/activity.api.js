
        /****使用方法，下面两句复制到page的js文件的头部
		
import { ApiConfig } from '../../apis/apiconfig';
import { ServiceApi } from '../../apis/service.api';

var serviceApi=new ServiceApi();
        *******/
import { ApiConfig } from 'apiconfig';
export class ActivityApi
{
			//获取相关的服务
				list(json, callback, showLoading = true) {

					if (showLoading)
					ApiConfig.ShowLoading();
    
					var header=ApiConfig.GetHeader();
					console.log(header);
					wx.request({
					  url: ApiConfig.GetApiUrl() + 'activity/list',
					  data: json,
					  method: 'POST',
					  dataType: 'json',
					  header: header,
					  success: function (res) {
						if (callback != null) {
						  callback(res.data);
						}
					  },
					  fail: function (res) {
						console.log(res);
						callback(false);
					  },
					  complete: function (res) {
						console.log(res);

						if (showLoading)
						ApiConfig.CloseLoading();
					  }
					})
				  }

        //获取相关的服务
        info(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'activity/info',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
        //获取相关的服务
        submitticket(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'activity/submitticket',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
        //获取相关的服务
        ticketorder(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'activity/ticketorder',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
}

 