import React, { useState, useEffect } from "react";
import { Card, Button, List, message, Modal } from "antd";
import { getMedicalFiles, downloadMedicalFile, getAppointmentsByDoctorStatus } from "../../utils/api";

const MedicalRecordsForDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const doctor_id = localStorage.getItem("doctor_id");

  useEffect(() => {
    async function fetchData() {
      try {
        const appointments = await getAppointmentsByDoctorStatus(doctor_id);
        setAppointments(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        message.error("Failed to fetch appointments.");
      }
    }
    fetchData();
  }, []);

  const handleViewMedicalRecords = async (appointment) => {
    setSelectedPatient(appointment.username);
    try {
      const medicalFiles = await getMedicalFiles(appointment.user_id);
      setMedicalRecords(medicalFiles);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching medical files:", error);
      message.error("Failed to fetch medical files.");
    }
  };

  const handleDownloadMedicalFile = async (user_Id,file_Id, filename) => {
    try {
      await downloadMedicalFile(user_Id,file_Id, filename);
      message.success("File downloaded successfully.");
    } catch (error) {
      console.error("Error downloading file:", error);
      message.error("Failed to download file.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMedicalRecords([]);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Medical Records" bordered={false} style={{ width: "100%" }}>
        <p>
          Medical records are highly confidential and should only be accessed
          for medical purposes. Any unauthorized use of medical records is
          strictly prohibited.
        </p>
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={(appointment) => (
            <List.Item key={appointment._id} >
              <List.Item.Meta
                title={appointment.username}
                description={appointment.notes}
              />
              <Button
                type="primary"
                onClick={() => handleViewMedicalRecords(appointment)}
              >
                View Medical Records
              </Button>
            </List.Item>
          )}
        />
        <Modal
          title={`Medical Records for ${selectedPatient}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {medicalRecords.length > 0 ? (
            medicalRecords.map((record) => (
              <div key={record.file_id} style={{ marginBottom: 20 }}>
                <p>{record.filename}</p>
                <Button
                  type="primary"
                  onClick={() => handleDownloadMedicalFile(record.user_id, record.file_id, record.filename)}
                >
                  Download
                </Button>
              </div>
            ))
          ) : (
            <p>No medical records found.</p>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default MedicalRecordsForDoctor;
