import React, { useEffect, useState } from "react";
import { Button, Col, Row, message, Typography, Popover, Badge } from "antd";
import {
  WechatOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  FileOutlined,
  BellOutlined,
  SolutionOutlined,
  FileImageOutlined
} from "@ant-design/icons";
import { logout_user, getNotificationCountByUser } from "../../utils/api"; // Import the API function
import { useNavigate } from "react-router-dom";
import ChatInterface from "../../components/Patient/ChatInterface";
import Notification from "../../components/Patient/Notification";

const { Title, Paragraph } = Typography;

const PatientHomePage = () => {
  const userId = localStorage.getItem("patient_id");
  const userName = localStorage.getItem("patient_name");
  const userType = "patient";

  useEffect(() => {
    console.log(`Patient ID: ${userId}`);
    console.log(`Patient Name: ${userName}`);
  }, []);

  const navigate = useNavigate();

  const handleBookAppointment = () => {
    // Code for booking appointments
    navigate("/appointment-home");
  };

  const handleChatWithDoctor = () => {
    // Code for chatting with a doctor
    navigate("/chat-home");
  };

  const handleUploadMedicalRecords = () => {
    // Code for uploading medical records
    navigate("/medical-records");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    const response = await logout_user(token);
    if (response) {
      localStorage.removeItem("access_token");
      message.success("Logged out successfully");
      console.log(`Logging out user ${userName} with type ${userType}`);
      navigate("/");
    } else {
      console.error("Error during logout");
    }
  };

  const [visible, setVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const countResponse = await getNotificationCountByUser(userId);
      console.log("countResponse:", countResponse); // Debugging statement
      if (countResponse && countResponse.count) {
        setNotificationCount(countResponse.count);
      }
    };
    fetchNotificationCount();
  }, [userId]);

  const handleVisibleChange = async (visible) => {
    setVisible(visible);
    if (visible) {
      const countResponse = await getNotificationCountByUser(userId);
      console.log("countResponse:", countResponse); // Debugging statement
      if (countResponse && countResponse.count) {
        setNotificationCount(countResponse.count);
      }
    } else {
      setNotificationCount(0);
    }
  };

  console.log("notificationCount:", notificationCount); // Debugging statement

  const handlelifestyledisease = ()=>{
    navigate("/life-style")
  }

  const handleimageprocessing = ()=>{
    navigate("/image-processing")
  }


  return (
    <div style={{ padding: "2rem" }}>
      <Popover
        content={<Notification />}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottomRight"
      >
        <Badge count={notificationCount}>
          <BellOutlined style={{ fontSize: "24px" }} />
        </Badge>
      </Popover>
      <Row justify="space-between">
        <Col>
          <Typography>
            <Title>Welcome to MedH</Title>
          </Typography>
        </Col>
      </Row>
      <Paragraph>
        MedH is a medical app designed to provide seamless healthcare services
        for patients. You can book appointments with doctors, chat with doctors
        in real-time, and upload your medical records for better diagnosis and
        treatment.
      </Paragraph>
      <Paragraph>
        Your health is your most valuable asset, and it is important to take
        care of it. Regular checkups, proper nutrition, exercise, and good sleep
        habits can help you maintain your physical and mental health.
      </Paragraph>
      <Paragraph>
        Self-treatment can be tempting, especially if you are experiencing minor
        symptoms or have a busy schedule. However, it is important to remember
        that self-treatment can have serious consequences, such as incorrect
        diagnosis, delayed treatment, and even harmful side effects from
        medications. It is always best to consult with a doctor before
        attempting any self-treatment.
      </Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            icon={<ScheduleOutlined />}
            onClick={handleBookAppointment}
          >
            Book Appointment
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<WechatOutlined />}
            onClick={handleChatWithDoctor}
          >
            Chat with Doctor
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<FileOutlined />}
            onClick={handleUploadMedicalRecords}
          >
            Medical Records
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<SolutionOutlined />}
            onClick={handlelifestyledisease}
          >
            Life Style Disease Prediction
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<FileImageOutlined />}
            onClick={handleimageprocessing}
          >
            Image Processing
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Col>
      </Row>
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

export default PatientHomePage;
