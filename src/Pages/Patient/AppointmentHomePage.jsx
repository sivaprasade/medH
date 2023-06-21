import React from "react";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import {WechatOutlined} from "@ant-design/icons";
import ChatInterface from "../../components/Patient/ChatInterface";

const { Title, Paragraph } = Typography;

const AppointmentHomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>Welcome to our Online Doctor Chat Service</Title>
      <Paragraph>
        Online doctor chat has become a popular way for patients to get medical
        advice and treatment. One of the advantages of online chatting with a
        doctor is convenience - patients can chat with a doctor from anywhere,
        at any time. However, one of the disadvantages is that online chatting
        does not allow for a physical examination, which can be important for
        diagnosing some conditions.
      </Paragraph>
      <Paragraph>
        To stay healthy, it's important to eat a balanced diet, exercise
        regularly, get enough sleep, and manage stress. Here are some additional
        tips to help you stay healthy:
        <ul>
          <li>Wash your hands regularly with soap and water</li>
          <li>Avoid close contact with people who are sick</li>
          <li>
            Cover your mouth and nose with a tissue or your elbow when you cough
            or sneeze
          </li>
          <li>Get vaccinated against preventable diseases</li>
          <li>Limit your intake of alcohol and tobacco products</li>
        </ul>
      </Paragraph>
      <Paragraph>
        Remember, prevention is better than cure. Take care of yourself and
        consult a doctor if you have any concerns about your health.
      </Paragraph>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/doctor-list">
          <Button type="primary" style={{ marginRight: "1rem" }}>
            Available Doctors
          </Button>
        </Link>
        <Link to="/patient-appointments">
          <Button type="primary">Appointments</Button>
        </Link>
      </div>
      <Button
        type="primary"
        shape="circle"
        icon={<WechatOutlined />}
        size="large"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
        onClick={() => {
          // Code for opening the chatbot
        }}
      />
      <ChatInterface />
    </div>
  );
};

export default AppointmentHomePage;
