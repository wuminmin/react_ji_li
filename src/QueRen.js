import 'braft-editor/dist/index.css';
import React from 'react';
import { Menu, Modal, Button, Table, Divider, Upload, message, Select, Icon, Row, Col, Dropdown, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader';
import AppGlobal from './AppGlobal';
import emitter from "./ev";
import CommonMethod from './commonMethod';

const { SubMenu } = Menu;

class MyTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ji_li_qing_dan: this.props.ji_li_qing_dan,
            visible: false,
            myrecord: {},
            columns: [
                {
                    title: '手机号',
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
                },
                {
                    title: '银行卡',
                    dataIndex: 'bankid',
                    key: 'bankid',
                },
                {
                    title: '状态',
                    dataIndex: 'mystate',
                    key: 'mystate',
                },
                {
                    title: '操作',
                    dataIndex: 'name',
                    key: 'action',
                    render: text => <a>确认</a>,
                    // render: (text, record) => (
                    //     <span>
                    //         <Button type="primary" onClick={this.showModal}>
                    //             确认
                    //         </Button>
                    //         <Modal
                    //             title="激励确认"
                    //             visible={this.state.visible}
                    //             onOk={(record) => {
                    //                 console.log(record.age);
                    //                 let self = this;
                    //                 CommonMethod.sendData({
                    //                     url: AppGlobal.url.java_url,
                    //                     code: 'testService',
                    //                     method: 'que_ren_by_xiao_shou_ping_bian_hao',
                    //                     isLogin: false,
                    //                     message: { "xiao_shou_ping_bian_hao": record.age },
                    //                     successFunc: function (response) {
                    //                         self.setState({
                    //                             visible: false,
                    //                         });
                    //                     },
                    //                     errorFunc: function (e) {
                    //                         console.log(e);
                    //                     },
                    //                     encode: true
                    //                 });
                    //             }}
                    //             onCancel={(record) => { this.handleCancel(record) }}
                    //         >
                    //             <p>请{record.name}确认是否收到{record.age}激励？</p>
                    //             <p>已收到！</p>
                    //         </Modal>
                    //     </span>
                    // ),
                },
            ],
            usertoken: this.props.usertoken,
        }
        console.log('constructor(props)', this.props.ji_li_qing_dan)
    }

    render() {
        return (
            <div>
                <Table
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.setState({
                                    myrecord: record,
                                    visible: true,
                                })
                            }, // 点击行
                            onDoubleClick: event => { },
                            onContextMenu: event => { },
                            onMouseEnter: event => { }, // 鼠标移入行
                            onMouseLeave: event => { },
                        };
                    }}
                    columns={this.state.columns} dataSource={this.props.ji_li_qing_dan} />
                <Modal
                    title="激励确认"
                    visible={this.state.visible}
                    onOk={() => {
                        let self = this;
                        CommonMethod.sendData({
                            url: AppGlobal.url.java_url,
                            code: 'testService',
                            method: 'que_ren_by_xiao_shou_ping_bian_hao',
                            isLogin: false,
                            message: { "xiao_shou_ping_bian_hao": self.state.myrecord.age },
                            successFunc: function (response) {
                                self.setState({
                                    visible: false,
                                });
                            },
                            errorFunc: function (e) {
                                console.log(e);
                            },
                            encode: true
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <p>请{this.state.myrecord.name}确认是否收到{this.state.myrecord.age}激励？</p>
                    <p>已收到！</p>
                </Modal>
            </div>

        )
    }
}

export default class QueRen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ji_li_qing_dan: [],
            菜单列表: [],
            ban_kuai: new URLSearchParams(this.props.location.search).get('ban_kuai'),
            my_tittle: new URLSearchParams(this.props.location.search).get('my_tittle'),
            tittle: '',
            lan_mu: new URLSearchParams(this.props.location.search).get('lan_mu'),
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
        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'testService',
            method: 'xia_zai_yong_hu_xin_xi',
            isLogin: false,
            message: {},
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    username: response.username,
                    userphone: response.userphone,
                    userrole: response.userrole,
                    mainid: response.mainid,
                    type1: response.type1,
                    type2: response.type2,
                    type3: response.type3,
                })
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });

        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'testService',
            method: 'rd_xia_zai_by_lan_mu',
            isLogin: false,
            message: { "lan_mu": self.state.lan_mu },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    菜单列表: response
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleClick = e => {

        emitter.emit('someEvent', e.key);

        console.log('click ', e.key);
        let self = this;
        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'testService',
            method: 'get_tables_by_tittle',
            isLogin: false,
            message: { "ban_kuai": self.state.ban_kuai, "lan_mu": self.state.lan_mu, "tittle": e.key },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    ji_li_qing_dan: response.ji_li_qing_dan,
                    tittle: e.key,
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
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
                            onBack={() => { window.location = AppGlobal.url.首页 }}
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
                        <MyTables usertoken={this.state.usertoken} ji_li_qing_dan={this.state.ji_li_qing_dan} handleClick={this.handleClick.bind(this)}></MyTables>
                    </Col>
                </Row>
            </div>
        )
    }
}