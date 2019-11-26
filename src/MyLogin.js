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
            smscode:'',
        }
    }

    f_yan_zheng_ma = (e) =>{
        console.log(e);
    }

    f_deng_lu = (e) =>{
        console.log(e);
        let self = this;

        let data = {
            "usertoken":"123456"
        }
        window.location.href = AppGlobal.url.index+'?usertoken=123456'
        // this.props.history.push({search:'?usertoken=123456'})
        // this.props.history.push({ pathname: '/', state: { data } });

        // let login_data = {
        //     "username": this.state.username,
        //     "smscode":this.state.smscode
        // }
        // axios({
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     method: 'post',
        //     url: AppGlobal.url.javaurl_login,
        //     data: Qs.stringify(login_data)
        // }).then(function (response) {
        //     console.log(response);
        //     let data = {
        //         "my_takeon":response.data
        //     }
        //     this.props.history.push({ pathname: '/', state: { data } });
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    render() {
        return (
            <div >
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <h1>{AppGlobal.url.javaurl_login}</h1>
                        
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