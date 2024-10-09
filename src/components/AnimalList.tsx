import React, { useState, useEffect } from 'react';
import { listAnimals } from '../db/crudOperations';

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const animalList = await listAnimals();
        setAnimals(animalList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Animal List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Species</th>
            <th className="py-2 px-4 border-b">Breed</th>
            <th className="py-2 px-4 border-b">Date of Birth</th>
            <th className="py-2 px-4 border-b">Sex</th>
            <th className="py-2 px-4 border-b">Weight</th>
            <th className="py-2 px-4 border-b">Color</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td className="py-2 px-4 border-b">{animal.anim_nombre}</td>
              <td className="py-2 px-4 border-b">{animal.anim_especie}</td>
              <td className="py-2 px-4 border-b">{animal.anim_raza}</td>
              <td className="py-2 px-4 border-b">{new Date(animal.anim_fecha_nacimiento).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{animal.anim_sexo}</td>
              <td className="py-2 px-4 border-b">{animal.anim_peso}</td>
              <td className="py-2 px-4 border-b">{animal.anim_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalList;