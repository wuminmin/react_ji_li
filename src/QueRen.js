import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import { Menu, Modal, Button, Table, Divider, Upload, message, Select, Icon, Row, Col, Dropdown, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader'
import AppGlobal from './AppGlobal'

const { SubMenu } = Menu;
const { confirm } = Modal;

class MyTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            活动详单: this.props.活动详单,
            visible: false,
            columns: [
                {
                    title: '主数据',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '销售品编码',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '激励金额',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: '激励账期',
                    key: 'tags',
                    dataIndex: 'tags',
                    render: tags => (
                        <span>
                            {tags.map(tag => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                if (tag === 'loser') {
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </span>
                    ),
                },
                {
                    title: '银行卡',
                    dataIndex: 'bankid',
                    key: 'bankid',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type="primary" onClick={this.showModal}>
                                确认
                            </Button>
                            <Modal
                                title="激励确认"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p>请{record.name}确认是否收到{record.age}激励？</p>
                                <p>已收到！</p>
                            </Modal>
                        </span>
                    ),
                },
            ],

        }
        console.log('constructor(props)', this.props.活动详单)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.props.活动详单} />
        )
    }
}

export default class DuiXian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            活动详单: [],
            菜单列表: [],
            lan_mu: new URLSearchParams(this.props.location.search).get('lan_mu'),
            ban_kuai: new URLSearchParams(this.props.location.search).get('ban_kuai'),
            my_tittle: new URLSearchParams(this.props.location.search).get('my_tittle'),
            tittle: '',
            type: '已发布',
            usertoken: new URLSearchParams(this.props.location.search).get('usertoken'),
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
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.isLivinig = true
        let self = this;
        try {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            console.log(params)
            let data = {
                "usertoken": params.get('usertoken')
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.getUserInfo,
                data: Qs.stringify(data)
            }).then(function (response) {
                console.log(response)
                if (response.data.username === '') {
                    // window.location.href = AppGlobal.url.login
                } else {
                    self.setState({
                        username: response.data.username,
                        userphone: response.data.userphone,
                        userrole: response.data.userrole,
                        mainid: response.data.mainid,
                        type1: response.data.type1,
                        type2: response.data.type2,
                        type3: response.data.type3,
                    })
                }
            })
                .catch(function (error) {
                    console.log(error);
                });

            let data2 = {
                "type": self.state.type
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.rd_xia_zai_by_lan_mu,
                data: Qs.stringify(data2)
            }).then(function (response) {
                console.log(response)
                self.setState({
                    菜单列表: response.data
                });
            })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (e) {
            console.log(e)
            // window.location.href = AppGlobal.url.login
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleClick = e => {
        console.log('click ', e.key);
        let self = this;
        let data = {
            "tittle": e.key,
            "usertoken": self.state.usertoken
        }
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'https://wx.wuminmin.top/jilizhushou/get_tables_by_tittle',
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response)
            self.setState
                (
                    state => ({
                        活动详单: response.data
                    })
                );

        })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')}></MyHeader>
                <Row>
                    <Col span={4}>
                        <PageHeader
                            style={{
                                border: '1px solid rgb(235, 237, 240)',
                            }}
                            onBack={() => { window.location = AppGlobal.url.index + '?usertoken=' + this.state.usertoken }}
                            title={new URLSearchParams(this.props.location.search).get('ban_kuai')}
                            subTitle={new URLSearchParams(this.props.location.search).get('lan_mu')}
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
                        <MyTables 活动详单={this.state.活动详单} handleClick={this.handleClick.bind(this)}></MyTables>
                    </Col>
                </Row>
            </div>
        )
    }
}