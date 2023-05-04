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
export const gptPrediction = async (symptoms) => {
  try {
    const response = await axios.post(`${API_URL}/api/gpt-prediction`, {
      symptoms,
    });
    return response.data;
  } catch (error) {
    console.error("Error during GPT prediction:", error);
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

