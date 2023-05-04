import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../src/Pages/Shared/AuthPage';
import PatientHomePage from '../src/Pages/Patient/PatientHomePage';
import DoctorHomePage from '../src/Pages/Doctor/DoctorHomePage';
import Home from '../src/Pages/Shared/Home';
import DoctorListPage from './Pages/Patient/DoctorListPage';
import AppointmentsPage from './Pages/Doctor/AppointmentsPage';

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
      </Routes>
    </Router>
  );
}

export default App;
