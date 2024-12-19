/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from "./feature-login.module.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Card, Checkbox, Form, Alert } from 'antd';
import type { FormProps } from 'antd';
import { HeaderProps } from "libs/shared/core-ui/table/models/table.model";
import { useCallback, useEffect, useState } from "react";

import { AutoComplete } from "libs/shared/core-ui/auto-complete";
import { Select } from "libs/shared/core-ui/select";
import axios from "axios";
import Logo from "libs/shared/assets/logo.png";
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
export const FeatureLogin = () => {
    const [showError, setShowError] = React.useState(false);
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        if ((values.username == "user3@example.com" && values.password == "123456") || (values.username == "ravi@example.com" && values.password == "123456") || (values.username == "user1@example.com" && values.password == "123456") || (values.username == "user2@example.com" && values.password == "123456")){
            navigate("/app")
        }else{
            console.log("error");
            setShowError(true);
        }
        // if ((values.username == "ravi@example.com" && values.password == "123456")) {
        //     navigate("/app")
        // }else{
        //     console.log("error");
        //     setShowError(true);
        // }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <img src={Logo} className={styles.logo} />
                </div>
                <section>
                </section>
            </header>
            <div className={styles.loginForm}>
                <Card style={{ width: 400, background: "transparent", border:"none" }}>
                    <div className={showError?styles.showError:styles.error}>
                    <Alert message="Invalid username or password" type="error" showIcon />
                    </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        </div>
    );
};
