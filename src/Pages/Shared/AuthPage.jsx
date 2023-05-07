import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import LoginForm from "../../components/Shared/LoginForm";
import PatientRegisterForm from "../../components/Patient/PatientRegisterForm";
import DoctorRegisterForm from "../../components/Doctor/DoctorRegisterForm";
import "./AuthPage.css"; // import CSS file for styling

const AuthPage = () => {
  const [formType, setFormType] = useState("login");

  const renderForm = () => {
    switch (formType) {
      case "login":
        return <LoginForm />;
      case "patientRegister":
        return <PatientRegisterForm />;
      case "doctorRegister":
        return <DoctorRegisterForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <h1>Welcome to medH</h1>
        <p>
          medH is a platform for patients and doctors to manage medical
          records, appointments, and consultations.
        </p>
      </div>
      <div className="auth-page-form">
        <Row gutter={[16, 16]}>{renderForm()}</Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {formType === "login" ? (
              <>
                <Button onClick={() => setFormType("patientRegister")}>
                  Register as Patient
                </Button>
                <Button onClick={() => setFormType("doctorRegister")}>
                  Register as Doctor
                </Button>
              </>
            ) : (
              <Button onClick={() => setFormType("login")}>Back to Login</Button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthPage;
