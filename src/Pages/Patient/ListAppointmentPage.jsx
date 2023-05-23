import React, { useEffect, useState } from "react";
import { Button, List, message,Typography } from "antd";
import { deleteAppointment, editAppointment, listAppointmentsByUserId } from "../../utils/api";
import AppointmentForm from "../../components/Patient/AppointmentForm";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ListAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("patient_id");

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await listAppointmentsByUserId(userId);
      if (response) {
        setAppointments(response);
      } else {
        message.error("Failed to get appointments.");
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleEdit = async (appointment) => {
    setVisible(true);
    setAppointments(appointment);
    const appointment_id = localStorage.getItem("appointment_id");
    console.log(`Editing appointment with id: ${appointment_id}`);
    
    // TODO: Implement the edit appointment functionality
  
    const appointmentData = {
      ...appointment,
      appointment_id: appointment_id,
    };
  
    const response = await editAppointment(appointmentData);
  
    if (response) {
      message.success("Appointment edited successfully");
      handleCancel();
    } else {
      message.error("Failed to edit appointment");
    }
  };
  

  const handleCancel = () => {
    setVisible(false);
    setAppointments([]);
  };

  const handleDeleteAppointment = async (appointment) => {
    console.log(`Deleting appointment with id: ${appointment._id}`);
    const response = await deleteAppointment(appointment._id);

    if (response && response.message === "Appointment deleted successfully") {
      message.success("Appointment deleted successfully");
      setAppointments((prevAppointments) =>
        prevAppointments.filter((prevAppointment) => prevAppointment._id !== appointment._id)
      );
    } else {
      message.error("Failed to delete appointment");
    }
  };

  const handleEditAppointment = (appointment) => {
    setVisible(true);
    setAppointments(appointment)
    console.log(` appointment id: ${appointment._id}`);
    localStorage.setItem("appointment_id", appointment._id);
  }

  const handleChatRoom = (appointment) => {
    console.log(`Opening chat room for appointment with id: ${appointment._id}`);
    // TODO: Implement the chat room functionality
    navigate(`/chat/patient/${appointment.room_id}`, { state: { doctorName: appointment.doctorname, doctor_id :appointment.doctor_id }});
    
  };

  return (
    <div >
      <Typography>
        <Title level={1}>Your Appointments</Title>
        <Paragraph>
        Online consultations offer a range of advantages such as convenience, accessibility, and the 
        ability to access specialists from any location. However, they also have some disadvantages. 
        These can include lack of physical examination, potential miscommunications, and technological issues 
        that could impact the quality of care.
        </Paragraph>
      </Typography>
      {appointments.length > 0 ? (
        <List
          dataSource={appointments}
          itemLayout="horizontal"
          renderItem={(appointment) => (
            <List.Item
              actions={[
                appointment.status === "pending" ? (
                  <>
                    <Button key="edit" type="primary" onClick={() => handleEditAppointment(appointment)} style={{ marginRight: '10px' }}>
                      Edit
                    </Button>
                    <Button key="delete" type="primary" danger onClick={() => handleDeleteAppointment(appointment)}>
                      Delete
                    </Button>
                  </>
                ) : appointment.status === "accepted" ? (
                  <Button key="chat" type="primary" onClick={() => handleChatRoom(appointment)}>
                    Chat Room
                  </Button>
                ) : (
                  <Button key="delete" type="primary" danger onClick={() => handleDeleteAppointment(appointment)}>
                    Delete
                  </Button>
                ),
              ]}
             
            >
              <List.Item.Meta title={` ${appointment.doctorname}`}  />
            </List.Item>
          )}
        />
      ) : (
        <p>No appointments found.</p>
      )}
      {appointments && (
        <AppointmentForm
          visible={visible}
          onCancel={handleCancel}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
};

export default ListAppointmentPage;
