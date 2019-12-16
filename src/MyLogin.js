import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col, Input, Button, Icon } from 'antd';
import Qs from 'qs';
import axios from 'axios';
import AppGlobal from './AppGlobal'
export default class MyLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            smscode: '',
        }
    }

    f_yan_zheng_ma = (e) => {
        console.log(e);
    }

    f_deng_lu = (e) => {
        console.log(e);
        let self = this;

        let data = {
            "usertoken": "123456"
        }
        // window.location.href = AppGlobal.url.index + '?usertoken=123456'
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
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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