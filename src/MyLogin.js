import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col, Input, Button, Icon } from 'antd';
import Qs from 'qs';
import axios from 'axios';

export default class MyLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            smscode:'',
        }
    }

    f_yan_zheng_ma = (e) =>{
        console.log(e);
    }

    f_deng_lu = (e) =>{
        console.log(e);
        let self = this;
        // self.props.historyhistory.push("/?username=wmm&role=admin") ;
        let data = {
            "username": this.state.username,
            "smscode":this.state.smscode
        }
        this.props.history.push({ pathname: '/', state: { data } });

        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'http://114.116.152.155:8080/role/login',
            data: Qs.stringify(data)
        }).then(function (response) {
            console.log(response);
            self.props.historyhistory.push("/?username=wmm&role=admin") 
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div >
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <h1>激励管理系统</h1>
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
                    <Col span={1}>
                    </Col>
                    <Col span={2}>
                        <Button
                            type="default"
                            onClick = {this.f_yan_zheng_ma}
                            style={{ width: '100%', height: '100%' }}
                        > 验证码</Button>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Button
                            type="primary"
                            onClick = {this.f_deng_lu}
                            style={{ width: '100%', height: '100%' }}
                        > 登陆</Button>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </div>
        )
    }
}