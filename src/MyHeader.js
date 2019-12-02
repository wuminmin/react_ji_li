import { Carousel, Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
// import Carousel from 'nuka-carousel';
import React from 'react'
import Qs from 'qs'
import axios from 'axios'
import 'antd/dist/antd.css';
import './index.css';
import AppGlobal from './AppGlobal'


export default class MyHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usertoken:this.props.usertoken,
            collapsed: false,
            myHTML: '',
            ban_kuai: '',
            lan_mu: '',
            首页:AppGlobal.url.index+'?usertoken='+this.props.usertoken,
            已发布:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=营销活动&lan_mu=已发布&tittle=默认',
            兑现中:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=营销活动&lan_mu=兑现中&tittle=默认',
            已归档:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=营销活动&lan_mu=已归档&tittle=默认',
            发布激励:AppGlobal.url.wenzhang+'?usertoken='+this.props.usertoken+'&ban_kuai=激励管理&lan_mu=发布激励&tittle=默认',
            兑现激励:AppGlobal.url.duixian+'?usertoken='+this.props.usertoken+'&ban_kuai=激励管理&lan_mu=兑现激励&tittle=默认',
            活动归档:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=激励管理&lan_mu=活动归档&tittle=默认',
            确认激励:AppGlobal.url.queren+'?usertoken='+this.props.usertoken+'&ban_kuai=我的激励&lan_mu=确认激励&tittle=默认',
            历史激励:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=我的激励&lan_mu=历史激励&tittle=默认',
            汇总统计:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=我的激励&lan_mu=汇总统计&tittle=默认',
            公司领导:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=活动管控&lan_mu=公司领导&tittle=默认',
            县区主任:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=活动管控&lan_mu=县区主任&tittle=默认',
            营业部主任:AppGlobal.url.mynews+'?usertoken='+this.props.usertoken+'&ban_kuai=活动管控&lan_mu=营业部主任&tittle=默认',
        }
      }

    componentDidMount() {
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });

    };

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.首页}>
                        首页
        </a>
                </Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.已发布}>
                        已发布
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.兑现中}>
                        兑现中
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.已归档}>
                        已归档
        </a>
                </Menu.Item>
            </Menu>
        );
        const menu3 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.发布激励}>
                        发布激励
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.兑现激励}>
                        兑现激励
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.活动归档}>
                        活动归档
        </a>
                </Menu.Item>
            </Menu>
        );
        const menu4 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.确认激励}>
                        确认激励
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.历史激励}>
                        历史激励
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.汇总统计}>
                        汇总统计
        </a>
                </Menu.Item>
            </Menu>
        );
        const menu5 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.公司领导}>
                        公司领导
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.县区主任}>
                        县区主任
        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={this.state.营业部主任}>
                        营业部主任
        </a>
                </Menu.Item>
            </Menu>
        );


        return (
            <div>
                {/* <Row>
                    <Carousel autoplay >
                        <img src="https://wx.wuminmin.top/wxyl/image?id=17" alt="" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=18" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=19" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=20" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=21" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=22" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=23" />
                        <img src="https://wx.wuminmin.top/wxyl/image?id=24" />
                    </Carousel>
                </Row> */}
                <br></br>
                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button>首页</Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu2} placement="bottomCenter">
                            <Button>营销活动</Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu3} placement="bottomCenter">
                            <Button>激励管理</Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu4} placement="bottomCenter">
                            <Button>我的激励</Button>
                        </Dropdown>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu5} placement="bottomCenter">
                            <Button>活动管控</Button>
                        </Dropdown>
                    </Col>
                    {/* <Col span={3}>
                        <Dropdown overlay={menu6} placement="bottomCenter">
                            <Button>府委两院</Button>
                        </Dropdown>
                    </Col>
                    <Col span={3}>
                        <Dropdown overlay={menu7} placement="bottomCenter">
                            <Button>乡镇人大</Button>
                        </Dropdown>
                    </Col> */}
                </Row>
                <br></br>
            </div>
        );
    }
}