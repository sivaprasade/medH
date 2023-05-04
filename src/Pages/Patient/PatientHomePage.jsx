import React, { useEffect , useState} from "react";
import { Button, Col, Row, message, Typography } from "antd";
import {
  WechatOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { logout_user } from "../../utils/api"; // Import the API function
import { useNavigate } from "react-router-dom";
import WithAuth from "../../context/withAuth";
import ChatInterface from "../../components/Patient/ChatInterface";

const { Title, Paragraph } = Typography;

const PatientHomePage = () => {
  const userId = localStorage.getItem("patient_id");
  const userName = localStorage.getItem("patient_name");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    console.log(`Patient ID: ${userId}`);
    console.log(`Patient Name: ${userName}`);
    setUserType(localStorage.getItem("user_type"));
  }, []);

  const navigate = useNavigate();

  const handleBookAppointment = () => {
    // Code for booking appointments
    navigate("/doctor-list");
  };

  const handleChatWithDoctor = () => {
    // Code for chatting with a doctor
  };

  const handleUploadMedicalRecords = () => {
    // Code for uploading medical records
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

  return (
    <div style={{ padding: "2rem" }}>
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
            icon={<UploadOutlined />}
            onClick={handleUploadMedicalRecords}
          >
            Upload Medical Records
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
