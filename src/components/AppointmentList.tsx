import React, { useState, useEffect } from 'react';
import { listAppointments } from '../db/crudOperations';

interface Appointment {
  cit_id: string;
  cit_fecha: string;
  tbl_animales_anim_id: string;
  tbl_veterinario_vet_id: string;
}

function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const appointmentList = await listAppointments();
        setAppointments(appointmentList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Appointment List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Animal ID</th>
            <th className="py-2 px-4 border-b">Veterinarian ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.cit_id}>
              <td className="py-2 px-4 border-b">{new Date(appointment.cit_fecha).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{appointment.tbl_animales_anim_id}</td>
              <td className="py-2 px-4 border-b">{appointment.tbl_veterinario_vet_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;