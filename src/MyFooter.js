import { Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import React from 'react'
import Qs from 'qs'
import axios from 'axios'
import 'antd/dist/antd.css';
import './index.css';


export default class MyFooter extends React.Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <br></br>
                <Row>

                    <Col span={2}>

                    </Col>
                    <Col span={20}>
                        友情链接：
                    <Tag color="red" href={'http://www.chzrd.gov.cn/'}>无</Tag>
                        <Tag color="red" href={'http://www.ahrd.gov.cn/ahrdweb/'} >无</Tag>
                    </Col>
                    <Col span={2}>

                    </Col>
                </Row>
                <Row>
                <Col span={8}>

</Col>
                    <Col span={8} aling={'center'}>
                        激励管理系统

                    </Col>
                    <Col span={8}>

</Col>
                </Row>

            </div>
        );
    }
}