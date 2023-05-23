import React, { useEffect, useState } from "react";
import {
  listAppointmentsByDoctorId,
  acceptAppointment,
  rejectAppointment,
} from "../../utils/api";
import { Button, List, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = localStorage.getItem("doctor_id");
    listAppointmentsByDoctorId(doctorId)
      .then((appointments) => {
        setAppointments(appointments);
      })
      .catch((error) => {
        message.error("Failed to load appointments");
      });
  }, []);

  const handleAccept = (appointmentId) => {
    acceptAppointment(appointmentId)
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) => {
            if (appointment._id === appointmentId) {
              appointment.status = "Accepted";
            }
            return appointment;
          })
        );
        message.success("Appointment accepted and chatroom created");
      })
      .catch((error) => {
        message.error("Failed to accept appointment");
      });
  };

  const handleReject = (appointmentId) => {
    rejectAppointment(appointmentId)
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) => {
            if (appointment._id === appointmentId) {
              appointment.status = "Rejected";
            }
            return appointment;
          })
        );
        message.warning("Appointment rejected");
      })
      .catch((error) => {
        message.error("Failed to reject appointment");
      });
  };

  const handleChatRoom = (room_id, username, user_id) => {
    navigate(`/chat/doctor/${room_id}`, { state: { username , user_id} });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography>
        <Title level={1}>Appointments</Title>
        <Paragraph>
          Here, you can manage all your appointments. Accept or reject appointments and communicate with patients through the chatroom.
        </Paragraph>
      </Typography>
      {appointments && appointments.length === 0 ? (
        <Paragraph>No appointments yet</Paragraph>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={(appointment) => (
            <List.Item
              key={appointment.id}
              actions={
                appointment.status === "accepted"
                  ? [
                      <div style={{ color: "green" }}>Accepted</div>,
                      <Button
                        type="primary"
                        onClick={() => handleChatRoom(appointment.room_id, appointment.username, appointment.user_id)}
                      >
                        Chatroom
                      </Button>,
                    ]
                  : appointment.status === "rejected"
                  ? [<div style={{ color: "red" }}>Rejected</div>]
                  : [
                      <Button
                        type="primary"
                        onClick={() => handleAccept(appointment._id)}
                      >
                        Accept
                      </Button>,
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleReject(appointment._id)}
                      >
                        Reject
                      </Button>,
                    ]
              }
            >
              <List.Item.Meta
                title={`Patient: ${appointment.username}`}
                description={`Notes: ${appointment.notes}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
