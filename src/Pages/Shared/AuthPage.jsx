import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import LoginForm from "../../components/Shared/LoginForm";
import PatientRegisterForm from "../../components/Patient/PatientRegisterForm";
import DoctorRegisterForm from "../../components/Doctor/DoctorRegisterForm";

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
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "2rem" }}>
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
  );
};

export default AuthPage;
