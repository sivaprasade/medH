import React from "react";
import { Typography, Input, Button, Form, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../.././utils/api";

const { Title } = Typography;
const { Option } = Select;

const PatientRegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await registerUser(values);
      if (response && response.access_token) {
        console.log(response);
        const user = response.user;
        const userId = user.id;
        const userName = values.name;
        const userType = "patient";
        message.success("Patient registered successfully");
        console.log("Registration successful");
        localStorage.setItem("access_token", response.access_token);
        console.log(`${userType} ${userName} logged in successfully`);
        localStorage.setItem(`${userType}_id`, userId);
        localStorage.setItem(`${userType}_name`, userName);
        localStorage.setItem("user_type", userType);
        navigate("/patient-home");
      } else {
        console.error("Error during registration");
        message.error("Error during registration. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration", error);
      message.error("Error during registration. Please try again later.");
    }
  };
  

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Title level={3}>Patient Registration</Title>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please enter your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender!" }]}
      >
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: "Please enter your age!" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientRegisterForm;
