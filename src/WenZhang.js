import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import { Select, Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader'
import AppGlobal from './AppGlobal'

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
        type: '已发布',
        usertoken:new URLSearchParams(this.props.location.search).get('usertoken'),
        username: '',
        userphone: '',
        userrole: '',
        mainid: '',
        type1: '',
        type2: '',
        type3: '',
    }

    componentDidMount() {
        this.isLivinig = true
        let self = this;
        try {
            let data = {
                "s":"0",
                "c":"testService",
                "m": "getUserInfo",
                "data":{"usertoken":new URLSearchParams(this.props.location.search).get('usertoken')}
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
                if (response.data.username === '') {
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

        } catch (e) {
            // window.location.href = AppGlobal.url.login
        }
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
        this.setState({ type: e.target.value });
    }

    handleChangeBanShiRiQi2 = (e) => {
        this.setState({ tittle: e.target.value });
    }

    render() {

        const { editorState, outputHTML, myHTML } = this.state

        return (
            <div>
                <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken') }></MyHeader>
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
                        <h5>选择活动对象</h5>
                        <Demo></Demo>
                        <Button
                            type="primary"
                            onClick={e => {
                                let self = this;
                                let data = {
                                    "s":"0",
                                    "c":"testService",
                                    "m": "rd_updata",
                                    "data":{
                                        "article": self.state.outputHTML,
                                        "tittle": self.state.tittle,
                                        "mylan_mu": self.state.type,
                                        "now": moment().format('YYYY-MM-DD HH:mm:ss')
                                    }
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
                                    self.setState({
                                        myHTML: response.data.m
                                    });
                                })
                                    .catch(function (error) {
                                        console.log(error);
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