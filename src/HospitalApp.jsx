import { useState } from "react";

const DOCTORS = [
  { id: 1, name: "Dr. Arjun Kumar", specialty: "Cardiology", avatar: "AK", available: ["Mon", "Wed", "Fri"], times: ["09:00 AM", "11:00 AM", "02:00 PM"], rating: 4.9, exp: "14 yrs", patients: 1240 },
  { id: 2, name: "Dr. Kavya Ramesh", specialty: "Neurology", avatar: "KR", available: ["Tue", "Thu", "Sat"], times: ["10:00 AM", "12:00 PM", "03:00 PM"], rating: 4.8, exp: "11 yrs", patients: 980 },
  { id: 3, name: "Dr. Meena Srinivasan", specialty: "Orthopedics", avatar: "MS", available: ["Mon", "Tue", "Thu"], times: ["09:30 AM", "11:30 AM", "02:30 PM"], rating: 4.7, exp: "9 yrs", patients: 870 },
  { id: 4, name: "Dr. Harini Ramachandran", specialty: "Pediatrics", avatar: "HR", available: ["Wed", "Fri", "Sat"], times: ["09:00 AM", "01:00 PM", "03:00 PM"], rating: 4.9, exp: "16 yrs", patients: 1550 },
  { id: 5, name: "Dr. Subashini Natarajan", specialty: "Dermatology", avatar: "SN", available: ["Mon", "Thu", "Fri"], times: ["10:00 AM", "12:00 PM", "02:00 PM"], rating: 4.6, exp: "7 yrs", patients: 720 },
  { id: 6, name: "Dr. Karthik Venkatesan", specialty: "General Medicine", avatar: "KV", available: ["Tue", "Wed", "Sat"], times: ["09:00 AM", "11:00 AM", "01:00 PM"], rating: 4.8, exp: "12 yrs", patients: 1100 },
  { id: 7, name: "Dr. Priya Natarajan", specialty: "Ophthalmology", avatar: "PN", available: ["Mon", "Wed", "Fri"], times: ["10:00 AM", "12:30 PM", "03:00 PM"], rating: 4.7, exp: "10 yrs", patients: 810 },
  { id: 8, name: "Dr. Rohan Chandra", specialty: "Gastroenterology", avatar: "RC", available: ["Tue", "Thu", "Sat"], times: ["09:30 AM", "01:00 PM", "03:30 PM"], rating: 4.8, exp: "13 yrs", patients: 940 },
];

const PATIENTS = [
  { id: 1, name: "Liam Henderson", age: 45, blood: "A+", phone: "+1 555-0101", condition: "Hypertension", lastVisit: "2026-05-12", status: "Active", email: "liam.henderson@example.com", password: "patient123" },
  { id: 2, name: "Olivia Martins", age: 32, blood: "O-", phone: "+1 555-0182", condition: "Diabetes Type II", lastVisit: "2026-05-28", status: "Active", email: "olivia.martins@example.com", password: "patient123" },
  { id: 3, name: "Noah Williams", age: 67, blood: "B+", phone: "+1 555-0234", condition: "Arthritis", lastVisit: "2026-04-30", status: "Inactive", email: "noah.williams@example.com", password: "patient123" },
  { id: 4, name: "Emma Thompson", age: 28, blood: "AB+", phone: "+1 555-0312", condition: "Migraine", lastVisit: "2026-05-20", status: "Active", email: "emma.thompson@example.com", password: "patient123" },
  { id: 5, name: "Ava Johnson", age: 55, blood: "A-", phone: "+1 555-0445", condition: "Asthma", lastVisit: "2026-05-05", status: "Active", email: "ava.johnson@example.com", password: "patient123" },
];

const APPOINTMENTS_INIT = [];

const TYPES = ["Consultation", "Follow-up", "Routine Check", "Emergency", "Lab Results"];

const COLORS = {
  Cardiology: "#ef4444",
  Neurology: "#8b5cf6",
  Orthopedics: "#f59e0b",
  Pediatrics: "#10b981",
  Dermatology: "#ec4899",
  "General Medicine": "#3b82f6",
  Ophthalmology: "#eab308",
  Gastroenterology: "#14b8a6",
};

const statusColor = {
  Confirmed: "#10b981",
  Pending: "#f59e0b",
  Cancelled: "#ef4444",
};

const INITIAL_ADMINS = [
  { id: 1, name: "Admin User", email: "admin@medicare.com", password: "Admin123", hospitalId: "MED123" },
];
const INITIAL_AUTH_FORM = { email: "", password: "", confirmPassword: "", name: "", phone: "", blood: "", hospitalId: "" };
const INITIAL_BOOKING_FORM = { patient: "", doctor: "", date: "", time: "", type: "Consultation" };

export default function HospitalApp() {
  const [screen, setScreen] = useState("role");
  const [authRole, setAuthRole] = useState("patient");
  const [patientsData, setPatientsData] = useState(PATIENTS);
  const [adminsData, setAdminsData] = useState(INITIAL_ADMINS);
  const [patientUser, setPatientUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [appointments, setAppointments] = useState(APPOINTMENTS_INIT);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [landingSection, setLandingSection] = useState("home");
  const [authForm, setAuthForm] = useState(INITIAL_AUTH_FORM);
  const [form, setForm] = useState(INITIAL_BOOKING_FORM);
  const [toast, setToast] = useState(null);
  const [patientModal, setPatientModal] = useState(null);

  const showToast = (msg, color = "#10b981") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const resetSession = () => {
    setScreen("role");
    setLandingSection("home");
    setAuthRole("patient");
    setAuthForm(INITIAL_AUTH_FORM);
    setPatientUser(null);
    setTab("dashboard");
    setShowBooking(false);
    setSelectedDoctor(null);
    setPatientModal(null);
    setForm(INITIAL_BOOKING_FORM);
  };

  const handleAdminLogin = () => {
    const admin = adminsData.find(a => a.email === authForm.email && a.password === authForm.password && a.hospitalId === authForm.hospitalId);
    if (!admin) {
      showToast("Invalid admin credentials or Hospital ID", "#ef4444");
      return;
    }
    setScreen("adminHome");
    setTab("dashboard");
    setAuthForm(INITIAL_AUTH_FORM);
    showToast("Admin signed in successfully!");
  };

  const handlePatientLogin = () => {
    const patient = patientsData.find(p => p.email === authForm.email && p.password === authForm.password);
    if (!patient) {
      showToast("Email or password is incorrect", "#ef4444");
      return;
    }
    setPatientUser(patient);
    setScreen("patientHome");
    setAuthForm(INITIAL_AUTH_FORM);
    setSearchDoctor("");
    showToast(`Welcome back, ${patient.name}!`);
  };

  const handlePatientSignup = () => {
    if (!authForm.name || !authForm.email || !authForm.password || !authForm.confirmPassword || !authForm.phone || !authForm.blood) {
      showToast("Please complete all signup fields", "#ef4444");
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      showToast("Passwords must match", "#ef4444");
      return;
    }
    if (patientsData.some(p => p.email === authForm.email)) {
      showToast("This email is already registered", "#ef4444");
      return;
    }
    const newPatient = {
      id: Date.now(),
      name: authForm.name,
      age: 30,
      blood: authForm.blood,
      phone: authForm.phone,
      condition: "New patient",
      lastVisit: "2026-06-01",
      status: "Active",
      email: authForm.email,
      password: authForm.password,
    };
    setPatientsData(prev => [newPatient, ...prev]);
    setPatientUser(newPatient);
    setScreen("patientHome");
    setAuthForm(INITIAL_AUTH_FORM);
    showToast("Signup successful! Welcome to MediCare+");
  };

  const handleAdminSignup = () => {
    if (!authForm.name || !authForm.email || !authForm.password || !authForm.confirmPassword || !authForm.hospitalId) {
      showToast("Please complete all signup fields", "#ef4444");
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      showToast("Passwords must match", "#ef4444");
      return;
    }
    if (adminsData.some(a => a.email === authForm.email)) {
      showToast("This admin email is already registered", "#ef4444");
      return;
    }
    const newAdmin = {
      id: Date.now(),
      name: authForm.name,
      email: authForm.email,
      password: authForm.password,
      hospitalId: authForm.hospitalId,
    };
    setAdminsData(prev => [newAdmin, ...prev]);
    setScreen("adminHome");
    setAuthForm(INITIAL_AUTH_FORM);
    showToast("Admin signup successful! You are now signed in.");
  };

  const bookAppointment = () => {
    if (!form.patient || !form.doctor || !form.date || !form.time) {
      showToast("Please fill all appointment fields", "#ef4444");
      return;
    }
    const newApp = { id: Date.now(), ...form, status: "Pending" };
    setAppointments(p => [newApp, ...p]);
    setShowBooking(false);
    setForm(INITIAL_BOOKING_FORM);
    showToast("Appointment booked successfully!");
  };

  const cancelAppointment = (id) => {
    setAppointments(p => p.map(a => a.id === id ? { ...a, status: "Cancelled" } : a));
    showToast("Appointment cancelled", "#ef4444");
  };

  const confirmAppointment = (id) => {
    setAppointments(p => p.map(a => a.id === id ? { ...a, status: "Confirmed" } : a));
    showToast("Appointment confirmed!");
  };

  const filteredDoctors = DOCTORS.filter(d =>
    d.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const patientAppointments = patientUser ? appointments.filter(a => a.patient === patientUser.name) : [];
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const selectedDoctorData = DOCTORS.find(d => d.name === form.doctor);
  const availableTimes = selectedDoctorData ? selectedDoctorData.times : [];
  const selectedDoctorUpcoming = selectedDoctor
    ? appointments.filter(a => a.doctor === selectedDoctor.name && a.status !== "Cancelled" && a.date >= todayDate).length
    : 0;

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    pending: appointments.filter(a => a.status === "Pending").length,
    cancelled: appointments.filter(a => a.status === "Cancelled").length,
  };

  const openBooking = (doctorName = "") => {
    setForm({
      patient: patientUser ? patientUser.name : "",
      doctor: doctorName,
      date: "",
      time: "",
      type: "Consultation",
    });
    setShowBooking(true);
  };

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(180deg, #e6f2fb 0%, #f7fbff 58%, #ffffff 100%)",
      backgroundImage: "radial-gradient(circle at top left, rgba(30,64,175,0.16) 0%, transparent 24%), radial-gradient(circle at 80% 18%, rgba(16,185,129,0.12) 0%, transparent 20%), radial-gradient(circle at 18% 82%, rgba(59,130,246,0.1) 0%, transparent 18%)",
      minHeight: "100vh",
      color: "#1e2d3d"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f7fbff; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .nav-btn { background: none; border: none; cursor: pointer; padding: 10px 18px; border-radius: 10px; font-family: inherit; font-size: 14px; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 8px; color: #64748b; }
        .nav-btn:hover { background: rgba(255,255,255,0.6); color: #1e2d3d; }
        .nav-btn.active { background: white; color: #1e40af; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .card { background: white; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .btn-primary { background: #1e40af; color: white; border: none; border-radius: 10px; padding: 10px 20px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { background: #1d3baa; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,64,175,0.3); }
        .btn-ghost { background: none; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; color: #64748b; }
        .btn-ghost:hover { background: #f8fafc; }
        .badge { padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; }
        .input { width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: inherit; font-size: 14px; color: #1e2d3d; outline: none; transition: border 0.2s; background: #f8fafc; }
        .input:focus { border-color: #1e40af; background: white; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal { background: white; border-radius: 20px; padding: 32px; width: 520px; max-width: 94vw; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .doc-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .doc-card { transition: all 0.2s; }
        select.input { appearance: none; }
      `}</style>

      {toast && (
        <div style={{ position: "fixed", top: 24, right: 24, background: toast.color, color: "white", padding: "12px 22px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", animation: "slideUp 0.3s ease" }}>
          {toast.msg}
        </div>
      )}

      {screen === "role" && (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "24px 32px",
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"1600\" height=\"900\" viewBox=\"0 0 1600 900\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3ClinearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"%3E%3Cstop offset=\"0%\" stop-color=\"%23ffffff\"/%3E%3Cstop offset=\"100%\" stop-color=\"%23dbeefa\"/%3E%3C/linearGradient%3E%3ClinearGradient id=\"g2\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"%3E%3Cstop offset=\"0%\" stop-color=\"%231e40af\" stop-opacity=\"0.14\"/%3E%3Cstop offset=\"100%\" stop-color=\"%2310b981\" stop-opacity=\"0.08\"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"1600\" height=\"900\" fill=\"url(%23g1)\"/%3E%3Cpath d=\"M0 720C160 660 320 620 480 640c160 20 320 100 480 90s320-130 480-180V900H0z\" fill=\"%231e40af\" opacity=\"0.08\"/%3E%3Cpath d=\"M0 620C150 560 310 520 470 540c160 20 320 90 480 80s320-120 480-170V900H0z\" fill=\"%2310b981\" opacity=\"0.06\"/%3E%3C/svg%3E')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "#1e2d3d",
        }}>
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", width: "100%", paddingBottom: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#1e40af" }}>MediCarePlus</div>
            <nav style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              {['Home', 'Admin', 'All Doctors', 'About', 'Contact'].map(item => (
                <button
                  key={item}
                  className="btn-ghost"
                  style={{ padding: '10px 14px', fontSize: 14, opacity: item === 'Admin' ? 0.9 : landingSection === item.toLowerCase().replace(' ', '') ? 1 : 0.8 }}
                  onClick={() => {
                    if (item === 'Admin') {
                      setAuthRole('admin');
                      setScreen('login');
                      setAuthForm(INITIAL_AUTH_FORM);
                      return;
                    }
                    setLandingSection(item.toLowerCase().replace(' ', ''))
                  }}
                >
                  {item}
                </button>
              ))}
              <button className="btn-primary" style={{ padding: '10px 18px', fontSize: 14 }} onClick={() => { setAuthRole('patient'); setScreen('signup'); setAuthForm(INITIAL_AUTH_FORM); }}>
                Create Account
              </button>
            </nav>
          </header>
          <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
            {landingSection === 'home' && (

              <div style={{ width: '100%', maxWidth: 1120, background: 'rgba(255,255,255,0.96)', borderRadius: 28, boxShadow: '0 30px 80px rgba(15, 23, 42, 0.16)', overflow: 'hidden' }}>
                <div style={{ padding: '44px 48px 0' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.02em', color: '#0f172a', marginBottom: 12, lineHeight: 1.4 }}>“Wellness is the first step toward every life you want to live.”</div>
                </div>
                <div style={{ padding: '0 48px 20px', display: 'grid', gap: 22, maxWidth: 680 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, lineHeight: 1.02, margin: 0, color: '#0f172a' }}>Book Appointment with Trusted Doctor</h1>
                  <p style={{ fontSize: 18, lineHeight: 1.8, color: '#475569', margin: 0 }}>Connect with experienced specialists, schedule appointments instantly, and receive care from a trusted medical team at MediCarePlus.</p>
                  <button className="btn-primary" style={{ width: 'fit-content', marginTop: 8, padding: '16px 26px', fontSize: 16 }} onClick={() => { setAuthRole('patient'); setScreen('login'); setAuthForm(INITIAL_AUTH_FORM); }}>
                    Book Appointment
                  </button>
                </div>
               <div
  style={{
    padding: '0 48px 48px',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <div
    style={{
      position: 'relative',
      width: '100%',
      maxWidth: 520,
    }}
  >
    <img
      src="https://img.freepik.com/free-photo/portrait-doctor-with-stethoscope-standing-hospital_107420-84726.jpg"
      alt="Doctor caring for patient"
      style={{
        width: '100%',
        borderRadius: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        objectFit: 'cover'
      }}
    />

    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(6px)',
        padding: '12px 18px',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: 700,
        color: '#1e40af',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      “Wellness is the first step toward every life you want to live.”
    </div>
  </div>
</div>
            )}
            {landingSection === 'alldoctors' && (
              <div style={{ width: '100%', maxWidth: 1120, padding: '20px 0' }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#10b981', marginBottom: 8 }}>Available Doctors</div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, margin: 0, color: '#0f172a' }}>Meet our medical specialists</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: '#475569', marginTop: 14, maxWidth: 680 }}>Browse our trusted doctor profiles and choose the right specialist for your care. All available doctors are listed below with their experience and schedules.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {DOCTORS.map(d => (
                    <div key={d.id} className="card doc-card" style={{ padding: 22, borderRadius: 22 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: COLORS[d.specialty] + '22', color: COLORS[d.specialty], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>{d.avatar}</div>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{d.name}</div>
                          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{d.specialty}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 14 }}><span>Rating</span><span>{d.rating}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 14 }}><span>Experience</span><span>{d.exp}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 14 }}><span>Patients</span><span>{d.patients}</span></div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {d.available.map(day => (
                          <span key={day} style={{ padding: '6px 10px', borderRadius: 999, background: '#eef2ff', color: '#1e40af', fontSize: 12, fontWeight: 600 }}>{day}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {landingSection === 'about' && (
              <div style={{ width: '100%', maxWidth: 1120, background: 'rgba(255,255,255,0.96)', borderRadius: 28, boxShadow: '0 30px 80px rgba(15, 23, 42, 0.16)', padding: 48 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, margin: 0, color: '#0f172a' }}>About MediCarePlus</h2>
                <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginTop: 22 }}>MediCarePlus is a modern clinic experience built to connect patients with trusted specialists, simplify appointment booking, and deliver compassionate care across multiple departments.</p>
              </div>
            )}
            {landingSection === 'contact' && (
              <div style={{ width: '100%', maxWidth: 1120, background: 'rgba(255,255,255,0.96)', borderRadius: 28, boxShadow: '0 30px 80px rgba(15, 23, 42, 0.16)', padding: 48 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, margin: 0, color: '#0f172a' }}>Contact Us</h2>
                <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginTop: 22 }}>Email: support@medicareplus.com</p>
                <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginTop: 10 }}>Phone: +91 8870796121</p>
              </div>
            )}
          </main>
        </div>
      )}

      {screen === "login" && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div className="card" style={{ maxWidth: 520, width: "100%", padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{authRole === "admin" ? "Admin Login" : "Patient Login"}</h1>
                <p style={{ color: "#64748b", margin: 0 }}>{authRole === "admin" ? "Enter admin credentials to manage the hospital." : "Sign in to view doctors and book appointments."}</p>
              </div>
              <button className="btn-ghost" onClick={resetSession}>Back</button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input type="email" className="input" value={authForm.email} onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
              </div>
              {authRole === "admin" && (
                <div>
                  <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Hospital ID</label>
                  <input type="text" className="input" value={authForm.hospitalId} onChange={e => setAuthForm(f => ({ ...f, hospitalId: e.target.value }))} placeholder="MED123" />
                </div>
              )}
              <div>
                <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Password</label>
                <input type="password" className="input" value={authForm.password} onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))} placeholder="Enter password" />
              </div>
              <button className="btn-primary" style={{ width: "100%" }} onClick={authRole === "admin" ? handleAdminLogin : handlePatientLogin}>Sign In</button>
              <div style={{ fontSize: 13, color: "#64748b", textAlign: "center" }}>
                New {authRole === "patient" ? "patient" : "admin"}? <button className="btn-ghost" style={{ fontSize: 13, padding: "6px 10px" }} onClick={() => { setScreen("signup"); }}>{authRole === "patient" ? "Create an account" : "Create admin account"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "signup" && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div className="card" style={{ maxWidth: 560, width: "100%", padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{authRole === "admin" ? "Admin Signup" : "Patient Signup"}</h1>
                <p style={{ color: "#64748b", margin: 0 }}>{authRole === "admin" ? "Create a new admin account to manage the hospital dashboard." : "Create an account to book doctor appointments and manage your visits."}</p>
              </div>
              <button className="btn-ghost" onClick={resetSession}>Back</button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input type="text" className="input" value={authForm.name} onChange={e => setAuthForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" />
              </div>
              <div>
                <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input type="email" className="input" value={authForm.email} onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
              </div>
              {authRole === "admin" && (
                <div>
                  <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Hospital ID</label>
                  <input type="text" className="input" value={authForm.hospitalId} onChange={e => setAuthForm(f => ({ ...f, hospitalId: e.target.value }))} placeholder="MED123" />
                </div>
              )}
              {authRole === "patient" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Phone</label>
                    <input type="tel" className="input" value={authForm.phone} onChange={e => setAuthForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555-0101" />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Blood Type</label>
                    <select className="input" value={authForm.blood} onChange={e => setAuthForm(f => ({ ...f, blood: e.target.value }))}>
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Password</label>
                  <input type="password" className="input" value={authForm.password} onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))} placeholder="Create a password" />
                </div>
                <div>
                  <label style={{ display: "block", color: "#374151", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Confirm Password</label>
                  <input type="password" className="input" value={authForm.confirmPassword} onChange={e => setAuthForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="Confirm password" />
                </div>
              </div>
              <button className="btn-primary" style={{ width: "100%" }} onClick={authRole === "admin" ? handleAdminSignup : handlePatientSignup}>{authRole === "admin" ? "Create Admin Account" : "Create Account"}</button>
            </div>
          </div>
        </div>
      )}

      {screen === "adminHome" && (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside style={{ width: 230, background: "white", borderRight: "1px solid #e8f0fe", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 4, position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 10 }}>
            <div style={{ padding: "0 8px 24px", borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#1e40af", letterSpacing: "-0.5px" }}>MediCare+</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Admin Dashboard</div>
            </div>
            {[
              { id: "dashboard", icon: "⊞", label: "Dashboard" },
              { id: "appointments", icon: "📅", label: "Appointments" },
              { id: "doctors", icon: "👨‍⚕️", label: "Doctors & Staff" },
            ].map(t => (
              <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                <span style={{ fontSize: 16 }}>{t.icon}</span> {t.label}
              </button>
            ))}
            <div style={{ marginTop: "auto", padding: "16px 8px 0", borderTop: "1px solid #f1f5f9" }}>
              <button className="btn-ghost" style={{ width: "100%" }} onClick={resetSession}>Sign Out</button>
            </div>
          </aside>
          <main style={{ marginLeft: 230, flex: 1, padding: "32px 32px 32px 40px" }}>
            {tab === "dashboard" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <div>
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#1e2d3d" }}>Admin Dashboard</h1>
                    <p style={{ color: "#64748b", marginTop: 4 }}>Review hospital activity and appointment status.</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                  {[{ label: "Total Appointments", value: stats.total, color: "#1e40af", bg: "#eff6ff", icon: "📋" },
                    { label: "Confirmed", value: stats.confirmed, color: "#10b981", bg: "#ecfdf5", icon: "✅" },
                    { label: "Pending", value: stats.pending, color: "#f59e0b", bg: "#fffbeb", icon: "⏳" },
                    { label: "Cancelled", value: stats.cancelled, color: "#ef4444", bg: "#fef2f2", icon: "❌" },].map(s => (
                      <div key={s.label} className="card" style={{ padding: "20px 22px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
                            <div style={{ fontSize: 34, fontWeight: 700, color: s.color }}>{s.value}</div>
                          </div>
                          <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Appointments</h2>
                    <button className="btn-ghost" onClick={() => setTab("appointments")}>View all →</button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                        {['Patient', 'Doctor', 'Date & Time', 'Type', 'Status'].map(h => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.slice(0, 4).map(a => (
                        <tr key={a.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                          <td style={{ padding: "12px 12px", fontSize: 14, fontWeight: 500 }}>{a.patient}</td>
                          <td style={{ padding: "12px 12px", fontSize: 14, color: "#64748b" }}>{a.doctor}</td>
                          <td style={{ padding: "12px 12px", fontSize: 13, color: "#64748b" }}>{a.date} · {a.time}</td>
                          <td style={{ padding: "12px 12px", fontSize: 13 }}>{a.type}</td>
                          <td style={{ padding: "12px 12px" }}>
                            <span className="badge" style={{ background: statusColor[a.status] + "22", color: statusColor[a.status] }}>{a.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === "appointments" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800 }}>Appointments</h1>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                        {['Patient', 'Doctor', 'Date', 'Time', 'Type', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(a => (
                        <tr key={a.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                          <td style={{ padding: "13px 12px", fontSize: 14, fontWeight: 500 }}>{a.patient}</td>
                          <td style={{ padding: "13px 12px", fontSize: 13, color: "#64748b" }}>{a.doctor}</td>
                          <td style={{ padding: "13px 12px", fontSize: 13 }}>{a.date}</td>
                          <td style={{ padding: "13px 12px", fontSize: 13 }}>{a.time}</td>
                          <td style={{ padding: "13px 12px", fontSize: 13 }}>{a.type}</td>
                          <td style={{ padding: "13px 12px" }}>
                            <span className="badge" style={{ background: statusColor[a.status] + "22", color: statusColor[a.status] }}>{a.status}</span>
                          </td>
                          <td style={{ padding: "13px 12px", display: "flex", gap: 6 }}>
                            {a.status === "Pending" && (
                              <button className="btn-ghost" style={{ fontSize: 12, padding: "4px 10px", borderColor: "#10b981", color: "#10b981" }} onClick={() => confirmAppointment(a.id)}>Confirm</button>
                            )}
                            {a.status !== "Cancelled" && (
                              <button className="btn-ghost" style={{ fontSize: 12, padding: "4px 10px", borderColor: "#ef4444", color: "#ef4444" }} onClick={() => cancelAppointment(a.id)}>Cancel</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === "doctors" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800 }}>Doctors & Staff</h1>
                  <input className="input" style={{ width: 240 }} placeholder="Search doctors..." value={searchDoctor} onChange={e => setSearchDoctor(e.target.value)} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                  {filteredDoctors.map(d => (
                    <div key={d.id} className="card doc-card" style={{ padding: 22, cursor: "pointer" }} onClick={() => setSelectedDoctor(d)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS[d.specialty] + "22", color: COLORS[d.specialty], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>{d.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                          <div style={{ fontSize: 13 }}>
                            <span style={{ background: COLORS[d.specialty] + "22", color: COLORS[d.specialty], padding: "2px 8px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{d.specialty}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center", padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: 14 }}>
                        <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.rating}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Rating</div></div>
                        <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.exp}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Experience</div></div>
                        <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.patients}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Patients</div></div>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
                        <span style={{ fontWeight: 600 }}>Available:</span> {d.available.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {screen === "patientHome" && (
        <div style={{ minHeight: "100vh", padding: "32px 32px 32px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800 }}>Hello, {patientUser.name}</h1>
              <p style={{ color: "#64748b", marginTop: 4 }}>Browse doctors and book your next appointment.</p>
            </div>
            <button className="btn-ghost" onClick={resetSession}>Sign Out</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Available Doctors</h2>
                <input className="input" style={{ width: 220 }} placeholder="Search doctors..." value={searchDoctor} onChange={e => setSearchDoctor(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {filteredDoctors.map(d => (
                  <div key={d.id} className="card doc-card" style={{ padding: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS[d.specialty] + "22", color: COLORS[d.specialty], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>{d.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                        <div style={{ fontSize: 13, color: "#64748b" }}>{d.specialty}</div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center", padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: 14 }}>
                      <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.rating}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Rating</div></div>
                      <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.exp}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Experience</div></div>
                      <div><div style={{ fontSize: 16, fontWeight: 700, color: "#1e40af" }}>{d.patients}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>Patients</div></div>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
                      <div><span style={{ fontWeight: 600 }}>Days:</span> {d.available.join(", ")}</div>
                      <div style={{ marginTop: 6 }}><span style={{ fontWeight: 600 }}>Times:</span> {d.times.join(", ")}</div>
                    </div>
                    <button className="btn-primary" style={{ width: "100%" }} onClick={() => openBooking(d.name)}>Book Appointment</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>My Appointments</h2>
                {patientAppointments.length === 0 ? (
                  <div style={{ color: "#64748b", fontSize: 14 }}>No appointments yet. Book a doctor to get started.</div>
                ) : (
                  <div style={{ display: "grid", gap: 12 }}>
                    {patientAppointments.map(a => (
                      <div key={a.id} style={{ background: "#f8fafc", borderRadius: 14, padding: 14 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{a.doctor}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13, color: "#475569" }}>
                          <span>{a.date}</span>
                          <span>{a.time}</span>
                        </div>
                        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="badge" style={{ background: statusColor[a.status] + "22", color: statusColor[a.status] }}>{a.status}</span>
                          <span style={{ color: "#64748b", fontSize: 12 }}>{a.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your Profile</h2>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ color: "#94a3b8" }}>Name</div>
                  <div style={{ fontWeight: 600 }}>{patientUser.name}</div>
                  <div style={{ color: "#94a3b8" }}>Email</div>
                  <div style={{ fontWeight: 600 }}>{patientUser.email}</div>
                  <div style={{ color: "#94a3b8" }}>Phone</div>
                  <div style={{ fontWeight: 600 }}>{patientUser.phone}</div>
                  <div style={{ color: "#94a3b8" }}>Blood Type</div>
                  <div style={{ fontWeight: 600 }}>{patientUser.blood}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "patientHome" && showBooking && (
        <div className="overlay" onClick={() => setShowBooking(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Book Appointment</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Fill in the details to schedule a new appointment.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Patient Name</label>
                <input className="input" value={patientUser?.name || form.patient} readOnly />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Doctor</label>
                <select className="input" value={form.doctor} onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}>
                  <option value="">Select doctor</option>
                  {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name} — {d.specialty}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Date</label>
                  <input type="date" min={todayDate} className="input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Time</label>
                  <select className="input" value={form.time} disabled={!selectedDoctorData} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}>
                    <option value="">{selectedDoctorData ? "Select time" : "Select doctor first"}</option>
                    {selectedDoctorData && availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Appointment Type</label>
                <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={bookAppointment}>Confirm Booking</button>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShowBooking(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {screen === "adminHome" && patientModal && (
        <div className="overlay" onClick={() => setPatientModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#eff6ff", color: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20 }}>
                {patientModal.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>{patientModal.name}</h2>
                <span className="badge" style={{ background: patientModal.status === "Active" ? "#ecfdf5" : "#f8fafc", color: patientModal.status === "Active" ? "#10b981" : "#94a3b8" }}>{patientModal.status}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {[
                { label: "Age", value: `${patientModal.age} years` },
                { label: "Blood Type", value: patientModal.blood },
                { label: "Phone", value: patientModal.phone },
                { label: "Last Visit", value: patientModal.lastVisit },
                { label: "Condition", value: patientModal.condition },
              ].map(item => (
                <div key={item.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Appointment History</h3>
              {appointments.filter(a => a.patient === patientModal.name).length === 0
                ? <div style={{ color: "#94a3b8", fontSize: 13 }}>No appointments found</div>
                : appointments.filter(a => a.patient === patientModal.name).map(a => (
                  <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: 13 }}>
                    <span>{a.date} · {a.time} · {a.doctor}</span>
                    <span className="badge" style={{ background: statusColor[a.status] + "22", color: statusColor[a.status] }}>{a.status}</span>
                  </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-ghost" onClick={() => setPatientModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedDoctor && (
        <div className="overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS[selectedDoctor.specialty] + "22", color: COLORS[selectedDoctor.specialty], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22 }}>{selectedDoctor.avatar}</div>
              <div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800 }}>{selectedDoctor.name}</h2>
                <span style={{ background: COLORS[selectedDoctor.specialty] + "22", color: COLORS[selectedDoctor.specialty], padding: "3px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{selectedDoctor.specialty}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 20 }}>
              {[{ label: "Rating", value: `★ ${selectedDoctor.rating}` }, { label: "Experience", value: selectedDoctor.exp }, { label: "Total Patients", value: selectedDoctor.patients }, { label: "Upcoming", value: selectedDoctorUpcoming }].map(i => (
                <div key={i.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1e40af" }}>{i.value}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{i.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Available Days</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <span key={day} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: selectedDoctor.available.includes(day) ? "#1e40af" : "#e2e8f0", color: selectedDoctor.available.includes(day) ? "white" : "#94a3b8" }}>{day}</span>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>Times</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {selectedDoctor.times.map(time => (
                  <span key={time} style={{ padding: "5px 12px", borderRadius: 8, background: "#e2e8f0", color: "#64748b", fontSize: 13 }}>{time}</span>
                ))}
              </div>
            </div>
            {screen === "patientHome" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setSelectedDoctor(null); openBooking(selectedDoctor.name); }}>Book Appointment</button>
                <button className="btn-ghost" onClick={() => setSelectedDoctor(null)}>Close</button>
              </div>
            )}
            {screen === "adminHome" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-ghost" onClick={() => setSelectedDoctor(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
