import React, { useEffect, useState } from "react";
import {
  listAppointmentsByDoctorId,
  acceptAppointment,
  rejectAppointment,
} from "../../utils/api";
import { Button, List, message } from "antd";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

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
            if (appointment.id === appointmentId) {
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
            if (appointment.id === appointmentId) {
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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Appointments</h1>
      <List
        itemLayout="horizontal"
        dataSource={appointments}
        renderItem={(appointment) => (
          <List.Item
            key={appointment._id}
            actions={
              appointment.status === "Accepted"
                ? [
                    <div style={{ color: "green" }}>Accepted</div>,
                    <Button type="primary">Chatroom</Button>,
                  ]
                : appointment.status === "Rejected"
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
            {appointment.status === "Accepted" ? (
              <div style={{ color: "green" }}>Accepted</div>
            ) : appointment.status === "Rejected" ? (
              <div style={{ color: "red" }}>Rejected</div>
            ) : null}

            {appointment.status === "Pending" ? (
              <div>
                <Button
                  type="primary"
                  onClick={() => handleAccept(appointment._id)}
                >
                  Accept
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleReject(appointment._id)}
                >
                  Reject
                </Button>
              </div>
            ) : null}

            <div>{`Time: ${new Date(
              appointment.appointment_time
            ).toLocaleTimeString()}`}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AppointmentsPage;