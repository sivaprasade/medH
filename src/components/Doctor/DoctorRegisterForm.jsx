import React from "react";
import { Typography, Input, Button, Form, message } from "antd";
import { registerDoctor } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const DoctorRegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (values) => {
    console.log("Doctor Registration Form values:", values);
    const response = await registerDoctor(values);

    if (response && response.access_token) {
      message.success("Doctor registered successfully");
      console.log("Registration successful");
      localStorage.setItem("access_token", response.access_token);
      navigate("/doctor-home"); // Replace "/home" with the desired page for doctors after registration
    } else {
      message.error("Error registering doctor");
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Title level={3}>Doctor Registration</Title>
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
        label="Speciality"
        name="speciality"
        rules={[{ required: true, message: "Please enter your speciality!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Doctor ID"
        name="doc_id" // Change this field name
        rules={[{ required: true, message: "Please enter your doctor ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Years of Experience"
        name="years_of_experience" // Change this field name
        rules={[
          { required: true, message: "Please enter your years of experience!" },
        ]}
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

export default DoctorRegisterForm;
