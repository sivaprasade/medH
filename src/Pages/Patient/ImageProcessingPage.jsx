import React, { useState } from 'react';
import { Upload, Button, Modal, Card, Typography, message } from 'antd';
import { InboxOutlined, UploadOutlined, DatabaseOutlined } from '@ant-design/icons';
import { uploadReport } from '../../utils/api';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const ImageProcessingPage = () => {
  const [fileList, setFileList] = useState([]);
  const [extractedData, setExtractedData] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpload = async () => {
    const file = fileList[0];
    const user_id = localStorage.getItem("patient_id");

    // Call the API with the file object
    const data = await uploadReport(user_id, file);
    
    setExtractedData(data);
    setFileList([]);
    setVisible(true); // Display the modal with the extracted data
  };
  
  const handlePreview = async () => {
    setVisible(true);
  };

  const handleFileChange = info => {
    const  status  = info.file;
    console.log("Info",info)
    console.log("Status",status);
    if (status) {
      message.success(`${info.file.name} file uploaded successfully.`);
      setFileList([info.file]); // Change is here
    } else {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Card>
        <Title>Extract data from Laboratory Reports</Title>
        <Paragraph>
          Upload your laboratory report, and our advanced image processing will extract important data from it.
        </Paragraph>
        <Button icon={<UploadOutlined/>} type="primary" onClick={() => setModalVisible(true)} style={{ marginRight: 10 }}>
          Upload Report
        </Button>
        <Modal
          title="Upload Medical Record"
          visible={modalVisible}
          onOk={handleUpload}
          onCancel={() => {
            setModalVisible(false);
            setFileList([]);
          }}
          okText="Upload"
          okButtonProps={{ disabled: fileList.length === 0 }}
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
        <Button icon={<DatabaseOutlined />} type='primary' onClick={handlePreview} style={{ marginTop: 16 }}>
          View Extracted Data
        </Button>
      </Card>
      <Modal visible={visible} onCancel={handleClose} footer={null}>
        <pre>{JSON.stringify(extractedData, null, 2)}</pre>
      </Modal>
    </div>
  );
};

export default ImageProcessingPage;
