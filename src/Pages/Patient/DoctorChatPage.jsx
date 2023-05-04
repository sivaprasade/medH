import React, { useEffect, useState } from "react";
import { getAcceptedAppointmentsByUserId } from "../../utils/api";
import { List, message, Button } from "antd";
import { Link } from "react-router-dom";

const DoctorChatPage = () => {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Accepted Appointments</h1>
      <p>
        This is an online consultation. Each chatroom has a unique code so that
        it can only be accessed by the user and the particular doctor.
      </p>
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
                <Link to={`/chat/${appointment.room_id}`}>
                  <Button type="primary">Chatroom</Button>
                </Link>,
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
