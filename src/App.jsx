import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../src/Pages/Shared/AuthPage';
import PatientHomePage from '../src/Pages/Patient/PatientHomePage';
import DoctorHomePage from '../src/Pages/Doctor/DoctorHomePage';
import Home from '../src/Pages/Shared/Home';
import DoctorListPage from './Pages/Patient/DoctorListPage';
import AppointmentsPage from './Pages/Doctor/AppointmentsPage';
import AppointmentHomePage from './Pages/Patient/AppointmentHomePage';
import ListAppointmentPage from './Pages/Patient/ListAppointmentPage';
import DoctorChatPage from './Pages/Patient/DoctorChatPage';
import ChatRoom from './Pages/Shared/ChatRoom';
import PatientMedicalRecordHome from './Pages/Patient/PatientMedicalRecordHome';
import ListMedicalRecords from './Pages/Patient/ListMedicalRecords';
import MedicalRecordsForDoctor from './Pages/Doctor/MedicalRecordsForDoctor';
import DoctorChatRoomHome from './Pages/Doctor/DoctorChatRoomHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/patient-home" element={<PatientHomePage />} />
        <Route path="/doctor-home" element={<DoctorHomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor-list" element={<DoctorListPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/appointment-home" element={<AppointmentHomePage />} />
        <Route path="/patient-appointments" element={<ListAppointmentPage />} />
        <Route path="/chat-home" element={<DoctorChatPage />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/medical-records" element={<PatientMedicalRecordHome />} />
        <Route path="/list-medical-records" element={<ListMedicalRecords />} />
        <Route path="/medical-records-for-doctor" element={<MedicalRecordsForDoctor />} />
        <Route path="/doctor-chat-home" element={<DoctorChatRoomHome />} />
      </Routes>
    </Router>
  );
}

export default App;
