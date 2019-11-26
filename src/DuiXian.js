import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import { Upload, message, Select, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import MyHeader from './MyHeader'
import AppGlobal from './AppGlobal'

export default class DuiXian extends React.Component {
    state = {
        活动清单: ['测试'],
        tittle: '',
        type: '已发布',
        usertoken: '',
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
                    window.location.href = AppGlobal.url.login
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

            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.get_tittle_list,
                data: Qs.stringify(data)
            }).then(function (response) {
                console.log(response)
                self.setState({
                    活动清单: response.data
                })
            })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (e) {
            window.location.href = AppGlobal.url.login
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {
        const { Option } = Select

        const props = {
            name: 'file',
            action: AppGlobal.url.upload,
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

        return (
            <div>
                <MyHeader></MyHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <label>选择活动:</label>
                        <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
                            {
                                this.state.活动清单.map((item) => {
                                    return (
                                        <Option value={item}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                        <label>上传清单:</label>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 点击上传文件
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}