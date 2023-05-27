import React, { useState, useEffect } from "react";
import { Card, Button, List, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByDoctorStatus } from "../../utils/api";

const DoctorChatRoomHome = () => {
  const [appointments, setAppointments] = useState([]);
  const doctor_id = localStorage.getItem("doctor_id");
  const navigate = useNavigate();

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

  const handleChatRoom = (room_id, username,user_id) => {
    navigate(`/chat/doctor/${room_id}`, { state: { username,user_id } });
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Chat Rooms" bordered={false} style={{ width: "100%" }}>
        <p>
          Click on "Chat Room" button to start chatting with a patient.
        </p>
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={(appointment) => (
            <List.Item key={appointment._id}>
              <List.Item.Meta
                title={appointment.username}
                description={`Appointment Time: ${new Date(appointment.appointment_time).toLocaleString()}`}
              />
              <Button type="primary" onClick={() => handleChatRoom(appointment.room_id, appointment.username,appointment.user_id)}>
                  Chat Room
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DoctorChatRoomHome;
