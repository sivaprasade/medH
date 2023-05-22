import React,{useState} from "react";
import { List, Button, message, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getMedicalFiles, downloadMedicalFile } from "../../utils/api"

const { Title, Paragraph } = Typography;

const ListMedicalRecords = () => {
  const [files, setFiles] = useState([]);
  const userId = localStorage.getItem("patient_id");
  
  const fetchFiles = async () => {
    const result = await getMedicalFiles(userId);
    if (result) {
      setFiles(result);
      console.log(result);
    } else {
      message.error("Failed to fetch files.");
    }
  };

  const handleDownload = async (fileId, filename) => {
    const result = await downloadMedicalFile(userId, fileId, filename);
    if (result && result !== "File not found") {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([result]));
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      message.success("File downloaded successfully.");
    } else {
      //message.error("Failed to download file.");
    }
  };

  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <Typography>
        <Title level={1}>Medical Records</Title>
        <Paragraph>
          Storing medical records digitally brings a multitude of benefits. It ensures the data is safely kept and easily accessible for future reference. 
          Digital storage allows for seamless sharing of information between medical professionals which aids in providing coordinated and efficient healthcare. 
          It also empowers patients to actively participate in their healthcare journey. Here, you can download your medical records.
        </Paragraph>
      </Typography>
      <List
        dataSource={files}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            actions={[
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => handleDownload(item.file_id, item.filename)}
              >
                Download
              </Button>
            ]}
          >
            <List.Item.Meta
              title={<a href="#">{item.filename}</a>}
              description={new Date(item.uploadDate).toLocaleString()}
            />
            <div>{item.contentType}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListMedicalRecords;
