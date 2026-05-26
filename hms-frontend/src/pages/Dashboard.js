import React, { useState, useEffect } from 'react';
import { getDoctors, createDoctor, getPatients, createPatient, getAppointments } from '../services/api';

function Dashboard({ onLogout }) {
    const [tab, setTab] = useState('doctors');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    useEffect(() => { loadData(); }, []);

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

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <div>
                    <h2 style={styles.logo}>🏥 HMS</h2>
                    <div style={styles.userInfo}>
                        <div style={styles.avatar}>{name?.charAt(0)}</div>
                        <div>
                            <p style={styles.userName}>{name}</p>
                            <p style={styles.userRole}>{role}</p>
                        </div>
                    </div>
                    <hr style={styles.divider}/>
                    {['doctors','patients','appointments'].map(t => (
                        <button key={t}
                            style={tab === t ? styles.activeTab : styles.tab}
                            onClick={() => setTab(t)}>
                            {t === 'doctors' ? '👨‍⚕️ Doctors' :
                             t === 'patients' ? '🧑 Patients' : '📅 Appointments'}
                        </button>
                    ))}
                </div>
                <button style={styles.logout} onClick={() => { localStorage.clear(); onLogout(); }}>
                    🚪 Logout
                </button>
            </div>

            <div style={styles.main}>
                <div style={styles.statsRow}>
                    <StatCard label="Doctors" value={doctors.length} color="#1a73e8"/>
                    <StatCard label="Patients" value={patients.length} color="#34a853"/>
                    <StatCard label="Appointments" value={appointments.length} color="#ea4335"/>
                </div>
                {tab === 'doctors' && <DoctorsTab doctors={doctors} reload={loadData}/>}
                {tab === 'patients' && <PatientsTab patients={patients} reload={loadData}/>}
                {tab === 'appointments' && <AppointmentsTab appointments={appointments}/>}
            </div>
        </div>
    );
}

function StatCard({ label, value, color }) {
    return (
        <div style={{...styles.statCard, borderTop: `4px solid ${color}`}}>
            <h3 style={{color, fontSize: '32px', margin: 0}}>{value}</h3>
            <p style={{color: '#888', margin: '4px 0 0'}}>{label}</p>
        </div>
    );
}

function DoctorsTab({ doctors, reload }) {
    const [form, setForm] = useState({ name:'', specialization:'', phone:'', email:'' });

    const handleAdd = async () => {
        if (!form.name || !form.email) return alert('Name and email required');
        try {
            await createDoctor(form);
            setForm({ name:'', specialization:'', phone:'', email:'' });
            reload();
        } catch (err) { alert('Error adding doctor'); }
    };

    return (
        <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>👨‍⚕️ Doctors</h2>
            <div style={styles.formBox}>
                <h4 style={{margin:'0 0 12px'}}>Add New Doctor</h4>
                <div style={styles.formRow}>
                    {['name','specialization','phone','email'].map(f => (
                        <input key={f} style={styles.input}
                            placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
                            value={form[f]}
                            onChange={e => setForm({...form, [f]: e.target.value})}/>
                    ))}
                    <button style={styles.addBtn} onClick={handleAdd}>+ Add</button>
                </div>
            </div>
            <table style={styles.table}>
                <thead><tr>
                    {['ID','Name','Specialization','Phone','Email'].map(h =>
                        <th key={h} style={styles.th}>{h}</th>)}
                </tr></thead>
                <tbody>
                    {doctors.map((d,i) => (
                        <tr key={d.id} style={{background: i%2===0?'white':'#f9f9f9'}}>
                            <td style={styles.td}>{d.id}</td>
                            <td style={styles.td}>{d.name}</td>
                            <td style={styles.td}>{d.specialization}</td>
                            <td style={styles.td}>{d.phone}</td>
                            <td style={styles.td}>{d.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PatientsTab({ patients, reload }) {
    const [form, setForm] = useState({ name:'', dateOfBirth:'', gender:'', phone:'', email:'', address:'' });

    const handleAdd = async () => {
        if (!form.name || !form.email) return alert('Name and email required');
        try {
            await createPatient(form);
            setForm({ name:'', dateOfBirth:'', gender:'', phone:'', email:'', address:'' });
            reload();
        } catch (err) { alert('Error adding patient'); }
    };

    return (
        <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>🧑 Patients</h2>
            <div style={styles.formBox}>
                <h4 style={{margin:'0 0 12px'}}>Add New Patient</h4>
                <div style={styles.formRow}>
                    {[
                        {f:'name', p:'Name'},
                        {f:'dateOfBirth', p:'Date of Birth (YYYY-MM-DD)'},
                        {f:'gender', p:'Gender'},
                        {f:'phone', p:'Phone'},
                        {f:'email', p:'Email'},
                        {f:'address', p:'Address'}
                    ].map(({f,p}) => (
                        <input key={f} style={styles.input} placeholder={p}
                            value={form[f]}
                            onChange={e => setForm({...form, [f]: e.target.value})}/>
                    ))}
                    <button style={styles.addBtn} onClick={handleAdd}>+ Add</button>
                </div>
            </div>
            <table style={styles.table}>
                <thead><tr>
                    {['ID','Name','Gender','Phone','Email'].map(h =>
                        <th key={h} style={styles.th}>{h}</th>)}
                </tr></thead>
                <tbody>
                    {patients.map((p,i) => (
                        <tr key={p.id} style={{background: i%2===0?'white':'#f9f9f9'}}>
                            <td style={styles.td}>{p.id}</td>
                            <td style={styles.td}>{p.name}</td>
                            <td style={styles.td}>{p.gender}</td>
                            <td style={styles.td}>{p.phone}</td>
                            <td style={styles.td}>{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AppointmentsTab({ appointments }) {
    return (
        <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>📅 Appointments</h2>
            <table style={styles.table}>
                <thead><tr>
                    {['ID','Patient','Doctor','Date & Time','Status'].map(h =>
                        <th key={h} style={styles.th}>{h}</th>)}
                </tr></thead>
                <tbody>
                    {appointments.map((a,i) => (
                        <tr key={a.id} style={{background: i%2===0?'white':'#f9f9f9'}}>
                            <td style={styles.td}>{a.id}</td>
                            <td style={styles.td}>{a.patient?.name}</td>
                            <td style={styles.td}>{a.doctor?.name}</td>
                            <td style={styles.td}>{a.appointmentDateTime}</td>
                            <td style={styles.td}>
                                <span style={{
                                    background: a.status==='SCHEDULED'?'#e8f5e9':'#fce4ec',
                                    color: a.status==='SCHEDULED'?'#2e7d32':'#c62828',
                                    padding:'4px 8px', borderRadius:'12px', fontSize:'12px'
                                }}>{a.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: { display:'flex', height:'100vh', fontFamily:'sans-serif' },
    sidebar: {
        width:'220px', background:'#1a1a2e', color:'white',
        padding:'24px 16px', display:'flex',
        flexDirection:'column', justifyContent:'space-between'
    },
    logo: { color:'white', marginBottom:'16px' },
    userInfo: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' },
    avatar: {
        width:'36px', height:'36px', borderRadius:'50%',
        background:'#1a73e8', display:'flex', alignItems:'center',
        justifyContent:'center', fontWeight:'bold', fontSize:'16px'
    },
    userName: { margin:0, fontSize:'13px', fontWeight:'bold' },
    userRole: { margin:0, fontSize:'11px', color:'#aaa' },
    divider: { border:'none', borderTop:'1px solid #333', margin:'12px 0' },
    tab: {
        background:'transparent', color:'#ccc', border:'none',
        padding:'10px 12px', textAlign:'left', cursor:'pointer',
        borderRadius:'8px', marginBottom:'4px', fontSize:'14px', width:'100%'
    },
    activeTab: {
        background:'#1a73e8', color:'white', border:'none',
        padding:'10px 12px', textAlign:'left', cursor:'pointer',
        borderRadius:'8px', marginBottom:'4px', fontSize:'14px', width:'100%'
    },
    logout: {
        background:'#c62828', color:'white', border:'none',
        padding:'10px', borderRadius:'8px', cursor:'pointer',
        fontSize:'14px', width:'100%'
    },
    main: { flex:1, padding:'24px', overflowY:'auto', background:'#f0f2f5' },
    statsRow: { display:'flex', gap:'16px', marginBottom:'24px' },
    statCard: {
        background:'white', padding:'20px', borderRadius:'12px',
        flex:1, boxShadow:'0 2px 8px rgba(0,0,0,0.08)'
    },
    tabContent: {
        background:'white', borderRadius:'12px',
        padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'
    },
    tabTitle: { marginTop:0, marginBottom:'16px', color:'#333' },
    formBox: { background:'#f8f9fa', padding:'16px', borderRadius:'8px', marginBottom:'20px' },
    formRow: { display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center' },
    input: {
        padding:'8px 12px', borderRadius:'6px',
        border:'1px solid #ddd', fontSize:'13px', minWidth:'150px'
    },
    addBtn: {
        padding:'8px 20px', background:'#1a73e8', color:'white',
        border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'14px'
    },
    table: { width:'100%', borderCollapse:'collapse' },
    th: {
        background:'#1a73e8', color:'white',
        padding:'12px 16px', textAlign:'left', fontSize:'13px'
    },
    td: { padding:'12px 16px', fontSize:'13px', color:'#333' }
};

export default Dashboard;