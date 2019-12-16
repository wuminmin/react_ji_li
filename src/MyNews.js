import { Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
// import Carousel from 'nuka-carousel';
import React from 'react'
import Qs from 'qs'
import axios from 'axios'
import 'antd/dist/antd.css';
import './index.css';
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import AppGlobal from './AppGlobal'
const { SubMenu } = Menu;

class MyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            菜单列表: [],
            lan_mu: this.props.lan_mu,
            ban_kuai: this.props.ban_kuai,
            my_tittle: this.props.my_tittle,
            myHTML_tittle: '',
            myHTML_article: '',
            myHTML_time: '',
        }
    }

    componentDidMount() {
        let self = this;
        let data = {
            "s":"0",
            "c":"testService",
            "m": "rd_xia_zai_by_lan_mu",
            "data":{"lan_mu":this.props.lan_mu}
        }
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: AppGlobal.url.rd_xia_zai_by_lan_mu,
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response)
            self.setState({
                菜单列表: response.data.m
            });
        })
            .catch(function (error) {
                console.log(error);
            });

        let data2 = {
            "ban_kuai": this.props.ban_kuai,
            "lan_mu": this.props.lan_mu,
            "tittle": this.props.my_tittle
        }
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: AppGlobal.url.rd_xia_zai_by_tittle,
            data: Qs.stringify(data2)
        }).then(function (response) {
            console.log(response)
            self.setState({
                myHTML_article: response.data
            });
        })
            .catch(function (error) {
                console.log(error);
            });

        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_time_by_tittle',
            data: Qs.stringify(data2)
        }).then(function (response) {
            console.log(response)
            self.setState({
                myHTML_tittle: response.data['tittle'],
                myHTML_time: response.data['my_time']
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClick = e => {
        console.log('click ', e.key);
        let self = this;
        let data = {
            "ban_kuai": this.props.ban_kuai,
            "lan_mu": this.props.lan_mu,
            "tittle": e.key
        }
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_by_tittle',
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response)
            self.setState({
                myHTML_article: response.data
            });

        })
            .catch(function (error) {
                console.log(error);
            });
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'https://wx.wuminmin.top/jilizhushou/rd_xia_zai_time_by_tittle',
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response)
            self.setState({
                myHTML_tittle: response.data['tittle'],
                myHTML_time: response.data['my_time']
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <Row>
                <Col span={4}>
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        onBack={() => { window.location = '/' }}
                        title={this.state.ban_kuai}
                        subTitle={this.state.lan_mu}
                    />,
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        {
                            this.state.菜单列表.map((item) => {
                                return (
                                    <SubMenu item={item} key={item.月份} title={
                                        <span>
                                            <Icon type="setting" />
                                            <span>{item.月份}</span>
                                        </span>
                                    } >
                                        {
                                            item.新闻标题列表.map((item2) => {
                                                return (
                                                    <Menu.Item key={item2.标题}>{item2.标题}</Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </Col>
                <Col span={2}></Col>
                <Col span={18}>
                    <h1 align={'center'}>{this.state.myHTML_tittle}</h1>
                    <h4 align={'center'}>{this.state.myHTML_time}</h4>
                    <div dangerouslySetInnerHTML={{ __html: this.state.myHTML_article }} />
                </Col>
            </Row>

        )
    }
}

export default class MyNews extends React.Component {
    state = {
        collapsed: false,
        myHTML: '',
        ban_kuai: '',
        lan_mu: '',
        my_tittle: '',
    };

    componentDidMount() {
        console.log(this.props)
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        console.log(params.get('ban_kuai'))
        console.log(params.get('lan_mu'))
        this.setState({
            ban_kuai: params.get('ban_kuai'),
            lan_mu: params.get('lan_mu'),
            my_tittle: params.get('tittle'),
        });
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);

        return (
            <div>
                <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')}></MyHeader>
                {/* <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                    </Col>
                    <Col span={2}></Col>
                </Row> */}
                <MyMenu ban_kuai={params.get('ban_kuai')} lan_mu={params.get('lan_mu')} my_tittle={params.get('tittle')}></MyMenu>

                <MyFooter></MyFooter>


            </div>
        );
    }
}