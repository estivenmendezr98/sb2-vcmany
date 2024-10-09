import React, { useState, useEffect } from 'react';
import { listOwners } from '../db/crudOperations';

interface Owner {
  pro_id: string;
  pro_nombre: string;
  pro_telefono: string;
  pro_correo: string;
}

function OwnerList() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const ownerList = await listOwners();
        setOwners(ownerList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching owners:', error);
        setLoading(false);
      }
    }

    fetchOwners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Owner List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.pro_id}>
              <td className="py-2 px-4 border-b">{owner.pro_nombre}</td>
              <td className="py-2 px-4 border-b">{owner.pro_telefono}</td>
              <td className="py-2 px-4 border-b">{owner.pro_correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerList;