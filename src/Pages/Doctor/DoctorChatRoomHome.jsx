import React, { useState, useEffect } from "react";
import { Card, Button, List, message } from "antd";
import { Link } from "react-router-dom";
import { getAppointmentsByDoctorStatus } from "../../utils/api";

const DoctorChatRoomHome = () => {
  const [appointments, setAppointments] = useState([]);
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
              <Button type="primary">
                <Link to={`/chat/doctor/${appointment.room_id}`}>Chat Room</Link>
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DoctorChatRoomHome;
