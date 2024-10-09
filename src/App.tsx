import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AnimalList from './components/AnimalList'
import AppointmentList from './components/AppointmentList'
import OwnerList from './components/OwnerList'
import VeterinarianList from './components/VeterinarianList'
import ScheduleAppointment from './components/ScheduleAppointment'
import { Calendar, Users, PawPrint, Stethoscope, Plus } from 'lucide-react'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="flex items-center"><Calendar className="mr-1" size={18} /> Dashboard</Link></li>
            <li><Link to="/animals" className="flex items-center"><PawPrint className="mr-1" size={18} /> Animals</Link></li>
            <li><Link to="/appointments" className="flex items-center"><Calendar className="mr-1" size={18} /> Appointments</Link></li>
            <li><Link to="/owners" className="flex items-center"><Users className="mr-1" size={18} /> Owners</Link></li>
            <li><Link to="/veterinarians" className="flex items-center"><Stethoscope className="mr-1" size={18} /> Veterinarians</Link></li>
            <li><Link to="/schedule" className="flex items-center bg-green-500 hover:bg-green-600 px-3 py-1 rounded"><Plus className="mr-1" size={18} /> Schedule Appointment</Link></li>
          </ul>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/animals" element={<AnimalList />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/owners" element={<OwnerList />} />
            <Route path="/veterinarians" element={<VeterinarianList />} />
            <Route path="/schedule" element={<ScheduleAppointment />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App