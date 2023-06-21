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
import ChatRoomPatient from './Pages/Patient/ChatRoomPatient';
import PatientMedicalRecordHome from './Pages/Patient/PatientMedicalRecordHome';
import ListMedicalRecords from './Pages/Patient/ListMedicalRecords';
import MedicalRecordsForDoctor from './Pages/Doctor/MedicalRecordsForDoctor';
import DoctorChatRoomHome from './Pages/Doctor/DoctorChatRoomHome';
import ChatRoomDoctor from './Pages/Doctor/ChatRoomDoctor';
import LIfeStyleHome from './Pages/Shared/LIfeStyleHome';
import LiverDiseasePrediction from './Pages/Shared/LiverDiseasePrediction';
import HeartDiseasePrediction from './Pages/Shared/HeartDiseasePrediction';
import DiabetesPrediction from './Pages/Shared/DiabetesPrediction';
import CancerPrediction from './Pages/Shared/CancerPrediction';
import ImageProcessingPage from './Pages/Patient/ImageProcessingPage';


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
        <Route path="/chat/patient/:roomId" element={<ChatRoomPatient />} />
        <Route path="/medical-records" element={<PatientMedicalRecordHome />} />
        <Route path="/list-medical-records" element={<ListMedicalRecords />} />
        <Route path="/medical-records-for-doctor" element={<MedicalRecordsForDoctor />} />
        <Route path="/doctor-chat-home" element={<DoctorChatRoomHome />} />
        <Route path="/chat/doctor/:roomId" element={<ChatRoomDoctor />} />
        <Route path='/life-style' element={<LIfeStyleHome/>}/>
        <Route path='/life-style-liver' element={<LiverDiseasePrediction/>}/>
        <Route path='/life-style-heart' element={<HeartDiseasePrediction/>}/>
        <Route path='/life-style-diabetes' element={<DiabetesPrediction/>}/>
        <Route path='/cancer' element = {<CancerPrediction/>}/>
        <Route path='/image-processing' element = {<ImageProcessingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
