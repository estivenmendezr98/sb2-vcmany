import * as mockDb from './mockDatabase';

// Animals
export const createAnimal = mockDb.createAnimal;
export const getAnimal = mockDb.getAnimal;
export const updateAnimal = mockDb.updateAnimal;
export const deleteAnimal = mockDb.deleteAnimal;
export const listAnimals = mockDb.listAnimals;

// Appointments
export const createAppointment = mockDb.createAppointment;
export const getAppointment = mockDb.getAppointment;
export const updateAppointment = mockDb.updateAppointment;
export const deleteAppointment = mockDb.deleteAppointment;
export const listAppointments = () => {
  const appointments = mockDb.listAppointments();
  return appointments.map(appointment => ({
    ...appointment,
    cit_id: appointment.id || appointment.cit_id // Ensure cit_id is always present
  }));
};

// Veterinarians
export const createVeterinarian = mockDb.createVeterinarian;
export const getVeterinarian = mockDb.getVeterinarian;
export const updateVeterinarian = mockDb.updateVeterinarian;
export const deleteVeterinarian = mockDb.deleteVeterinarian;
export const listVeterinarians = mockDb.listVeterinarians;

// Owners
export const createOwner = mockDb.createOwner;
export const getOwner = mockDb.getOwner;
export const updateOwner = mockDb.updateOwner;
export const deleteOwner = mockDb.deleteOwner;
export const listOwners = () => {
  const owners = mockDb.listOwners();
  return owners.map(owner => ({
    ...owner,
    pro_id: owner.id || owner.pro_id // Ensure pro_id is always present
  }));
};

// Consultations
export const listConsultations = mockDb.listConsultations;