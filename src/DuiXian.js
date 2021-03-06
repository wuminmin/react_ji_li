import 'braft-editor/dist/index.css';
import React from 'react';
import { Menu, Table, Modal, Upload, message, Select, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader';
import AppGlobal from './AppGlobal';
import CommonMethod from './commonMethod';
import ExcelReader from './ExcelReader';
import emitter from "./ev";

const { SubMenu } = Menu;

export default class DuiXian extends React.Component {
    state = {
        visible: false,
        myrecord: {},
        ji_li_qing_dan: [],
        菜单列表: [],
        lan_mu: new URLSearchParams(this.props.location.search).get('lan_mu'),
        ban_kuai: new URLSearchParams(this.props.location.search).get('ban_kuai'),
        my_tittle: new URLSearchParams(this.props.location.search).get('my_tittle'),
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
        duan_xin_label: '',
    }

    componentDidMount() {
        this.isLivinig = true
        let self = this;
        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'chz566JiLiZhuShouService',
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
            code: 'chz566JiLiZhuShouService',
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
            code: 'chz566JiLiZhuShouService',
            method: 'get_tables_by_tittle',
            isLogin: false,
            message: { "ban_kuai": self.state.ban_kuai, "lan_mu": self.state.lan_mu, "tittle": e.key },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    ji_li_qing_dan: response.ji_li_qing_dan,
                    my_tittle: e.key,
                });

            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    };

    render() {

        const columns = [
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
                // render: tags => (
                //     <span>
                //         {tags.map(tag => {
                //             let color = tag.length > 5 ? 'geekblue' : 'green';
                //             if (tag === 'loser') {
                //                 color = 'volcano';
                //             }
                //             return (
                //                 <Tag color={color} key={tag}>
                //                     {tag.toUpperCase()}
                //                 </Tag>
                //             );
                //         })}
                //     </span>
                // ),
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
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>删除</a>
                    </span>
                ),
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
                bankid: '677***',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
                bankid: '677***',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
                bankid: '677***',
            },
        ];

        return (
            <div>
                <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')}></MyHeader>
                <Row>
                    <Col span={4}>
                        <PageHeader
                            style={{
                                border: '1px solid rgb(235, 237, 240)',
                            }}
                            onBack={() => { window.location = '/' }}
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
                        <Modal
                            title="激励确认"
                            visible={this.state.visible}
                            onOk={() => {
                                let self = this;
                                CommonMethod.sendData({
                                    url: AppGlobal.url.java_url,
                                    code: 'chz566JiLiZhuShouService',
                                    method: 'shan_chu_by_xiao_shou_ping_bian_hao',
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
                            <p>请确认是否删除{this.state.myrecord.name}的{this.state.myrecord.age}激励？</p>
                            <p>确认删除！</p>
                        </Modal>
                        <Table
                            ellipsis = 'true'
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
                            columns={columns} dataSource={this.state.ji_li_qing_dan} />
                        <ExcelReader />
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={9}>
                        <Button onClick={() => {
                            console.log(this.state.my_tittle);
                            let self = this;
                            CommonMethod.sendData({
                                url: AppGlobal.url.java_url,
                                code: 'chz566JiLiZhuShouService',
                                method: 'fa_song_duan_xin',
                                isLogin: false,
                                message: { "ban_kuai": self.state.ban_kuai, "lan_mu": self.state.lan_mu, "ji_li_ming_cheng": self.state.my_tittle },
                                successFunc: function (response) {
                                    console.log(response);
                                    self.setState({
                                        duan_xin_label: response.res,
                                    });
                                },
                                errorFunc: function (e) {
                                    console.log(e);
                                },
                                encode: true
                            });
                        }}>{this.state.lan_mu}</Button>
                    </Col>
                    <Col span={9}>
                        <label>{this.state.duan_xin_label}</label>
                    </Col>
                </Row>
            </div>

        )
    }
}