import React, { useEffect, useState } from "react";
import { getAcceptedAppointmentsByUserId } from "../../utils/api";
import { List, message, Button,Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const DoctorChatPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const patientId = localStorage.getItem("patient_id");
    getAcceptedAppointmentsByUserId(patientId, "accepted")
      .then((appointments) => {
        setAppointments(appointments);
      })
      .catch((error) => {
        message.error("Failed to load appointments");
      });
  }, []);
  const handleChatRoom = (appointment) => {
    console.log(`Opening chat room for appointment with id: ${appointment._id}`);
    // TODO: Implement the chat room functionality
    navigate(`/chat/patient/${appointment.room_id}`, { state: { doctorName: appointment.doctorname, doctor_id : appointment.doctor_id }});
    
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography>
        <Title level={1}>Accepted Appointments</Title>
        <Paragraph>
        This is an online consultation. Each chatroom has a unique code so that
        it can only be accessed by the user and the particular doctor.
        </Paragraph>
      </Typography>
      {appointments && appointments.length === 0 ? (
        <p>No accepted appointments yet</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={(appointment) => (
            <List.Item
              key={appointment.id}
              actions={[
                  <Button key="chat" type="primary" onClick={() => handleChatRoom(appointment)}>Chatroom</Button>
              ]}
            >
              <List.Item.Meta
                title={`Doctor: ${appointment.doctorname}`}
                description={`Notes: ${appointment.notes}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default DoctorChatPage;
