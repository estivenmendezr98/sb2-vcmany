// Mock in-memory database
const db = {
  animals: [],
  owners: [],
  appointments: [],
  veterinarians: [],
  consultations: []
};

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// CRUD operations
export const create = (table, data) => {
  const id = generateId();
  const newItem = { id, ...data };
  db[table].push(newItem);
  return id;
};

export const read = (table, id) => {
  return db[table].find(item => item.id === id);
};

export const update = (table, id, data) => {
  const index = db[table].findIndex(item => item.id === id);
  if (index !== -1) {
    db[table][index] = { ...db[table][index], ...data };
    return true;
  }
  return false;
};

export const remove = (table, id) => {
  const index = db[table].findIndex(item => item.id === id);
  if (index !== -1) {
    db[table].splice(index, 1);
    return true;
  }
  return false;
};

export const list = (table, limit = 100, offset = 0) => {
  return db[table].slice(offset, offset + limit);
};

// Specific operations
export const createAnimal = (data) => create('animals', data);
export const getAnimal = (id) => read('animals', id);
export const updateAnimal = (id, data) => update('animals', id, data);
export const deleteAnimal = (id) => remove('animals', id);
export const listAnimals = (limit, offset) => list('animals', limit, offset);

export const createAppointment = (data) => create('appointments', data);
export const getAppointment = (id) => read('appointments', id);
export const updateAppointment = (id, data) => update('appointments', id, data);
export const deleteAppointment = (id) => remove('appointments', id);
export const listAppointments = (limit, offset) => list('appointments', limit, offset);

export const createVeterinarian = (data) => create('veterinarians', data);
export const getVeterinarian = (id) => read('veterinarians', id);
export const updateVeterinarian = (id, data) => update('veterinarians', id, data);
export const deleteVeterinarian = (id) => remove('veterinarians', id);
export const listVeterinarians = (limit, offset) => list('veterinarians', limit, offset);

export const createOwner = (data) => create('owners', data);
export const getOwner = (id) => read('owners', id);
export const updateOwner = (id, data) => update('owners', id, data);
export const deleteOwner = (id) => remove('owners', id);
export const listOwners = (limit, offset) => list('owners', limit, offset);

export const listConsultations = (limit, offset) => list('consultations', limit, offset);

// Initialize with some mock data
createAnimal({ anim_nombre: 'Max', anim_especie: 'Dog', anim_raza: 'Labrador', anim_fecha_nacimiento: '2020-01-01', anim_sexo: 'Male', anim_peso: 30, anim_color: 'Golden' });
createAnimal({ anim_nombre: 'Whiskers', anim_especie: 'Cat', anim_raza: 'Siamese', anim_fecha_nacimiento: '2019-05-15', anim_sexo: 'Female', anim_peso: 4, anim_color: 'White and Brown' });

createOwner({ pro_nombre: 'John Doe', pro_telefono: '123-456-7890', pro_correo: 'john@example.com' });
createOwner({ pro_nombre: 'Jane Smith', pro_telefono: '987-654-3210', pro_correo: 'jane@example.com' });

createVeterinarian({ vet_nombre: 'Dr. Alice Johnson', vet_telefono: '555-123-4567', vet_correo: 'alice@vetclinic.com', tbl_consultorio_con_id: '1' });
createVeterinarian({ vet_nombre: 'Dr. Bob Williams', vet_telefono: '555-987-6543', vet_correo: 'bob@vetclinic.com', tbl_consultorio_con_id: '2' });

createAppointment({ cit_fecha: '2023-04-20 10:00', tbl_animales_anim_id: '1', tbl_veterinario_vet_id: '1' });
createAppointment({ cit_fecha: '2023-04-21 14:30', tbl_animales_anim_id: '2', tbl_veterinario_vet_id: '2' });

create('consultations', { con_id: '1', con_num_consultario: 'Room 101' });
create('consultations', { con_id: '2', con_num_consultario: 'Room 102' });