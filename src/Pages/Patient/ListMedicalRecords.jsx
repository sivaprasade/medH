import React,{useState} from "react";
import { List, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getMedicalFiles, downloadMedicalFile } from "../../utils/api"

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
