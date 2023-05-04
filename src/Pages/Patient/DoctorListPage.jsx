import React, { useEffect, useState } from "react";
import { Button, List, message } from "antd";
import { getDoctors, bookAppointment, getAppointmentsByDoctorId } from "../../utils/api";
import AppointmentForm from "../../components/Patient/AppointmentForm";

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("patient_id");
  const username = localStorage.getItem("patient_name");

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await getDoctors();
      if (response) {
        setDoctors(response);
      } else {
        message.error("Failed to get doctors.");
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointmentsByDoctorId(selectedDoctor?._id);
      if (response) {
        setAppointments(response);
      } else {
        message.error("Failed to get appointments.");
      }
    };

    if (selectedDoctor) {
      fetchAppointments();
    } else {
      setAppointments([]);
    }
  }, [selectedDoctor]);

  const handleBookAppointment = (doctor) => {
    setVisible(true);
    setSelectedDoctor(doctor);
    console.log(`Selected doctor id: ${doctor._id}`);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = async (values) => {
    const user_id = userId;
    const doctor_id = selectedDoctor._id;

    const appointmentData = {
      ...values,
      username,
      user_id,
      doctor_id,
      status: "pending",
    };

    const response = await bookAppointment(appointmentData);

    if (response && response.message === "Appointment booked successfully") {
      message.success("Appointment booked successfully");
      handleCancel();
    } else {
      message.error("Failed to book appointment");
    }
  };

  const handleEditAppointment = (appointment) => {
    console.log(`Editing appointment with id: ${appointment._id}`);
  };

  const handleDeleteAppointment = (appointment) => {
    console.log(`Deleting appointment with id: ${appointment._id}`);
  };

  return (
    <div>
      {doctors.length > 0 ? (
        <List
        dataSource={doctors}
        renderItem={(doctor) => {
          const appointment = appointments.find(
            (appointment) => appointment.doctor_id === doctor._id
          );
      
          if (appointment) {
            return (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    type="primary"
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    Edit Appointment
                  </Button>,
                  <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={() => handleDeleteAppointment(appointment)}
                  >
                    Delete Appointment
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={doctor.name}
                  description={`Speciality: ${doctor.speciality}, Years of experience: ${doctor.years_of_experience}`}
                />
              </List.Item>
            );
          } else {
            return (
              <List.Item
                actions={[
                  <Button
                    key="book"
                    type="primary"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={doctor.name}
                  description={`Speciality: ${doctor.speciality}, Years of experience: ${doctor.years_of_experience}`}
                />
              </List.Item>
            );
          }
        }}
      />
      
      ) : (
        <p>No doctors available.</p>
      )}
      {selectedDoctor && (
        <AppointmentForm
          visible={visible}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default DoctorListPage;
