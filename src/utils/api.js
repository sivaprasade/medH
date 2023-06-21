// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8000"; // Replace with your server's URL

// ---------------------- user ---------------------- //

// register user
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/api/register/user`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/login/user`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during user login:", error);
    return null;
  }
};


// get user by id
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};


// logout user
export const logout_user = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/api/logout/user`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during user logout:", error);
    return null;
  }
};

// ---------------------- doctor ---------------------- //

// login doctor
export const loginDoctor = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/login/doctor`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error during doctor login:", error);
    return null;
  }
};

// register doctor
export const registerDoctor = async (doctor) => {
  try {
    const response = await axios.post(`${API_URL}/api/register/doctor`, doctor);
    return response.data;
  } catch (error) {
    console.error("Error registering doctor:", error);
    return null;
  }
};

// logout doctor
export const logout_doctor = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/api/logout/doctor`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during doctor logout:", error);
    return null;
  }
};

// list doctors
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/doctors`);
    return response.data;
  } catch (error) {
    console.error("Error getting doctors:", error);
    return null;
  }
};

// get doctor by id
export const getDoctorById = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/api/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// ---------------------- chatbot ---------------------- //

//gpt prediction
export const diseasePrediction = async (requestBody) => {
  try {
    const response = await axios.post(`${API_URL}/api/disease-prediction`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error during disease prediction:", error);
    return null;
  }
};


// chatbot message
export const chatbotMessage = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/api/chatbot/message`, {
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    return null;
  }
};

// predict disease
export const predictDisease = async (symptoms) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict`, symptoms);
    return response.data;
  } catch (error) {
    console.error("Error during disease prediction:", error);
    return null;
  }
};


// ---------------------- appointment ---------------------- //

// book appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const data = {
      ...appointmentData,
      status: "pending",
    };
    const response = await axios.post(`${API_URL}/api/appointments`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// patient appointments to doctor
export const getAppointmentsByDoctorId = async (doctorId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/appointments/by-doctor/${doctorId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// list appointments by doctor id
export const listAppointmentsByDoctorId = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// accept appointment
export const acceptAppointment = async (appointmentId) => {
  try {
    console.log(appointmentId);
    const response = await axios.put(`${API_URL}/api/appointments/${appointmentId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Error accepting appointment:", error);
    return null;
  }
};

// reject appointment
export const rejectAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(`${API_URL}/api/appointments/${appointmentId}/reject`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    return null;
  }
};

// list appointments by user id
export const listAppointmentsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments/by-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// edit appointment
export const editAppointment = async (appointmentData) => {
  try {
    const data = {
      appointment_id : appointmentData.appointment_id,
      new_appointment_time: appointmentData.appointment_time,
      new_notes: appointmentData.notes,
    };
    const appointmentId = appointmentData.appointment_id;
    const response = await axios.patch(`${API_URL}/api/appointments/${appointmentId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// delete appointment
export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// get accepted appointments by user id
export const getAcceptedAppointmentsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments/by-status-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// get appointments by doctor and status
export const getAppointmentsByDoctorStatus = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments/by-status-doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting appointments by doctor and status:", error);
    return null;
  }
};



// ---------------------- ChatRoom ---------------------- //

// send message in chat room
export const sendMessage = async (roomId, message, senderId) => {
  const payload = {
    content: message,
    sender_id: senderId,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await axios.post(`${API_URL}/api/chat/${roomId}/send`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: { sender_id: senderId }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

//---------------------- Notification ---------------------- //

// list all notifications
export const listNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/notifications`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error listing notifications:", error);
    return null;
  }
};

// list notifications for a particular user
export const listNotificationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/notifications/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error listing notifications by user:", error);
    return null;
  }
};

// get the count of notifications for a particular user
export const getNotificationCountByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/notifications/user/${userId}/count`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.count;
  } catch (error) {
    console.error("Error getting notification count by user:", error);
    return 0;
  }
};


// get messages in chat room
export const getMessages = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/api/${roomId}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting messages:", error);
    return null;
  }
};


// ---------------------- Medical Records ---------------------- //

// add medical record
export const addMedicalRecord = async (record) => {
  try {
    const response = await axios.post(`${API_URL}/api/medical-data`, record, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding medical record:", error);
    return null;
  }
};

// update medical record
export const updateMedicalRecord = async (recordId, record) => {
  try {
    const response = await axios.patch(`${API_URL}/api/medical-data/${recordId}`, record, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating medical record:", error);
    return null;
  }
};

// get medical record
export const getMedicalRecord = async (recordId) => {
  try {
    const response = await axios.get(`${API_URL}/api/medical-data/${recordId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting medical record:", error);
    return null;
  }
};

// upload medical file
export const uploadMedicalFile = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_URL}/api/medical-data/${userId}/upload-file`, formData, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading medical file:", error);
    return null;
  }
};

// get medical file
export const getMedicalFile = async (userId, filename) => {
  try {
    const response = await axios.get(`${API_URL}/api/medical-data/${userId}/file/${filename}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      responseType: "blob",
    });
    const file = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    return url;
  } catch (error) {
    console.error("Error getting medical file:", error);
    return null;
  }
};


// Get medical files
export const getMedicalFiles = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/medical-data/${userId}/files`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting medical files:", error);
    return null;
  }
};

// Download medical file
export const downloadMedicalFile = async (userId, fileId, filename) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/medical-data/${userId}/file/${fileId}/${filename}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading medical file:", error);
  }
};

// ---------------------- prescriptions ---------------------- //

// add prescription
export const addPrescription = async (prescription) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prescriptions`,
      prescription
    );
    return response.data;
  } catch (error) {
    console.error("Error during adding prescription:", error);
    return null;
  }
};

// get prescriptions
export const getPrescriptions = async (doctor_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/prescriptions/${doctor_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error during getting prescriptions:", error);
    return null;
  }
};

// Download prescription
export const downloadPrescription = async (prescription_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/download_prescription/${prescription_id}`, 
      { responseType: 'blob' }  // responseType is important here, it tells axios to return binary data
    );

    // Create a blob URL from the binary data and initiate a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prescription_${prescription_id}.pdf`);
    document.body.appendChild(link);
    link.click();

  } catch (error) {
    console.error("Error during prescription download:", error);
    return null;
  }
};



// ---------------------- disease prediction ---------------------- //

export const predictCancer = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict_cancer`, data);
    return response.data;
  } catch (error) {
    console.error("Error during cancer prediction:", error);
    return null;
  }
};

export const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict_diabetes`, data);
    return response.data;
  } catch (error) {
    console.error("Error during diabetes prediction:", error);
    return null;
  }
};

export const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict_heart`, data);
    return response.data;
  } catch (error) {
    console.error("Error during heart disease prediction:", error);
    return null;
  }
};

export const predictLiverDisease = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict_liver`, data);
    return response.data;
  } catch (error) {
    console.error("Error during liver disease prediction:", error);
    return null;
  }
};

// ---------------------- OCR report extraction ---------------------- //

export const uploadReport = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/api/uploadfile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during report upload:", error);
    return null;
  }
};
