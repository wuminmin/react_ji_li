import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, HashRouter } from 'react-router-dom';
import App from './App';
import MyLogin from './MyLogin';
import WenZhang from './WenZhang';
import MyNews from './MyNews';
import DuiXian from './DuiXian';
import QueRen from './QueRen';
import CommonMethod from './commonMethod';

const workflowUrl =  'http://134.64.116.90:8101/ji_li_zhu_shou/'

const routing = (
  <HashRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={MyLogin} />
      <Route exact path="/wenzhang" component={WenZhang} />
      <Route exact path="/mynews" component={MyNews} />
      <Route exact path="/duixian" component={DuiXian} />
      <Route exact path="/queren" component={QueRen} />
    </div>
  </HashRouter>
)

// eslint-disable-next-line
window.onload=function(){
  
  WorkHelper.getToken({
    success:function(data){
      if(data.retCode==0){
        checkToken(data.retData.appToken);
      }
      else{
        alert(data.retMsg);
        console.error("应用认证失败" ,data.retMsg);
        ReactDOM.render(routing, document.getElementById('root'));
      // ReactDOM.render(<MainPage login="0"/>, document.getElementById('app'));
      }
    },
    fail:function(data){
      alert(data);
      console.error("应用认证失败" ,data);
      let {iid,wid,nid}=CommonMethod.urlHashInfo();//流程实例和环节ID
      if(iid){
        if(nid){
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}manager/_wfhandler.html?nid=${nid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        else{
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}/manager/_wfpreview.html?instanceId=${iid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
      }
      ReactDOM.render(routing, document.getElementById('root'));
      // ReactDOM.render(<MainPage login="0"/>, document.getElementById('app'));
    }
  });
}

function checkToken(token){
  CommonMethod.sendData({
    url: workflowUrl,
    code: 'ssoService',
    method: 'smartworkLogin',
    message: {appToken:token},
    successFunc: function (data) {
      let {iid,wid,nid}=CommonMethod.urlHashInfo();//流程实例和环节ID
      if(iid){
        if(nid){
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}manager/_wfhandler.html?nid=${nid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        else{
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}/manager/_wfpreview.html?instanceId=${iid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        WorkHelper.closeApp({success:function(e){},fail:function(e){}});
      }
      else{
        ReactDOM.render(routing, document.getElementById('root'));

        // ReactDOM.render(<MainPage  login="1"/>, document.getElementById('app'));
      }
    },
    errorFunc: function (e) {
    },
    isLogin: true,
    encode: true
});
}