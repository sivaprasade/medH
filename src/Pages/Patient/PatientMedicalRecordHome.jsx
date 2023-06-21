import React, { useState } from "react";
import { Typography, Button, Upload, message, Modal } from "antd";
import { Link } from "react-router-dom";
import { InboxOutlined,WechatOutlined } from "@ant-design/icons";
import { uploadMedicalFile } from "../../utils/api";
import ChatInterface from "../../components/Patient/ChatInterface";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;
const PatientMedicalRecordHome = () => {
  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFileChange = (info) => {
    const  status  = info.file;
    console.log("Info",info)
    console.log("Status",status);
    if (status) {
      message.success(`${info.file.name} file uploaded successfully.`);
      setFile(info.file);
    } else {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFileUpload = async () => {
    setModalVisible(false);
    if (file === null) {
      message.warning("Please select a file.");
      return;
    }
    const userId = localStorage.getItem("patient_id");
    console.log(file)
    const result = await uploadMedicalFile(userId, file);
    if (result) {
      message.success("File uploaded successfully.");
      setFile(null);
    } else {
      message.error("Failed to upload file.");
    }
  };

  return (
    <div className="site-card-border-less-wrapper">
      {/* <Card title="Medical Record" bordered={false} style={{ width: 400 }}> */}
      <Typography>
        <Title level={1}>Medical Record</Title>
        <Paragraph>
          Your medical record is currently shared with your doctor. The doctor
          will have access to view and update your record as needed.
        </Paragraph>
        <Paragraph>
          Please note that your record can also be accessed by you for your own
          reference.
        </Paragraph>
      </Typography>
       
        <div style={{ marginTop: 20 }}>
          <Link to="/list-medical-records">
            <Button type="primary" style={{ marginRight: 10 }}>
              View Medical Record
            </Button>
          </Link>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Upload Medical Record
          </Button>
          <Modal
            title="Upload Medical Record"
            visible={modalVisible}
            onOk={handleFileUpload}
            onCancel={() => {
              setModalVisible(false);
              setFile(null);
            }}
            okText="Upload"
            okButtonProps={{ disabled: file === null }}
          >
            <Dragger
              name="file"
              multiple={false}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Modal>
        </div>
      {/* </Card> */}
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

export default PatientMedicalRecordHome;
