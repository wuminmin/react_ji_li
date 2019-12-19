import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import { Menu, Table, Divider, Upload, message, Select, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader'
import AppGlobal from './AppGlobal'
const { SubMenu } = Menu;

export default class Daoru extends React.Component {
    state = {
        活动详单: [],
        菜单列表: [],
        lan_mu: new URLSearchParams(this.props.location.search).get('lan_mu'),
        ban_kuai: new URLSearchParams(this.props.location.search).get('ban_kuai'),
        my_tittle: new URLSearchParams(this.props.location.search).get('my_tittle'),
        tittle: '',
        lan_mu: '兑现中',
        usertoken: new URLSearchParams(this.props.location.search).get('usertoken'),
        username: '',
        userphone: '',
        userrole: '',
        mainid: '',
        lan_mu1: '',
        lan_mu2: '',
        lan_mu3: '',
        ban_kuai1: '营销活动',
        ban_kuai2: '新闻中心',
        ban_kuai3: '依法履职',
        ban_kuai4: '营销活动',
    }

    componentDidMount() {
        this.isLivinig = true
        let self = this;
        try {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            console.log(params)
            let data = {
                "s":"0",
                "c":"testService",
                "m": "getUserInfo",
              "data":{  "usertoken": params.get('usertoken') }
               
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.java_get_data,
                data: Qs.stringify(data)
            }).then(function (response) {
                console.log(response)
                if (response.data.m.username === '') {
                    // window.location.href = AppGlobal.url.login
                } else {
                    self.setState({
                        username: response.data.m.username,
            userphone: response.data.m.userphone,
            userrole: response.data.m.userrole,
            mainid: response.data.m.mainid,
            type1: response.data.m.type1,
            type2: response.data.m.type2,
            type3: response.data.m.type3,
                    })
                }
            })
                .catch(function (error) {
                    console.log(error);
                });

            let data2 = {
                "s":"0",
                "c":"testService",
                "m": "rd_xia_zai_by_lan_mu",
                "data":{
                    "lan_mu":self.state.lan_mu
                }
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.java_get_data,
                data: Qs.stringify(data2)
            }).then(function (response) {
                console.log(response)
                self.setState({
                    菜单列表: response.data.m
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
            "s":"0",
            "c":"testService",
            "m": "get_tables_by_tittle",
            "data":{
                "tittle": e.key,
                "usertoken":self.state.usertoken
            }
            
        }
        self.setState({tittle:e.key})
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: AppGlobal.url.java_get_data,
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response)
            self.setState({
                活动详单: response.data.m
            });

        })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const props = {
            name: 'file',
            action: AppGlobal.url.java_get_data,
            data:{
                s:"0",
                c:"testService",
                m: "upload",
                data:{
                    usertoken:this.state.usertoken,tittle:this.state.tittle
                }
            },
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const columns = [
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
                title: '状态',
                dataIndex: 'mystate',
                key: 'mystate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>修改 {record.name}</a>
                        <Divider type="vertical" />
                        <a>删除</a>
                    </span>
                ),
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
                        <Table columns={columns} dataSource={this.state.活动详单} />
                        <label>上传清单:</label>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 点击上传文件
                            </Button>
                        </Upload>
                    </Col>
                </Row>

            </div>
        )
    }
}