import React, { useState, useEffect } from 'react';
import { listVeterinarians } from '../db/crudOperations';

function VeterinarianList() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVeterinarians() {
      try {
        const veterinarianList = await listVeterinarians();
        setVeterinarians(veterinarianList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching veterinarians:', error);
        setLoading(false);
      }
    }

    fetchVeterinarians();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Veterinarian List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Consultation Room</th>
          </tr>
        </thead>
        <tbody>
          {veterinarians.map((veterinarian) => (
            <tr key={veterinarian.vet_id}>
              <td className="py-2 px-4 border-b">{veterinarian.vet_nombre}</td>
              <td className="py-2 px-4 border-b">{veterinarian.vet_telefono}</td>
              <td className="py-2 px-4 border-b">{veterinarian.vet_correo}</td>
              <td className="py-2 px-4 border-b">{veterinarian.tbl_consultorio_con_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VeterinarianList;