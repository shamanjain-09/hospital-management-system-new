import axios from 'axios';

const API = axios.create({
    baseURL:  process.env.REACT_APP_API_URL || 'https://hms-backend-de7x.onrender.com/api'
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

export const getDoctors = () => API.get('/doctors');
export const createDoctor = (data) => API.post('/doctors', data);
export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);

export const getPatients = () => API.get('/patients');
export const createPatient = (data) => API.post('/patients', data);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

export const getAppointments = () => API.get('/appointments');
export const createAppointment = (data) => API.post('/appointments', data);