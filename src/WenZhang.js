import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import axios from 'axios';
import Qs from 'qs';
import moment from 'moment';
import { Select, Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader, Input } from 'antd';
import MyHeader from './MyHeader';
import AppGlobal from './AppGlobal';
import CommonMethod from './commonMethod';

import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
        title: '贵池区',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: '秋浦营业部',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: '青阳县',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: '蓉城营业部',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: '庙前营业部',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: '杜村营业部',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

class Demo extends React.Component {
    state = {
        value: ['0-1-0'],
    };

    onChange = value => {
        console.log('onChange ', value);
        this.setState({ value });
    };

    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: '100%',
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

export default class WenZhang extends React.Component {

    state = {
        editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
        outputHTML: '<p></p>',
        myHTML: '<div></div>',
        tittle: '',
        ban_kuai:'营销活动',
        lan_mu: '已发布',
        usertoken: new URLSearchParams(this.props.location.search).get('usertoken'),
        username: '',
        userphone: '',
        userrole: '',
        mainid: '',
        type1: '',
        type2: '',
        type3: '',
        duan_xin:'',
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
    }

    componentWillUnmount() {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    handleChangeBanShiRiQi = (e) => {
        this.setState({ duan_xin: e.target.value });
    }

    handleChangeBanShiRiQi2 = (e) => {
        this.setState({ tittle: e.target.value });
    }

    render() {

        const { editorState, outputHTML, myHTML } = this.state

        return (
            <div>
                <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')}></MyHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        {/* <label>活动状态:</label>
                        <Select defaultValue="jack" style={{ width: 120 }} onChange={this.handleChangeBanShiRiQi}>
                            <Option value="jack">已发布</Option>
                            <Option value="lucy">兑现中</Option>
                            <Option value="Yiminghe">已归档</Option>
                        </Select> */}
                        <label>活动名称:</label>
                        <input type="txt" defaultValue="" onChange={this.handleChangeBanShiRiQi2} />
                        <div className="editor-wrapper">
                            <BraftEditor
                                value={editorState}
                                onChange={this.handleChange}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={e => {
                                this.setState({
                                    myHTML: this.state.outputHTML
                                });
                            }}>预览文章</Button>

                        <h5>预览文章</h5>
                        <div dangerouslySetInnerHTML={{ __html: myHTML }} />

                        <h5>群发短信内容：</h5>
                        <input type="txt" defaultValue="" onChange={this.handleChangeBanShiRiQi} />
                        {/* <h5>选择活动对象</h5>
                        <Demo></Demo> */}
                        <Button
                            type="primary"
                            onClick={e => {
                                let self = this;
                                CommonMethod.sendData({
                                    url: AppGlobal.url.java_url,
                                    code: 'chz566JiLiZhuShouService',
                                    method: 'rd_updata',
                                    isLogin: false,
                                    message: {
                                        "article": self.state.outputHTML,
                                        "tittle": self.state.tittle,
                                        "ban_kuai": self.state.ban_kuai,
                                        "lan_mu":self.state.lan_mu,
                                        "duan_xin":self.state.duan_xin,
                                        "now": moment().format('YYYY-MM-DD HH:mm:ss')
                                    },
                                    successFunc: function (response) {
                                        console.log(response);
                                        self.setState({
                                            myHTML: response.article
                                        });
                                    },
                                    errorFunc: function (e) {
                                        console.log(e);
                                    },
                                    encode: true
                                });
                            }
                            }>上传文章</Button>
                    </Col>
                    <Col span={2}></Col>
                </Row>

            </div>
        )
    }
}