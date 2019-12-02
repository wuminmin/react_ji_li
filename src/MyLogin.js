import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col, Input, Button, Icon, message } from 'antd';
import Qs from 'qs';
import axios from 'axios';
import AppGlobal from './AppGlobal'
export default class MyLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userphone: '',
            smscode: '',
        }
    }

    handle_userphone = (e) => {
        console.log(e.target.value);
        this.setState({ userphone: e.target.value });
    }

    handle_smscode = (e) => {
        console.log(e.target.value);
        this.setState({ smscode: e.target.value });
    }


    f_yan_zheng_ma = (e) => {
        console.log(e);
        let self = this;
        try {
            let myVar = {
                "userphone": this.state.userphone,
                "smscode": this.state.smscode
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url: AppGlobal.url.send_sms,
                data: Qs.stringify(myVar)
            }).then(function (response) {
                console.log(response)
                message.success(`${response.data.code}`);
            })
                .catch(function (error) {
                    console.log(error);
                    message.error('error');
                });

        } catch (e) {
            console.log(e);
            message.error('error');
            //   window.location.href = AppGlobal.url.login
        }

    }

    f_deng_lu = (e) => {
        console.log(e);
        let self = this;
        let myVar = {
            "userphone": self.state.userphone,
            "smscode": self.state.smscode
        }
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: AppGlobal.url.deng_lu,
            data: Qs.stringify(myVar)
        }).then(function (response) {
            console.log(response)
            if (response.data.code === '成功') {
                window.location.href = AppGlobal.url.index + '?usertoken=' + response.data.usertoken
            } else {
                message.success(`${response.data.code}`);
            }
        })
            .catch(function (error) {
                message.error('error');
            });
    }

    render() {
        return (
            <div >
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8} align={'center'}>
                        <h1>激励助手</h1>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Input
                            onChange={this.handle_userphone}
                            value={this.state.userphone}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="手机号"
                        />
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={5}>
                        <Input
                            onChange={this.handle_smscode}
                            value={this.state.smscode}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="验证码"
                        />
                    </Col>
                    <Col span={3} align={'center'}>
                        <Button onClick={this.f_yan_zheng_ma} type="default" block>
                            验证码
                        </Button>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Button onClick={this.f_deng_lu} type="primary" block>
                            登陆
                        </Button>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </div>
        )
    }
}