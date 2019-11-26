import React from 'react';
import Qs from 'qs'
import axios from 'axios'
import MyHeader from './MyHeader';
import { Carousel, Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader, Tabs, List } from 'antd';
import MyFooter from './MyFooter';

class MyTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs_list_data: [],
      ban_kuai: this.props.ban_kuai,
    }
  }

  handleClick = e => {
    console.log(e)
  }

  componentDidMount() {
    let self = this;
    let data = {
      "ban_kuai": this.props.ban_kuai
    }
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_tabs_by_ban_kuai',
      data: Qs.stringify(data)
    }).then(function (response) {
      console.log(response)
      self.setState({
        tabs_list_data: response.data
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    // const tabs_list_data = [
    //   {
    //     'table_key': '1',
    //     'table_name': '人大要闻',
    //     'list_data':
    //       [{ 'key': '人大要闻11111', 'key2': 'aaaaa', 'url': '/mynews?ban_kuai=人大要闻&lan_mu=人大概况&tittle=人大要闻11111' }, { 'key': '人大要闻222222', 'key2': 'bbbbbbb' }, { 'key': '3333333', 'key2': 'cccccccc' }]
    //   },
    //   {
    //     'table_key': '2',
    //     'table_name': '通知公告',
    //     'list_data':
    //       [{ 'key': '通知公告11111', 'key2': 'aaaaa' }, { 'key': '通知公告222222', 'key2': 'bbbbbbb' }, { 'key': '3333333', 'key2': 'cccccccc' }]
    //   },
    //   {
    //     'table_key': '3',
    //     'table_name': '领导讲话',
    //     'list_data':
    //       [{ 'key': '领导讲话11111', 'key2': 'aaaaa' }, { 'key': '领导讲话222222', 'key2': 'bbbbbbb' }, { 'key': '3333333', 'key2': 'cccccccc' }]
    //   },
    //   {
    //     'table_key': '4',
    //     'table_name': '工作动态',
    //     'list_data':
    //       [{ 'key': '工作动态11111', 'key2': 'aaaaa' }, { 'key': '工作动态222222', 'key2': 'bbbbbbb' }, { 'key': '3333333', 'key2': 'cccccccc' }]
    //   }
    // ]

    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }

    return (
      <div>
        <Tag color="#2db7f5">{this.props.ban_kuai}</Tag>
        <Tabs defaultActiveKey="1" onChange={callback}>
          {this.state.tabs_list_data.map((myitem) => {
            return (
              <TabPane tab={myitem.table_name} key={myitem.table_key}>
                <List
                  bordered
                  dataSource={myitem.list_data}
                  renderItem={item => (
                    <List.Item  >
                      <a href={item.url} align={'right'}> {item.key} --- {item.key2}</a>
                    </List.Item>
                  )}
                />
              </TabPane>
            )
          })}

        </Tabs>
      </div>
    )
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: props.width || -1,
      height: props.height || -1,
      首页模块: '人大新闻',
      首页新闻标题: '',
      首页新闻内容: '',
      ban_kuai1: '人大概况',
      ban_kuai2: '新闻中心',
      ban_kuai3: '依法履职',
      ban_kuai4: '营销活动',
    }
  }

  componentDidMount() {
    console.log(this.props)
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    console.log(params)
    let self = this;
    let data = {
      "type": this.state.首页模块
    }
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'https://wx.wuminmin.top/jilizhushou/rd_xia_zai',
      data: Qs.stringify(data)
    }).then(function (response) {
      console.log(response)
      self.setState({
        首页新闻标题: response.data.tittle,
        首页新闻内容: response.data.article
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <MyHeader></MyHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <MyTabs ban_kuai={this.state.ban_kuai4}></MyTabs>
          </Col>
          <Col span={2}></Col>
        </Row>
       
        <MyFooter></MyFooter>
      </div>
    )
  }
}