import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const PatientMedicalRecordHome = () => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Medical Record" bordered={false} style={{ width: 400 }}>
        <p>
          Your medical record is currently shared with your doctor. The doctor
          will have access to view and update your record as needed.
        </p>
        <p>
          Please note that your record can also be accessed by you for your own
          reference.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link to="/medical-record/view">
            <Button type="primary" style={{ marginRight: 10 }}>
              View Medical Record
            </Button>
          </Link>
          <Link to="/medical-record/upload">
            <Button type="primary">Upload Medical Record</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PatientMedicalRecordHome;
