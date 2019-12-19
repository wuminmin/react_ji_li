import React from 'react';
import Qs from 'qs'
import axios from 'axios'
import MyHeader from './MyHeader';
import { Carousel, Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader, Tabs, List } from 'antd';
import MyFooter from './MyFooter';
import AppGlobal from './AppGlobal'

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
      "s":"0",
      "c":"testService",
      "m": "rd_xia_zai_tabs_by_ban_kuai",
      "data":this.state.ban_kuai
    }
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: AppGlobal.url.rd_xia_zai_tabs_by_ban_kuai,
      data: Qs.stringify(data)
    }).then(function (response) {
      console.log(response)
      self.setState({
        tabs_list_data: response.data.m
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
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
      usertoken: new URLSearchParams(this.props.location.search).get('usertoken') ,
      username: '',
      userphone: '',
      userrole: '',
      mainid: '',
      type1: '',
      type2: '',
      type3: '',
      ban_kuai1: '营销活动',
      ban_kuai2: '新闻中心',
      ban_kuai3: '依法履职',
      ban_kuai4: '营销活动',
    }
  }

  componentDidMount() {
    // let self = this;
    // try {
    //   const search = this.props.location.search;
    //   const params = new URLSearchParams(search);
    //   console.log(params)
    //   let data = {
    //     "usertoken": params.get('usertoken')
    //   }
    //   axios({
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'post',
    //     url: AppGlobal.url.getUserInfo,
    //     data: Qs.stringify(data)
    //   }).then(function (response) {
    //     console.log(response)
    //     if (response.data.username === '') {
    //       window.location.href = AppGlobal.url.login
    //     } else {
    //       self.setState({
    //         username: response.data.username,
    //         userphone: response.data.userphone,
    //         userrole: response.data.userrole,
    //         mainid: response.data.mainid,
    //         type1: response.data.type1,
    //         type2: response.data.type2,
    //         type3: response.data.type3,
    //       })
    //     }
    //   })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

    // } catch (e) {
    //   window.location.href = AppGlobal.url.login
    // }

  }

  render() {
    return (
      <div>
        <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')} ></MyHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <MyTabs ban_kuai={this.state.ban_kuai1}></MyTabs>
          </Col>
          <Col span={2}></Col>
        </Row>

        <MyFooter></MyFooter>
      </div>
    )
  }
}