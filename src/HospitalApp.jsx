import { useState } from "react";

const DOCTORS = [
  { id: 1, name: "Dr. Aisha Patel", specialty: "Cardiology", avatar: "AP", available: ["Mon", "Wed", "Fri"], rating: 4.9, exp: "14 yrs", patients: 1240 },
  { id: 2, name: "Dr. Marcus Chen", specialty: "Neurology", avatar: "MC", available: ["Tue", "Thu", "Sat"], rating: 4.8, exp: "11 yrs", patients: 980 },
  { id: 3, name: "Dr. Sofia Russo", specialty: "Orthopedics", avatar: "SR", available: ["Mon", "Tue", "Thu"], rating: 4.7, exp: "9 yrs", patients: 870 },
  { id: 4, name: "Dr. James Okafor", specialty: "Pediatrics", avatar: "JO", available: ["Wed", "Fri", "Sat"], rating: 4.9, exp: "16 yrs", patients: 1550 },
  { id: 5, name: "Dr. Priya Nair", specialty: "Dermatology", avatar: "PN", available: ["Mon", "Thu", "Fri"], rating: 4.6, exp: "7 yrs", patients: 720 },
  { id: 6, name: "Dr. Ethan Brooks", specialty: "General Medicine", avatar: "EB", available: ["Tue", "Wed", "Sat"], rating: 4.8, exp: "12 yrs", patients: 1100 },
];

const PATIENTS = [
  { id: 1, name: "Liam Henderson", age: 45, blood: "A+", phone: "+1 555-0101", condition: "Hypertension", lastVisit: "2026-05-12", status: "Active" },
  { id: 2, name: "Olivia Martins", age: 32, blood: "O-", phone: "+1 555-0182", condition: "Diabetes Type II", lastVisit: "2026-05-28", status: "Active" },
  { id: 3, name: "Noah Williams", age: 67, blood: "B+", phone: "+1 555-0234", condition: "Arthritis", lastVisit: "2026-04-30", status: "Inactive" },
  { id: 4, name: "Emma Thompson", age: 28, blood: "AB+", phone: "+1 555-0312", condition: "Migraine", lastVisit: "2026-05-20", status: "Active" },
  { id: 5, name: "Ava Johnson", age: 55, blood: "A-", phone: "+1 555-0445", condition: "Asthma", lastVisit: "2026-05-05", status: "Active" },
];

const APPOINTMENTS_INIT = [
  { id: 1, patient: "Liam Henderson", doctor: "Dr. Aisha Patel", date: "2026-06-05", time: "10:00 AM", type: "Follow-up", status: "Confirmed" },
  { id: 2, patient: "Olivia Martins", doctor: "Dr. Marcus Chen", date: "2026-06-06", time: "02:30 PM", type: "Consultation", status: "Pending" },
  { id: 3, patient: "Emma Thompson", doctor: "Dr. James Okafor", date: "2026-06-07", time: "09:00 AM", type: "Routine Check", status: "Confirmed" },
  { id: 4, patient: "Ava Johnson", doctor: "Dr. Priya Nair", date: "2026-06-08", time: "11:00 AM", type: "Follow-up", status: "Cancelled" },
];

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
const TYPES = ["Consultation", "Follow-up", "Routine Check", "Emergency", "Lab Results"];

const COLORS = {
  Cardiology: "#ef4444",
  Neurology: "#8b5cf6",
  Orthopedics: "#f59e0b",
  Pediatrics: "#10b981",
  Dermatology: "#ec4899",
  "General Medicine": "#3b82f6",
};

const statusColor = { Confirmed: "#10b981", Pending: "#f59e0b", Cancelled: "#ef4444" };

export default function HospitalApp() {
  const [tab, setTab] = useState("dashboard");
  const [appointments, setAppointments] = useState(APPOINTMENTS_INIT);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [form, setForm] = useState({ patient: "", doctor: "", date: "", time: "", type: "Consultation" });
  const [toast, setToast] = useState(null);
  const [patientModal, setPatientModal] = useState(null);

  const showToast = (msg, color = "#10b981") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const bookAppointment = () => {
    if (!form.patient || !form.doctor || !form.date || !form.time) {
      showToast("Please fill all fields", "#ef4444");
      return;
    }
    const newApp = { id: Date.now(), ...form, status: "Pending" };
    setAppointments(p => [newApp, ...p]);
    setShowBooking(false);
    setForm({ patient: "", doctor: "", date: "", time: "", type: "Consultation" });
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

  const filteredPatients = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const filteredDoctors = DOCTORS.filter(d =>
    d.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    pending: appointments.filter(a => a.status === "Pending").length,
    cancelled: appointments.filter(a => a.status === "Cancelled").length,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f0f4f8", minHeight: "100vh", color: "#1e2d3d" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f0f4f8; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
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
        .modal { background: white; border-radius: 20px; padding: 32px; width: 480px; max-width: 94vw; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .doc-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .doc-card { transition: all 0.2s; }
        select.input { appearance: none; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, right: 24, background: toast.color, color: "white", padding: "12px 22px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", animation: "slideUp 0.3s ease" }}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside style={{ width: 230, background: "white", borderRight: "1px solid #e8f0fe", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 4, position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 10 }}>
          <div style={{ padding: "0 8px 24px", borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#1e40af", letterSpacing: "-0.5px" }}>MediCare+</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Hospital Management</div>
          </div>
          {[
            { id: "dashboard", icon: "⊞", label: "Dashboard" },
            { id: "appointments", icon: "📅", label: "Appointments" },
            { id: "patients", icon: "🧑‍⚕️", label: "Patient Records" },
            { id: "doctors", icon: "👨‍⚕️", label: "Doctors & Staff" },
          ].map(t => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <span style={{ fontSize: 16 }}>{t.icon}</span> {t.label}
            </button>
          ))}
          <div style={{ marginTop: "auto", padding: "16px 8px 0", borderTop: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14 }}>A</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Admin</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>admin@medicare.com</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main style={{ marginLeft: 230, flex: 1, padding: "32px 32px 32px 40px" }}>

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#1e2d3d" }}>Good morning 👋</h1>
                  <p style={{ color: "#64748b", marginTop: 4 }}>Here's what's happening at your hospital today.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowBooking(true)}>+ Book Appointment</button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {[
                  { label: "Total Appointments", value: stats.total, color: "#1e40af", bg: "#eff6ff", icon: "📋" },
                  { label: "Confirmed", value: stats.confirmed, color: "#10b981", bg: "#ecfdf5", icon: "✅" },
                  { label: "Pending", value: stats.pending, color: "#f59e0b", bg: "#fffbeb", icon: "⏳" },
                  { label: "Cancelled", value: stats.cancelled, color: "#ef4444", bg: "#fef2f2", icon: "❌" },
                ].map(s => (
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

              {/* Recent Appointments */}
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Appointments</h2>
                  <button className="btn-ghost" onClick={() => setTab("appointments")}>View all →</button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                      {["Patient", "Doctor", "Date & Time", "Type", "Status"].map(h => (
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

              {/* Quick Doctors */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700 }}>Top Doctors</h2>
                  <button className="btn-ghost" onClick={() => setTab("doctors")}>View all →</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                  {DOCTORS.slice(0, 3).map(d => (
                    <div key={d.id} style={{ padding: "14px 16px", borderRadius: 12, border: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS[d.specialty] + "22", color: COLORS[d.specialty], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{d.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{d.specialty}</div>
                        <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 2 }}>★ {d.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPOINTMENTS */}
          {tab === "appointments" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800 }}>Appointments</h1>
                <button className="btn-primary" onClick={() => setShowBooking(true)}>+ New Appointment</button>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                      {["Patient", "Doctor", "Date", "Time", "Type", "Status", "Actions"].map(h => (
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

          {/* PATIENTS */}
          {tab === "patients" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800 }}>Patient Records</h1>
                <div style={{ display: "flex", gap: 12 }}>
                  <input className="input" style={{ width: 240 }} placeholder="Search patients..." value={searchPatient} onChange={e => setSearchPatient(e.target.value)} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {filteredPatients.map(p => (
                  <div key={p.id} className="card" style={{ padding: 22, cursor: "pointer", transition: "all 0.2s" }} onClick={() => setPatientModal(p)}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#eff6ff", color: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
                          {p.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                          <div style={{ fontSize: 13, color: "#64748b" }}>Age {p.age} · Blood {p.blood}</div>
                        </div>
                      </div>
                      <span className="badge" style={{ background: p.status === "Active" ? "#ecfdf5" : "#f8fafc", color: p.status === "Active" ? "#10b981" : "#94a3b8" }}>{p.status}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                      <div><span style={{ color: "#94a3b8" }}>Condition</span><div style={{ fontWeight: 500, marginTop: 2 }}>{p.condition}</div></div>
                      <div><span style={{ color: "#94a3b8" }}>Last Visit</span><div style={{ fontWeight: 500, marginTop: 2 }}>{p.lastVisit}</div></div>
                      <div><span style={{ color: "#94a3b8" }}>Phone</span><div style={{ fontWeight: 500, marginTop: 2 }}>{p.phone}</div></div>
                    </div>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
                      <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }} onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, patient: p.name })); setShowBooking(true); }}>Book Appointment</button>
                      <button className="btn-ghost" style={{ fontSize: 12 }} onClick={e => { e.stopPropagation(); setPatientModal(p); }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCTORS */}
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
                      <span style={{ fontWeight: 600 }}>Available: </span>{d.available.join(", ")}
                    </div>
                    <button className="btn-primary" style={{ width: "100%", fontSize: 13 }} onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, doctor: d.name })); setShowBooking(true); }}>
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="overlay" onClick={() => setShowBooking(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Book Appointment</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Fill in the details to schedule a new appointment.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Patient Name</label>
                <select className="input" value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))}>
                  <option value="">Select patient</option>
                  {PATIENTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
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
                  <input type="date" className="input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Time</label>
                  <select className="input" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}>
                    <option value="">Select time</option>
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
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

      {/* Patient Detail Modal */}
      {patientModal && (
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
              <button className="btn-primary" onClick={() => { setPatientModal(null); setForm(f => ({ ...f, patient: patientModal.name })); setShowBooking(true); }}>Book Appointment</button>
              <button className="btn-ghost" onClick={() => setPatientModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Detail Modal */}
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[{ label: "Rating", value: `★ ${selectedDoctor.rating}` }, { label: "Experience", value: selectedDoctor.exp }, { label: "Total Patients", value: selectedDoctor.patients }].map(i => (
                <div key={i.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1e40af" }}>{i.value}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{i.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Available Days</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <span key={day} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: selectedDoctor.available.includes(day) ? "#1e40af" : "#e2e8f0", color: selectedDoctor.available.includes(day) ? "white" : "#94a3b8" }}>{day}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setSelectedDoctor(null); setForm(f => ({ ...f, doctor: selectedDoctor.name })); setShowBooking(true); }}>Book Appointment</button>
              <button className="btn-ghost" onClick={() => setSelectedDoctor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
