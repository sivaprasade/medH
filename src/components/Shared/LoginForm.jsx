import React, { useState } from "react";
import { Typography, Input, Button, Form, message, Radio } from "antd";
import { loginUser, loginDoctor } from "../../utils/api";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [form] = Form.useForm();

  const login = async (userType, credentials) => {
    if (userType === "patient") {
      return loginUser(credentials);
    } else if (userType === "doctor") {
      return loginDoctor(credentials);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };


  const handleSubmit = async (values) => {
    const response = await login(userType, values);
  
    if (response && response.access_token) {
      console.log("Login successful");
      localStorage.setItem("access_token", response.access_token);
  
      const user = response.user;
      const doctor = response.doctor;

      if (userType === "patient") {
        const userId = user._id;
        const userName = user.name;
        console.log(`${userType} ${userName} logged in successfully`);
        localStorage.setItem(`${userType}_id`, userId);
        localStorage.setItem(`${userType}_name`, userName);
        localStorage.setItem("user_type", userType);
        message.success(`${userType} logged in successfully`);
        navigate("/patient-home");
      } else if (userType === "doctor") {
        const doctorId = doctor._id;
        const doctorName = doctor.name;
        console.log(`${userType} ${doctorName} logged in successfully`);
        localStorage.setItem(`${userType}_id`, doctorId);
        localStorage.setItem(`${userType}_name`, doctorName);
        localStorage.setItem("user_type", userType);
        message.success(`${userType} logged in successfully`);
        navigate("/doctor-home");
      }
      
      
    } else {
      console.error("Error during login");
      message.error("Login failed");
    }
  };
  

  
  
  

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        initialValues={{ role: "patient" }}
      >
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role" }]}
        >
          <Radio.Group value={userType} onChange={handleUserTypeChange}>
            <Radio.Button value="patient">Patient</Radio.Button>
            <Radio.Button value="doctor">Doctor</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
