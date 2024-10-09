import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, PawPrint, Stethoscope } from 'lucide-react'
import { createAppointment, listVeterinarians, listAnimals } from '../db/crudOperations'

interface Appointment {
  cit_id: string;
  cit_fecha: string;
  tbl_animales_anim_id: string;
  tbl_veterinario_vet_id: string;
}

function ScheduleAppointment() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    veterinarianId: '',
    animalId: '',
  })

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [veterinarians, setVeterinarians] = useState([])
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const vets = await listVeterinarians()
        setVeterinarians(vets)
        const animalsList = await listAnimals()
        setAnimals(animalsList)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newAppointment = {
        cit_fecha: `${formData.date} ${formData.time}`,
        tbl_animales_anim_id: formData.animalId,
        tbl_veterinario_vet_id: formData.veterinarianId,
      }
      const appointmentId = await createAppointment(newAppointment)
      alert(`Appointment scheduled successfully! ID: ${appointmentId}`)
      setFormData({
        date: '',
        time: '',
        veterinarianId: '',
        animalId: '',
      })
    } catch (error) {
      console.error('Error scheduling appointment:', error)
      alert('Failed to schedule appointment. Please try again.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Schedule Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block mb-1 font-medium text-gray-700">
                <Calendar className="inline-block mr-2 text-blue-500" size={18} />
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="time" className="block mb-1 font-medium text-gray-700">
                <Clock className="inline-block mr-2 text-blue-500" size={18} />
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="veterinarianId" className="block mb-1 font-medium text-gray-700">
              <Stethoscope className="inline-block mr-2 text-blue-500" size={18} />
              Veterinarian
            </label>
            <select
              id="veterinarianId"
              name="veterinarianId"
              value={formData.veterinarianId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a veterinarian</option>
              {veterinarians.map(vet => (
                <option key={vet.vet_id} value={vet.vet_id}>{vet.vet_nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="animalId" className="block mb-1 font-medium text-gray-700">
              <PawPrint className="inline-block mr-2 text-blue-500" size={18} />
              Animal
            </label>
            <select
              id="animalId"
              name="animalId"
              value={formData.animalId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an animal</option>
              {animals.map(animal => (
                <option key={animal.anim_id} value={animal.anim_id}>{animal.anim_nombre}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  )
}

export default ScheduleAppointment