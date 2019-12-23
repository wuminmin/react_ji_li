import 'braft-editor/dist/index.css';
import React from 'react';
import { Menu, Table, Divider, Upload, message, Select, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader';
import AppGlobal from './AppGlobal';
import CommonMethod from './commonMethod';
import ExcelReader from './ExcelReader';

const { SubMenu } = Menu;

export default class DuiXian extends React.Component {
    state = {
        ji_li_qing_dan: [],
        菜单列表: [],
        lan_mu: new URLSearchParams(this.props.location.search).get('lan_mu'),
        ban_kuai: new URLSearchParams(this.props.location.search).get('ban_kuai'),
        my_tittle: new URLSearchParams(this.props.location.search).get('my_tittle'),
        tittle: '',
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
            message: { "lan_mu":self.state.lan_mu },
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
        console.log('click ', e.key);
        let self = this;
        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'testService',
            method: 'get_tables_by_tittle',
            isLogin: false,
            message: { "tittle":e.key },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    ji_li_qing_dan: response.ji_li_qing_dan,
                    tittle:e.key,
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    };

    render() {
        const props = {
            name: 'file',
            action: AppGlobal.url.upload,
            data:{usertoken:this.state.usertoken,tittle:this.state.tittle},
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
                        <a>修改 {record.name}</a>
                        <Divider type="vertical" />
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
                bankid:'677***',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
                bankid:'677***',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
                bankid:'677***',
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
                        <Table columns={columns} dataSource={this.state.ji_li_qing_dan} />
                        {/* <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 点击上传文件
                            </Button>
                        </Upload> */}
                        <ExcelReader tittle={this.state.tittle}/>
                    </Col>
                </Row>

            </div>
        )
    }
}