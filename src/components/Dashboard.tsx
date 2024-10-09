import React, { useState, useEffect } from 'react'
import { Calendar, Home, Users, PawPrint } from 'lucide-react'
import { listAppointments, listAnimals, listOwners, listVeterinarians, listConsultations } from '../db/crudOperations'

const DashboardCard = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    {children}
  </div>
)

function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [animals, setAnimals] = useState([])
  const [owners, setOwners] = useState([])
  const [veterinarians, setVeterinarians] = useState([])
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [appointmentList, animalList, ownerList, veterinarianList, consultationList] = await Promise.all([
          listAppointments(),
          listAnimals(),
          listOwners(),
          listVeterinarians(),
          listConsultations()
        ])
        setAppointments(appointmentList)
        setAnimals(animalList)
        setOwners(ownerList)
        setVeterinarians(veterinarianList)
        setConsultations(consultationList)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.cit_fecha)
    const today = new Date()
    return aptDate.toDateString() === today.toDateString()
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Veterinary Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Today's Appointments" icon={<Calendar size={24} />}>
          <ul className="space-y-2">
            {todayAppointments.map(apt => (
              <li key={apt.cit_id} className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{new Date(apt.cit_fecha).toLocaleTimeString()}</span>
                  <span>Animal ID: {apt.tbl_animales_anim_id}</span>
                </div>
                <div>Veterinarian ID: {apt.tbl_veterinario_vet_id}</div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Consultation Rooms" icon={<Home size={24} />}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Available Rooms</h3>
              <ul className="space-y-1">
                {consultations.map(room => (
                  <li key={room.con_id} className="bg-green-100 p-2 rounded">{room.con_num_consultario}</li>
                ))}
              </ul>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Animals" icon={<PawPrint size={24} />}>
          <div className="text-3xl font-bold text-center">
            {animals.length}
          </div>
        </DashboardCard>
        <DashboardCard title="Owners" icon={<Users size={24} />}>
          <div className="text-3xl font-bold text-center">
            {owners.length}
          </div>
        </DashboardCard>
        <DashboardCard title="Total Appointments" icon={<Calendar size={24} />}>
          <div className="text-3xl font-bold text-center">
            {appointments.length}
          </div>
        </DashboardCard>
        <DashboardCard title="Veterinarians" icon={<Home size={24} />}>
          <div className="text-3xl font-bold text-center">
            {veterinarians.length}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default Dashboard