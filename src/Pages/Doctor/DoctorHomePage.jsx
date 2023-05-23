import React, { useEffect } from "react";
import { Button, Col, Row, message, Typography } from "antd";
import {
  BookOutlined,
  WechatOutlined,
  FileOutlined,
  LogoutOutlined,
  SolutionOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout_doctor } from "../../utils/api";
import WithAuth from "../../context/withAuth";


const { Title, Paragraph } = Typography;

const DoctorHomePage = ({ token }) => {

  useEffect(() => {
    const doctorId = localStorage.getItem("doctor_id");
    const doctorName = localStorage.getItem("doctor_name");
    console.log(`Doctor ID: ${doctorId}`);
    console.log(`Doctor Name: ${doctorName}`);
  }, []);

  const navigate = useNavigate();

  const handleAppointments = () => {
    // Code for managing appointments
    navigate("/appointments");
  };

  const handleChatRooms = () => {
    // Code for managing chat rooms
    navigate("/doctor-chat-home");
  };

  const handleMedicalRecords = () => {
    // Code for accessing medical records
    navigate("/medical-records-for-doctor")
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    const response = await logout_doctor(token);
    if (response) {
      localStorage.removeItem("token");
      message.success("Logged out successfully")
      navigate("/");
    } else {
      console.error("Error during logout");
    }
  };

  const handlelifestyledisease = ()=>{
    navigate("/life-style")
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography>
        <Title>Welcome to MedH</Title>
        <Paragraph>
          MedH is a medical app designed to provide seamless healthcare services
          for patients. As a doctor, you can manage appointments, chat with
          patients in real-time, and access their medical records for better
          diagnosis and treatment.
        </Paragraph>
        <Paragraph>
          Your duty as a doctor is to provide the best care and treatment to
          your patients. By using MedH, you can easily manage your appointments
          and communicate with your patients to provide them with the best
          possible care.
        </Paragraph>
      </Typography>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            icon={<BookOutlined />}
            onClick={handleAppointments}
          >
            Appointments
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<WechatOutlined />}
            onClick={handleChatRooms}
          >
            Chat Rooms
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<FileOutlined />}
            onClick={handleMedicalRecords}
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
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorHomePage;
