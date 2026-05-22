import React, { useState, useEffect } from 'react';
import { getDoctors, getPatients, getAppointments, createDoctor, createPatient } from '../services/api';

function Dashboard({ onLogout }) {
    const [tab, setTab] = useState('doctors');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const name = localStorage.getItem('name');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const d = await getDoctors();
            const p = await getPatients();
            const a = await getAppointments();
            setDoctors(d.data);
            setPatients(p.data);
            setAppointments(a.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        onLogout();
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.logo}>🏥 HMS</h2>
                <p style={styles.welcome}>Welcome, {name}</p>
                <button style={tab === 'doctors' ? styles.activeTab : styles.tab}
                    onClick={() => setTab('doctors')}>👨‍⚕️ Doctors</button>
                <button style={tab === 'patients' ? styles.activeTab : styles.tab}
                    onClick={() => setTab('patients')}>🧑‍🤝‍🧑 Patients</button>
                <button style={tab === 'appointments' ? styles.activeTab : styles.tab}
                    onClick={() => setTab('appointments')}>📅 Appointments</button>
                <button style={styles.logout} onClick={handleLogout}>Logout</button>
            </div>

            {/* Main Content */}
            <div style={styles.main}>
                {tab === 'doctors' && <DoctorsTab doctors={doctors} reload={loadData} />}
                {tab === 'patients' && <PatientsTab patients={patients} reload={loadData} />}
                {tab === 'appointments' && <AppointmentsTab appointments={appointments} />}
            </div>
        </div>
    );
}

function DoctorsTab({ doctors, reload }) {
    const [form, setForm] = useState({ name: '', specialization: '', phone: '', email: '' });

    const handleAdd = async () => {
        try {
            await createDoctor(form);
            setForm({ name: '', specialization: '', phone: '', email: '' });
            reload();
        } catch (err) {
            alert('Error adding doctor');
        }
    };

    return (
        <div>
            <h2>Doctors ({doctors.length})</h2>
            <div style={styles.formRow}>
                <input style={styles.input} placeholder="Name"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input style={styles.input} placeholder="Specialization"
                    value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} />
                <input style={styles.input} placeholder="Phone"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input style={styles.input} placeholder="Email"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <button style={styles.addBtn} onClick={handleAdd}>Add</button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.th}>
                        <th>ID</th><th>Name</th><th>Specialization</th><th>Phone</th><th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(d => (
                        <tr key={d.id} style={styles.tr}>
                            <td>{d.id}</td><td>{d.name}</td>
                            <td>{d.specialization}</td><td>{d.phone}</td><td>{d.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PatientsTab({ patients, reload }) {
    const [form, setForm] = useState({ name: '', dateOfBirth: '', gender: '', phone: '', email: '', address: '' });

    const handleAdd = async () => {
        try {
            await createPatient(form);
            setForm({ name: '', dateOfBirth: '', gender: '', phone: '', email: '', address: '' });
            reload();
        } catch (err) {
            alert('Error adding patient');
        }
    };

    return (
        <div>
            <h2>Patients ({patients.length})</h2>
            <div style={styles.formRow}>
                <input style={styles.input} placeholder="Name"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)"
                    value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} />
                <input style={styles.input} placeholder="Gender"
                    value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} />
                <input style={styles.input} placeholder="Phone"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input style={styles.input} placeholder="Email"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <button style={styles.addBtn} onClick={handleAdd}>Add</button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.th}>
                        <th>ID</th><th>Name</th><th>Gender</th><th>Phone</th><th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(p => (
                        <tr key={p.id} style={styles.tr}>
                            <td>{p.id}</td><td>{p.name}</td>
                            <td>{p.gender}</td><td>{p.phone}</td><td>{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AppointmentsTab({ appointments }) {
    return (
        <div>
            <h2>Appointments ({appointments.length})</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.th}>
                        <th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(a => (
                        <tr key={a.id} style={styles.tr}>
                            <td>{a.id}</td>
                            <td>{a.patient?.name}</td>
                            <td>{a.doctor?.name}</td>
                            <td>{a.appointmentDateTime}</td>
                            <td>{a.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: { display: 'flex', height: '100vh', fontFamily: 'sans-serif' },
    sidebar: {
        width: '220px', background: '#1a73e8',
        color: 'white', padding: '24px',
        display: 'flex', flexDirection: 'column'
    },
    logo: { marginBottom: '8px' },
    welcome: { fontSize: '13px', marginBottom: '24px', opacity: 0.8 },
    tab: {
        background: 'transparent', color: 'white',
        border: 'none', padding: '12px', textAlign: 'left',
        cursor: 'pointer', borderRadius: '8px',
        marginBottom: '4px', fontSize: '14px'
    },
    activeTab: {
        background: 'rgba(255,255,255,0.2)', color: 'white',
        border: 'none', padding: '12px', textAlign: 'left',
        cursor: 'pointer', borderRadius: '8px',
        marginBottom: '4px', fontSize: '14px'
    },
    logout: {
        background: 'rgba(255,0,0,0.3)', color: 'white',
        border: 'none', padding: '12px', borderRadius: '8px',
        cursor: 'pointer', marginTop: 'auto', fontSize: '14px'
    },
    main: { flex: 1, padding: '32px', overflowY: 'auto', background: '#f0f2f5' },
    formRow: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
    input: {
        padding: '8px 12px', borderRadius: '6px',
        border: '1px solid #ddd', fontSize: '13px'
    },
    addBtn: {
        padding: '8px 16px', background: '#1a73e8',
        color: 'white', border: 'none',
        borderRadius: '6px', cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px' },
    th: { background: '#1a73e8', color: 'white', padding: '12px', textAlign: 'left' },
    tr: { borderBottom: '1px solid #eee', padding: '12px' }
};

export default Dashboard;